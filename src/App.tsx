import { type ReactNode, useState } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'

type NavItem = {
  href: string
  label: string
}

type FocusItem = {
  label: string
  value: string
}

type ExpertiseItem = {
  title: string
  description: string
  items: string[]
}

type Fact = {
  label: string
  value: string
}

const navItems: NavItem[] = [
  { href: '#top', label: 'Home' },
  { href: '#writing', label: 'Writing' },
  { href: '#lab', label: 'Lab' },
  { href: '#jobs', label: 'Jobs' },
  { href: '#notes', label: 'Notes' },
  { href: '#about', label: 'About' },
]

const focusItems: FocusItem[] = [
  {
    label: 'Building',
    value: 'Better systems, every day',
  },
  {
    label: 'Exploring',
    value: 'Distributed systems, AI native infrastructure',
  },
  {
    label: 'Reading',
    value: 'High output management',
  },
  {
    label: 'Writing',
    value: 'Thoughts on systems that scale',
  },
]

const expertiseItems: ExpertiseItem[] = [
  {
    title: 'Frontend Engineering',
    description:
      'Thoughtful user interfaces built for clarity, performance, and long-term maintainability.',
    items: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
  },
  {
    title: 'Backend Engineering',
    description:
      'Reliable application backends and data layers designed to scale with product complexity.',
    items: ['Node.js', 'Express', 'APIs', 'PostgreSQL'],
  },
  {
    title: 'Platform & DevOps',
    description:
      'Pragmatic delivery systems that keep shipping smooth, repeatable, and production-ready.',
    items: ['Docker', 'CI/CD', 'Cloud deployments'],
  },
  {
    title: 'AI & Experimentation',
    description:
      'Hands-on exploration of intelligent products, prototyping workflows, and applied AI systems.',
    items: ['Python', 'Machine learning', 'AI products'],
  },
]

const aboutFacts: Fact[] = [
  { label: 'Based', value: 'Indore, India' },
  { label: 'Experience', value: '4+ years shipping software' },
  { label: 'Primary stack', value: 'JavaScript and TypeScript' },
  { label: 'Current lens', value: 'Systems, product, and applied AI' },
]

const headlineLines = [
  'I design, build',
  'and scale systems',
  'for the AI era.',
] as const

const compilerCode = [
  'function addSignals(a, b) {',
  '  return a + b;',
  '}',
  '',
  'const total = addSignals(8, 13);',
  '',
  'console.log({ total });',
] as const

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="app-shell">
        <SkipLink />
        <SiteFrame />
        <Header />
        <main id="content" className="relative z-10">
          <HeroSection />
          <NotesSection />
          <LabSection />
          <WritingSection />
          <AboutSection />
          <JobsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LazyMotion>
  )
}

function SkipLink() {
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-50 focus:rounded-full focus:bg-[var(--color-text)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--color-bg)]"
    >
      Skip to content
    </a>
  )
}

function SiteFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]" />
      <div className="absolute left-[6vw] top-0 hidden h-full w-px bg-white/[0.04] lg:block" />
      <div className="absolute right-[6vw] top-0 hidden h-full w-px bg-white/[0.04] lg:block" />
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-40">
      <div className="header-shell">
        <div className="mx-auto flex w-full max-w-[88rem] items-center justify-between gap-6 px-5 py-5 sm:px-8 lg:px-12">
          <a
            href="#top"
            className="font-mono text-[1.45rem] font-medium tracking-[-0.06em] text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
          >
            ts_
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 text-sm text-[var(--color-muted)] md:flex"
          >
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-subtle)]">
              Founder mode
            </span>
            <span className="status-dot" />
          </div>
        </div>
        <nav
          aria-label="Mobile navigation"
          className="mobile-nav md:hidden"
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link whitespace-nowrap">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <Section id="top" className="pt-8 sm:pt-10 lg:pt-14">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-start">
        <div className="max-w-4xl">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[var(--color-accent)]/70" />
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-subtle)]">
                Tushar Sharma
              </p>
            </div>
          </Reveal>

          <m.h1
            className="mt-8 max-w-5xl text-balance text-[3.2rem] font-medium leading-[0.96] tracking-[-0.08em] text-[var(--color-text)] sm:text-[4.5rem] lg:text-[6.4rem]"
            initial="hidden"
            animate="visible"
            variants={headlineVariants}
          >
            {headlineLines.map((line) => (
              <m.span key={line} className="block overflow-hidden pb-2" variants={headlineLineVariants}>
                <m.span className="block" variants={headlineTextVariants}>
                  {line.includes('AI') ? (
                    <>
                      {line.split('AI')[0]}
                      <span className="text-[var(--color-accent)]">AI</span>
                      {line.split('AI')[1]}
                    </>
                  ) : (
                    line
                  )}
                </m.span>
              </m.span>
            ))}
          </m.h1>

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-lg text-lg leading-8 text-[var(--color-muted)] sm:text-[1.15rem] sm:leading-9">
              Software, distributed systems, and applied AI brought together with product
              judgment.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a href="#notes" className="inline-flex items-center gap-3 text-base text-[var(--color-text)]">
                <span className="font-mono text-[var(--color-accent)]">&gt;</span>
                <span className="link-underline">Explore the journey</span>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.14} className="lg:pt-10">
          <CompilerPanel />
        </Reveal>
      </div>
    </Section>
  )
}

