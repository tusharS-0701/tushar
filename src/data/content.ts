export type NavItem = {
  href: string
  label: string
}

export type SocialLink = {
  label: string
  href: string
  icon: 'linkedin' | 'github' | 'instagram' | 'mail'
}

export type Project = {
  title: string
  icon: 'box' | 'terminal' | 'shirt'
  description: string
  href: string
}

export type Dispatch = {
  title: string
  date: string
  href?: string
}

const currentYear = new Date().getFullYear()

export const siteMeta = {
  name: 'Tushar Sharma',
  location: 'Indore, India',
  domain: 'tushar.me',
  tagline: 'Engineer • Builder • Learner',
  volume: 'Vol. I',
  issue: 'No. 01',
  foundingYear: 2001,
  currentYear,
  email: 'tusharsharma123456.k20@gmail.com',
  resumeUrl: 'https://drive.google.com/file/d/1R-MtU9szsqtFahJBXpDOCMfY3szmDOHb/view?usp=drive_link',
}

export const navItems: NavItem[] = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '/blog', label: 'Journal' },
  { href: '/projects', label: 'Projects' },
  { href: '#notes', label: 'Notes' },
  { href: '/products', label: 'Products' },
  { href: '#contact', label: 'Contact' },
]

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tusharsharma0711/', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/side-quest2001', icon: 'github' },
  { label: 'Instagram', href: 'https://www.instagram.com/tushar07.sh/?hl=en', icon: 'instagram' },
  { label: 'Email', href: `mailto:${siteMeta.email}`, icon: 'mail' },
]

const GITHUB_PROFILE = 'https://github.com/side-quest2001'

export const projects: Project[] = [
  {
    title: 'Distribution',
    icon: 'box',
    description:
      'Learning and mastering organic distribution using content, community and consistency.',
    href: GITHUB_PROFILE,
  },
  {
    title: 'Movie Chat RAG',
    icon: 'terminal',
    description: 'A RAG based chatbot that helps you explore movies using Wikipedia, TMDB and AI.',
    href: GITHUB_PROFILE,
  },
  {
    title: 'Virtual Try-On',
    icon: 'shirt',
    description: 'AI powered virtual try-on engine for apparel brands. No photoshoots, just results.',
    href: GITHUB_PROFILE,
  },
]

export const dispatches: Dispatch[] = [
  { title: 'What I learned about Kafka partitions today', date: 'May 17' },
  { title: 'Debugging is like being a detective', date: 'May 15' },
  { title: 'My thoughts on building in public', date: 'May 13' },
  { title: 'System design: Thinking in layers', date: 'May 10' },
]

export const headlines: string[] = [
  'The Internet is noisy. Build something valuable.',
  'Great products solve real problems.',
  'Code is easy. Building is hard.',
  "Don't just learn. Implement.",
  'Ship small. Ship fast. Ship often.',
]

export const books: string[] = [
  'Designing Data-Intensive Applications',
  'System Design Interview — An Insider’s Guide',
  'Clean Code',
  'The Pragmatic Programmer',
  'Atomic Habits',
]

export const nowFocus: string[] = ['Distributed Systems', 'AI & LLMs', 'Product & Growth']

export const dailyNote = {
  lede: 'A reflection posted daily about building, learning and life.',
  body: 'I believe in shipping, sharing and improving. This space is my digital newspaper where I document my journey of becoming a better engineer and builder.',
  signoff: 'Tushar',
}

export const nowPanel = {
  body: 'Coding by day, learning distributed systems, building AI products and figuring out distribution in public.',
  focusLabel: 'Currently exploring:',
}

export const heroAbout = {
  headline: 'Building the Future, One Line of Code at a Time',
  bodyOne:
    "I'm Tushar Sharma, a software engineer and builder from India. I enjoy turning ideas into products, solving real problems and sharing everything I learn along the way.",
  bodyTwo:
    'This website is my personal newspaper — thoughts, projects, experiments and lessons from the journey.',
}

export const distributionExperiment = {
  eyebrow: 'Distribution',
  title: 'My Ongoing Experiment',
  subhead: 'Learning organic distribution in public',
  body: "Distribution is my current meta-project. I'm learning how to build audience and growth organically using LinkedIn and Instagram. This website is part of that experiment.",
}

export const deskNote = {
  body: "I started this journey with curiosity and a simple goal — become 1% better every day. Technology changes fast, but fundamentals, consistency and courage stay the same. I write, build and share to create impact and to document a life well lived.",
  signature: 'Tushar Sharma',
}

export const footerContent = {
  editorial:
    'This is a personal publication by Tushar Sharma. All articles are original and written in public.',
  sections: ['Journal', 'Projects', 'Notes', 'Products'],
  quote: {
    text: 'The best way to predict the future is to build it.',
    author: 'Alan Kay',
  },
}

export function recentMonths(count: number): string[] {
  const now = new Date()
  return Array.from({ length: count }, (_, index) => {
    const d = new Date(now.getFullYear(), now.getMonth() - index, 1)
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  })
}
