import { NextResponse } from 'next/server'

// This endpoint has been simplified
// Previously tracked analytics activities
// For a simple admin app, this is not necessary

export async function GET() {
    return NextResponse.json({
        message: 'Activities endpoint removed. Analytics tracking has been simplified for this app.'
    }, { status: 410 })
}
