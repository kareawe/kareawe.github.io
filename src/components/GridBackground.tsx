import { useEffect, useRef } from 'react'

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let mouseX = 0.5, mouseY = 0.5

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', e => {
      mouseX = e.clientX / window.innerWidth
      mouseY = e.clientY / window.innerHeight
    })

    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const gridSize = 60
      const cols = Math.ceil(canvas.width / gridSize) + 2
      const rows = Math.ceil(canvas.height / gridSize) + 2

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize
          const y = j * gridSize
          const dx = x / canvas.width - mouseX
          const dy = y / canvas.height - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          const glow = Math.max(0, 0.3 - dist)
          const pulse = Math.sin(t * 0.02 + i * 0.3 + j * 0.2) * 0.5 + 0.5

          ctx.beginPath()
          ctx.arc(x, y, 1 + glow * 3 + pulse * 0.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 212, 255, ${0.04 + glow * 0.2 + pulse * 0.02})`
          ctx.fill()
        }
      }

      // Floating particles
      for (let i = 0; i < 12; i++) {
        const px = ((Math.sin(t * 0.005 + i * 0.8) + 1) / 2) * canvas.width
        const py = ((Math.cos(t * 0.003 + i * 0.6) + 1) / 2) * canvas.height
        const size = Math.sin(t * 0.01 + i) * 1.5 + 2

        ctx.beginPath()
        ctx.arc(px, py, size, 0, Math.PI * 2)
        ctx.fillStyle = i % 3 === 0 ? 'rgba(0,255,136,0.12)' : 'rgba(0,212,255,0.08)'
        ctx.fill()
      }

      t++
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.6,
      }}
    />
  )
}