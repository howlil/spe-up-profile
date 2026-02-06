import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - List partnerships with filtering
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const status = searchParams.get('status') || ''
        const type = searchParams.get('type') || ''
        const search = searchParams.get('search') || ''

        const skip = (page - 1) * limit

        // Build where clause
        const where: any = {}

        if (status) {
            where.status = status
        }

        if (type) {
            where.partnershipType = type
        }

        if (search) {
            where.OR = [
                { companyName: { contains: search, mode: 'insensitive' } },
                { contactPerson: { contains: search, mode: 'insensitive' } }
            ]
        }

        const [partnerships, total] = await Promise.all([
            prisma.partnership.findMany({
                where,
                orderBy: { submittedAt: 'desc' },
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

// POST - Create partnership application
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {
            companyName,
            companyEmail,
            companyPhone,
            contactPerson,
            contactEmail,
            contactPhone,
            partnershipType,
            description
        } = body

        // Validation
        if (!companyName || !companyEmail || !contactPerson || !contactEmail || !partnershipType) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const partnership = await prisma.partnership.create({
            data: {
                companyName,
                companyEmail,
                companyPhone: companyPhone || null,
                contactPerson,
                contactEmail,
                contactPhone: contactPhone || null,
                partnershipType,
                description: description || null,
                status: 'pending'
            }
        })

        // Log activity
        await prisma.analytics.create({
            data: {
                resource: 'partnership',
                resourceId: partnership.id,
                action: 'create',
                metadata: { companyName: partnership.companyName }
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
