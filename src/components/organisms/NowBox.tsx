import { nowFocus, nowPanel } from '../../data/content'
import { SidebarBox } from '../molecules/SidebarBox'
import { ArrowLink } from '../atoms/ArrowLink'
import { TypewriterIcon } from '../icons/Icons'

export function NowBox() {
  return (
    <SidebarBox id="now" title="Now" tag="Status">
      <TypewriterIcon className="now-icon" />
      <p className="mt-4 text-[0.92rem] leading-relaxed">{nowPanel.body}</p>
      <p className="mt-4 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-[var(--color-ink-faint)]">
        {nowPanel.focusLabel}
      </p>
      <ul className="now-focus-list">
        {nowFocus.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <ArrowLink href="#notes" className="mt-4">
        Read more
      </ArrowLink>
    </SidebarBox>
  )
}
