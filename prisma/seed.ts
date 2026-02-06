import 'dotenv/config'
import { PrismaClient, UserRole, ArticleStatus } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { hash } from 'bcryptjs'

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
    adapter,
})

// Helper function to generate slug
function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

async function main() {
    console.log('🌱 Starting database seeding...')

    // Hash default password
    const defaultPassword = await hash('password123', 12)

    // ============ USERS ============
    console.log('\n📦 Seeding users...')
    
    const superadmin = await prisma.user.upsert({
        where: { email: 'admin@spe.com' },
        update: { password: defaultPassword },
        create: {
            email: 'admin@spe.com',
            password: defaultPassword,
            name: 'Super Admin',
            role: UserRole.SUPERADMIN,
        },
    })
    console.log('  ✅ Superadmin:', superadmin.email, '(password: password123)')

    const writer = await prisma.user.upsert({
        where: { email: 'writer@spe.com' },
        update: { password: defaultPassword },
        create: {
            email: 'writer@spe.com',
            password: defaultPassword,
            name: 'Content Writer',
            role: UserRole.WRITER,
        },
    })
    console.log('  ✅ Writer:', writer.email, '(password: password123)')

    const external = await prisma.user.upsert({
        where: { email: 'external@company.com' },
        update: { password: defaultPassword },
        create: {
            email: 'external@company.com',
            password: defaultPassword,
            name: 'External Partner',
            role: UserRole.EXTERNAL,
        },
    })
    console.log('  ✅ External:', external.email)

    // ============ CATEGORIES ============
    console.log('\n📦 Seeding categories...')
    
    const categoriesData = [
        { name: 'Technology', slug: 'technology' },
        { name: 'Research', slug: 'research' },
        { name: 'Industry News', slug: 'industry-news' },
        { name: 'Innovation', slug: 'innovation' },
        { name: 'Sustainability', slug: 'sustainability' },
        { name: 'Career Development', slug: 'career-development' },
        { name: 'Academic', slug: 'academic' },
        { name: 'Case Studies', slug: 'case-studies' },
    ]

    const categories: Record<string, string> = {}
    for (const cat of categoriesData) {
        const category = await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        })
        categories[cat.name] = category.id
        console.log('  ✅ Category:', cat.name)
    }

    // ============ ARTICLES ============
    console.log('\n📦 Seeding articles...')
    
    const articlesData = [
        {
            title: 'Advanced Petroleum Engineering Techniques in Deep Water Drilling',
            excerpt: 'Exploring cutting-edge methodologies and technologies that are revolutionizing deep water drilling operations in the petroleum industry.',
            content: '<h2>Introduction</h2><p>Deep water drilling has become increasingly important in the petroleum industry as traditional reserves become depleted. This article explores the latest techniques and technologies being employed in this challenging environment.</p><h2>Key Technologies</h2><p>Modern deep water drilling relies on several advanced technologies including automated drilling systems, real-time monitoring, and advanced materials designed to withstand extreme pressures.</p><h2>Conclusion</h2><p>The future of deep water drilling looks promising with continuous innovations in technology and methodology.</p>',
            coverImage: '/articles/article1.webp',
            author: 'Dr. Sarah Johnson',
            category: 'Technology',
            tags: ['drilling', 'deepwater', 'technology'],
            status: ArticleStatus.PUBLISHED,
        },
        {
            title: 'Sustainable Energy Transition: The Role of Petroleum Engineers',
            excerpt: 'How petroleum engineers are adapting their skills to contribute to renewable energy projects and sustainable development.',
            content: '<h2>The Changing Landscape</h2><p>As the world moves towards sustainable energy sources, petroleum engineers are finding new ways to apply their expertise in the renewable energy sector.</p><h2>Skills Transfer</h2><p>Many skills developed in petroleum engineering translate directly to geothermal, carbon capture, and hydrogen production projects.</p><h2>Future Outlook</h2><p>The energy transition presents both challenges and opportunities for petroleum engineers willing to adapt.</p>',
            coverImage: '/articles/article2.webp',
            author: 'Prof. Michael Chen',
            category: 'Sustainability',
            tags: ['sustainability', 'energy-transition', 'career'],
            status: ArticleStatus.PUBLISHED,
        },
        {
            title: 'AI and Machine Learning Applications in Oil and Gas Exploration',
            excerpt: 'Discovering how artificial intelligence is transforming seismic data analysis and reservoir characterization.',
            content: '<h2>AI Revolution in Energy</h2><p>Artificial intelligence is revolutionizing the way oil and gas companies approach exploration and production.</p><h2>Applications</h2><p>From seismic interpretation to production optimization, AI and machine learning are being deployed across the value chain.</p><h2>Case Studies</h2><p>Several major operators have reported significant improvements in exploration success rates using AI-powered analysis.</p>',
            coverImage: '/articles/article3.webp',
            author: 'Dr. Amanda Rodriguez',
            category: 'Innovation',
            tags: ['ai', 'machine-learning', 'exploration'],
            status: ArticleStatus.PUBLISHED,
        },
        {
            title: 'Career Pathways for Young Petroleum Engineers in 2026',
            excerpt: 'A comprehensive guide to career opportunities and skill development for the next generation of petroleum engineers.',
            content: '<h2>Career Landscape</h2><p>The petroleum engineering field continues to evolve, offering diverse career paths for graduates.</p><h2>Skills in Demand</h2><p>Beyond technical skills, employers are seeking engineers with data analytics, project management, and sustainability expertise.</p><h2>Getting Started</h2><p>Internships, certifications, and networking remain crucial for career development.</p>',
            coverImage: '/articles/article4.webp',
            author: 'John Williams',
            category: 'Career Development',
            tags: ['career', 'jobs', 'graduates'],
            status: ArticleStatus.PUBLISHED,
        },
        {
            title: 'Enhanced Oil Recovery: Latest Research Findings',
            excerpt: 'Recent breakthroughs in enhanced oil recovery techniques and their practical applications in field operations.',
            content: '<h2>EOR Overview</h2><p>Enhanced Oil Recovery techniques continue to advance, allowing operators to extract more value from existing reservoirs.</p><h2>Recent Advances</h2><p>New polymer formulations and CO2 injection methods have shown promising results in recent field trials.</p><h2>Economic Considerations</h2><p>The economics of EOR continue to improve as technology advances and costs decrease.</p>',
            coverImage: '/articles/article5.webp',
            author: 'Dr. Lisa Thompson',
            category: 'Research',
            tags: ['eor', 'research', 'production'],
            status: ArticleStatus.PUBLISHED,
        },
        {
            title: 'Digital Transformation in Petroleum Industry Operations',
            excerpt: 'How digital technologies are streamlining operations and improving efficiency across the petroleum value chain.',
            content: '<h2>Digital Revolution</h2><p>The petroleum industry is undergoing a digital transformation that is reshaping how companies operate.</p><h2>Key Technologies</h2><p>IoT sensors, cloud computing, and advanced analytics are driving improvements in efficiency and safety.</p><h2>Implementation Challenges</h2><p>Adopting new technologies requires significant investment in infrastructure and training.</p>',
            coverImage: '/articles/article6.webp',
            author: 'Mark Anderson',
            category: 'Technology',
            tags: ['digital', 'iot', 'automation'],
            status: ArticleStatus.PUBLISHED,
        },
    ]

    for (const article of articlesData) {
        const slug = generateSlug(article.title)
        const created = await prisma.article.upsert({
            where: { slug },
            update: {},
            create: {
                title: article.title,
                slug,
                excerpt: article.excerpt,
                content: article.content,
                coverImage: article.coverImage,
                author: article.author,
                status: article.status,
                tags: article.tags,
                publishedAt: new Date(),
                categoryId: categories[article.category],
                userId: writer.id,
            },
        })
        console.log('  ✅ Article:', created.title.substring(0, 50) + '...')
    }

    // ============ ALUMNI ============
    console.log('\n📦 Seeding alumni...')
    
    const alumniData = [
        {
            name: 'Ahmad Fauzi',
            email: 'ahmad.fauzi@student.up.edu',
            institution: 'Universitas Pertamina',
            phone: '+62812345678',
            position: 'Reservoir Engineer',
            message: 'Passionate about reservoir simulation and EOR techniques. Looking forward to connecting with fellow alumni.',
            isNewData: true,
        },
        {
            name: 'Siti Rahayu',
            email: 'siti.rahayu@student.up.edu',
            institution: 'Universitas Pertamina',
            phone: '+62823456789',
            position: 'Production Engineer',
            message: 'Specializing in production optimization and well management. Happy to mentor juniors.',
            isNewData: true,
        },
        {
            name: 'Budi Santoso',
            email: 'budi.santoso@student.up.edu',
            institution: 'Universitas Pertamina',
            phone: '+62834567890',
            position: 'Drilling Engineer',
            message: 'Working on advanced drilling technologies and offshore operations.',
            isNewData: false,
        },
        {
            name: 'Dewi Lestari',
            email: 'dewi.lestari@student.up.edu',
            institution: 'Universitas Pertamina',
            phone: '+62845678901',
            position: 'Senior Geoscientist',
            message: 'Expert in seismic interpretation and geological modeling. Updating my contact info.',
            isNewData: false,
        },
    ]

    for (const alumni of alumniData) {
        const created = await prisma.alumni.upsert({
            where: { email: alumni.email },
            update: {},
            create: alumni,
        })
        console.log('  ✅ Alumni:', created.name)
    }

    // ============ PARTNERSHIPS ============
    console.log('\n📦 Seeding partnerships...')
    
    const partnershipsData = [
        {
            name: 'Andi Wijaya',
            institution: 'PT Pertamina',
            email: 'andi.wijaya@pertamina.com',
            subject: 'Annual Sponsorship Inquiry',
            message: 'We are interested in sponsoring student competitions and events annually.',
            nda: true,
        },
        {
            name: 'Sarah Miller',
            institution: 'Schlumberger',
            email: 'smiller@slb.com',
            subject: 'Internship Program Partnership',
            message: 'Proposing a summer internship program for petroleum engineering students.',
            nda: false,
        },
        {
            name: 'Dr. Bambang Suryanto',
            institution: 'Indonesia Researchers Association',
            email: 'bambang@ira.org',
            subject: 'Research Collaboration',
            message: 'Joint research collaboration on sustainable energy technologies.',
            nda: true,
        },
    ]

    for (const partnership of partnershipsData) {
        const created = await prisma.partnership.create({
            data: partnership,
        })
        console.log('  ✅ Partnership:', created.name, '-', created.institution)
    }

    console.log('\n✅ Database seeding completed!')
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
        await pool.end()
    })
