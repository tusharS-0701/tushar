import {
  type ReactNode,
  useState,
} from 'react'
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from 'framer-motion'

type NavItem = {
  href: string
  label: string
  icon: ReactNode
}

type ExpertiseCard = {
  title: string
  items: string[]
  description: string
}

const navItems: NavItem[] = [
  { href: '#about', label: 'About', icon: <ProfileIcon /> },
  { href: '#expertise', label: 'Expertise', icon: <GridIcon /> },
  { href: '#philosophy', label: 'Philosophy', icon: <SparkIcon /> },
  { href: '#contact', label: 'Contact', icon: <MailIcon /> },
]

const expertiseCards: ExpertiseCard[] = [
  {
    title: 'Frontend Engineering',
    items: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
    description:
      'Thoughtful user interfaces built for clarity, performance, and long-term maintainability.',
  },
  {
    title: 'Backend Engineering',
    items: ['Node.js', 'Express', 'APIs', 'PostgreSQL'],
    description:
      'Reliable application backends and data layers designed to scale with product complexity.',
  },
  {
    title: 'Platform & DevOps',
    items: ['Docker', 'CI/CD', 'Cloud Deployments'],
    description:
      'Pragmatic delivery systems that keep shipping smooth, repeatable, and production-ready.',
  },
  {
    title: 'AI & Experimentation',
    items: ['Python', 'Machine Learning', 'AI Products'],
    description:
      'Hands-on exploration of intelligent products, prototyping workflows, and applied AI systems.',
  },
]

const contactLinks = [
  {
    label: 'Business Inquiries',
    href: 'mailto:tusharsharma.workspace@gmail.com',
    value: 'tusharsharma.workspace@gmail.com',
  },
  {
    label: 'Job Opportunities',
    href: 'mailto:tusharsharma.interviews@gmail.com',
    value: 'tusharsharma.interviews@gmail.com',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/side-quest2001',
    value: 'github.com/side-quest2001',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tushar-sharma-two001/',
    value: 'linkedin.com/in/tushar-sharma-two001',
  },
]

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen overflow-x-clip bg-[var(--color-bg)] text-white">
        <BackgroundGlow />
        <SkipLink />
        <Navbar />
        <main id="content" className="relative z-10 pb-28 lg:pb-0">
          <HeroSection />
          <AboutSection />
          <ExpertiseSection />
          <PhilosophySection />
          <ContactSection />
        </main>
        <Footer />
        <BottomNav />
      </div>
    </LazyMotion>
  )
}

function SkipLink() {
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
    >
      Skip to content
    </a>
  )
}

function BackgroundGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.12),_rgba(255,255,255,0)_68%)] blur-3xl" />
      <div className="absolute left-[-8rem] top-[20rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(93,113,255,0.14),_rgba(93,113,255,0)_70%)] blur-3xl" />
      <div className="absolute right-[-10rem] top-[8rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_rgba(86,255,193,0.10),_rgba(86,255,193,0)_70%)] blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(255,255,255,0.03),_transparent_18%,_transparent_82%,_rgba(255,255,255,0.03))]" />
    </div>
  )
}

function Navbar() {
  return (
    <header className="sticky top-0 z-40 hidden px-3 pt-3 sm:px-6 sm:pt-4 lg:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-white/[0.06] px-3 py-2.5 backdrop-blur-xl min-[360px]:px-4 sm:px-6 sm:py-3">
        <a
          href="#top"
          className="text-[0.68rem] font-semibold tracking-[0.18em] text-white transition hover:text-white/80 min-[360px]:text-xs min-[360px]:tracking-[0.22em] sm:text-sm sm:tracking-[0.24em]"
        >
          TUSHAR
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/[0.64] transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="mailto:tusharsharma.workspace@gmail.com"
          className="hidden rounded-full border border-white/12 bg-white px-4 py-2 text-xs font-semibold text-black transition hover:scale-[1.01] hover:bg-white/[0.9] min-[360px]:inline-flex sm:text-sm lg:px-5"
        >
          Let&apos;s Talk
        </a>
      </div>
    </header>
  )
}

