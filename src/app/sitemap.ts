import type { MetadataRoute } from 'next'
import { listPosts } from '../lib/posts'

export const revalidate = 300

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPosts()
  return [
    { url: 'https://tushar.me', changeFrequency: 'monthly', priority: 1 },
    { url: 'https://tushar.me/about', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://tushar.me/blog', changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://tushar.me/projects', changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://tushar.me/now', changeFrequency: 'monthly', priority: 0.7 },
    ...posts.map((post) => ({ url: `https://tushar.me/blog/${post.slug}`, lastModified: new Date(post.updatedAt), changeFrequency: 'monthly' as const, priority: 0.7 })),
  ]
}
