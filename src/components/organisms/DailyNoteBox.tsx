import { dailyNote } from '../../data/content'
import { SidebarBox } from '../molecules/SidebarBox'

export function DailyNoteBox() {
  return (
    <SidebarBox id="journal" title="The Daily Note" tag="Journal">
      <p className="daily-note-lede">{dailyNote.lede}</p>
      <p className="daily-note-body">{dailyNote.body}</p>
      <p className="signature mt-4 text-2xl">&mdash; {dailyNote.signoff}</p>
    </SidebarBox>
  )
}