function BottomNav() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 lg:hidden">
      <nav
        aria-label="Bottom navigation"
        className="mx-auto grid max-w-2xl grid-cols-4 items-stretch gap-1 rounded-[1.75rem] border border-white/10 bg-black/[0.8] p-2 shadow-[0_18px_60px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className="group relative flex min-h-14 w-full min-w-0 items-center justify-center rounded-[1.2rem] px-1.5 py-2 text-center text-[0.62rem] font-medium uppercase tracking-[0.1em] text-white/[0.68] transition hover:bg-white/[0.06] hover:text-white min-[360px]:px-2 min-[360px]:text-[0.68rem]"
          >
            <span className="text-white/[0.82]">{item.icon}</span>
            <span className="sr-only">{item.label}</span>
            <span className="pointer-events-none absolute bottom-full mb-2 rounded-full border border-white/10 bg-black/[0.92] px-2.5 py-1 text-[0.62rem] font-medium normal-case tracking-normal text-white opacity-0 shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </div>
  )
}

function HeroSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <Section id="top" className="pt-8 sm:pt-16 lg:pt-20">
      <div className="grid items-center gap-10 min-[380px]:gap-12 sm:gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
        <div>
          <Reveal>
            <Pill>Available for meaningful work</Pill>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 max-w-4xl text-balance text-[1.95rem] font-semibold leading-[1] tracking-[-0.07em] text-white min-[360px]:text-[2.15rem] min-[380px]:text-[2.5rem] sm:mt-6 sm:text-[4.2rem] sm:leading-[0.92] lg:text-[5.6rem]">
              Tushar Sharma
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-3xl text-[1rem] font-medium tracking-[-0.03em] text-white/[0.9] min-[360px]:text-[1.06rem] min-[380px]:text-xl sm:mt-6 sm:text-2xl">
              Software Engineer. Builder. Problem Solver.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-2xl text-[0.9rem] leading-6.5 text-white/[0.62] min-[360px]:text-[0.95rem] min-[360px]:leading-7 sm:mt-6 sm:text-lg sm:leading-8">
              4+ years of experience shipping software, building products, and turning ideas
              into scalable systems. Focused on JavaScript, TypeScript, modern web
              technologies, and exploring AI/ML.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-4">
              <PrimaryButton href="#contact">Let&apos;s Work Together</PrimaryButton>
              <SecondaryButton href="#expertise">View My Work</SecondaryButton>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <ul className="mt-6 flex flex-col gap-2 text-sm text-white/[0.72] min-[360px]:mt-7 min-[360px]:gap-2.5 min-[420px]:flex-row min-[420px]:flex-wrap sm:mt-10 sm:gap-3">
              <MetaChip icon={<PinIcon />}>Indore, India</MetaChip>
              <MetaChip href="https://github.com/side-quest2001" icon={<GitHubIcon />}>
                GitHub
              </MetaChip>
              <MetaChip
                href="https://www.linkedin.com/in/tushar-sharma-two001/"
                icon={<LinkedInIcon />}
              >
                LinkedIn
              </MetaChip>
            </ul>
          </Reveal>
        </div>

        <Reveal
          delay={prefersReducedMotion ? 0 : 0.15}
          className="justify-self-center lg:justify-self-end"
        >
          <PortraitCard />
        </Reveal>
      </div>
    </Section>
  )
}

function AboutSection() {
  return (
    <Section id="about" className="pt-8 sm:pt-10">
      <SectionHeading
        eyebrow="About"
        title="Engineering with product instincts."
        description="I care about the craft of software, but also about whether what we build actually matters."
      />
      <div className="grid gap-5 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassPanel>
          <p className="text-lg leading-8 text-white/[0.68]">
            I am a software engineer with 4+ years of experience building and shipping
            software across the modern web stack. My primary focus is JavaScript and
            TypeScript ecosystems, building scalable applications, developer tools, and
            product experiences.
          </p>
        </GlassPanel>
        <GlassPanel>
          <p className="text-lg leading-8 text-white/[0.68]">
            Beyond software engineering, I actively explore machine learning and AI using
            Python. I enjoy building products, validating ideas, and solving real-world
            problems through technology.
          </p>
        </GlassPanel>
      </div>
    </Section>
  )
}

