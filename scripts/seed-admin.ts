/**
 * Seeder khusus admin: hanya membuat/update user Super Admin.
 * Password: @SPEUPER:)2026
 *
 * Jalankan: pnpm run db:seed:admin
 */
import 'dotenv/config'
import { PrismaClient, UserRole } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { hash } from 'bcryptjs'

const ADMIN_EMAIL = 'admin@spe.com'
const ADMIN_PASSWORD = '@SPEUPER:)2026'

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('🌱 Seeding admin only...')

    const hashedPassword = await hash(ADMIN_PASSWORD, 12)

    const admin = await prisma.user.upsert({
        where: { email: ADMIN_EMAIL },
        update: { password: hashedPassword, name: 'Super Admin', role: UserRole.SUPERADMIN },
        create: {
            email: ADMIN_EMAIL,
            password: hashedPassword,
            name: 'Super Admin',
            role: UserRole.SUPERADMIN,
        },
    })

    console.log('  ✅ Super Admin:', admin.email)
    console.log('  📌 Password:', ADMIN_PASSWORD)
    console.log('\n✅ Admin seed selesai.')
}

main()
    .catch((e) => {
        console.error('❌ Error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
        await pool.end()
    })
