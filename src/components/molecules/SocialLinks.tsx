import type { SocialLink } from '../../data/content'
import { socialIconMap } from '../icons/iconMaps'

export function SocialLinks({ links }: { links: SocialLink[] }) {
  return (
    <div className="social-row">
      {links.map((link) => {
        const Icon = socialIconMap[link.icon]
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            className="social-icon"
            aria-label={link.label}
            title={link.label}
          >
            <Icon className="h-4 w-4" />
          </a>
        )
      })}
    </div>
  )
}
