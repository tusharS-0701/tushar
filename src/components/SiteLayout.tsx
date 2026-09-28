'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from './icons/Icons'

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blogs' },
  { href: '/services', label: 'Services' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
]

const email = 'tusharsharma123456.k20@gmail.com'
const socials = [
  { href: 'https://x.com/mach__07', label: 'X / Twitter', Icon: XIcon },
  { href: 'https://www.linkedin.com/in/tusharsharma0711/', label: 'LinkedIn', Icon: LinkedinIcon },
  { href: 'https://github.com/tusharS-0701', label: 'GitHub', Icon: GithubIcon },
  { href: 'https://www.instagram.com/tushar07.sh/', label: 'Instagram', Icon: InstagramIcon },
]

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return children

  return <div className="flex min-h-screen flex-col bg-white text-slate-950">
    <header className="z-50 mb-2 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 text-base font-extrabold tracking-tight"><img src="/logo.png" alt="" className="h-9 w-9 rounded-lg object-cover" />Tushar Sharma</Link>
        <nav className="hidden h-full items-center gap-7 text-xs text-slate-600 md:flex" aria-label="Primary navigation">
          {navigation.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return <Link key={item.href} href={item.href} className={`relative flex h-full items-center transition-colors hover:text-slate-950 ${active ? 'font-semibold text-slate-950 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-blue-600' : ''}`}>{item.label}</Link>
          })}
        </nav>
        <a href={`mailto:${email}`} className="inline-flex h-9 shrink-0 items-center rounded-lg bg-slate-950 px-4 text-xs font-semibold !text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Contact me</a>
      </div>
      <nav className="flex items-center justify-center gap-5 overflow-x-auto border-t border-slate-100 px-4 py-2 text-[11px] text-slate-600 md:hidden" aria-label="Mobile navigation">
        {navigation.map((item) => <Link key={item.href} href={item.href} className={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)) ? 'font-semibold text-blue-600' : ''}>{item.label}</Link>)}
      </nav>
    </header>
    <div className="flex-1">{children}</div>
    <footer className="mt-auto border-t border-slate-200 bg-white text-slate-950">
      <div className="mx-auto grid min-h-28 w-full max-w-6xl items-center gap-6 px-4 py-6 sm:px-6 md:grid-cols-[1fr_auto_auto]">
        <div className="flex items-center gap-3"><img src="/logo.png" alt="Tushar Sharma logo" className="h-10 w-10 rounded-lg object-cover" /><div><strong className="text-sm">Tushar Sharma</strong><p className="mt-1 max-w-sm text-[11px] leading-relaxed text-slate-500">Software engineer, builder and writer. Building products and sharing what I learn.</p></div></div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-slate-600" aria-label="Footer navigation">{navigation.slice(1).map((item) => <Link className="hover:text-blue-600" href={item.href} key={item.href}>{item.label}</Link>)}</nav>
        <div className="flex items-center gap-4">{socials.map(({ href, label, Icon }) => <a className="text-slate-500 transition-colors hover:text-blue-600" href={href} target="_blank" rel="noreferrer" aria-label={label} key={label}><Icon className="h-4 w-4" /></a>)}</div>
      </div>
    </footer>
  </div>
}
