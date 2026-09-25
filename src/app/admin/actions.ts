'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { checkPassword, clearAdminSession, isAdmin, isAdminConfigured, setAdminSession } from '../../lib/admin-auth'
import { getDatabaseStatus, getPost, removePost, savePost, slugify, validSlug } from '../../lib/posts'

function field(data: FormData, key: string) {
  return String(data.get(key) || '').trim()
}

export async function login(data: FormData) {
  if (!isAdminConfigured()) redirect('/admin?error=Admin%20credentials%20are%20not%20configured')
  if (!checkPassword(field(data, 'password'))) redirect('/admin?error=Invalid%20password')
  await setAdminSession()
  redirect('/admin')
}

export async function logout() {
  await clearAdminSession()
  redirect('/admin')
}

export async function upsertPost(data: FormData) {
  if (!await isAdmin()) redirect('/admin')
  if (await getDatabaseStatus() !== 'ready') redirect('/admin?error=Firestore%20database%20is%20not%20ready')

  const title = field(data, 'title')
  const slug = slugify(field(data, 'slug') || title)
  const previousSlug = field(data, 'previousSlug')
  const description = field(data, 'description')
  const body = field(data, 'body')
  const tags = field(data, 'tags').split(',').map((tag) => tag.trim()).filter(Boolean).slice(0, 10)
  const status = field(data, 'status') === 'published' ? 'published' : 'draft'
  if (!validSlug(slug) || title.length < 3 || title.length > 140 || description.length < 20 || description.length > 320 || body.length < 20 || body.length > 200000) {
    redirect('/admin?error=Check%20the%20title%2C%20description%2C%20and%20body')
  }
  const existing = previousSlug ? await getPost(previousSlug) : await getPost(slug)
  if (previousSlug && !existing) redirect('/admin?error=Post%20not%20found')
  if (previousSlug !== slug && await getPost(slug)) redirect('/admin?error=Slug%20already%20exists')
  const now = new Date().toISOString()
  await savePost({
    slug, title, description, body, tags, status,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
    publishedAt: status === 'published' ? existing?.publishedAt || now : null,
  }, previousSlug || undefined)
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  if (previousSlug && previousSlug !== slug) revalidatePath(`/blog/${previousSlug}`)
  revalidatePath('/sitemap.xml')
  redirect(`/admin/edit/${slug}?saved=1`)
}

export async function deletePost(data: FormData) {
  if (!await isAdmin()) redirect('/admin')
  if (await getDatabaseStatus() !== 'ready') redirect('/admin?error=Firestore%20database%20is%20not%20ready')
  const slug = field(data, 'slug')
  if (!validSlug(slug)) redirect('/admin')
  await removePost(slug)
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  revalidatePath('/sitemap.xml')
  redirect('/admin?deleted=1')
}
