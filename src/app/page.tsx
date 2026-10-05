import { Suspense } from 'react'
import App from '../App'
import { AppSkeleton } from '../components/AppSkeleton'
import { getSiteLinks, listPosts } from '../lib/posts'

export const revalidate = 300

const profileStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': 'https://www.tusharsharma.me/#profile',
  url: 'https://www.tusharsharma.me',
  name: 'Tushar Sharma',
  isPartOf: { '@id': 'https://www.tusharsharma.me/#website' },
  mainEntity: { '@id': 'https://www.tusharsharma.me/#person' },
}

async function HomeContent() {
  const [posts, siteLinks] = await Promise.all([listPosts(), getSiteLinks()])
  const dispatches = posts.slice(0, 4).map((post) => ({
    title: post.title,
    date: new Date(post.publishedAt || post.updatedAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }),
    href: `/blog/${post.slug}`,
    coverImage: post.coverImage,
  }))

  return <App latestDispatches={dispatches} siteLinks={siteLinks} />
}

export default function Home() {
  return <>
    <Suspense fallback={<AppSkeleton />}><HomeContent /></Suspense>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileStructuredData).replace(/</g, '\\u003c') }} />
  </>
}
