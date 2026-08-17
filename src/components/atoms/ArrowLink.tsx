import type { AnchorHTMLAttributes } from 'react'

type ArrowLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode
}

export function ArrowLink({ children, className = '', ...rest }: ArrowLinkProps) {
  return (
    <a className={`arrow-link ${className}`} {...rest}>
      <span className="link-underline">{children}</span>
      <span aria-hidden="true" className="arrow font-mono">
        &rarr;
      </span>
    </a>
  )
}
