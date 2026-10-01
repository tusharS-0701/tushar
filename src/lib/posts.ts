import 'server-only'
import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

export type Post = {
  slug: string
  title: string
  description: string
  body: string
  tags: string[]
  coverImage: string
  coverImageAlt: string
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
  publishedAt: string | null
  category?: BlogCategory
  featured?: boolean
  trending?: boolean
}

export const blogCategories = ['Systems', 'AI & LLMs', 'Product & Growth', 'Building in Public', 'Engineering', 'Life'] as const
export type BlogCategory = typeof blogCategories[number]

export type BlogSettings = {
  sidebarTitle: string
  sidebarDescription: string
  quote: string
  quoteAuthor: string
  heroTitle: string
  heroDescription: string
  newsletterTitle: string
  newsletterDescription: string
}

export const defaultBlogSettings: BlogSettings = {
  sidebarTitle: 'Ideas, learnings and experiments in public.',
  sidebarDescription: 'Notes on software engineering, distributed systems, AI, products and building a meaningful life.',
  quote: 'A collection of thoughts from a curious developer figuring things out.',
  quoteAuthor: 'Tushar',
  heroTitle: 'Better software through clearer thinking.',
  heroDescription: 'Deep dives, practical guides and honest reflections on software engineering, distributed systems, AI and the journey of building in public.',
  newsletterTitle: 'New posts, straight to your inbox.',
  newsletterDescription: 'No spam. Just new articles, notes and interesting finds.',
}

export type SiteLinks = {
  x: string
  instagram: string
  linkedin: string
  github: string
  email: string
  resume: string
  support: string
}

export const defaultSiteLinks: SiteLinks = {
  x: 'https://x.com/mach__07',
  instagram: 'https://www.instagram.com/tushar07.sh/',
  linkedin: 'https://www.linkedin.com/in/tusharsharma0711/',
  github: 'https://github.com/tusharS-0701',
  email: 'tusharsharma123456.k20@gmail.com',
  resume: 'https://drive.google.com/file/d/1R-MtU9szsqtFahJBXpDOCMfY3szmDOHb/view?usp=drive_link',
  support: 'https://buymeacoffee.com/tusharsharma',
}

const collectionName = 'posts'

function envValue(value: string | undefined) {
  if (!value) return undefined
  let normalized = value.trim().replace(/,$/, '').trim()
  if (
    normalized.length >= 2 &&
    ((normalized.startsWith('"') && normalized.endsWith('"')) ||
      (normalized.startsWith("'") && normalized.endsWith("'")))
  ) {
    normalized = normalized.slice(1, -1)
  }
  return normalized
}

function serviceAccount() {
  const projectId = envValue(process.env.FIREBASE_PROJECT_ID)
  const clientEmail = envValue(process.env.FIREBASE_CLIENT_EMAIL)
  const privateKey = envValue(process.env.FIREBASE_PRIVATE_KEY)?.replace(/\\r/g, '').replace(/\\n/g, '\n')
  return { projectId, clientEmail, privateKey }
}

function isMissingDatabase(error: unknown) {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 5
}

function db() {
  if (!getApps().length) {
    const { projectId, clientEmail, privateKey } = serviceAccount()
    if (projectId && clientEmail && privateKey) {
      initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) })
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      initializeApp({ credential: applicationDefault(), projectId })
    } else {
      throw new Error('Configure Firebase service account credentials before using the blog.')
    }
  }
  return getFirestore()
}

export function isDatabaseConfigured() {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) return true
  const { projectId, clientEmail, privateKey } = serviceAccount()
  if (!projectId || !clientEmail || !privateKey || !clientEmail.includes('@')) return false
  return privateKey.includes('-----BEGIN PRIVATE KEY-----') && privateKey.includes('-----END PRIVATE KEY-----')
}

export async function getDatabaseStatus(): Promise<'ready' | 'missing' | 'unconfigured'> {
  if (!isDatabaseConfigured()) return 'unconfigured'
  try {
    await db().collection(collectionName).limit(1).get()
    return 'ready'
  } catch (error) {
    if (isMissingDatabase(error)) return 'missing'
    throw error
  }
}

