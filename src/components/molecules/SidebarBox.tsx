import type { ReactNode } from 'react'
import { BoxLabel } from '../atoms/BoxLabel'

export function SidebarBox({
  id,
  title,
  tag,
  children,
}: {
  id?: string
  title: string
  tag: string
  children: ReactNode
}) {
  return (
    <div id={id} className="sidebar-block">
      <BoxLabel title={title} tag={tag} />
      {children}
    </div>
  )
}
