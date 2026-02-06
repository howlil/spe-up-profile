import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        // Get recent analytics activities
        const recentAnalytics = await prisma.analytics.findMany({
            take: 20,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                resource: true,
                resourceId: true,
                action: true,
                metadata: true,
                createdAt: true
            }
        })

        // Format activities for display
        const activities = await Promise.all(
            recentAnalytics.map(async (item: {
                id: string;
                resource: string;
                resourceId: string;
                action: string;
                metadata: unknown;
                createdAt: Date;
            }) => {
                let title = ''
                let user = 'System'

                // Get resource details based on type
                if (item.resource === 'article' && item.action === 'create') {
                    const article = await prisma.article.findUnique({
                        where: { id: item.resourceId },
                        select: { title: true, author: true }
                    })
                    if (article) {
                        title = `New article published: "${article.title}"`
                        user = article.author
                    }
                } else if (item.resource === 'article' && item.action === 'update') {
                    const article = await prisma.article.findUnique({
                        where: { id: item.resourceId },
                        select: { title: true, author: true }
                    })
                    if (article) {
                        title = `Article updated: "${article.title}"`
                        user = article.author
                    }
                } else if (item.resource === 'partnership' && item.action === 'create') {
                    const partnership = await prisma.partnership.findUnique({
                        where: { id: item.resourceId },
                        select: { companyName: true }
                    })
                    if (partnership) {
                        title = `Partnership application from ${partnership.companyName}`
                    }
                } else if (item.resource === 'alumni' && item.action === 'create') {
                    const alumni = await prisma.alumni.findUnique({
                        where: { id: item.resourceId },
                        select: { name: true }
                    })
                    if (alumni) {
                        title = `New alumni registration: ${alumni.name}`
                        user = alumni.name
                    }
                }

                // Calculate relative time
                const getRelativeTime = (date: Date) => {
                    const now = new Date()
                    const diff = now.getTime() - date.getTime()
                    const hours = Math.floor(diff / (1000 * 60 * 60))
                    const days = Math.floor(hours / 24)

                    if (hours < 1) return 'Just now'
                    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
                    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
                    return date.toLocaleDateString()
                }

                return {
                    id: item.id,
                    type: item.resource,
                    title: title || `${item.action} on ${item.resource}`,
                    user,
                    timestamp: getRelativeTime(item.createdAt)
                }
            })
        )

        return NextResponse.json({ activities }, { status: 200 })
    } catch (error) {
        console.error('Activities error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch activities' },
            { status: 500 }
        )
    }
}
