import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { verify, JwtPayload } from 'jsonwebtoken'
import { UserRole } from '@prisma/client'
import prisma from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'

interface TokenPayload extends JwtPayload {
    userId: string
    email: string
    role: UserRole
}

/**
 * Get current session from JWT token
 */
export async function getServerSession(): Promise<TokenPayload | null> {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('auth-token')?.value

        if (!token) {
            return null
        }

        const decoded = verify(token, JWT_SECRET) as TokenPayload
        return decoded
    } catch (error) {
        console.error('Error verifying token:', error)
        return null
    }
}

/**
 * Get current authenticated user with Prisma data
 */
export async function getCurrentUser() {
    try {
        const session = await getServerSession()

        if (!session?.userId) {
            return null
        }

        // Get user from Prisma database
        const user = await prisma.user.findUnique({
            where: { id: session.userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        return user
    } catch (error) {
        console.error('Error getting current user:', error)
        return null
    }
}

/**
 * Require authentication - returns 401 if not authenticated
 */
export async function requireAuth() {
    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        )
    }

    return user
}

/**
 * Check if user has specific role
 */
export async function hasRole(allowedRoles: UserRole[]) {
    const user = await getCurrentUser()

    if (!user || !allowedRoles.includes(user.role)) {
        return false
    }

    return true
}

/**
 * Require specific role - returns 403 if user doesn't have role
 */
export async function requireRole(allowedRoles: UserRole[]) {
    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        )
    }

    if (!allowedRoles.includes(user.role)) {
        return NextResponse.json(
            { error: 'Forbidden - insufficient permissions' },
            { status: 403 }
        )
    }

    return user
}
