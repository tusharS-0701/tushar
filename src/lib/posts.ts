import 'server-only'
import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

export type Post = {
  slug: string
  title: string
  description: string
  body: string
  tags: string[]
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
  publishedAt: string | null
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

export async function listPosts(includeDrafts = false): Promise<Post[]> {
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

export async function getPost(slug: string): Promise<Post | null> {
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
