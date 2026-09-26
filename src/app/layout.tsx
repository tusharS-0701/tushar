import type { Metadata, Viewport } from 'next'
import '../index.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://tushar.me'),
  title: 'Tushar Sharma | Software Engineer, Builder, Problem Solver',
  description: 'Premium personal website for Tushar Sharma, a software engineer focused on scalable web systems, product building, and AI exploration.',
  keywords: ['Tushar Sharma', 'software engineer', 'TypeScript', 'JavaScript', 'React', 'Node.js', 'AI', 'ML', 'product builder', 'Indore'],
  authors: [{ name: 'Tushar Sharma' }],
  icons: {
    icon: [{ url: '/logo.svg', type: 'image/svg+xml' }],
    shortcut: '/logo.svg',
  },
  manifest: '/manifest.webmanifest',
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

const profileStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': 'https://tushar.me/#profile',
  url: 'https://tushar.me',
  name: 'Tushar Sharma',
  mainEntity: {
    '@type': 'Person',
    '@id': 'https://tushar.me/#person',
    name: 'Tushar Sharma',
    url: 'https://tushar.me',
    image: {
      '@type': 'ImageObject',
      url: 'https://tushar.me/logo.svg',
      width: 512,
      height: 512,
    },
    sameAs: [
      'https://www.linkedin.com/in/tusharsharma0711/',
      'https://github.com/side-quest2001',
      'https://www.instagram.com/tushar07.sh/',
    ],
    jobTitle: 'Software Engineer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Indore',
      addressCountry: 'IN',
    },
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileStructuredData).replace(/</g, '\\u003c') }}
        />
      </body>
    </html>
  )
}
