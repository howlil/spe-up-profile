import { NextRequest, NextResponse } from 'next/server'
import { UserRole } from '@prisma/client'
import { requireRole } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { hash } from 'bcryptjs'

// GET - Get all users (admins)
export async function GET(request: NextRequest) {
    const userOrError = await requireRole([UserRole.SUPERADMIN])
    if (userOrError instanceof NextResponse) {
        return userOrError
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json({ users }, { status: 200 })
    } catch (error) {
        console.error('GET users error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        )
    }
}

// POST - Create new user
export async function POST(request: NextRequest) {
    const userOrError = await requireRole([UserRole.SUPERADMIN])
    if (userOrError instanceof NextResponse) {
        return userOrError
    }

    try {
        const body = await request.json()
        const { email, name, role, password } = body

        // Validate password
        if (!password || password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            )
        }

        // Only allow 1 SUPERADMIN in the system
        if (role === UserRole.SUPERADMIN) {
            const existingSuperAdmin = await prisma.user.findFirst({
                where: { role: UserRole.SUPERADMIN }
            })
            if (existingSuperAdmin) {
                return NextResponse.json(
                    { error: 'Only one Super Admin is allowed in the system' },
                    { status: 400 }
                )
            }
        }

        // Check if email already exists
        const existing = await prisma.user.findUnique({
            where: { email }
        })

        if (existing) {
            return NextResponse.json(
                { error: 'Email already exists' },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: role || UserRole.WRITER
            }
        })

        return NextResponse.json({ user }, { status: 201 })
    } catch (error) {
        console.error('POST user error:', error)
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        )
    }
}
