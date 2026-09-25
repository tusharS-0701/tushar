import type { Metadata, Viewport } from 'next'
import '../index.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://tushar.me'),
  title: 'Tushar Sharma | Software Engineer, Builder, Problem Solver',
  description: 'Premium personal website for Tushar Sharma, a software engineer focused on scalable web systems, product building, and AI exploration.',
  keywords: ['Tushar Sharma', 'software engineer', 'TypeScript', 'JavaScript', 'React', 'Node.js', 'AI', 'ML', 'product builder', 'Indore'],
  authors: [{ name: 'Tushar Sharma' }],
  robots: 'index, follow',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: 'Tushar Sharma | Software Engineer. Builder. Problem Solver.',
    description: '4+ years of experience shipping software, building products, and turning ideas into scalable systems.',
    url: 'https://tushar.me',
    siteName: 'Tushar Sharma',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tushar Sharma | Software Engineer. Builder. Problem Solver.',
    description: 'Software engineer, product builder, and problem solver focused on modern web systems and AI exploration.',
  },
}

export const viewport: Viewport = { themeColor: '#ffffff' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
