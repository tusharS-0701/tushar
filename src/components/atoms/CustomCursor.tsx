import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mediaQuery.matches) return

    const dot = dotRef.current
    if (!dot) return

    function handleMove(event: MouseEvent) {
      dot!.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`
    }

    function handleOver(event: MouseEvent) {
      const target = event.target as HTMLElement
      dot!.classList.toggle('cursor-dot--active', Boolean(target.closest('a, button')))
    }

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleOver)
    document.body.classList.add('has-custom-cursor')

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
}
