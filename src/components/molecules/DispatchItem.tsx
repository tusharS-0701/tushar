import type { Dispatch } from '../../data/content'

export function DispatchItem({ dispatch }: { dispatch: Dispatch }) {
  return (
    <li className="dispatch-item">
      <span className="dispatch-title">{dispatch.title}</span>
      <span className="dispatch-date">{dispatch.date}</span>
    </li>
  )
}
