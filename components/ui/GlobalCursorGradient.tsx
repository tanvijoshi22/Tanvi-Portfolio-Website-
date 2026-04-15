'use client'

import { useEffect, useRef } from 'react'

/* ── Color per section ─────────────────────────────────────────── */
const SECTION_COLORS: Record<string, string> = {
  'narrative':    'rgba(255, 255, 255, 0.06)',
  'hero':         'rgba(43, 78, 255, 0.08)',
  'work':         'rgba(43, 78, 255, 0.07)',
  'skills-vault': 'rgba(124, 58, 237, 0.07)',
  'about':        'rgba(232, 93, 38, 0.06)',
  'why-me':       'rgba(43, 78, 255, 0.06)',
  'contact':      'rgba(43, 78, 255, 0.10)',
}

export default function GlobalCursorGradient() {
  const gradientRef = useRef<HTMLDivElement>(null)
  const pos         = useRef({ currentX: 0, currentY: 0, targetX: 0, targetY: 0 })
  const color       = useRef('rgba(43, 78, 255, 0.08)')
  const rafId       = useRef<number>(0)

  useEffect(() => {
    /* Disable on touch devices — no cursor to follow */
    if (window.matchMedia('(hover: none)').matches) return

    /* Initialise position to centre of viewport */
    const cx = window.innerWidth  / 2
    const cy = window.innerHeight / 2
    pos.current = { currentX: cx, currentY: cy, targetX: cx, targetY: cy }

    /* Track cursor */
    const onMouseMove = (e: MouseEvent) => {
      pos.current.targetX = e.clientX
      pos.current.targetY = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    /* Watch sections for color transitions */
    const observers: IntersectionObserver[] = []
    document.querySelectorAll('[data-section]').forEach(el => {
      const id  = el.getAttribute('data-section') ?? ''
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) color.current = SECTION_COLORS[id] ?? 'rgba(43,78,255,0.08)' },
        { threshold: 0.3 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    /* rAF loop — lerp 0.06 → feels like a floating glow */
    const tick = () => {
      const p   = pos.current
      p.currentX += (p.targetX - p.currentX) * 0.06
      p.currentY += (p.targetY - p.currentY) * 0.06

      if (gradientRef.current) {
        gradientRef.current.style.background =
          `radial-gradient(700px circle at ${p.currentX}px ${p.currentY}px, ${color.current}, transparent 70%)`
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId.current)
      observers.forEach(o => o.disconnect())
    }
  }, [])

  return (
    <div
      ref={gradientRef}
      style={{
        position:      'fixed',
        inset:          0,
        pointerEvents: 'none',
        zIndex:         1,
        willChange:    'background',
      }}
    />
  )
}
