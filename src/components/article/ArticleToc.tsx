'use client'

import { useEffect, useMemo, useState } from 'react'

type TocItem = { id: string; label: string }

export function ArticleToc({ items }: { items: TocItem[] }) {
  const links = useMemo(() => items.length ? items : [{ id: 'article', label: 'Introduction' }], [items])
  const [activeId, setActiveId] = useState(links[0].id)

  useEffect(() => {
    const headings = links.map(({ id }) => document.getElementById(id)).filter((element): element is HTMLElement => Boolean(element))
    if (!headings.length) return

    const update = () => {
      const marker = Math.min(220, window.innerHeight * 0.28)
      const passed = headings.filter((heading) => heading.getBoundingClientRect().top <= marker)
      setActiveId((passed.at(-1) || headings[0]).id)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [links])

  const activeIndex = Math.max(0, links.findIndex((item) => item.id === activeId))

  return <aside className="article-toc">
    <strong>On this page</strong>
    <nav><i className="article-toc-slider" style={{ transform: `translateY(${activeIndex * 39}px)` }} aria-hidden />{links.map((item) => <a className={activeId === item.id ? 'active' : ''} href={`#${item.id}`} onClick={() => setActiveId(item.id)} key={item.id}>{item.label}</a>)}</nav>
  </aside>
}