function CompilerPanel() {
  const prefersReducedMotion = useReducedMotion()
  const [code, setCode] = useState(compilerCode.join('\n'))
  const [output, setOutput] = useState<string>(
    '{\n  "total": 21\n}',
  )
  const lineNumbers = code.split('\n')

  function handleRun() {
    try {
      const logs: string[] = []
      const consoleProxy = {
        log: (...args: unknown[]) => {
          const rendered = args
            .map((arg) =>
              typeof arg === 'string' ? arg : JSON.stringify(arg, null, 2),
            )
            .join(' ')
          logs.push(rendered)
        },
      }

      new Function(
        'console',
        `"use strict";\neval(${JSON.stringify(code)});\n`,
      )(consoleProxy)

      setOutput(
        logs.length > 0
          ? logs.join('\n')
          : 'No console output. Use console.log(...) to print a result.',
      )
    } catch (error) {
      setOutput(error instanceof Error ? error.message : 'Compilation failed.')
    }
  }

  return (
    <aside className="ledger-panel">
      <div className="ledger-panel__top">
        <div className="flex items-center gap-2.5">
          <span className="ledger-dot" />
          <span className="ledger-dot" />
          <span className="ledger-dot" />
        </div>
        <span className="font-mono text-sm text-[var(--color-accent)]">compiler.js</span>
      </div>

      <m.div
        className="space-y-8 p-6 sm:p-8"
        initial={prefersReducedMotion ? undefined : 'hidden'}
        whileInView={prefersReducedMotion ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.4 }}
        variants={panelVariants}
      >
        {focusItems.map((item) => (
          <m.div key={item.label} className="space-y-2.5" variants={panelItemVariants}>
            <p className="font-mono text-[0.96rem] text-[var(--color-accent)]">
              &gt; {item.label.toLowerCase()}
            </p>
            <div className="compiler-window">
              {item.label === 'Building' ? (
                <div className="space-y-4">
                  <div className="compiler-editor-shell">
                    <div aria-hidden="true" className="compiler-gutter">
                      {lineNumbers.map((_, index) => (
                        <span key={index + 1}>{index + 1}</span>
                      ))}
                    </div>
                    <textarea
                      aria-label="Editable compiler code"
                      className="compiler-editor"
                      spellCheck={false}
                      value={code}
                      onChange={(event) => setCode(event.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <button type="button" className="compiler-run" onClick={handleRun}>
                      Run
                    </button>
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                      editable
                    </span>
                  </div>
                  <div className="compiler-output">
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                      output
                    </p>
                    <pre className="mt-3 whitespace-pre-wrap font-mono text-[0.8rem] leading-6 text-[var(--color-text)]/86 sm:text-[0.88rem]">
                      {output}
                    </pre>
                  </div>
                </div>
              ) : (
                <p className="text-[0.98rem] leading-7 text-[var(--color-text)]/88">{item.value}</p>
              )}
            </div>
          </m.div>
        ))}
      </m.div>
    </aside>
  )
}

function NotesSection() {
  return (
    <Section id="notes" className="section-divider">
      <SectionLead
        index="01"
        eyebrow="Notes"
        title="The builder behind the systems."
        description="Software first. Product judgment close behind."
      />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <p className="section-copy">
            I build and ship across the modern web stack, with most of my work centered on
            JavaScript, TypeScript, scalable applications, and developer tooling.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="section-copy">
            Outside that core, I explore AI with Python, validate product ideas, and keep
            chasing useful systems.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}

function LabSection() {
  return (
    <Section id="lab" className="section-divider">
      <SectionLead
        index="02"
        eyebrow="Lab"
        title="A systems-first way of building."
        description="From idea to reliable execution, without losing clarity."
      />
      <div className="space-y-2">
        {expertiseItems.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.05}>
            <article className="capability-row">
              <div className="capability-row__index">{String(index + 1).padStart(2, '0')}</div>
              <div className="capability-row__body">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <h3 className="text-[1.45rem] font-medium tracking-[-0.05em] text-[var(--color-text)] sm:text-[1.8rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-base leading-7 text-[var(--color-muted)] sm:text-[1.02rem]">
                      {item.description}
                    </p>
                  </div>
                  <p className="max-w-md font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-subtle)] sm:text-[0.78rem]">
                    {item.items.join(' / ')}
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function WritingSection() {
  return (
    <Section id="writing" className="section-divider">
      <SectionLead
        index="03"
        eyebrow="Writing"
        title="A point of view worth building from."
        description="Writing is where the operating system becomes visible."
      />
      <Reveal>
        <div className="max-w-5xl">
          <p className="text-balance text-[2rem] font-medium leading-[1.18] tracking-[-0.06em] text-[var(--color-text)] sm:text-[3rem] lg:text-[4.4rem]">
            I believe software should solve real problems, create meaningful impact, and
            remain simple enough to evolve over time.
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
            My focus is on building products that people genuinely find useful.
          </p>
        </div>
      </Reveal>
    </Section>
  )
}

function AboutSection() {
  return (
    <Section id="about" className="section-divider">
      <SectionLead
        index="04"
        eyebrow="About"
        title="Technical depth with product instincts."
        description="Care for craft, but also for whether the thing deserves to exist."
      />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:gap-16">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-[1.35rem] leading-8 tracking-[-0.03em] text-[var(--color-text)] sm:text-[1.65rem] sm:leading-10">
              Open to building products, platforms, and ambitious new ideas.
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--color-muted)] sm:text-[1.02rem]">
              Product, architecture, and execution taken equally seriously.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <dl className="facts-grid">
            {aboutFacts.map((fact) => (
              <div key={fact.label} className="facts-grid__row">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}

function ContactSection() {
  return (
    <Section id="contact" className="section-divider pb-20 sm:pb-24">
      <Reveal>
        <div className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-subtle)]">
            Contact
          </p>
          <p className="mt-8 max-w-2xl text-[1.4rem] leading-8 tracking-[-0.03em] text-[var(--color-text)] sm:text-[2.25rem] sm:leading-[1.3]">
            If you have something important to discuss, reach out here:
          </p>
          <a
            href="mailto:tusharsharma.workspace@gmail.com"
            className="group mt-8 flex max-w-full flex-col items-start gap-3 text-[0.98rem] text-[var(--color-accent)] transition-colors hover:text-[var(--color-text)] min-[360px]:text-[1.06rem] sm:inline-flex sm:max-w-none sm:flex-row sm:items-center sm:gap-4 sm:text-[1.6rem]"
          >
            <span className="link-underline break-all">tusharsharma.workspace@gmail.com</span>
            <ArrowRightIcon className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>
    </Section>
  )
}

function JobsSection() {
  return (
    <Section id="jobs" className="section-divider">
      <SectionLead
        index="05"
        eyebrow="Jobs"
        title="Open roles are coming soon."
        description="Future hiring will live here, once the right problems are ready for the right people."
      />
      <Reveal>
        <div className="jobs-panel">
          <div className="jobs-panel__status">
            <span className="status-dot" />
            <span>Coming soon</span>
          </div>
          <p className="jobs-panel__copy">
            No public openings yet. When the time is right, this section will turn into a
            focused list of roles worth building around.
          </p>
        </div>
      </Reveal>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="relative z-10 mx-auto flex w-full max-w-[88rem] items-center justify-between gap-4 px-5 pb-10 pt-2 text-sm text-[var(--color-subtle)] sm:px-8 lg:px-12">
      <p>Tushar Sharma © 2026</p>
      <p className="font-mono uppercase tracking-[0.2em]">Documenting the journey</p>
    </footer>
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
    <section id={id} className={`px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-[88rem]">{children}</div>
    </section>
  )
}

function SectionLead({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <Reveal className="mb-14 grid gap-6 lg:grid-cols-[11rem_minmax(0,1fr)] lg:items-start">
      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-subtle)]">
          {index}
        </p>
        <div className="h-px w-full max-w-[6rem] bg-white/[0.12]" />
      </div>
      <div className="max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-subtle)]">
          {eyebrow}
        </p>
        <h2 className="mt-5 max-w-4xl text-balance text-[2.2rem] font-medium leading-[1.02] tracking-[-0.07em] text-[var(--color-text)] sm:text-[3.3rem] lg:text-[4.4rem]">
          {title}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-[1.05rem]">
          {description}
        </p>
      </div>
    </Reveal>
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
      className={className}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 28 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
      <path
        d="M5 12h13M13 6l6 6-6 6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const headlineVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
} as const

const headlineLineVariants = {
  hidden: {},
  visible: {},
} as const

const headlineTextVariants = {
  hidden: { opacity: 0, y: '110%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: {
      duration: 0.95,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const

const panelVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
} as const

const panelItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const

export default App
