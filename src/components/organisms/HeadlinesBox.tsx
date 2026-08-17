import { headlines } from '../../data/content'
import { SidebarBox } from '../molecules/SidebarBox'
import { HeadlineItem } from '../molecules/HeadlineItem'
import { ArrowLink } from '../atoms/ArrowLink'

export function HeadlinesBox() {
  return (
    <SidebarBox title="Headlines" tag="Digest">
      <ul className="headline-list">
        {headlines.map((headline) => (
          <HeadlineItem key={headline} text={headline} />
        ))}
      </ul>
      <ArrowLink href="#journal" className="mt-4">
        More headlines
      </ArrowLink>
    </SidebarBox>
  )
}
