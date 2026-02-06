import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { UserRole } from '@prisma/client'
import prisma from './prisma'

/**
 * Get Supabase server client with cookies
 */
export async function getSupabaseServer() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        cookieStore.set(name, value, options)
                    })
                },
            },
        }
    )
}

/**
 * Get current user session from Supabase
 */
export async function getServerSession() {
    try {
        const supabase = await getSupabaseServer()
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error || !session) {
            return null
        }

        return session
    } catch (error) {
        console.error('Error getting session:', error)
        return null
    }
}

/**
 * Get current authenticated user with Prisma data
 */
export async function getCurrentUser() {
    try {
        const session = await getServerSession()

        if (!session?.user?.email) {
            return null
        }

        // Get user from Prisma database
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
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
