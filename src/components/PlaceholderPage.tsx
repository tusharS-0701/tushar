import Link from 'next/link'

export function PlaceholderPage({ eyebrow, title, description }: {
  eyebrow: string
  title: string
  description: string
}) {
  return <main className="placeholder-page">
    <section className="placeholder-content wrap">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
      <div><Link className="button dark" href="/">Back home</Link><Link className="button" href="/blog">Read the journal</Link></div>
      <span aria-hidden>TS</span>
    </section>
  </main>
}
