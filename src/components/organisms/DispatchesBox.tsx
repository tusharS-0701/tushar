import { dispatches as fallbackDispatches, type Dispatch } from '../../data/content'
import { SidebarBox } from '../molecules/SidebarBox'
import { DispatchItem } from '../molecules/DispatchItem'
import { ArrowLink } from '../atoms/ArrowLink'

export function DispatchesBox({ dispatches }: { dispatches: Dispatch[] }) {
  const items = dispatches.length ? dispatches : fallbackDispatches
  return (
    <SidebarBox title="Latest Dispatches" tag="Notes">
      <ul className="dispatch-list">
        {items.map((dispatch) => (
          <DispatchItem key={dispatch.title} dispatch={dispatch} />
        ))}
      </ul>
      <ArrowLink href="/blog" className="mt-4">
        View all articles
      </ArrowLink>
    </SidebarBox>
  )
}
