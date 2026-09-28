import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import { isAdmin } from '../../../../lib/admin-auth'

export const runtime = 'nodejs'

function cloudinaryConfig() {
  const cloudinaryUrl = process.env.CLOUDINARY_URL
  if (cloudinaryUrl) {
    const parsed = new URL(cloudinaryUrl)
    return { cloudName: parsed.hostname, apiKey: decodeURIComponent(parsed.username), apiSecret: decodeURIComponent(parsed.password) }
  }
  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  }
}

export async function POST(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { cloudName, apiKey, apiSecret } = cloudinaryConfig()
  if (!cloudName || !apiKey || !apiSecret) return NextResponse.json({ error: 'Cloudinary credentials are not configured' }, { status: 503 })

  const input = await request.formData()
  const file = input.get('file')
  if (!(file instanceof File)) return NextResponse.json({ error: 'Choose an image to upload' }, { status: 400 })
  if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) return NextResponse.json({ error: 'Use a JPEG, PNG, WebP or GIF image' }, { status: 415 })
  if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: 'Images must be 10 MB or smaller' }, { status: 413 })

  const timestamp = Math.floor(Date.now() / 1000).toString()
  const folder = 'tushar-me/blog'
  const signature = createHash('sha1').update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest('hex')
  const upload = new FormData()
  upload.set('file', file)
  upload.set('api_key', apiKey)
  upload.set('timestamp', timestamp)
  upload.set('folder', folder)
  upload.set('signature', signature)

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: upload })
  const result = await response.json() as { secure_url?: string; error?: { message?: string } }
  if (!response.ok || !result.secure_url) return NextResponse.json({ error: result.error?.message || 'Cloudinary upload failed' }, { status: 502 })
  return NextResponse.json({ url: result.secure_url })
}
