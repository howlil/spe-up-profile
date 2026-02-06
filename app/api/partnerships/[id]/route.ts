import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Get single partnership
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const partnership = await prisma.partnership.findUnique({
            where: { id: params.id }
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

// DELETE - Delete partnership
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const partnership = await prisma.partnership.findUnique({
            where: { id: params.id }
        })

        if (!partnership) {
            return NextResponse.json(
                { error: 'Partnership not found' },
                { status: 404 }
            )
        }

        await prisma.partnership.delete({
            where: { id: params.id }
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
