import { listPosts } from '../../../lib/posts'

export const revalidate = 300
const escapeXml = (value: string) => value.replace(/[<>&'"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[char]!))

export async function GET() {
  const posts = await listPosts()
  const origin = 'https://www.tusharsharma.me'
  const items = posts.map((post) => `<item><title>${escapeXml(post.title)}</title><link>${origin}/blog/${post.slug}</link><guid>${origin}/blog/${post.slug}</guid><description>${escapeXml(post.description)}</description>${post.category ? `<category>${escapeXml(post.category)}</category>` : ''}${post.publishedAt ? `<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>` : ''}</item>`).join('')
  const lastBuildDate = posts[0]?.updatedAt ? new Date(posts[0].updatedAt).toUTCString() : new Date().toUTCString()
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Tushar Sharma — Writing</title><link>${origin}/blog</link><atom:link href="${origin}/blog/rss.xml" rel="self" type="application/rss+xml"/><description>Ideas, learnings and experiments in public.</description><language>en</language><lastBuildDate>${lastBuildDate}</lastBuildDate>${items}</channel></rss>`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
