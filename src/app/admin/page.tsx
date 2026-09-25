import type { Metadata } from 'next'
import Link from 'next/link'
import { isAdmin, isAdminConfigured } from '../../lib/admin-auth'
import { getDatabaseStatus, listPosts } from '../../lib/posts'
import { login } from './actions'
import { AdminShell } from './AdminShell'
import { PostForm } from './PostForm'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Admin | Tushar Sharma', robots: { index: false, follow: false } }

type Props = { searchParams: Promise<{ error?: string; deleted?: string }> }

export default async function AdminPage({ searchParams }: Props) {
  const params = await searchParams
  const authorized = await isAdmin()
  const configured = isAdminConfigured()

  if (!authorized) return <main className="admin-login-page">
    <div className="admin-login-brand"><strong>TUSHAR SHARMA</strong><span>Build. Share. Grow.</span></div>
    <section className="admin-login-card">
      <div className="admin-login-mark">TS</div>
      <p className="admin-kicker">Private workspace</p>
      <h1>Welcome back</h1>
      <p className="admin-login-copy">Sign in to write and manage your blog posts.</p>
      {params.error && <p role="alert" className="admin-alert admin-alert--error">{params.error}</p>}
      {!configured && <p role="alert" className="admin-alert admin-alert--error">Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in your environment, then restart the server.</p>}
      {configured && <form action={login} className="admin-form admin-login-form">
        <label><span>Admin password</span><input name="password" type="password" required autoComplete="current-password" placeholder="Enter your password" /></label>
        <button type="submit" className="admin-primary-button">Sign in</button>
      </form>}
      <Link href="/" className="admin-login-back">← Return to website</Link>
    </section>
  </main>

  const databaseStatus = await getDatabaseStatus()
  const posts = await listPosts(true)
  return <AdminShell title="Blog posts" subtitle="Write, publish, and manage your articles." count={posts.length}>
    {params.error && <p role="alert" className="admin-alert admin-alert--error">{params.error}</p>}
    {params.deleted && <p className="admin-alert admin-alert--success">Post deleted.</p>}
    {databaseStatus === 'unconfigured' && <p role="alert" className="admin-alert admin-alert--error">Add Firebase service account credentials before saving posts.</p>}
    {databaseStatus === 'missing' && <p role="alert" className="admin-alert admin-alert--error">Create the default Cloud Firestore database in the Firebase Console before saving posts.</p>}

    <section className="admin-card admin-editor-card">
      <div className="admin-card-heading"><div><span className="admin-card-icon">＋</span><div><h2>New article</h2><p>Create a draft or publish a new post.</p></div></div></div>
      <PostForm />
    </section>

    <section className="admin-card admin-posts-card">
      <div className="admin-card-heading"><div><span className="admin-card-icon">▤</span><div><h2>All articles</h2><p>{posts.length} {posts.length === 1 ? 'post' : 'posts'} in your blog.</p></div></div></div>
      {posts.length ? <ul className="admin-post-list">{posts.map((post) => <li key={post.slug}>
        <div><span className={`admin-status admin-status--${post.status}`}>{post.status}</span><h3>{post.title}</h3><p>Updated {new Date(post.updatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p></div>
        <Link href={`/admin/edit/${post.slug}`} className="admin-secondary-button">Edit →</Link>
      </li>)}</ul> : <div className="admin-empty"><span>▤</span><h3>No articles yet</h3><p>Your saved drafts and published posts will appear here.</p></div>}
    </section>
  </AdminShell>
}
