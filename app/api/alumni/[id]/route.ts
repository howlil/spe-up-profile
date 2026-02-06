import { NextRequest, NextResponse } from 'next/server'
import { UserRole } from '@prisma/client'
import { requireRole } from '@/lib/auth'
import prisma from '@/lib/prisma'

// GET - Get single alumni
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const userOrError = await requireRole([UserRole.SUPERADMIN])
    if (userOrError instanceof NextResponse) {
        return userOrError
    }

    try {
        const { id } = await params
        const alumni = await prisma.alumni.findUnique({
            where: { id }
        })

        if (!alumni) {
            return NextResponse.json(
                { error: 'Alumni not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ alumni }, { status: 200 })
    } catch (error) {
        console.error('GET alumni error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch alumni' },
            { status: 500 }
        )
    }
}

// DELETE - Delete alumni
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const userOrError = await requireRole([UserRole.SUPERADMIN])
    if (userOrError instanceof NextResponse) {
        return userOrError
    }

    try {
        const { id } = await params
        const alumni = await prisma.alumni.findUnique({
            where: { id }
        })

        if (!alumni) {
            return NextResponse.json(
                { error: 'Alumni not found' },
                { status: 404 }
            )
        }

        await prisma.alumni.delete({
            where: { id }
        })

        return NextResponse.json(
            { message: 'Alumni deleted successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('DELETE alumni error:', error)
        return NextResponse.json(
            { error: 'Failed to delete alumni' },
            { status: 500 }
        )
    }
}

// PUT - Update alumni
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const userOrError = await requireRole([UserRole.SUPERADMIN])
    if (userOrError instanceof NextResponse) {
        return userOrError
    }

    try {
        const { id } = await params
        const body = await request.json()

        const alumni = await prisma.alumni.findUnique({
            where: { id }
        })

        if (!alumni) {
            return NextResponse.json(
                { error: 'Alumni not found' },
                { status: 404 }
            )
        }

        const updated = await prisma.alumni.update({
            where: { id },
            data: {
                name: body.name,
                email: body.email,
                institution: body.institution,
                phone: body.phone,
                position: body.position,
                message: body.message,
                photoPath: body.photoPath || null,
                isNewData: body.isNewData !== undefined ? body.isNewData : true,
            }
        })

        return NextResponse.json({ alumni: updated }, { status: 200 })
    } catch (error) {
        console.error('PUT alumni error:', error)
        return NextResponse.json(
            { error: 'Failed to update alumni' },
            { status: 500 }
        )
    }
}
