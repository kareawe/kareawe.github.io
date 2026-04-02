import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current
    if (!cursor || !trail) return

    let mouseX = 0, mouseY = 0
    let trailX = 0, trailY = 0

    const move = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX - 6 + 'px'
      cursor.style.top = mouseY - 6 + 'px'
    }

    const animate = () => {
      trailX += (mouseX - trailX) * 0.12
      trailY += (mouseY - trailY) * 0.12
      trail.style.left = trailX - 18 + 'px'
      trail.style.top = trailY - 18 + 'px'
      requestAnimationFrame(animate)
    }

    const handleHover = () => cursor.classList.add('hovering')
    const handleLeave = () => cursor.classList.remove('hovering')

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleLeave)
    })

    animate()

    return () => {
      document.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-trail" ref={trailRef} />
    </>
  )
}