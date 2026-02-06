import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Helper function to generate slug from title
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

// GET - List articles with filtering and pagination
export async function GET(request: NextRequest) {
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

// POST - Create new article
export async function POST(request: NextRequest) {
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
        if (!title || !content || !author) {
            return NextResponse.json(
                { error: 'Missing required fields: title, content, author' },
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

        // Create article
        const article = await prisma.article.create({
            data: {
                title,
                slug,
                excerpt: excerpt || '',
                content,
                coverImage: coverImage || null,
                author,
                status: status || 'draft',
                categoryId: categoryId || null,
                tags: tags || [],
                publishedAt: status === 'published' ? new Date() : null
            },
            include: {
                category: true
            }
        })

        // Log activity
        await prisma.analytics.create({
            data: {
                resource: 'article',
                resourceId: article.id,
                action: 'create',
                metadata: { title: article.title }
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
