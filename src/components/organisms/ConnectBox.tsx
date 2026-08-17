import { siteMeta, socialLinks } from '../../data/content'
import { SidebarBox } from '../molecules/SidebarBox'
import { SocialLinks } from '../molecules/SocialLinks'
import { ArrowLink } from '../atoms/ArrowLink'
import { StampButton } from '../atoms/StampButton'

export function ConnectBox() {
  return (
    <SidebarBox id="contact" title="Let's Connect" tag="Contact">
      <p className="text-[0.9rem] leading-relaxed text-[var(--color-ink-soft)]">
        Always open to meaningful conversations and collaborations.
      </p>
      <SocialLinks links={socialLinks} />
      <StampButton href={siteMeta.resumeUrl} target="_blank" rel="noreferrer" className="mt-5">
        View Résumé
      </StampButton>
      <ArrowLink href={`mailto:${siteMeta.email}`} className="mt-4">
        Get in touch
      </ArrowLink>
    </SidebarBox>
  )
}
