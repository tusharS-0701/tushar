import type { Metadata } from 'next'
import { ArrowRight, Blocks, Bot, Box, BriefcaseBusiness, Cloud, Code2, FileText, Layers3, Lightbulb, MessageSquare, Rocket, Sparkles, Users, Zap } from 'lucide-react'
import { getSiteLinks } from '../../lib/posts'
import styles from './services.module.css'

export const metadata: Metadata = {
  title: 'Services | Tushar Sharma',
  description: 'Fractional CTO, product engineering, AI integration, architecture, and software development services for founders and small teams.',
  alternates: { canonical: '/services' },
}

const services = [
  { icon: Box, title: 'MVP Development', description: 'Turn your idea into a real, working product. I help you go from concept to a production-ready MVP with clean architecture.', tags: ['Web Apps', 'SaaS', 'AI Products'] },
  { icon: Sparkles, title: 'Full Stack Development', description: 'End-to-end development of web applications using modern technologies like React, Node.js, TypeScript and Postgres.', tags: ['Frontend', 'Backend', 'APIs'] },
  { icon: Bot, title: 'AI & LLM Integration', description: 'Integrate LLMs into your product, build custom AI features, RAG pipelines, vector search and capable AI agents.', tags: ['LLM Integration', 'RAG', 'AI Agents'] },
  { icon: Cloud, title: 'System Design & Architecture', description: 'Design scalable, reliable and cost-effective systems. Get help with architecture decisions, infrastructure and scaling plans.', tags: ['System Design', 'Architecture', 'Scaling'] },
  { icon: Blocks, title: 'DevOps & Deployment', description: 'Set up CI/CD, cloud infrastructure, Docker, Kubernetes and monitoring. Get your product deployed and running smoothly.', tags: ['Docker', 'Kubernetes', 'CI/CD'] },
  { icon: BriefcaseBusiness, title: 'Fractional CTO & Technical Consulting', description: 'Hands-on technical leadership for growing teams: product strategy, architecture, hiring, delivery systems and engineering direction.', tags: ['Tech Strategy', 'Team Building', 'Roadmaps'] },
] as const

const process = [
  { icon: MessageSquare, title: '1. Discuss', description: 'We discuss your idea, goals and requirements.' },
  { icon: FileText, title: '2. Plan', description: 'I create a plan with scope, timeline and approach.' },
  { icon: Code2, title: '3. Build', description: 'We build in iterations with regular updates.' },
  { icon: Rocket, title: '4. Launch', description: 'We deploy and ensure everything is running smoothly.' },
] as const

const questions = [
  ['Do you work with early-stage founders?', 'Yes. I can help shape an early idea, define the first useful version and build it through launch.'],
  ['What is your typical engagement model?', 'I work on focused projects, ongoing retainers and fractional CTO engagements based on the needs of your team.'],
  ['How much do you charge?', 'Pricing depends on scope, timeline and engagement type. Send me a short project brief and I’ll suggest the clearest option.'],
  ['Can you work on an existing codebase?', 'Yes. I can audit, stabilize and extend an existing product or lead larger architecture and delivery improvements.'],
  ['Do you offer ongoing support?', 'Yes. Ongoing engineering support and fractional technical leadership are available after launch.'],
] as const

export default async function ServicesPage() {
  const links = await getSiteLinks()
  const contactHref = `mailto:${links.email}?subject=Let’s work together`

  const structuredData = {
    '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'Tushar Sharma — Product Engineering & Fractional CTO',
    url: 'https://www.tusharsharma.me/services', email: links.email,
    description: 'Fractional CTO, product engineering, AI integration, system architecture and software development services.',
    areaServed: 'Worldwide',
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Engineering services', itemListElement: services.map(({ title, description }) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: title, description } })) },
  }

  return <main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Services</p>
          <h1>From ideas to<br/><span>working products</span></h1>
          <p className={styles.heroText}>I help founders, creators and small teams build, ship and grow software products. From idea to architecture to deployment, I can work end to end or plug in at any stage.</p>
          <div className={styles.heroActions}><a className={styles.primaryButton} href={contactHref}>Work with me <ArrowRight /></a><a className={styles.secondaryButton} href="#process">View process</a></div>
          <div className={styles.heroBenefits}>
            <div><Zap /><span><b>Fast iteration</b><small>From idea to MVP quickly</small></span></div>
            <div><Box /><span><b>End-to-end support</b><small>Product, design, development</small></span></div>
            <div><Users /><span><b>Flexible engagement</b><small>Project based or ongoing</small></span></div>
          </div>
        </div>
        <div className={styles.pipeline} aria-label="Idea to product delivery process">
          <p className={styles.ideaNote}>You bring<br/>the idea.</p>
          <div className={styles.pipelineCards}><div><Lightbulb /><span>Idea</span></div><div><FileText /><span>Design &amp; Plan</span></div><div><Code2 /><span>Build</span></div><div><Cloud /><span>Deploy</span></div><div><Layers3 /><span>Iterate &amp; Grow</span></div></div>
          <p className={styles.shipNote}>I help you<br/>ship it.</p>
        </div>
      </div>
    </section>

    <section className={styles.servicesSection}>
      <div className={styles.sectionHeading}>
        <div><p className={styles.eyebrow}>What I offer</p><h2>Services</h2><p>Practical, production-ready solutions tailored to your needs.</p></div>
        <div className={styles.headingCta}><span><b>Not sure what you need?</b><small>Let’s discuss your idea and find the best way forward.</small></span><a href={contactHref}>Get in touch <ArrowRight /></a></div>
      </div>
      <div className={styles.serviceGrid}>{services.map(({ icon: Icon, title, description, tags }) => <article className={styles.serviceCard} id={title.startsWith('Fractional') ? 'fractional-cto' : undefined} key={title}><div className={styles.cardTop}><span><Icon /></span><ArrowRight /></div><h3>{title}</h3><p>{description}</p><div className={styles.tags}>{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div>
    </section>

    <section className={styles.process} id="process">
      <p className={styles.eyebrow}>Simple and transparent</p><h2>How we work</h2><p className={styles.processLead}>A clear, straightforward process from start to finish.</p>
      <div className={styles.processSteps}>{process.map(({ icon: Icon, title, description }, index) => <article key={title}><span className={styles.processIcon}><Icon /></span><div><h3>{title}</h3><p>{description}</p></div>{index < process.length - 1 && <i aria-hidden />}</article>)}</div>
    </section>

    <section className={styles.bottomGrid}>
      <div className={styles.contactCard}><p className={styles.eyebrow}>Have a project in mind?</p><h2>Let’s build something<br/>together.</h2><p>Whether you have a clear idea or just want to explore possibilities, I’d love to hear from you.</p><a className={styles.primaryButton} href={contactHref}>Get in touch <ArrowRight /></a></div>
      <div className={styles.faq}><p className={styles.eyebrow}>FAQ</p><h2>Common questions</h2><div>{questions.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div>
    </section>

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
  </main>
}
