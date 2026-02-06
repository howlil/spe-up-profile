import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seeding...')

    // Create superadmin user
    const superadmin = await prisma.user.upsert({
        where: { email: 'admin@spe.com' },
        update: {},
        create: {
            email: 'admin@spe.com', 
            name: 'Super Admin',
            role: 'superadmin',
        },
    })

    console.log('✅ Superadmin user created:', superadmin.email)
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
    