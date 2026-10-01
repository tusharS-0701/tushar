import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BrainCircuit, Mail, Map as MapIcon, Newspaper, PanelTop, Rss, Settings, Sparkles, TrendingUp } from 'lucide-react'
import { blogCategories, getBlogSettings, getSiteLinks, listPosts, type Post } from '../../lib/posts'
import { subscribe } from './actions'

export const revalidate = 300
const description = 'Ideas, learnings and experiments in public on software engineering, distributed systems and AI.'
export const metadata: Metadata = {
  title: 'Writing | Tushar Sharma', description,
  keywords: ['distributed systems', 'AI and LLMs', 'software engineering', 'product growth', 'building in public', 'developer life'],
  alternates: { canonical: '/blog', types: { 'application/rss+xml': '/blog/rss.xml' } },
  openGraph: { title: 'Writing by Tushar Sharma', description, url: '/blog', images: [{ url: '/logo.png', width: 1254, height: 1254, alt: 'Tushar Sharma logo' }] },
  twitter: { card: 'summary_large_image', title: 'Writing by Tushar Sharma', description, images: ['/logo.png'] },
}

type Props = { searchParams: Promise<{ category?: string; subscribed?: string; subscribeError?: string }> }
const icons = [PanelTop, BrainCircuit, TrendingUp, MapIcon, Settings, Sparkles]
const fmt = (date: string | null) => date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : ''
const mins = (post: Post) => Math.max(1, Math.ceil(post.body.trim().split(/\s+/).filter(Boolean).length / 220))

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams
  const [posts, siteLinks, settings] = await Promise.all([listPosts(), getSiteLinks(), getBlogSettings()])
  const categoryCounts = posts.reduce<Map<string, number>>((counts, post) => {
    const category = post.category || 'Engineering'
    counts.set(category, (counts.get(category) || 0) + 1)
    return counts
  }, new Map())
  const categories = blogCategories.map((category) => [category, categoryCounts.get(category) || 0] as const)
  const selectedCategory = params.category && blogCategories.some((category) => category === params.category) ? params.category : undefined
  const filtered = selectedCategory ? posts.filter((post) => (post.category || 'Engineering') === selectedCategory) : posts
  const featured = filtered.find((post) => post.featured) || filtered[0]
  const latest = filtered.filter((post) => post.slug !== featured?.slug)
  const markedTrending = posts.filter((post) => post.trending).slice(0, 5)
  const trend = markedTrending.length ? markedTrending : posts.slice(0, 5)

  return <main className="blog-shell">
    <aside className="blog-side"><p className="side-label">Writing</p><h1>{settings.sidebarTitle}</h1><p className="side-copy">{settings.sidebarDescription}</p><div className="filters">
      <Link className={!selectedCategory ? 'selected' : ''} href="/blog" scroll={false}><i><Newspaper /></i>All Posts<small>{posts.length}</small></Link>
      {categories.map(([category, count], index) => { const Icon = icons[index % icons.length]; return <Link className={selectedCategory === category ? 'selected' : ''} href={`/blog?category=${encodeURIComponent(category)}`} scroll={false} key={category}><i><Icon /></i>{category}<small>{count}</small></Link> })}
    </div><div className="side-links"><a href={`mailto:${siteLinks.email}`}><Mail /> Newsletter <span><ArrowRight /></span></a><a href="/blog/rss.xml"><Rss /> RSS Feed <span><ArrowRight /></span></a></div><blockquote>“{settings.quote}”<strong>• {settings.quoteAuthor}</strong></blockquote></aside>
    <div className="blog-main">
      <section className="blog-hero"><div className="hero-words"><h2>{settings.heroTitle}</h2><p>{settings.heroDescription}</p><div><a className="blog-button dark" href="#latest">Explore all posts →</a><a className="blog-button" href="#newsletter">✉ Subscribe</a></div></div><div className="hero-art" aria-hidden><span /><span /><span /><span /><b>{blogCategories.slice(0, 4).join('\n')}</b></div></section>
      <div className="blog-grid"><div className="feed">
        {featured ? <Link className={`feature-card${featured.coverImage ? ' has-cover' : ''}`} href={`/blog/${featured.slug}`}>{featured.coverImage ? <img className="feature-cover" src={featured.coverImage} alt={featured.coverImageAlt || featured.title} /> : <div className="server-art" aria-hidden>{Array.from({ length: 14 }, (_, i) => <i key={i} />)}</div>}<div className="feature-copy"><small>● Featured</small><h2>{featured.title}</h2><p>{featured.description}</p><div className="feature-meta"><span>▣ {fmt(featured.publishedAt)} · {mins(featured)} min read</span><div>{featured.tags.slice(0, 3).map((tag) => <b key={tag}>{tag}</b>)}</div></div></div></Link> : <section className="blog-empty"><h2>No published articles yet</h2><p>New writing will appear here as soon as it is published.</p></section>}
        <section className="latest" id="latest"><header><h2>{selectedCategory ? `${selectedCategory} articles` : 'Latest articles'}</h2>{selectedCategory && <Link href="/blog" scroll={false}>View all →</Link>}</header>{latest.length ? <div className="latest-grid">{latest.map((post, index) => <Link href={`/blog/${post.slug}`} className="latest-card" key={post.slug}>{post.coverImage ? <img className="latest-cover" src={post.coverImage} alt={post.coverImageAlt || post.title} /> : <div className={`latest-art art-${index % 3}`}><i /></div>}<small>{post.category || 'Engineering'} · {fmt(post.publishedAt)}</small><h3>{post.title}</h3><p>{post.description}</p><div className="latest-meta"><span>{mins(post)} min read</span><b aria-hidden>→</b></div></Link>)}</div> : featured && <p className="blog-empty-inline">No other articles match this filter.</p>}</section>
      </div><aside className="right-rail">{trend.length > 0 && <section className="trending"><header><b><TrendingUp /> Trending</b></header>{trend.map((post, index) => <Link href={`/blog/${post.slug}`} key={post.slug}><i>{String(index + 1).padStart(2, '0')}</i><span>{post.title}<small>{mins(post)} min read</small></span></Link>)}</section>}<section className="newsletter" id="newsletter"><small><Sparkles /> Newsletter</small><h2>{settings.newsletterTitle}</h2><p>{settings.newsletterDescription}</p><form action={subscribe}><input type="email" name="email" required aria-label="Email address" placeholder="Enter your email" /><button aria-label="Subscribe"><ArrowRight /></button></form>{params.subscribed && <span className="newsletter-status">You’re subscribed.</span>}{params.subscribeError && <span className="newsletter-status">Please try again.</span>}<div className="orb" /></section></aside></div>
    </div>
  </main>
}
