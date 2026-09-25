import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { isAdmin } from '../../../../lib/admin-auth'
import { getPost, listPosts } from '../../../../lib/posts'
import { AdminShell } from '../../AdminShell'
import { PostForm } from '../../PostForm'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Edit post | Tushar Sharma', robots: { index: false, follow: false } }

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ saved?: string }> }

export default async function EditPage({ params, searchParams }: Props) {
  if (!await isAdmin()) redirect('/admin')
  const post = await getPost((await params).slug)
  if (!post) notFound()
  const [{ saved }, posts] = await Promise.all([searchParams, listPosts(true)])
  return <AdminShell title="Edit article" subtitle="Update the content and publishing status." count={posts.length}>
    <div className="admin-edit-nav"><Link href="/admin" className="admin-secondary-button">← All articles</Link>{post.status === 'published' && <Link href={`/blog/${post.slug}`} className="admin-secondary-button">View article ↗</Link>}</div>
    {saved && <p className="admin-alert admin-alert--success">Your changes have been saved.</p>}
    <section className="admin-card admin-editor-card">
      <div className="admin-card-heading"><div><span className="admin-card-icon">✎</span><div><h2>{post.title}</h2><p>Last updated {new Date(post.updatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div></div></div>
      <PostForm post={post} />
    </section>
  </AdminShell>
}
