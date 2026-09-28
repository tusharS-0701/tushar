import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BrainCircuit, ChevronLeft, ChevronRight, Flame, Mail, Map, Newspaper, PanelTop, Rss, Settings, Sparkles, TrendingUp } from 'lucide-react'
import { getSiteLinks, listPosts } from '../../lib/posts'

export const revalidate = 300
export const metadata: Metadata = {
  title: 'Writing | Tushar Sharma',
  description: 'Ideas, learnings and experiments in public on software engineering, distributed systems and AI.',
  alternates: { canonical: '/blog' },
}

const fallback: BlogCard[] = [
  {slug:'kafka-partitions',title:'What I learned about Kafka partitions',description:'A practical guide to how Kafka partitions work, the mental models that helped me, and key takeaways from building event-driven systems.',tags:['Systems','Kafka','Distributed Systems'],publishedAt:'2026-09-18',coverImage:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=82',coverImageAlt:'Blue server racks in a data center'},
  {slug:'running-llms',title:'Running LLMs on a 16GB laptop',description:"My experience running and experimenting with open source models on a laptop with 16GB RAM, what works, what doesn't, and practical tips.",tags:['AI & LLMs'],publishedAt:'2026-09-12',coverImage:'https://images.unsplash.com/photo-1644088379091-d574269d422f?auto=format&fit=crop&w=1200&q=82',coverImageAlt:'Abstract blue network of connected data points'},
  {slug:'debugging-detective',title:'Debugging is like being a detective',description:'How I approach debugging complex issues, the mindset, tools and a few techniques that actually help.',tags:['Dev & Productivity'],publishedAt:'2026-09-12',coverImage:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=82',coverImageAlt:'Source code displayed in a developer editor'},
  {slug:'building-in-public',title:'My thoughts on building in public',description:"What building in public has taught me, the challenges, and why I still think it’s worth it.",tags:['Life & Building'],publishedAt:'2026-09-05',coverImage:'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=82',coverImageAlt:'Notebook and pen on a writer’s desk'},
]

type BlogCard = { slug:string; title:string; description:string; tags:string[]; publishedAt:string|null; coverImage?:string; coverImageAlt?:string }

const fmt=(date:string|null)=>date?new Date(date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}):''
const mins=(post:{description:string})=>Math.max(5,Math.ceil(post.description.split(/\s+/).length/35))

export default async function BlogPage(){
 const [live,siteLinks]=await Promise.all([listPosts(),getSiteLinks()])
 const posts:BlogCard[]=live.length?live:fallback
 const liveSlugs=new Set(live.map(post=>post.slug))
 const href=(slug:string)=>liveSlugs.has(slug)?'/blog/'+slug:'/blog'
 const featured=posts[0]
 const latest=posts.slice(1,4).length===3?posts.slice(1,4):fallback.slice(1)
 const trend=[...posts,...fallback].filter((p,i,a)=>a.findIndex(x=>x.title===p.title)===i).slice(0,5)
 return <main className="blog-shell">
  <aside className="blog-side"><p className="side-label">Writing</p><h1>Ideas, learnings<br/>and experiments<br/>in public.</h1><p className="side-copy">Notes on software engineering, distributed systems, AI, products and building a meaningful life.</p><div className="filters">{[[Newspaper,'All Posts','42'],[PanelTop,'Systems','12'],[BrainCircuit,'AI & LLMs','8'],[TrendingUp,'Product & Growth','6'],[Map,'Building in Public','10'],[Settings,'Engineering','5'],[Sparkles,'Life','4']].map((x,i)=>{const FilterIcon=x[0];return <a className={i===0?'selected':''} href="#latest" key={String(x[1])}><i><FilterIcon/></i>{String(x[1])}<small>{String(x[2])}</small></a>})}</div><div className="side-links"><a href={'mailto:'+siteLinks.email}><Mail/> Newsletter <span><ArrowRight/></span></a><a href="/blog"><Rss/> RSS Feed <span><ArrowRight/></span></a></div><blockquote>“A collection of thoughts from a curious developer figuring things out.”<strong>• Tushar</strong></blockquote></aside>
  <div className="blog-main">
   <section className="blog-hero"><div className="hero-words"><h2>Better software<br/>through <em>clearer thinking.</em></h2><p>Deep dives, practical guides and honest reflections on software engineering, distributed systems, AI and the journey of building in public.</p><div><a className="blog-button dark" href="#latest">Explore all posts →</a><a className="blog-button" href="#newsletter">✉ Subscribe</a></div></div><div className="hero-art" aria-hidden><span/><span/><span/><span/><b>Systems<br/>Products<br/>AI<br/>Life</b></div></section>
   <div className="blog-grid"><div className="feed"><Link className={`feature-card${featured.coverImage?' has-cover':''}`} href={href(featured.slug)}>{featured.coverImage?<img className="feature-cover" src={featured.coverImage} alt={featured.coverImageAlt||featured.title}/>:<div className="server-art" aria-hidden>{Array.from({length:14},(_,i)=><i key={i}/>)}</div>}<div className="feature-copy"><small>● Featured</small><h2>{featured.title}</h2><p>{featured.description}</p><div className="feature-meta"><span>▣ {fmt(featured.publishedAt)}  ·  {mins(featured)} min read</span><div>{featured.tags.slice(0,3).map(t=><b key={t}>{t}</b>)}</div></div></div></Link>
    <section className="latest" id="latest"><header><h2>Latest articles</h2><a href="#">View all →</a></header><div className="latest-grid">{latest.map((p,i)=><Link href={href(p.slug)} className="latest-card" key={p.title}>{p.coverImage?<img className="latest-cover" src={p.coverImage} alt={p.coverImageAlt||p.title}/>:<div className={'latest-art art-'+i}><i/></div>}<small>{p.tags[0]}  ·  {fmt(p.publishedAt)}</small><h3>{p.title}</h3><p>{p.description}</p><div className="latest-meta"><span>{mins(p)} min read</span><b aria-hidden>→</b></div></Link>)}</div></section>
   </div><aside className="right-rail"><section className="trending"><header><b><Flame/> Trending this week</b><span><ChevronLeft/><ChevronRight/></span></header>{trend.map((p,i)=><Link href={href(p.slug)} key={p.title}><i>{String(i+1).padStart(2,'0')}</i><span>{p.title}<small>{mins(p)} min read</small></span></Link>)}</section><section className="newsletter" id="newsletter"><small><Sparkles/> Newsletter</small><h2>New posts, straight<br/>to your inbox.</h2><p>No spam. Just new articles, notes<br/>and interesting finds.</p><form><input type="email" aria-label="Email address" placeholder="Enter your email"/><button aria-label="Subscribe"><ArrowRight/></button></form><div className="orb"/></section></aside></div>
  </div>
 </main>
}
