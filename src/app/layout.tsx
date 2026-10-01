import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import '../index.css'
import { getSiteLinks, type SiteLinks } from '../lib/posts'
import { SiteLayout } from '../components/SiteLayout'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tusharsharma.me'),
  title: 'Tushar Sharma | Software Engineer, Builder, Problem Solver',
  description: 'Premium personal website for Tushar Sharma, a software engineer focused on scalable web systems, product building, and AI exploration.',
  keywords: ['Tushar Sharma', 'software engineer', 'TypeScript', 'JavaScript', 'React', 'Node.js', 'AI', 'ML', 'product builder', 'Indore'],
  authors: [{ name: 'Tushar Sharma' }],
  creator: 'Tushar Sharma',
  publisher: 'Tushar Sharma',
  category: 'technology',
  icons: {
    icon: [
      { url: '/favicon-512.png?v=2', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: [{ url: '/favicon-512.png?v=2', sizes: '512x512', type: 'image/png' }],
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
    images: [{ url: '/logo.png', width: 1254, height: 1254, alt: 'Tushar Sharma logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tushar Sharma | Software Engineer. Builder. Problem Solver.',
    description: 'Software engineer, product builder, and problem solver focused on modern web systems and AI exploration.',
    images: ['/logo.png'],
  },
}

export const viewport: Viewport = { themeColor: '#ffffff' }

function profileStructuredData(links: SiteLinks) {
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
      '@type': 'ProfilePage',
      '@id': 'https://www.tusharsharma.me/#profile',
      url: 'https://www.tusharsharma.me',
      name: 'Tushar Sharma',
      isPartOf: { '@id': 'https://www.tusharsharma.me/#website' },
      mainEntity: { '@id': 'https://www.tusharsharma.me/#person' },
    },
    {
      '@type': 'Person',
      '@id': 'https://www.tusharsharma.me/#person',
      name: 'Tushar Sharma',
      url: 'https://www.tusharsharma.me',
      image: {
        '@type': 'ImageObject',
        url: 'https://www.tusharsharma.me/logo.png',
        width: 1254,
        height: 1254,
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

async function ProfileStructuredData() {
  const siteLinks = await getSiteLinks()
  return <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(profileStructuredData(siteLinks)).replace(/</g, '\\u003c') }}
  />
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteLayout>{children}</SiteLayout>
        <Suspense fallback={null}><ProfileStructuredData /></Suspense>
      </body>
    </html>
  )
}
