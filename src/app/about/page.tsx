import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Coffee, MapPin } from 'lucide-react'
import { GithubIcon } from '../../components/icons/Icons'
import { getSiteLinks } from '../../lib/posts'
import styles from './about.module.css'

const description = 'Meet Tushar Sharma, a software engineer and product builder based in Indore, India.'
export const metadata: Metadata = {
  title: 'About | Tushar Sharma', description,
  alternates: { canonical: '/about' },
  openGraph: { title: 'About Tushar Sharma', description, url: '/about', images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Tushar Sharma logo' }] },
  twitter: { card: 'summary_large_image', title: 'About Tushar Sharma', description, images: ['/logo.png'] },
}

const experience = [
  ['2022 — Present', 'Building products', 'Working on independent products, including Pen, while exploring practical applications of AI and distributed systems.'],
  ['2021 — 2022', 'Full stack development', 'Built web applications and freelance projects across product interfaces, APIs, databases, and deployment.'],
  ['2019 — 2021', 'Learning through projects', 'Explored new technologies through side projects and developed a deeper interest in system design and AI.'],
  ['2016 — 2019', 'Started building', 'Discovered programming and the satisfaction of turning an idea into something people can use.'],
] as const

export default async function AboutPage() {
  const links = await getSiteLinks()
  const supportHref = links.support || `mailto:${links.email}?subject=Support your work`

  return <main className={styles.page}>
    <section className={`${styles.hero} ${styles.wrap}`}>
      <div className={styles.portrait}><Image src="/pfp.webp" alt="Tushar Sharma" fill sizes="(max-width: 760px) calc(100vw - 32px), 420px" priority/></div>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>About</p>
        <h1>I’m Tushar Sharma.<span>I build software and share what I learn.</span></h1>
        <p className={styles.lede}>I’m a software engineer and independent builder working at the intersection of practical products, distributed systems, and AI. This is where I document the work and the lessons behind it.</p>
        <div className={styles.heroMeta}><span><MapPin/> Indore, India</span><span>Open to opportunities</span></div>
        <a className={styles.textLink} href={links.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowRight/></a>
      </div>
    </section>

    <section className={`${styles.experience} ${styles.wrap}`}>
      <header><div><p className={styles.eyebrow}>Experience</p><h2>Learning by building.</h2></div><div><p>My path has been shaped by hands-on work: shipping products, learning systems, and improving through each project.</p><a href={links.resume} target="_blank" rel="noreferrer">View résumé <ArrowRight/></a></div></header>
      <div className={styles.timeline}>{experience.map(([period, title, detail], index) => <article key={period}>
        <div className={styles.marker}><span>{String(index + 1).padStart(2, '0')}</span></div>
        <time>{period}</time>
        <div><h3>{title}</h3><p>{detail}</p></div>
      </article>)}</div>
    </section>

    <section className={`${styles.support} ${styles.wrap}`}>
      <a className={styles.githubCard} href={links.github} target="_blank" rel="noreferrer">
        <span className={styles.cardIcon}><GithubIcon/></span><p className={styles.eyebrow}>GitHub</p><h2>My code is public.</h2><p>Explore the products, experiments, and open-source work that show how I approach building.</p><span className={styles.cardLink}>View my GitHub <ArrowRight/></span>
      </a>
      <a className={styles.coffeeCard} href={supportHref} target={links.support ? '_blank' : undefined} rel={links.support ? 'noreferrer' : undefined}>
        <span className={styles.cardIcon}><Coffee/></span><p className={styles.eyebrow}>Support my work</p><h2>Buy me a coffee.</h2><p>If my writing or open-source work has helped you, your support helps me keep creating and sharing.</p><span className={styles.cardLink}>Buy me a coffee <ArrowRight/></span>
      </a>
    </section>
  </main>
}
