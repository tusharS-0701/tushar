import { dispatches } from '../../data/content'
import { SidebarBox } from '../molecules/SidebarBox'
import { DispatchItem } from '../molecules/DispatchItem'
import { ArrowLink } from '../atoms/ArrowLink'

export function DispatchesBox() {
  return (
    <SidebarBox title="Latest Dispatches" tag="Notes">
      <ul className="dispatch-list">
        {dispatches.map((dispatch) => (
          <DispatchItem key={dispatch.title} dispatch={dispatch} />
        ))}
      </ul>
      <ArrowLink href="#journal" className="mt-4">
        View all articles
      </ArrowLink>
    </SidebarBox>
  )
}
