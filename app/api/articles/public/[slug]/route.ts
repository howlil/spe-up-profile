import { NextRequest, NextResponse } from 'next/server'
import { ArticleStatus } from '@prisma/client'
import prisma from '@/lib/prisma'

// GET - Public endpoint to get a single published article by slug
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params

        const article = await prisma.article.findFirst({
            where: {
                slug,
                status: ArticleStatus.PUBLISHED
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true
                    }
                }
            }
        })

        if (!article) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            )
        }

        // Increment view count
        await prisma.article.update({
            where: { id: article.id },
            data: { views: { increment: 1 } }
        })

        return NextResponse.json({ article }, { status: 200 })
    } catch (error) {
        console.error('GET public article error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch article' },
            { status: 500 }
        )
    }
}
