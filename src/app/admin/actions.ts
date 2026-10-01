'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { checkPassword, clearAdminSession, isAdmin, isAdminConfigured, setAdminSession } from '../../lib/admin-auth'
import { blogCategories, getDatabaseStatus, getPost, removePost, saveBlogSettings, savePost, saveSiteLinks, slugify, validSlug } from '../../lib/posts'

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
  const coverImage = field(data, 'coverImage')
  const coverImageAlt = field(data, 'coverImageAlt')
  const tags = field(data, 'tags').split(',').map((tag) => tag.trim()).filter(Boolean).slice(0, 10)
  const status = field(data, 'status') === 'published' ? 'published' : 'draft'
  const requestedCategory = field(data, 'category')
  const category = blogCategories.find((item) => item === requestedCategory) || 'Engineering'
  if (!validSlug(slug) || title.length < 3 || title.length > 140 || description.length < 20 || description.length > 320 || body.length < 20 || body.length > 200000 || !coverImage || !validWebUrl(coverImage) || coverImageAlt.length < 5 || coverImageAlt.length > 180) {
    redirect('/admin?error=Check%20the%20title%2C%20description%2C%20cover%20image%2C%20alt%20text%2C%20and%20body')
  }
  const existing = previousSlug ? await getPost(previousSlug) : await getPost(slug)
  if (previousSlug && !existing) redirect('/admin?error=Post%20not%20found')
  if (previousSlug !== slug && await getPost(slug)) redirect('/admin?error=Slug%20already%20exists')
  const now = new Date().toISOString()
  await savePost({
    slug, title, description, body, tags, status, category, coverImage, coverImageAlt,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
    publishedAt: status === 'published' ? existing?.publishedAt || now : null,
    featured: data.get('featured') === 'on',
    trending: data.get('trending') === 'on',
  }, previousSlug || undefined)
  revalidateTag('posts')
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  if (previousSlug && previousSlug !== slug) revalidatePath(`/blog/${previousSlug}`)
  revalidatePath('/sitemap.xml')
  revalidatePath('/blog/rss.xml')
  redirect(`/admin/edit/${slug}?saved=1`)
}

export async function updateBlogSettings(data: FormData) {
  if (!await isAdmin()) redirect('/admin')
  if (await getDatabaseStatus() !== 'ready') redirect('/admin?error=Firestore%20database%20is%20not%20ready')
  const settings = {
    sidebarTitle: field(data, 'sidebarTitle'), sidebarDescription: field(data, 'sidebarDescription'),
    quote: field(data, 'quote'), quoteAuthor: field(data, 'quoteAuthor'),
    heroTitle: field(data, 'heroTitle'), heroDescription: field(data, 'heroDescription'),
    newsletterTitle: field(data, 'newsletterTitle'), newsletterDescription: field(data, 'newsletterDescription'),
  }
  if (Object.values(settings).some((value) => !value || value.length > 500)) redirect('/admin?error=Complete%20all%20blog%20content%20fields')
  await saveBlogSettings(settings)
  revalidateTag('blog-settings')
  revalidatePath('/blog')
  redirect('/admin?blogSaved=1')
}

export async function deletePost(data: FormData) {
  if (!await isAdmin()) redirect('/admin')
  if (await getDatabaseStatus() !== 'ready') redirect('/admin?error=Firestore%20database%20is%20not%20ready')
  const slug = field(data, 'slug')
  if (!validSlug(slug)) redirect('/admin')
  await removePost(slug)
  revalidateTag('posts')
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  revalidatePath('/sitemap.xml')
  revalidatePath('/blog/rss.xml')
  redirect('/admin?deleted=1')
}

function validWebUrl(value: string) {
  if (!value) return true
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

export async function updateSiteLinks(data: FormData) {
  if (!await isAdmin()) redirect('/admin')
  if (await getDatabaseStatus() !== 'ready') redirect('/admin?error=Firestore%20database%20is%20not%20ready')

  const links = {
    x: field(data, 'x'),
    instagram: field(data, 'instagram'),
    linkedin: field(data, 'linkedin'),
    github: field(data, 'github'),
    email: field(data, 'email'),
    resume: field(data, 'resume'),
    support: field(data, 'support'),
  }
  const webLinks = [links.x, links.instagram, links.linkedin, links.github, links.resume, links.support]
  if (!webLinks.every(validWebUrl) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(links.email)) {
    redirect('/admin?error=Enter%20valid%20web%20and%20email%20addresses')
  }

  await saveSiteLinks(links)
  revalidateTag('site-links')
  revalidatePath('/', 'layout')
  redirect('/admin?linksSaved=1')
}
