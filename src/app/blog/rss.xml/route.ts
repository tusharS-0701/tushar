import { listPosts } from '../../../lib/posts'

export const revalidate = 300
const escapeXml = (value: string) => value.replace(/[<>&'"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[char]!))

export async function GET() {
  const posts = await listPosts()
  const origin = 'https://www.tusharsharma.me'
  const items = posts.map((post) => `<item><title>${escapeXml(post.title)}</title><link>${origin}/blog/${post.slug}</link><guid>${origin}/blog/${post.slug}</guid><description>${escapeXml(post.description)}</description>${post.category ? `<category>${escapeXml(post.category)}</category>` : ''}${post.publishedAt ? `<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>` : ''}</item>`).join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Tushar Sharma — Writing</title><link>${origin}/blog</link><description>Ideas, learnings and experiments in public.</description>${items}</channel></rss>`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
