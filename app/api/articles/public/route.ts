import { NextRequest, NextResponse } from 'next/server'
import { ArticleStatus } from '@prisma/client'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET - Public endpoint to list published articles
export async function GET(request: NextRequest) {
    try {
        if (!process.env.DATABASE_URL) {
            return NextResponse.json(
                { error: 'Server misconfiguration: DATABASE_URL not set' },
                { status: 500 }
            )
        }
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''
        const categoryId = searchParams.get('categoryId') || ''
        const tag = searchParams.get('tag') || ''

        const skip = (page - 1) * limit

        // Build where clause - only published articles
        const where: any = {
            status: ArticleStatus.PUBLISHED
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { excerpt: { contains: search, mode: 'insensitive' } },
                { author: { contains: search, mode: 'insensitive' } }
            ]
        }

        if (categoryId) {
            where.categoryId = categoryId
        }

        if (tag) {
            where.tags = { has: tag.toLowerCase() }
        }

        // Get articles
        const [articles, total] = await Promise.all([
            prisma.article.findMany({
                where,
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    excerpt: true,
                    coverImage: true,
                    author: true,
                    tags: true,
                    publishedAt: true,
                    createdAt: true,
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true
                        }
                    }
                },
                orderBy: { publishedAt: 'desc' },
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
        const message = error instanceof Error ? error.message : 'Failed to fetch articles'
        console.error('GET public articles error:', error)
        return NextResponse.json(
            { error: process.env.NODE_ENV === 'development' ? message : 'Failed to fetch articles' },
            { status: 500 }
        )
    }
}
