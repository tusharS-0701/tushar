import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPost } from '../../../lib/posts'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post || post.status !== 'published') return { title: 'Article not found', robots: { index: false } }
  return {
    title: `${post.title} | Tushar Sharma`,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: 'article', title: post.title, description: post.description, url: `/blog/${post.slug}`, publishedTime: post.publishedAt || undefined, modifiedTime: post.updatedAt, authors: ['Tushar Sharma'], tags: post.tags },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post || post.status !== 'published') notFound()
  const url = `https://tushar.me/blog/${post.slug}`
  const structuredData = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title,
    description: post.description, datePublished: post.publishedAt, dateModified: post.updatedAt,
    author: { '@type': 'Person', name: 'Tushar Sharma', url: 'https://tushar.me' },
    mainEntityOfPage: url, url, keywords: post.tags.join(', '),
  }
  return <main className="app-shell min-h-screen px-4 py-10 sm:py-16">
    <article className="paper blog-page border border-[var(--color-rule)] p-6 sm:p-12">
      <Link href="/blog" className="arrow-link">← All articles</Link>
      <header className="mt-12 border-b border-[var(--color-rule)] pb-8">
        <p className="eyebrow">{post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · Tushar Sharma</p>
        <h1 className="hero-headline mt-4">{post.title}</h1>
        <p className="section-copy mt-5">{post.description}</p>
        <p className="mt-5 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">{post.tags.join(' · ')}</p>
      </header>
      <div className="blog-prose mt-10"><ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown></div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    </article>
  </main>
}
