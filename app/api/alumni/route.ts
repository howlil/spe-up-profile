import { NextRequest, NextResponse } from 'next/server'
import { UserRole } from '@prisma/client'
import { requireRole } from '@/lib/auth'
import prisma from '@/lib/prisma'

// GET - List alumni with search and filtering
export async function GET(request: NextRequest) {
    // Check authorization - SUPERADMIN only
    const userOrError = await requireRole([UserRole.SUPERADMIN])
    if (userOrError instanceof NextResponse) {
        return userOrError
    }

    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''
        const year = searchParams.get('year') || ''

        const skip = (page - 1) * limit

        // Build where clause
        const where: any = {}

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { institution: { contains: search, mode: 'insensitive' } }
            ]
        }

        const [alumni, total] = await Promise.all([
            prisma.alumni.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit
            }),
            prisma.alumni.count({ where })
        ])

        return NextResponse.json({
            alumni,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }, { status: 200 })
    } catch (error) {
        console.error('GET alumni error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch alumni' },
            { status: 500 }
        )
    }
}

// POST - Add alumni record
export async function POST(request: NextRequest) {
    // Check authorization - SUPERADMIN only
    const userOrError = await requireRole([UserRole.SUPERADMIN])
    if (userOrError instanceof NextResponse) {
        return userOrError
    }

    try {
        const body = await request.json()
        const {
            name,
            email,
            institution,
            phone,
            position,
            message,
            photoPath,
            isNewData
        } = body

        // Validation
        if (!name || !email || !institution || !phone || !position || !message) {
            return NextResponse.json(
                { error: 'Missing required fields: name, email, institution, phone, position, message' },
                { status: 400 }
            )
        }

        // Check if email already exists
        const existingAlumni = await prisma.alumni.findUnique({
            where: { email }
        })

        if (existingAlumni) {
            return NextResponse.json(
                { error: 'Alumni with this email already exists' },
                { status: 400 }
            )
        }

        const alumniRecord = await prisma.alumni.create({
            data: {
                name,
                email,
                institution,
                phone,
                position,
                message,
                photoPath: photoPath || null,
                isNewData: isNewData !== undefined ? isNewData : true
            }
        })

        return NextResponse.json({ alumni: alumniRecord }, { status: 201 })
    } catch (error) {
        console.error('POST alumni error:', error)
        return NextResponse.json(
            { error: 'Failed to create alumni record' },
            { status: 500 }
        )
    }
}