function ExpertiseSection() {
  return (
    <Section id="expertise">
      <SectionHeading
        eyebrow="Expertise"
        title="Built across the stack, with taste for product."
        description="A blend of engineering depth, delivery discipline, and curiosity for what comes next."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {expertiseCards.map((card, index) => (
          <Reveal key={card.title} delay={index * 0.06}>
            <GlassPanel className="h-full">
              <div className="flex flex-col items-start justify-between gap-3 min-[360px]:flex-row min-[360px]:items-start">
                <h3 className="text-xl font-semibold tracking-[-0.04em] text-white sm:text-2xl">
                  {card.title}
                </h3>
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/[0.44]">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/[0.58]">
                {card.description}
              </p>
              <ul className="mt-8 flex flex-wrap gap-3">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/[0.72]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function PhilosophySection() {
  return (
    <Section id="philosophy">
      <SectionHeading
        eyebrow="Philosophy"
        title="Build Things That Matter"
        description="A simple point of view on what good software should do."
      />
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-12">
          <div
            aria-hidden="true"
            className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.45),transparent)]"
          />
          <p className="max-w-4xl text-xl font-medium leading-[1.55] tracking-[-0.03em] text-white/[0.86] min-[380px]:text-2xl sm:text-[2rem]">
            I believe software should solve real problems, create meaningful impact,
            and remain simple enough to evolve over time. My focus is on building
            products that people genuinely find useful.
          </p>
        </div>
      </Reveal>
    </Section>
  )
}

function ContactSection() {
  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Let&apos;s Build Something Together"
        description="For product ideas, engineering collaboration, or the right next opportunity."
      />
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <GlassPanel className="h-full">
            <div className="space-y-5">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group flex flex-col items-start justify-between gap-4 rounded-[1.25rem] border border-white/[0.08] bg-black/[0.2] px-4 py-4 transition hover:border-white/[0.16] hover:bg-white/[0.03] min-[420px]:flex-row min-[420px]:items-center min-[420px]:gap-6 sm:px-5"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/[0.42]">
                      {item.label}
                    </p>
                    <p className="mt-2 break-all text-sm text-white/[0.78] sm:text-base">
                      {item.value}
                    </p>
                  </div>
                  <ArrowUpRightIcon className="h-5 w-5 shrink-0 text-white/[0.42] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/[0.8]" />
                </a>
              ))}
            </div>
          </GlassPanel>
        </Reveal>

        <Reveal delay={0.08}>
          <GlassPanel className="h-full">
            <div className="flex h-full flex-col justify-between">
              <div>
                <Pill>Based in Indore, India</Pill>
                <h3 className="mt-6 max-w-md text-[1.75rem] font-semibold tracking-[-0.05em] text-white sm:text-3xl">
                  Open to building products, platforms, and ambitious new ideas.
                </h3>
                <p className="mt-4 max-w-lg text-base leading-7 text-white/[0.6]">
                  If you&apos;re looking for someone who can think through product,
                  architecture, and execution with equal seriousness, let&apos;s connect.
                </p>
              </div>

              <div className="mt-10">
                <SecondaryButton href="mailto:tusharsharma.workspace@gmail.com">
                  Start a Conversation
                </SecondaryButton>
              </div>
            </div>
          </GlassPanel>
        </Reveal>
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="relative z-10 px-3 pb-28 pt-4 sm:px-6 sm:pb-10 lg:pb-10">
      <div className="mx-auto max-w-6xl border-t border-white/[0.08] pt-6 text-center text-sm text-white/[0.38]">
        Tushar Sharma © 2026
      </div>
    </footer>
  )
}

