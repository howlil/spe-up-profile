import { NextRequest, NextResponse } from 'next/server'
import { UserRole } from '@prisma/client'
import { requireRole } from '@/lib/auth'
import prisma from '@/lib/prisma'

// GET - List partnerships with filtering
export async function GET(request: NextRequest) {
    // Check authorization - EXTERNAL or SUPERADMIN can access
    const userOrError = await requireRole([UserRole.EXTERNAL, UserRole.SUPERADMIN])
    if (userOrError instanceof NextResponse) {
        return userOrError
    }

    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''

        const skip = (page - 1) * limit

        // Build where clause
        const where: any = {}

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { institution: { contains: search, mode: 'insensitive' } },
                { subject: { contains: search, mode: 'insensitive' } }
            ]
        }

        const [partnerships, total] = await Promise.all([
            prisma.partnership.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit
            }),
            prisma.partnership.count({ where })
        ])

        return NextResponse.json({
            partnerships,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }, { status: 200 })
    } catch (error) {
        console.error('GET partnerships error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch partnerships' },
            { status: 500 }
        )
    }
}

// POST - Create partnership application (admin)
export async function POST(request: NextRequest) {
    // Check authorization - EXTERNAL or SUPERADMIN can create
    const userOrError = await requireRole([UserRole.EXTERNAL, UserRole.SUPERADMIN])
    if (userOrError instanceof NextResponse) {
        return userOrError
    }

    try {
        const body = await request.json()
        const {
            name,
            institution,
            email,
            subject,
            message,
            filePath,
            nda
        } = body

        // Validation
        if (!name || !institution || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const partnership = await prisma.partnership.create({
            data: {
                name,
                institution,
                email,
                subject,
                message,
                filePath: filePath || null,
                nda: nda || false,
            }
        })

        return NextResponse.json({ partnership }, { status: 201 })
    } catch (error) {
        console.error('POST partnership error:', error)
        return NextResponse.json(
            { error: 'Failed to create partnership' },
            { status: 500 }
        )
    }
}
