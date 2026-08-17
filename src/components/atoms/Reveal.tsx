import type { ReactNode } from 'react'
import { m, useReducedMotion } from 'framer-motion'

export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Component = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'aside'
}) {
  const prefersReducedMotion = useReducedMotion()
  const MotionComponent = m[Component]

  return (
    <MotionComponent
      className={className}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionComponent>
  )
}