export function slugify(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)
}

export function validSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) && value.length <= 80
}

async function readPosts(includeDrafts = false): Promise<Post[]> {
  if (!isDatabaseConfigured()) return []
  let snapshot
  try {
    snapshot = await db().collection(collectionName).get()
  } catch (error) {
    if (isMissingDatabase(error)) return []
    throw error
  }
  return snapshot.docs
    .map((doc) => doc.data() as Post)
    .filter((post) => includeDrafts || post.status === 'published')
    .sort((a, b) => (b.publishedAt || b.updatedAt).localeCompare(a.publishedAt || a.updatedAt))
}

async function readPost(slug: string): Promise<Post | null> {
  if (!isDatabaseConfigured() || !validSlug(slug)) return null
  let snapshot
  try {
    snapshot = await db().collection(collectionName).doc(slug).get()
  } catch (error) {
    if (isMissingDatabase(error)) return null
    throw error
  }
  return snapshot.exists ? snapshot.data() as Post : null
}

const cachedPosts = unstable_cache(readPosts, ['firestore-posts'], { revalidate: 300, tags: ['posts'] })
const cachedPost = unstable_cache(readPost, ['firestore-post'], { revalidate: 300, tags: ['posts'] })
export const listPosts = cache((includeDrafts = false) => cachedPosts(includeDrafts))
export const getPost = cache((slug: string) => cachedPost(slug))

export async function savePost(post: Post, previousSlug?: string) {
  const collection = db().collection(collectionName)
  if (previousSlug && previousSlug !== post.slug) {
    const batch = db().batch()
    batch.set(collection.doc(post.slug), post)
    batch.delete(collection.doc(previousSlug))
    await batch.commit()
  } else {
    await collection.doc(post.slug).set(post)
  }
}

export async function removePost(slug: string) {
  await db().collection(collectionName).doc(slug).delete()
}

async function readSiteLinks(): Promise<SiteLinks> {
  if (!isDatabaseConfigured()) return defaultSiteLinks
  try {
    const snapshot = await db().collection('settings').doc('site-links').get()
    if (!snapshot.exists) return defaultSiteLinks
    const saved = snapshot.data() as Partial<SiteLinks>
    return Object.fromEntries(
      Object.entries(defaultSiteLinks).map(([key, fallback]) => [
        key,
        typeof saved[key as keyof SiteLinks] === 'string' ? saved[key as keyof SiteLinks] : fallback,
      ]),
    ) as SiteLinks
  } catch (error) {
    if (isMissingDatabase(error)) return defaultSiteLinks
    throw error
  }
}

export const getSiteLinks = cache(unstable_cache(readSiteLinks, ['site-links'], { revalidate: 300, tags: ['site-links'] }))

export async function saveSiteLinks(links: SiteLinks) {
  await db().collection('settings').doc('site-links').set(links)
}

async function readBlogSettings(): Promise<BlogSettings> {
  if (!isDatabaseConfigured()) return defaultBlogSettings
  try {
    const snapshot = await db().collection('settings').doc('blog').get()
    if (!snapshot.exists) return defaultBlogSettings
    const saved = snapshot.data() as Partial<BlogSettings>
    return Object.fromEntries(Object.entries(defaultBlogSettings).map(([key, fallback]) => [
      key,
      typeof saved[key as keyof BlogSettings] === 'string' && saved[key as keyof BlogSettings]?.trim()
        ? saved[key as keyof BlogSettings]
        : fallback,
    ])) as BlogSettings
  } catch (error) {
    if (isMissingDatabase(error)) return defaultBlogSettings
    throw error
  }
}

export const getBlogSettings = cache(unstable_cache(readBlogSettings, ['blog-settings'], { revalidate: 300, tags: ['blog-settings'] }))

export async function saveBlogSettings(settings: BlogSettings) {
  await db().collection('settings').doc('blog').set(settings)
}

export async function subscribeToBlog(email: string) {
  const normalized = email.trim().toLowerCase()
  await db().collection('subscribers').doc(Buffer.from(normalized).toString('base64url')).set({
    email: normalized,
    subscribedAt: new Date().toISOString(),
  }, { merge: true })
}
