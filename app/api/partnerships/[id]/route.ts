import { NextRequest, NextResponse } from 'next/server'
import { UserRole } from '@prisma/client'
import { requireRole } from '@/lib/auth'
import { deleteFileByPublicUrl } from '@/lib/storage'
import prisma from '@/lib/prisma'

const PARTNERSHIP_FILES_BUCKET = 'partnership-files'

// GET - Get single partnership
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const userOrError = await requireRole([UserRole.EXTERNAL, UserRole.SUPERADMIN])
    if (userOrError instanceof NextResponse) {
        return userOrError
    }

    try {
        const { id } = await params
        const partnership = await prisma.partnership.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                institution: true,
                email: true,
                subject: true,
                message: true,
                filePath: true,
                createdAt: true
            }
        })

        if (!partnership) {
            return NextResponse.json(
                { error: 'Partnership not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ partnership }, { status: 200 })
    } catch (error) {
        console.error('GET partnership error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch partnership' },
            { status: 500 }
        )
    }
}

// PUT - Update partnership
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

        const existing = await prisma.partnership.findUnique({
            where: { id }
        })

        if (!existing) {
            return NextResponse.json(
                { error: 'Partnership not found' },
                { status: 404 }
            )
        }

        const newFilePath = body.filePath !== undefined ? body.filePath : existing.filePath
        if (existing.filePath && newFilePath !== existing.filePath) {
            await deleteFileByPublicUrl(existing.filePath, PARTNERSHIP_FILES_BUCKET)
        }

        const updated = await prisma.partnership.update({
            where: { id },
            data: {
                name: body.name ?? existing.name,
                institution: body.institution ?? existing.institution,
                email: body.email ?? existing.email,
                subject: body.subject ?? existing.subject,
                message: body.message ?? existing.message,
                filePath: newFilePath,
            }
        })
        const { nda: _, ...rest } = updated
        return NextResponse.json({ partnership: rest }, { status: 200 })
    } catch (error) {
        console.error('PUT partnership error:', error)
        return NextResponse.json(
            { error: 'Failed to update partnership' },
            { status: 500 }
        )
    }
}

// DELETE - Delete partnership
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const userOrError = await requireRole([UserRole.EXTERNAL, UserRole.SUPERADMIN])
    if (userOrError instanceof NextResponse) {
        return userOrError
    }

    try {
        const { id } = await params
        const partnership = await prisma.partnership.findUnique({
            where: { id }
        })

        if (!partnership) {
            return NextResponse.json(
                { error: 'Partnership not found' },
                { status: 404 }
            )
        }

        if (partnership.filePath) {
            await deleteFileByPublicUrl(partnership.filePath, PARTNERSHIP_FILES_BUCKET)
        }

        await prisma.partnership.delete({
            where: { id }
        })

        return NextResponse.json(
            { message: 'Partnership deleted successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('DELETE partnership error:', error)
        return NextResponse.json(
            { error: 'Failed to delete partnership' },
            { status: 500 }
        )
    }
}
