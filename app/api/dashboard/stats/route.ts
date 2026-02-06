import { NextResponse } from 'next/server'
import { ArticleStatus } from '@prisma/client'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        // Get counts
        const [articlesCount, partnershipsCount, alumniCount, totalViews] = await Promise.all([
            prisma.article.count({ where: { status: ArticleStatus.PUBLISHED } }),
            prisma.partnership.count(),
            prisma.alumni.count(),
            prisma.article.aggregate({
                _sum: {
                    views: true
                }
            })
        ])

        // Get previous month data for comparison
        const now = new Date()
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

        const [prevArticles, prevPartnerships, prevAlumni, prevViews] = await Promise.all([
            prisma.article.count({
                where: {
                    status: ArticleStatus.PUBLISHED,
                    publishedAt: { lt: thisMonth }
                }
            }),
            prisma.partnership.count({
                where: { createdAt: { lt: thisMonth } }
            }),
            prisma.alumni.count({
                where: { createdAt: { lt: thisMonth } }
            }),
            prisma.article.aggregate({
                where: {
                    createdAt: {
                        gte: lastMonth,
                        lt: thisMonth
                    }
                },
                _sum: { views: true }
            })
        ])

        // Calculate percentages
        const calculateChange = (current: number, previous: number) => {
            if (previous === 0) return current > 0 ? '+100%' : '0%'
            const change = ((current - previous) / previous) * 100
            return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`
        }

        const stats = [
            {
                id: 1,
                title: 'Total Articles',
                value: articlesCount,
                change: calculateChange(articlesCount, prevArticles),
                trend: articlesCount >= prevArticles ? 'up' : 'down',
                icon: 'FileText',
                color: 'blue'
            },
            {
                id: 2,
                title: 'Partnerships',
                value: partnershipsCount,
                change: calculateChange(partnershipsCount, prevPartnerships),
                trend: partnershipsCount >= prevPartnerships ? 'up' : 'down',
                icon: 'Handshake',
                color: 'green'
            },
            {
                id: 3,
                title: 'Alumni Records',
                value: alumniCount,
                change: calculateChange(alumniCount, prevAlumni),
                trend: alumniCount >= prevAlumni ? 'up' : 'down',
                icon: 'Users',
                color: 'purple'
            },
            {
                id: 4,
                title: 'Monthly Views',
                value: totalViews._sum.views || 0,
                change: calculateChange(totalViews._sum.views || 0, prevViews._sum.views || 0),
                trend: (totalViews._sum.views || 0) >= (prevViews._sum.views || 0) ? 'up' : 'down',
                icon: 'Eye',
                color: 'orange'
            }
        ]

        return NextResponse.json({ stats }, { status: 200 })
    } catch (error) {
        console.error('Stats error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch stats' },
            { status: 500 }
        )
    }
}
