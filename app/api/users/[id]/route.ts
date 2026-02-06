import { NextRequest, NextResponse } from 'next/server'
import { UserRole } from '@prisma/client'
import { requireRole } from '@/lib/auth'
import prisma from '@/lib/prisma'

// GET - Get single user
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
        const user = await prisma.user.findUnique({
            where: { id }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ user }, { status: 200 })
    } catch (error) {
        console.error('GET user error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch user' },
            { status: 500 }
        )
    }
}

// PUT - Update user
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

        const user = await prisma.user.findUnique({
            where: { id }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        // Prevent changing SUPERADMIN's role
        if (user.role === UserRole.SUPERADMIN && body.role !== UserRole.SUPERADMIN) {
            return NextResponse.json(
                { error: 'Cannot change Super Admin role' },
                { status: 400 }
            )
        }

        // Prevent promoting any user to SUPERADMIN
        if (body.role === UserRole.SUPERADMIN && user.role !== UserRole.SUPERADMIN) {
            return NextResponse.json(
                { error: 'Cannot promote user to Super Admin' },
                { status: 400 }
            )
        }

        const updated = await prisma.user.update({
            where: { id },
            data: {
                name: body.name,
                email: body.email,
                role: body.role
            }
        })

        return NextResponse.json({ user: updated }, { status: 200 })
    } catch (error) {
        console.error('PUT user error:', error)
        return NextResponse.json(
            { error: 'Failed to update user' },
            { status: 500 }
        )
    }
}

// DELETE - Delete user
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
        const user = await prisma.user.findUnique({
            where: { id }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        // Prevent deleting SUPERADMIN
        if (user.role === UserRole.SUPERADMIN) {
            return NextResponse.json(
                { error: 'Cannot delete Super Admin account' },
                { status: 400 }
            )
        }

        await prisma.user.delete({
            where: { id }
        })

        return NextResponse.json(
            { message: 'User deleted successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('DELETE user error:', error)
        return NextResponse.json(
            { error: 'Failed to delete user' },
            { status: 500 }
        )
    }
}
