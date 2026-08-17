import { deskNote } from '../../data/content'
import { Reveal } from '../atoms/Reveal'
import { SignatureText } from '../atoms/SignatureText'

export function DeskNote() {
  return (
    <section className="section-block pb-2">
      <Reveal>
        <h2 className="section-title font-display italic">From the Desk of Tushar</h2>
        <p className="section-copy mt-4">{deskNote.body}</p>
        <SignatureText>{deskNote.signature}</SignatureText>
      </Reveal>
    </section>
  )
}
