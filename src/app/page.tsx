import App from '../App'
import { getSiteLinks, listPosts } from '../lib/posts'

export const revalidate = 300

export default async function Home() {
  const [posts, siteLinks] = await Promise.all([listPosts(), getSiteLinks()])
  const dispatches = posts.slice(0, 4).map((post) => ({
    title: post.title,
    date: new Date(post.publishedAt || post.updatedAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }),
    href: `/blog/${post.slug}`,
  }))

  return <App latestDispatches={dispatches} siteLinks={siteLinks} />
}
