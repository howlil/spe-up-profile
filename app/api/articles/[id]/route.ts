import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { deleteImage } from '@/lib/storage'

// Helper function to generate slug
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

// GET - Get single article
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const article = await prisma.article.findUnique({
            where: { id: params.id },
            include: {
                category: true
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
            where: { id: params.id },
            data: { views: { increment: 1 } }
        })

        return NextResponse.json({ article }, { status: 200 })
    } catch (error) {
        console.error('GET article error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch article' },
            { status: 500 }
        )
    }
}

// PUT - Update article
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

        // Check if article exists
        const existing = await prisma.article.findUnique({
            where: { id: params.id }
        })

        if (!existing) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            )
        }

        // Generate new slug if title changed
        let slug = existing.slug
        if (title && title !== existing.title) {
            slug = generateSlug(title)

            // Ensure slug is unique
            const existingSlug = await prisma.article.findFirst({
                where: {
                    slug,
                    id: { not: params.id }
                }
            })

            if (existingSlug) {
                slug = `${slug}-${Date.now()}`
            }
        }

        // Update article
        const article = await prisma.article.update({
            where: { id: params.id },
            data: {
                title: title || existing.title,
                slug,
                excerpt: excerpt !== undefined ? excerpt : existing.excerpt,
                content: content || existing.content,
                coverImage: coverImage !== undefined ? coverImage : existing.coverImage,
                author: author || existing.author,
                status: status || existing.status,
                categoryId: categoryId !== undefined ? categoryId : existing.categoryId,
                tags: tags || existing.tags,
                publishedAt: status === 'published' && !existing.publishedAt ? new Date() : existing.publishedAt
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
                action: 'update',
                metadata: { title: article.title }
            }
        })

        return NextResponse.json({ article }, { status: 200 })
    } catch (error) {
        console.error('PUT article error:', error)
        return NextResponse.json(
            { error: 'Failed to update article' },
            { status: 500 }
        )
    }
}

// DELETE - Delete article
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const article = await prisma.article.findUnique({
            where: { id: params.id }
        })

        if (!article) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            )
        }

        // Delete cover image from storage if exists
        if (article.coverImage) {
            try {
                await deleteImage(article.coverImage)
            } catch (err) {
                console.error('Failed to delete image:', err)
                // Continue with article deletion even if image deletion fails
            }
        }

        // Delete article
        await prisma.article.delete({
            where: { id: params.id }
        })

        // Log activity
        await prisma.analytics.create({
            data: {
                resource: 'article',
                resourceId: params.id,
                action: 'delete',
                metadata: { title: article.title }
            }
        })

        return NextResponse.json(
            { message: 'Article deleted successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('DELETE article error:', error)
        return NextResponse.json(
            { error: 'Failed to delete article' },
            { status: 500 }
        )
    }
}
