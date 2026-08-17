import type { ReactNode } from 'react'
import { SiteHeader } from '../organisms/SiteHeader'
import { SiteFooter } from '../organisms/SiteFooter'
import { CustomCursor } from '../atoms/CustomCursor'

export function NewspaperLayout({
  left,
  center,
  right,
}: {
  left: ReactNode
  center: ReactNode
  right: ReactNode
}) {
  return (
    <div className="app-shell">
      <CustomCursor />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-50 focus:border focus:border-[var(--color-ink)] focus:bg-[var(--color-paper)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--color-ink)]"
      >
        Skip to content
      </a>
      <div className="paper">
        <SiteHeader />
        <main id="content">
          <div className="paper-grid">
            <aside className="col col-left">{left}</aside>
            <div className="col col-center">{center}</div>
            <aside className="col col-right">{right}</aside>
          </div>
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