function PortraitCard() {
  const [imageError, setImageError] = useState(false)
  const portraitSrc = '/tushar-portrait.jpg'

  return (
    <div className="relative isolate w-full max-w-[26rem]">
      <div
        aria-hidden="true"
        className="absolute inset-0 scale-[0.96] rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_rgba(255,255,255,0)_58%)] blur-2xl"
      />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.05] p-2.5 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-3">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.2rem] border border-white/8 bg-[linear-gradient(160deg,rgba(255,255,255,0.10),rgba(255,255,255,0.02))] sm:rounded-[1.4rem]">
          {!imageError ? (
            <img
              src={portraitSrc}
              alt="Portrait of Tushar Sharma"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full items-end justify-between bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.08))] p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/[0.45]">
                  Portrait ready
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-white">
                  Add `/public/tushar-portrait.jpg`
                </p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/12 bg-black/[0.3] text-2xl font-semibold text-white">
                TS
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <Reveal className="mb-10 sm:mb-12">
      <div className="max-w-3xl">
        <Pill>{eyebrow}</Pill>
        <h2 className="mt-4 text-balance text-[1.8rem] font-semibold tracking-[-0.06em] text-white min-[360px]:text-[1.95rem] min-[380px]:text-[2.25rem] sm:mt-5 sm:text-[3.4rem]">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-white/[0.58] sm:mt-4 sm:text-lg sm:leading-8">
          {description}
        </p>
      </div>
    </Reveal>
  )
}

function Section({
  id,
  children,
  className = '',
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`px-3 py-12 sm:px-6 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <m.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </m.div>
  )
}

function GlassPanel({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8 ${className}`}
    >
      {children}
    </div>
  )
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex max-w-full rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-white/[0.52] min-[360px]:px-4 min-[360px]:py-2 min-[360px]:text-xs min-[360px]:tracking-[0.2em] sm:tracking-[0.24em]">
      {children}
    </span>
  )
}

function PrimaryButton({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      className="inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-black transition duration-200 hover:scale-[1.01] hover:bg-white/[0.92] sm:w-auto sm:px-6 sm:py-3.5"
    >
      {children}
    </a>
  )
}

function SecondaryButton({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  const external = href.startsWith('http') || href.startsWith('mailto:')

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:border-white/[0.18] hover:bg-white/[0.08] sm:w-auto sm:px-6 sm:py-3.5"
    >
      {children}
    </a>
  )
}

function MetaChip({
  children,
  icon,
  href,
}: {
  children: ReactNode
  icon: ReactNode
  href?: string
}) {
  const className =
    'inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[0.78rem] transition hover:border-white/[0.16] hover:bg-white/[0.07] min-[420px]:w-auto sm:px-4 sm:text-sm'

  if (href) {
    return (
      <li>
        <a href={href} target="_blank" rel="noreferrer" className={className}>
          <span className="text-white/[0.42]">{icon}</span>
          <span>{children}</span>
        </a>
      </li>
    )
  }

  return (
    <li className={className}>
      <span className="text-white/[0.42]">{icon}</span>
      <span>{children}</span>
    </li>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current">
      <path
        d="M12 21s6-4.8 6-11a6 6 0 1 0-12 0c0 6.2 6 11 6 11Z"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="10" r="2.5" strokeWidth="1.5" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current">
      <path
        d="M9 19c-4 .9-4-2-6-2m12 4v-3.5a3.04 3.04 0 0 0-.9-2.36c3-.34 6.15-1.48 6.15-6.64A5.16 5.16 0 0 0 19 4.77 4.8 4.8 0 0 0 18.91 1S17.73.65 15 2.48a13.3 13.3 0 0 0-6 0C6.27.65 5.09 1 5.09 1A4.8 4.8 0 0 0 5 4.77a5.16 5.16 0 0 0-1.25 3.68c0 5.12 3.15 6.3 6.15 6.64A3.04 3.04 0 0 0 9 17.5V21"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current">
      <path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 1 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 9h4v12H2Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="4" cy="4" r="2" strokeWidth="1.5" />
    </svg>
  )
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M7 17 17 7M9 7h8v8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem] fill-none stroke-current">
      <circle cx="12" cy="8" r="3.5" strokeWidth="1.5" />
      <path
        d="M5 19c1.8-3.1 4.3-4.5 7-4.5s5.2 1.4 7 4.5"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem] fill-none stroke-current">
      <rect x="4" y="4" width="6" height="6" rx="1.5" strokeWidth="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" strokeWidth="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" strokeWidth="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" strokeWidth="1.5" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem] fill-none stroke-current">
      <path
        d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem] fill-none stroke-current">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" strokeWidth="1.5" />
      <path
        d="m5.5 7.5 6.5 5 6.5-5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default App
