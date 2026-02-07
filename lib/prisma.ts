import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
        throw new Error('DATABASE_URL is not set. Set it in Vercel Project Settings → Environment Variables.')
    }
    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
}

function getPrisma(): PrismaClient {
    if (globalForPrisma.prisma) return globalForPrisma.prisma
    globalForPrisma.prisma = createPrismaClient()
    return globalForPrisma.prisma
}

// Lazy proxy: init Prisma on first use (inside request), so missing DATABASE_URL throws in route try/catch → JSON response
const prisma = new Proxy({} as PrismaClient, {
    get(_, prop) {
        return (getPrisma() as unknown as Record<string, unknown>)[prop as string]
    },
})

export { prisma }
export default prisma
