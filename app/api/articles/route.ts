import { NextRequest, NextResponse } from 'next/server'
import { ArticleStatus, UserRole } from '@prisma/client'
import { requireRole } from '@/lib/auth'
import prisma from '@/lib/prisma'

// Helper function to generate slug from title
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

// GET - List articles with filtering
export async function GET(request: NextRequest) {
    // Check authorization - WRITER or SUPERADMIN can access
    const userOrError = await requireRole([UserRole.WRITER, UserRole.SUPERADMIN])
    if (userOrError instanceof NextResponse) {
        return userOrError
    }

    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''
        const status = searchParams.get('status') || ''
        const categoryId = searchParams.get('categoryId') || ''
        const sortBy = searchParams.get('sortBy') || 'createdAt'
        const sortOrder = searchParams.get('sortOrder') || 'desc'

        const skip = (page - 1) * limit

        // Build where clause
        const where: any = {}

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { author: { contains: search, mode: 'insensitive' } },
                { tags: { has: search.toLowerCase() } }
            ]
        }

        if (status) {
            where.status = status
        }

        if (categoryId) {
            where.categoryId = categoryId
        }

        // Get articles
        const [articles, total] = await Promise.all([
            prisma.article.findMany({
                where,
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                orderBy: { [sortBy]: sortOrder },
                skip,
                take: limit
            }),
            prisma.article.count({ where })
        ])

        return NextResponse.json({
            articles,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }, { status: 200 })
    } catch (error) {
        console.error('GET articles error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch articles' },
            { status: 500 }
        )
    }
}

// POST - Create article
export async function POST(request: NextRequest) {
    // Check authorization - WRITER or SUPERADMIN can create
    const userOrError = await requireRole([UserRole.WRITER, UserRole.SUPERADMIN])
    if (userOrError instanceof NextResponse) {
        return userOrError
    }

    try {
        const body = await request.json()
        const {
            title,
            excerpt,
            content,
            coverImage,
            author,
            status,
            categoryId,
            tags
        } = body

        // Validation
        if (!title || !content) {
            return NextResponse.json(
                { error: 'Missing required fields: title, content' },
                { status: 400 }
            )
        }

        // Generate slug
        let slug = generateSlug(title)

        // Ensure slug is unique
        const existingSlug = await prisma.article.findUnique({ where: { slug } })
        if (existingSlug) {
            slug = `${slug}-${Date.now()}`
        }

        const article = await prisma.article.create({
            data: {
                title,
                slug,
                excerpt: excerpt || '',
                content,
                coverImage: coverImage || null,
                author,
                status: (status as ArticleStatus) || ArticleStatus.DRAFT,
                categoryId: categoryId || null,
                tags: tags || [],
                publishedAt: status === ArticleStatus.PUBLISHED ? new Date() : null
            },
            include: {
                category: true
            }
        })

        return NextResponse.json({ article }, { status: 201 })
    } catch (error) {
        console.error('POST article error:', error)
        return NextResponse.json(
            { error: 'Failed to create article' },
            { status: 500 }
        )
    }
}
