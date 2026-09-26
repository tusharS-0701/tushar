import Link from 'next/link'

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Writing' },
  { href: '/projects', label: 'Projects' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
]

export function PlaceholderPage({ eyebrow, title, description, activePath }: {
  eyebrow: string
  title: string
  description: string
  activePath: string
}) {
  return <main className="placeholder-page">
    <header className="placeholder-nav wrap">
      <Link className="brand" href="/">Tushar Sharma</Link>
      <nav aria-label="Primary">
        {navigation.map((item) => <Link className={item.href === activePath ? 'active' : ''} href={item.href} key={item.href}>{item.label}</Link>)}
      </nav>
      <Link className="button dark" href="/about">About me</Link>
    </header>
    <section className="placeholder-content wrap">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
      <div><Link className="button dark" href="/">Back home</Link><Link className="button" href="/blog">Read the journal</Link></div>
      <span aria-hidden>TS</span>
    </section>
  </main>
}
