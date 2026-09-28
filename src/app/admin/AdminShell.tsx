import type { ReactNode } from 'react'
import Link from 'next/link'
import { logout } from './actions'

function MarkIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.5h9.5L19 8v11.5H6z"/><path d="M15 4.5V8h4M9 12h7M9 15.5h5"/></svg>
}

export function AdminShell({ children, title, subtitle, count }: { children: ReactNode; title: string; subtitle: string; count?: number }) {
  return <main className="admin-root">
    <div className="admin-brand-outside"><strong>TUSHAR SHARMA</strong><span>Build. Share. Grow.</span></div>
    <section className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-identity">
          <span className="admin-avatar">TS</span>
          <span><strong>Tushar Sharma</strong><small>Admin Panel</small></span>
        </Link>
        <nav className="admin-nav" aria-label="Admin navigation">
          <Link href="/admin" className="admin-nav-link admin-nav-link--active"><MarkIcon /><span>Blog Posts</span>{typeof count === 'number' && <small>{count}</small>}</Link>
        </nav>
        <div className="admin-sidebar-footer">
          <span><strong>Tushar Sharma</strong><small>Blog administrator</small></span>
          <form action={logout}><button type="submit" aria-label="Sign out" title="Sign out">↗</button></form>
        </div>
      </aside>
      <div className="admin-workspace">
        <header className="admin-topbar">
          <span className="admin-topbar-label">Content / Blog posts</span>
          <Link href="/" className="admin-secondary-button">↗ <span>View website</span></Link>
        </header>
        <div className="admin-content">
          <div className="admin-page-heading"><div><p className="admin-kicker">Publishing</p><h1>{title}</h1><p>{subtitle}</p></div></div>
          {children}
        </div>
      </div>
    </section>
    <div className="admin-footer-note"><span>IDEAS&nbsp;&nbsp;/&nbsp;&nbsp;WRITING&nbsp;&nbsp;/&nbsp;&nbsp;A BETTER WEB</span><span>tusharsharma.me</span></div>
  </main>
}
