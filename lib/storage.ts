import { createServerClient } from './supabase/server'

const BUCKET_NAME = 'article-images'

export async function uploadImage(file: File): Promise<string> {
    const supabase = createServerClient()

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `uploads/${fileName}`

    // Upload file
    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        })

    if (error) {
        throw new Error(`Upload failed: ${error.message}`)
    }

    // Get public URL
    const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(data.path)

    return urlData.publicUrl
}

export async function deleteImage(url: string): Promise<void> {
    const supabase = createServerClient()

    // Extract file path from URL
    const urlParts = url.split(`${BUCKET_NAME}/`)
    if (urlParts.length < 2) {
        throw new Error('Invalid image URL')
    }

    const filePath = urlParts[1]

    const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath])

    if (error) {
        throw new Error(`Delete failed: ${error.message}`)
    }
}
