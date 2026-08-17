import type { AnchorHTMLAttributes } from 'react'

type StampButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode
}

export function StampButton({ children, className = '', ...rest }: StampButtonProps) {
  return (
    <a className={`stamp-button ${className}`} {...rest}>
      {children}
    </a>
  )
}
