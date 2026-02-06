import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST - Public partnership application (no auth required)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {
            name,
            institution,
            email,
            subject,
            message,
            filePath,
            nda
        } = body

        // Validation
        if (!name || !institution || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Please fill in all required fields: name, institution, email, subject, and message' },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            )
        }

        const partnership = await prisma.partnership.create({
            data: {
                name,
                institution,
                email,
                subject,
                message,
                filePath: filePath || null,
                nda: nda || false,
            }
        })

        return NextResponse.json({ 
            success: true,
            message: 'Partnership request submitted successfully!',
            partnership 
        }, { status: 201 })
    } catch (error) {
        console.error('POST partnership apply error:', error)
        return NextResponse.json(
            { error: 'Failed to submit partnership request' },
            { status: 500 }
        )
    }
}
