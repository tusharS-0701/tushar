import type { Dispatch } from './data/content'
import type { SiteLinks } from './lib/posts'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BriefcaseBusiness, Layers3, MapPin, Monitor, BrainCircuit, ChartNoAxesColumnIncreasing } from 'lucide-react'
import penAdvert from './assets/penadvert.png'

const A=()=> <ArrowRight aria-hidden size={14}/>
const topics=[[Layers3,'Distributed Systems','Scalability, reliability, and real-world system design.','violet'],[BrainCircuit,'AI & LLMs','LLM applications, RAG, model tooling, and AI-native products.','blue'],[ChartNoAxesColumnIncreasing,'Product & Growth','From zero to first users, distribution experiments, and what actually works.','green']] as const
const projects=[['Distribution','A collection of resources, notes and experiments around product distribution and growth.','Growth · Marketing · Playbooks','distribution'],['Movie Chat RAG','A RAG based chatbot that answers questions using only Wikipedia data about movies.','RAG · LLM · Wikipedia','rag'],['Virtual Try-On','AI powered virtual try-on for apparel brands. Upload a model and try different outfits instantly.','Computer Vision · AI · E-commerce','tryon']]
const defaults=[
 ['What I learned about Kafka partitions','A practical guide to how Kafka partitions work, the mental models that helped me, and key takeaways.','Sep 18, 2026','SYSTEMS','https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=700&q=82'],
 ['Debugging is like being a detective','How I approach debugging complex issues, the mindset, and a few techniques that actually help.','Sep 12, 2026','DEV & PRODUCTIVITY','https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=700&q=82'],
 ['My thoughts on building in public','What building in public has taught me, the challenges, and why I still think it’s worth it.','Sep 5, 2026','LIFE & BUILDING','https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=700&q=82'],
]

export default function App({latestDispatches,siteLinks}:{latestDispatches:Dispatch[];siteLinks:SiteLinks}){
 const {github:GITHUB}=siteLinks
 const posts=defaults.map((p,i)=>({title:latestDispatches[i]?.title||p[0],desc:p[1],date:latestDispatches[i]?.date||p[2],tag:p[3],tone:latestDispatches[i]?.coverImage||p[4],href:latestDispatches[i]?.href||'/blog'}))
 return <main>
  <section className="hero wrap" id="top"><div className="herocopy"><p className="eyebrow">Software engineer &amp; builder</p><h1>Software engineer.<br/>Builder. Writer.</h1><p className="lede">I build software, study distributed systems, experiment with AI, and write about what I learn.</p><div className="actions"><Link className="button dark" href="/blog">Read my writing <A/></Link><Link className="button" href="#projects">Explore projects</Link></div><div className="facts"><p><i><BriefcaseBusiness/></i><span><b>4+ years</b>building software</span></p><p><i><MapPin/></i><span><b>Based in</b>Indore, India</span></p><p><i><Monitor/></i><span><b>Open to</b>interesting opportunities</span></p></div></div><div className="portrait" id="about"><img src="/pfp.png" alt="Tushar Sharma"/><div><b>Tushar Sharma</b><span>Programmer | Building in Public | AI · Systems · Startups</span></div></div></section>
  <section className="section wrap" id="writing"><header><h2>Latest writing</h2><Link href="/blog">View all writing <A/></Link></header><div className="writing">{posts.map((p,i)=><Link className="article" href={p.href||'/blog'} key={p.title}><div className="thumb"><img src={p.tone} alt="" loading="lazy" /></div><div className="articlecopy"><small>{p.tag}</small><h3>{p.title}</h3><p>{p.desc}</p><time>{p.date} · {8-i*2} min read</time></div></Link>)}</div></section>
  <section className="pen-advert wide" id="now"><Image src={penAdvert} alt="Pen AI-native content and marketing workspace" sizes="(max-width: 620px) 100vw, 944px" priority /></section>
  <section className="section wrap"><header><h2>Currently exploring</h2><Link href="/blog">Always learning <A/></Link></header><div className="topics">{topics.map(([TopicIcon,title,description,tone])=><Link href="/blog" key={title}><i className={tone}><TopicIcon/></i><span><b>{title}</b><small>{description}</small></span><A/></Link>)}</div></section>
  <section className="section wrap" id="projects"><header><h2>Selected projects</h2><a href={GITHUB} target="_blank" rel="noreferrer">View all projects <A/></a></header><div className="projects">{projects.map(p=><article className={'project '+p[3]} key={p[0]}><h3>{p[0]}</h3><p>{p[1]}</p><small>{p[2]}</small><a href={GITHUB} target="_blank" rel="noreferrer" aria-label={'View '+p[0]+' on GitHub'}>→</a></article>)}</div></section>
 </main>
}
