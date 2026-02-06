import { NextResponse, type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'
)

async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET)
        return payload
    } catch {
        return null
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Get auth token from cookies
    const token = request.cookies.get('auth-token')?.value

    // Verify token if exists
    const session = token ? await verifyToken(token) : null

    // Protect /admin/* pages - redirect to /login if not authenticated
    if (pathname.startsWith('/admin')) {
        if (!session) {
            const url = request.nextUrl.clone()
            url.pathname = '/login'
            url.searchParams.set('redirect', pathname)
            return NextResponse.redirect(url)
        }
    }

    // Protect API routes except public ones
    if (pathname.startsWith('/api')) {
        const isAuthRoute = pathname.startsWith('/api/auth')
        const isPublicRoute = pathname.includes('/public') || 
                             pathname.startsWith('/api/articles/categories') ||
                             pathname.startsWith('/api/alumni/register') ||
                             pathname.startsWith('/api/partnerships/apply')

        if (!isAuthRoute && !isPublicRoute && !session) {
            return NextResponse.json(
                { error: 'Unauthorized - Please login' },
                { status: 401 }
            )
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [

        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
