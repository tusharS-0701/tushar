import type { Metadata } from 'next'
import { ArrowRight, BarChart3, Box, FileText, MessageSquare, Send, Settings, Zap } from 'lucide-react'

export const metadata: Metadata = { title: 'Products | Tushar Sharma', description: 'Practical AI products built by Tushar Sharma, including Pen—the AI-native content and marketing OS.', alternates: { canonical: '/products' } }
const PEN_URL = 'https://pen.tusharsharma.me'
const features = [[MessageSquare,'AI chat workspace'],[FileText,'Content CMS'],[BarChart3,'Built for distribution'],[Zap,'Early access']] as const

export default function ProductsPage() {
 return <main className="bg-white text-slate-950">
  <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-14 pt-16 sm:px-6 md:grid-cols-[1fr_240px] md:pb-20 md:pt-20">
   <div><p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Products</p><h1 className="mt-5 max-w-2xl text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl">Tools I build<br/>and use</h1><p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">Practical tools to help creators, founders and solopreneurs work faster with AI and better systems.</p></div>
   <div className="self-center text-xs font-medium uppercase leading-6 tracking-[0.25em] text-slate-400 md:justify-self-end"><p>Ideas</p><p>Systems</p><p>Products</p><p>More freedom</p><span className="mt-4 block h-px w-12 bg-slate-300" /></div>
  </section>

  <section className="mx-auto w-[calc(100%-2rem)] max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-8 md:p-10">
   <div className="grid items-center gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
    <div>
     <div className="flex items-center gap-4"><span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-xs font-bold">01</span><span className="text-xs font-semibold uppercase tracking-[0.3em]">Pen</span></div>
     <h2 className="mt-6 text-5xl font-extrabold tracking-[-0.05em]">Pen</h2><p className="mt-3 text-lg text-slate-600">Your AI-native Content &amp; Marketing OS</p>
     <p className="mt-6 max-w-lg text-sm leading-7 text-slate-500">Plan, create, manage and distribute your content with natural language. Pen combines an AI chat interface with a CMS so you can go from idea to published content without leaving your workspace.</p>
     <div className="mt-7 flex flex-wrap gap-3"><a href={PEN_URL} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-4 rounded-lg bg-slate-950 px-6 text-sm font-semibold !text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-600">Open Pen <ArrowRight className="h-4 w-4" /></a><a href={PEN_URL} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center rounded-lg border border-slate-300 px-6 text-sm font-semibold !text-slate-900 transition hover:border-slate-950 hover:bg-slate-50">Learn more</a></div>
     <div className="mt-10 grid gap-5 sm:grid-cols-2">{features.map(([Icon,label])=><div className="flex items-center gap-3 text-xs font-medium" key={label}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100"><Icon className="h-4 w-4" /></span>{label}</div>)}</div>
    </div>

    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_22px_55px_rgba(15,23,42,0.12)]">
     <div className="flex h-11 items-center justify-between border-b border-slate-200 px-4"><div className="flex items-center gap-2 text-xs font-bold"><span className="grid h-5 w-5 place-items-center rounded bg-slate-950 text-[9px] !text-white">P</span>Pen</div><span className="text-xs tracking-[0.3em] text-slate-400">••• ×</span></div>
     <div className="grid min-h-[390px] grid-cols-[112px_1fr] sm:grid-cols-[145px_1fr]">
      <aside className="border-r border-slate-200 p-3"><p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Workspace</p>{[['Chat',MessageSquare],['Posts',FileText],['Media',Box],['Analytics',BarChart3],['Settings',Settings]].map(([label,Icon],index)=><div className={`mb-1 flex h-9 items-center gap-2 rounded-lg px-2 text-[10px] ${index===0?'bg-blue-50 text-blue-700':'text-slate-600'}`} key={String(label)}><Icon className="h-3.5 w-3.5" />{String(label)}</div>)}</aside>
      <div className="p-4 sm:p-6"><h3 className="text-sm font-bold sm:text-base">What do you want to create today?</h3><div className="mt-4 rounded-xl border border-slate-200 p-3 shadow-sm"><div className="min-h-14 text-[10px] text-slate-400">Write a blog post about distributed systems...</div><div className="flex justify-end"><span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100"><Send className="h-3.5 w-3.5" /></span></div></div><div className="mt-3 flex flex-wrap gap-1.5">{['Write a blog post','Create social posts','Update a page'].map(item=><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[8px] text-slate-600" key={item}>{item}</span>)}</div><h4 className="mt-7 text-xs font-bold">Recent</h4><div className="mt-2 divide-y divide-slate-100">{[['System Design in 15 Seconds','Published'],['Why I Built Pen','Draft'],['LinkedIn Growth Framework','Published']].map(([title,status])=><div className="flex items-center gap-3 py-3" key={title}><span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-blue-600"><FileText className="h-4 w-4" /></span><div className="min-w-0 flex-1"><p className="truncate text-[10px] font-semibold">{title}</p><p className="text-[8px] text-slate-400">Content · recently</p></div><span className={`rounded-full px-2 py-1 text-[8px] ${status==='Published'?'bg-emerald-50 text-emerald-700':'bg-slate-100 text-slate-600'}`}>{status}</span></div>)}</div></div>
     </div>
    </div>
   </div>
  </section>

  <section className="mx-auto my-16 grid w-[calc(100%-2rem)] max-w-6xl items-center gap-8 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/70 px-6 py-12 sm:px-12 md:grid-cols-[1fr_auto] md:py-16">
   <div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">More coming</p><h2 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">I’m building more tools.</h2><p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">I’m constantly experimenting and building new products. Join the waitlist to get early access and updates.</p></div>
   <form action={PEN_URL} target="_blank" className="flex w-full max-w-md flex-col gap-3 sm:flex-row md:w-[460px]"><label className="sr-only" htmlFor="waitlist-email">Email address</label><input id="waitlist-email" name="email" type="email" required placeholder="Enter your email" className="h-12 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" /><button className="inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-slate-950 px-6 text-sm font-semibold !text-white transition hover:bg-blue-600" type="submit">Join waitlist <ArrowRight className="h-4 w-4" /></button></form>
  </section>
 </main>
}
