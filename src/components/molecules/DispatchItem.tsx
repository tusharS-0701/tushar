import type { Dispatch } from '../../data/content'

export function DispatchItem({ dispatch }: { dispatch: Dispatch }) {
  return (
    <li className="dispatch-item">
      {dispatch.href ? <a href={dispatch.href} className="dispatch-title link-underline">{dispatch.title}</a> : <span className="dispatch-title">{dispatch.title}</span>}
      <span className="dispatch-date">{dispatch.date}</span>
    </li>
  )
}
