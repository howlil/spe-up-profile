import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createServerClient } from '@/lib/supabase/server'

const BUCKET_NAME = 'alumni-photos'

// POST - Public alumni registration (no auth required)
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const institution = formData.get('institution') as string
        const phone = formData.get('phone') as string
        const position = formData.get('position') as string
        const message = formData.get('message') as string
        const isNewData = formData.get('isNewData') === 'true'
        const file = formData.get('photo') as File | null

        // Validation
        if (!name || !email || !institution || !phone || !position || !message) {
            return NextResponse.json(
                { error: 'Field yang wajib diisi: nama, email, institusi, telepon, posisi, pesan' },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Format email tidak valid' },
                { status: 400 }
            )
        }

        // Check if email already exists
        const existingAlumni = await prisma.alumni.findUnique({
            where: { email }
        })

        if (existingAlumni) {
            return NextResponse.json(
                { error: 'Alumni dengan email ini sudah terdaftar' },
                { status: 400 }
            )
        }

        let photoPath: string | null = null

        // Upload photo if provided
        if (file && file.size > 0) {
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
            if (!allowedTypes.includes(file.type)) {
                return NextResponse.json(
                    { error: 'Tipe file tidak valid. Hanya JPEG, PNG, dan WebP yang diperbolehkan.' },
                    { status: 400 }
                )
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                return NextResponse.json(
                    { error: 'Ukuran file terlalu besar. Maksimal 5MB.' },
                    { status: 400 }
                )
            }

            const supabase = createServerClient()
            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
            const filePath = `photos/${fileName}`

            const { data, error } = await supabase.storage
                .from(BUCKET_NAME)
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (error) {
                console.error('Photo upload error:', error)
                return NextResponse.json(
                    { error: 'Gagal mengupload foto' },
                    { status: 500 }
                )
            }

            const { data: urlData } = supabase.storage
                .from(BUCKET_NAME)
                .getPublicUrl(data.path)
            
            photoPath = urlData.publicUrl
        }

        const alumniRecord = await prisma.alumni.create({
            data: {
                name,
                email,
                institution,
                phone,
                position,
                message,
                photoPath,
                isNewData
            }
        })

        return NextResponse.json({ 
            success: true,
            message: 'Pendaftaran alumni berhasil!',
            alumni: alumniRecord 
        }, { status: 201 })
    } catch (error) {
        console.error('POST alumni register error:', error)
        return NextResponse.json(
            { error: 'Gagal mendaftarkan data alumni' },
            { status: 500 }
        )
    }
}
