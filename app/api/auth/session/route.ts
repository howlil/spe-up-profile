import { NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'

export async function GET() {
    try {
        const session = await getServerSession()

        if (!session) {
            return NextResponse.json(
                { authenticated: false, session: null },
                { status: 200 }
            )
        }

        return NextResponse.json(
            {
                authenticated: true,
                session: {
                    user: session.user,
                    expiresAt: session.expires_at,
                }
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('Get session error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
