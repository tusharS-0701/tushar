import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import '../index.css'
import { getSiteLinks, type SiteLinks } from '../lib/posts'
import { SiteLayout } from '../components/SiteLayout'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tusharsharma.me'),
  title: 'Tushar Sharma | Software Engineer, Builder, Problem Solver',
  description: 'Tushar Sharma is a software engineer, builder, and writer exploring scalable systems, AI, and product development.',
  keywords: ['Tushar Sharma', 'software engineer', 'TypeScript', 'JavaScript', 'React', 'Node.js', 'AI', 'ML', 'product builder', 'Indore'],
  authors: [{ name: 'Tushar Sharma' }],
  creator: 'Tushar Sharma',
  publisher: 'Tushar Sharma',
  category: 'technology',
  icons: {
    icon: [
      { url: '/favicon.png?v=4', type: 'image/png', sizes: '48x48' },
    ],
    shortcut: '/favicon.png?v=4',
    apple: [{ url: '/apple-touch-icon.png?v=4', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: 'Tushar Sharma | Software Engineer. Builder. Problem Solver.',
    description: '4+ years of experience shipping software, building products, and turning ideas into scalable systems.',
    url: 'https://www.tusharsharma.me',
    siteName: 'Tushar Sharma',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Tushar Sharma logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tushar Sharma | Software Engineer. Builder. Problem Solver.',
    description: 'Software engineer, product builder, and problem solver focused on modern web systems and AI exploration.',
    images: ['/logo.png'],
  },
}

export const viewport: Viewport = { themeColor: '#ffffff' }

function siteStructuredData(links: SiteLinks) {
  return {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://www.tusharsharma.me/#website',
      url: 'https://www.tusharsharma.me',
      name: 'Tushar Sharma',
      description: 'Software engineer, product builder and fractional CTO.',
      inLanguage: 'en',
    },
    {
      '@type': 'Person',
      '@id': 'https://www.tusharsharma.me/#person',
      name: 'Tushar Sharma',
      url: 'https://www.tusharsharma.me',
      image: {
        '@type': 'ImageObject',
        url: 'https://www.tusharsharma.me/logo.png',
        width: 512,
        height: 512,
      },
      sameAs: [links.x, links.linkedin, links.github, links.instagram].filter(Boolean),
      jobTitle: ['Software Engineer', 'Fractional CTO'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Indore',
        addressCountry: 'IN',
      },
    },
  ],
  }
}

async function SiteStructuredData() {
  const siteLinks = await getSiteLinks()
  return <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData(siteLinks)).replace(/</g, '\\u003c') }}
  />
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5030131729255557" crossOrigin="anonymous"></script>
      </head>
      <body>
        <SiteLayout>{children}</SiteLayout>
        <Suspense fallback={null}><SiteStructuredData /></Suspense>
      </body>
    </html>
  )
}
