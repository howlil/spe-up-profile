import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Helper function to generate slug
function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

// GET - List all categories
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: {
                    select: { articles: true }
                }
            }
        })

        return NextResponse.json({ categories }, { status: 200 })
    } catch (error) {
        console.error('GET categories error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch categories' },
            { status: 500 }
        )
    }
}

// POST - Create new category
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name } = body

        if (!name) {
            return NextResponse.json(
                { error: 'Missing required field: name' },
                { status: 400 }
            )
        }

        // Generate slug
        let slug = generateSlug(name)

        // Ensure slug is unique
        const existingSlug = await prisma.category.findUnique({ where: { slug } })
        if (existingSlug) {
            return NextResponse.json(
                { error: 'Category with this name already exists' },
                { status: 400 }
            )
        }

        const category = await prisma.category.create({
            data: {
                name,
                slug
            }
        })

        return NextResponse.json({ category }, { status: 201 })
    } catch (error) {
        console.error('POST category error:', error)
        return NextResponse.json(
            { error: 'Failed to create category' },
            { status: 500 }
        )
    }
}

// PUT - Update category
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()
        const { id, name } = body

        if (!id) {
            return NextResponse.json(
                { error: 'Category ID is required' },
                { status: 400 }
            )
        }

        const existing = await prisma.category.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            )
        }

        // Generate new slug if name changed
        let slug = existing.slug
        if (name && name !== existing.name) {
            slug = generateSlug(name)

            const existingSlug = await prisma.category.findFirst({
                where: {
                    slug,
                    id: { not: id }
                }
            })

            if (existingSlug) {
                return NextResponse.json(
                    { error: 'Category with this name already exists' },
                    { status: 400 }
                )
            }
        }

        const category = await prisma.category.update({
            where: { id },
            data: {
                name: name || existing.name,
                slug
            }
        })

        return NextResponse.json({ category }, { status: 200 })
    } catch (error) {
        console.error('PUT category error:', error)
        return NextResponse.json(
            { error: 'Failed to update category' },
            { status: 500 }
        )
    }
}

// DELETE - Delete category
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { error: 'Category ID is required' },
                { status: 400 }
            )
        }

        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { articles: true }
                }
            }
        })

        if (!category) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            )
        }

        // Check if category has articles
        if (category._count.articles > 0) {
            return NextResponse.json(
                { error: `Cannot delete category with ${category._count.articles} article(s)` },
                { status: 400 }
            )
        }

        await prisma.category.delete({ where: { id } })

        return NextResponse.json(
            { message: 'Category deleted successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('DELETE category error:', error)
        return NextResponse.json(
            { error: 'Failed to delete category' },
            { status: 500 }
        )
    }
}
