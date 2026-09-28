'use client'

import { useRef, useState, type ChangeEvent } from 'react'

type Props = { coverImage?: string; coverImageAlt?: string }

export function PostImageFields({ coverImage = '', coverImageAlt = '' }: Props) {
  const formRef = useRef<HTMLDivElement>(null)
  const [cover, setCover] = useState(coverImage)
  const [alt, setAlt] = useState(coverImageAlt)
  const [inlineAlt, setInlineAlt] = useState('')
  const [uploading, setUploading] = useState<'cover' | 'inline' | null>(null)
  const [error, setError] = useState('')

  async function upload(file: File) {
    const data = new FormData()
    data.set('file', file)
    const response = await fetch('/api/admin/images', { method: 'POST', body: data })
    const result = await response.json() as { url?: string; error?: string }
    if (!response.ok || !result.url) throw new Error(result.error || 'Image upload failed')
    return result.url
  }

  async function uploadCover(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setUploading('cover'); setError('')
    try { setCover(await upload(file)); if (!alt) setAlt(file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')) }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Image upload failed') }
    finally { setUploading(null); event.target.value = '' }
  }

  async function uploadInline(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setUploading('inline'); setError('')
    try {
      const url = await upload(file)
      const form = formRef.current?.closest('form')
      const body = form?.querySelector<HTMLTextAreaElement>('textarea[name="body"]')
      if (!body) throw new Error('Article editor was not found')
      const imageAlt = inlineAlt || file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
      const markdown = `\n\n![${imageAlt}](${url})\n\n`
      const start = body.selectionStart || body.value.length
      const end = body.selectionEnd || start
      body.value = body.value.slice(0, start) + markdown + body.value.slice(end)
      body.dispatchEvent(new Event('input', { bubbles: true }))
      body.focus(); body.setSelectionRange(start + markdown.length, start + markdown.length)
      setInlineAlt('')
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Image upload failed') }
    finally { setUploading(null); event.target.value = '' }
  }

  return <div className="admin-field admin-field--wide admin-image-fields" ref={formRef}>
    <span>Article images <small>JPEG, PNG, WebP or GIF · maximum 10 MB</small></span>
    <div className="admin-image-grid">
      <div>
        <b>Cover image</b>
        <input name="coverImage" type="url" value={cover} onChange={(event) => setCover(event.target.value)} placeholder="Upload or paste a Cloudinary image URL" required />
        <input name="coverImageAlt" value={alt} onChange={(event) => setAlt(event.target.value)} placeholder="Describe the cover image" required minLength={5} maxLength={180} />
        <label className="admin-upload-button">{uploading === 'cover' ? 'Uploading…' : 'Upload cover'}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={uploadCover} disabled={Boolean(uploading)} /></label>
        {cover && <img className="admin-image-preview" src={cover} alt={alt || 'Cover preview'} />}
      </div>
      <div>
        <b>Inline content image</b>
        <input value={inlineAlt} onChange={(event) => setInlineAlt(event.target.value)} placeholder="Image description / alt text" />
        <label className="admin-upload-button">{uploading === 'inline' ? 'Uploading…' : 'Upload and insert into body'}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={uploadInline} disabled={Boolean(uploading)} /></label>
        <small>The image is inserted at the current cursor position as Markdown.</small>
      </div>
    </div>
    {error && <p className="admin-upload-error" role="alert">{error}</p>}
  </div>
}
