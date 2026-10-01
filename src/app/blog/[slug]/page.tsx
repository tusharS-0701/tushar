import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArticleActions } from '../../../components/article/ArticleActions'
import { ArticleToc } from '../../../components/article/ArticleToc'
import { getPost, listPosts, slugify } from '../../../lib/posts'

export const revalidate = 300
type Props = { params: Promise<{ slug: string }> }

const formatDate = (value: string | null) => value ? new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : ''
const readingTime = (body: string) => Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 220))
function textFromNode(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textFromNode).join('')
  if (node && typeof node === 'object' && 'props' in node) return textFromNode((node as { props: { children?: ReactNode } }).props.children)
  return ''
}
const headings = (body: string) => [...body.matchAll(/^##\s+(.+)$/gm)].map((match) => ({ label: match[1].replace(/[*_`]/g, ''), id: slugify(match[1]) }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post || post.status !== 'published') return { title: 'Article not found', robots: { index: false } }
  return {
    title: `${post.title} | Tushar Sharma`, description: post.description, keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: 'article', title: post.title, description: post.description, url: `/blog/${post.slug}`, publishedTime: post.publishedAt || undefined, modifiedTime: post.updatedAt, authors: ['Tushar Sharma'], tags: post.tags, images: post.coverImage ? [{ url: post.coverImage, alt: post.coverImageAlt || post.title }] : undefined },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: post.coverImage ? [post.coverImage] : undefined },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([getPost(slug), listPosts()])
  if (!post || post.status !== 'published') notFound()
  const url = `https://www.tusharsharma.me/blog/${post.slug}`
  const toc = headings(post.body)
  const related = allPosts.filter((item) => item.slug !== post.slug).sort((a, b) => {
    const shared = (item: typeof a) => item.tags.filter((tag) => post.tags.includes(tag)).length + (item.category === post.category ? 3 : 0)
    return shared(b) - shared(a) || (b.publishedAt || b.updatedAt).localeCompare(a.publishedAt || a.updatedAt)
  }).slice(0, 2)
  const minutes = readingTime(post.body)
  const structuredData = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.description, articleSection: post.category, image: post.coverImage || undefined, datePublished: post.publishedAt, dateModified: post.updatedAt, author: { '@type': 'Person', name: 'Tushar Sharma', url: 'https://www.tusharsharma.me' }, mainEntityOfPage: url, url, keywords: post.tags.join(', ') }
  const Heading = ({ children }: { children?: ReactNode }) => <h2 id={slugify(textFromNode(children))}>{children}</h2>

  return <main className="article-page">
    <div className="article-layout">
      <ArticleActions url={url} />
      <article className="article-main" id="article">
        <header className="article-lead"><p className="article-category">{post.category || post.tags[0] || 'Ideas'}</p><h1>{post.title}</h1><p className="article-deck">{post.description}</p><div className="article-byline"><img src="/pfp.png" alt="Tushar Sharma"/><p><strong>Tushar Sharma</strong><span>{formatDate(post.publishedAt)} · {minutes} min read</span></p></div>{post.coverImage&&<img className="article-cover" src={post.coverImage} alt={post.coverImageAlt||post.title}/>}</header>
        <div className="article-prose"><ReactMarkdown remarkPlugins={[remarkGfm]} components={{ h2: Heading }}>{post.body}</ReactMarkdown></div>
        <section className="article-author"><img src="/pfp.png" alt="Tushar Sharma"/><div><h2>Tushar Sharma</h2><p>Programmer | Building in Public | AI · Systems · Startups</p><p>I’m a software engineer who loves building things, exploring distributed systems, and writing about what I learn.</p></div><Link href="/blog">View all posts <ArrowRight /></Link></section>
      </article>
      <ArticleToc items={toc} />
    </div>
    <section className="article-related"><header><h2>Continue reading</h2><Link href="/blog">More posts <ArrowRight /></Link></header><div>{related.map((item, index) => <Link href={`/blog/${item.slug}`} key={item.slug} className="related-card"><span><small>{item.tags[0] || 'Ideas'}</small><strong>{item.title}</strong><p>{item.description}</p><time>{formatDate(item.publishedAt)} · {readingTime(item.body)} min read</time></span>{item.coverImage?<img src={item.coverImage} alt={item.coverImageAlt||item.title}/>:<i aria-hidden>{index === 0 ? '⌘' : '→'}</i>}</Link>)}</div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
  </main>
}
