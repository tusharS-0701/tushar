import { navItems, siteMeta } from '../../data/content'
import { StatusDot } from '../atoms/StatusDot'

function formatDateline() {
  const today = new Date()
  return today
    .toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    .toUpperCase()
}

export function SiteHeader() {
  return (
    <>
      <div className="meta-bar rule-thin">
        <span>{siteMeta.location}</span>
        <span>{formatDateline()}</span>
        <span className="inline-flex items-center gap-2">
          <StatusDot />
          Est. {siteMeta.foundingYear}
        </span>
      </div>

      <div className="masthead rule-thick">
        <div className="masthead-badge">
          <span>Building</span>
          <span>In Public</span>
        </div>
        <a href="#top">
          <h1 className="masthead-title">{siteMeta.name}</h1>
        </a>
        <div className="masthead-badge">
          <span>Learning</span>
          <span>Everyday</span>
        </div>
      </div>

      <div className="byline-bar rule-thin">
        <span>
          {siteMeta.volume} <strong>&middot;</strong> {siteMeta.issue}
        </span>
        <strong>{siteMeta.tagline}</strong>
        <a href="#top" className="link-underline">
          {siteMeta.domain}
        </a>
      </div>

      <nav aria-label="Primary" className="site-nav sticky top-0 z-40 bg-[var(--color-paper)]">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className="nav-link">
            {item.label}
          </a>
        ))}
      </nav>
    </>
  )
}
