type IconProps = {
  className?: string
}

const base = {
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" />
      <circle cx="8" cy="8.2" r="1.1" fill="currentColor" stroke="none" />
      <line x1="8" y1="11.2" x2="8" y2="17.5" />
      <line x1="13" y1="17.5" x2="13" y2="12.8" />
      <path d="M13 13.4c0-1.5 1-2.6 2.4-2.6s2.4 1 2.4 2.6v4.1" />
    </svg>
  )
}

export function GithubIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="10.5" r="6" />
      <path d="M8.2 19.5v-2.3c-1.2.35-2.2 0-3-1" />
      <path d="M15.8 19.5v-2.3c1.2.35 2.2 0 3-1" />
      <path d="M8.2 19.5V17c1.2.5 2.4.5 3.8.5s2.6 0 3.8-.5v2.5" />
    </svg>
  )
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17" cy="7" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" />
      <path d="M3.5 6l8.5 6.5L20.5 6" />
    </svg>
  )
}

export function BoxIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M3 7.8L12 3l9 4.8-9 4.8-9-4.8z" />
      <path d="M3 7.8v8.4L12 21l9-4.8V7.8" />
      <path d="M12 12.6V21" />
    </svg>
  )
}

export function TerminalIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" />
      <path d="M6.5 9l3.5 3-3.5 3" />
      <line x1="12" y1="15" x2="17.5" y2="15" />
    </svg>
  )
}

export function ShirtIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M8.5 4L12 6l3.5-2 4 3.6-3 3V21H8V10.6l-3-3z" />
    </svg>
  )
}

export function BookIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="4" y="16" width="16" height="3" />
      <rect x="5" y="11" width="14" height="3" />
      <rect x="6" y="6" width="12" height="3" />
    </svg>
  )
}

export function TypewriterIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3" y="10.5" width="18" height="7.5" />
      <rect x="8.5" y="4" width="7" height="6.5" />
      <line x1="6" y1="14.2" x2="18" y2="14.2" />
      <line x1="10.5" y1="21" x2="13.5" y2="21" />
    </svg>
  )
}
