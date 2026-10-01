'use client'

import { Link as LinkIcon, Share2 } from 'lucide-react'
import { useState } from 'react'

export function ArticleActions({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }
  const share = async () => {
    if (navigator.share) await navigator.share({ title: document.title, url })
    else await copy()
  }

  return <aside className="article-actions" aria-label="Article actions">
    <a href="/blog" className="article-back"><span>←</span> Back</a>
    <button type="button" onClick={share}><Share2 /><span>Share</span></button>
    <button type="button" onClick={copy}><LinkIcon /><span>{copied ? 'Copied' : 'Copy link'}</span></button>
  </aside>
}
