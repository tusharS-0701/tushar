import type { Metadata } from 'next'
import { ArrowRight, Box, BriefcaseBusiness, Code2 } from 'lucide-react'
import { getSiteLinks } from '../../lib/posts'
import styles from './services.module.css'

const description = 'MVP development, full stack engineering, and technical consulting for founders and small teams.'
export const metadata: Metadata = {
  title: 'Services | Tushar Sharma', description,
  alternates: { canonical: '/services' },
  openGraph: { title: 'Product Engineering Services', description, url: '/services', images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Tushar Sharma logo' }] },
  twitter: { card: 'summary_large_image', title: 'Product Engineering Services', description, images: ['/logo.png'] },
}

const services = [
  { icon: Box, title: 'MVP Development', description: 'Turn an early idea into a focused, production-ready product with a clear scope and clean foundation.' },
  { icon: Code2, title: 'Full Stack Development', description: 'End-to-end web development across thoughtful interfaces, reliable APIs, databases, and deployment.' },
  { icon: BriefcaseBusiness, title: 'Technical Consulting', description: 'Practical guidance on product strategy, architecture, delivery, and scaling an existing product.' },
] as const

export default async function ServicesPage() {
  const links = await getSiteLinks()
  const contactHref = links.linkedin
  const structuredData = {
    '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'Tushar Sharma — Product Engineering',
    url: 'https://www.tusharsharma.me/services', email: links.email, description, areaServed: 'Worldwide',
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Engineering services', itemListElement: services.map(({ title, description: serviceDescription }) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: title, description: serviceDescription } })) },
  }

  return <main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Services</p>
          <h1>Turn ideas into<br/><span>working products.</span></h1>
          <p className={styles.heroText}>I help founders, creators, and small teams build, ship, and grow software products—from the first useful version to a dependable platform.</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href={contactHref} target="_blank" rel="noreferrer">Work with me <ArrowRight /></a>
            <a className={styles.secondaryLink} href="#services">View process <ArrowRight /></a>
          </div>
        </div>
        <div className={styles.heroGraphic} aria-hidden="true">
          <svg viewBox="0 0 560 420" role="presentation">
            <defs>
              <linearGradient id="service-plane" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2e8fff" stopOpacity="0.04"/><stop offset="1" stopColor="#2e8fff" stopOpacity="0.4"/></linearGradient>
              <linearGradient id="service-stroke" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2586ff" stopOpacity="0.18"/><stop offset="1" stopColor="#57b5ff"/></linearGradient>
              <filter id="service-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="13"/></filter>
            </defs>
            <path className={styles.glow} d="M151 126 399 40v267L151 221Z"/>
            <path className={styles.backPlane} d="M98 182 452 62v279L98 235Z"/>
            <path className={styles.midPlane} d="M137 206 494 88v269L137 260Z"/>
            <path className={styles.frontPlane} d="M101 148 409 44v244L101 208Z"/>
          </svg>
        </div>
      </div>
    </section>

    <section className={styles.servicesSection} id="services">
      <div className={styles.sectionHeading}>
        <div><p className={styles.eyebrow}>Services</p><h2>How I can help</h2></div>
        <p>Focused, practical services for building and scaling software products.</p>
      </div>
      <div className={styles.serviceGrid}>{services.map(({ icon: Icon, title, description: serviceDescription }) => <article className={styles.serviceCard} key={title}>
        <span className={styles.serviceIcon}><Icon /></span><h3>{title}</h3><p>{serviceDescription}</p>
        <a href={contactHref} target="_blank" rel="noreferrer" aria-label={`Discuss ${title} on LinkedIn`}>Explore service <ArrowRight /></a>
      </article>)}</div>
    </section>

    <section className={styles.contact}>
      <div><p className={styles.eyebrow}>Let’s work together</p><h2>Have a project<br/><span>in mind?</span></h2><p>Whether you have a clear idea or want to explore the possibilities, I’d love to hear from you.</p><a className={styles.primaryButton} href={contactHref} target="_blank" rel="noreferrer">Get in touch <ArrowRight /></a></div>
    </section>

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
  </main>
}
