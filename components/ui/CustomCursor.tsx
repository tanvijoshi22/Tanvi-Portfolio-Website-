'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

type CursorState =
  | 'default' | 'text' | 'project' | 'nav'
  | 'contact-card' | 'photo' | 'cta' | 'flip'
  | 'open' | 'close' | 'explore'

/* States that get the position-reactive gradient */
const GRADIENT_STATES = new Set<CursorState>(['default', 'project', 'flip'])

/* Fixed solid backgrounds for specific states */
const SOLID: Partial<Record<CursorState, string>> = {
  text:           '#2B4EFF',
  nav:            '#2B4EFF',
  'contact-card': '#FFFFFF',
  photo:          'rgba(0,0,0,0)',
  cta:            '#E85D26',
  close:          '#1C1C1C',
}

const SECTION_COLORS: Record<string, string> = {
  hero:      '#1C1C1C',
  work:      '#2B4EFF',
  skills:    '#1C1C1C',
  about:     '#E85D26',
  'why-me':  '#1C1C1C',
  contact:   '#FFFFFF',
}

export default function CustomCursor() {
  const [visible,    setVisible]    = useState(false)
  const [state,      setState]      = useState<CursorState>('default')
  const [sectionBg,  setSectionBg]  = useState('#1C1C1C')
  const [isTouch,    setIsTouch]    = useState(false)
  const [vaultColor, setVaultColor] = useState('#2B4EFF')

  const x = useSpring(0, { stiffness: 150, damping: 20 })
  const y = useSpring(0, { stiffness: 150, damping: 20 })

  /* Ref to inner cursor div — we update its background directly (no re-render) */
  const innerRef  = useRef<HTMLDivElement>(null)
  const stateRef  = useRef<CursorState>('default')
  const vcRef     = useRef('#2B4EFF')   // vault accent color ref

  /* Sync refs */
  useEffect(() => { stateRef.current = state }, [state])
  useEffect(() => { vcRef.current = vaultColor }, [vaultColor])

  /* Apply solid bg when switching to a non-gradient state */
  useEffect(() => {
    if (!innerRef.current) return
    if (GRADIENT_STATES.has(state)) return          // gradient handled in onMove
    if (state === 'open' || state === 'explore') {
      innerRef.current.style.background = vcRef.current
    } else if (SOLID[state]) {
      innerRef.current.style.background = SOLID[state]!
    }
  }, [state])

  /* Also update 'open'/'explore' bg when vaultColor changes */
  useEffect(() => {
    if (!innerRef.current) return
    if (stateRef.current === 'open' || stateRef.current === 'explore') {
      innerRef.current.style.background = vaultColor
    }
  }, [vaultColor])

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) {
      setIsTouch(true)
      return
    }

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)

      /* Gradient: hue shifts with x/y position — same flavour as Hero section bg */
      if (innerRef.current && GRADIENT_STATES.has(stateRef.current)) {
        const px    = e.clientX / window.innerWidth
        const py    = e.clientY / window.innerHeight
        const h1    = Math.round(px * 60  + 220)   // 220–280 (blue → purple)
        const h2    = Math.round(py * 40  + 190)   // 190–230 (indigo → blue)
        const angle = Math.round(px * 180 + py * 180)
        innerRef.current.style.background =
          `linear-gradient(${angle}deg, hsl(${h1},90%,55%), hsl(${h2},85%,55%))`
      }
    }

    const onLeave = () => setVisible(false)

    const onOver = (e: MouseEvent) => {
      const target  = e.target as HTMLElement
      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null

      if (cursorEl) {
        const t = cursorEl.dataset.cursor
        if (t === 'project')  { setState('project');       return }
        if (t === 'nav')      { setState('nav');            return }
        if (t === 'contact')  { setState('contact-card');  return }
        if (t === 'photo')    { setState('photo');          return }
        if (t === 'cta')      { setState('cta');            return }
        if (t === 'flip')     { setState('flip');           return }
        if (t === 'open') {
          const col = cursorEl.getAttribute('data-cursor-color') || '#2B4EFF'
          setVaultColor(col)
          setState('open')
          return
        }
        if (t === 'close') { setState('close'); return }
        if (t === 'explore') {
          const col = cursorEl.getAttribute('data-cursor-color') || '#2B4EFF'
          setVaultColor(col)
          setState('explore')
          return
        }
      }

      const tag = (target.tagName ?? '').toLowerCase()
      if (['p','h1','h2','h3','h4','h5','h6','li','span'].includes(tag)) {
        setState('text')
        return
      }
      setState('default')
    }

    window.addEventListener('mousemove', onMove,  { passive: true })
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('mouseover',  onOver)

    const observers: IntersectionObserver[] = []
    Object.keys(SECTION_COLORS).forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setSectionBg(SECTION_COLORS[id]) },
        { threshold: 0.3 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => {
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseover',  onOver)
      observers.forEach(o => o.disconnect())
    }
  }, [x, y])

  if (isTouch) return null

  /* ── Appearance (no bg — handled via ref) ── */
  type A = { w: number; h: number; r: number; rotate: number; shadow: string; border: string; label: string | null; labelColor: string; spring: boolean }

  const ap: A = (() => {
    switch (state) {
      case 'text':         return { w:  8, h:  8, r:   2, rotate:  0, shadow: 'none', border: 'none',                label: null,      labelColor: 'white',    spring: false }
      case 'project':      return { w: 80, h: 32, r: 999, rotate:  0, shadow: 'none', border: 'none',                label: 'VIEW →',  labelColor: 'white',    spring: true  }
      case 'nav':          return { w: 14, h: 14, r:   4, rotate: 45, shadow: 'none', border: 'none',                label: null,      labelColor: 'white',    spring: false }
      case 'contact-card': return { w: 80, h: 32, r: 999, rotate:  0, shadow: 'none', border: 'none',                label: 'OPEN →',  labelColor: '#1C1C1C',  spring: true  }
      case 'photo':        return { w: 48, h: 48, r:   8, rotate:  0, shadow: 'none', border: '2px solid #2B4EFF',   label: null,      labelColor: 'white',    spring: false }
      case 'cta':          return { w: 14, h: 14, r:   4, rotate:  0, shadow: 'none', border: 'none',                label: null,      labelColor: 'white',    spring: false }
      case 'flip':         return { w: 80, h: 32, r: 999, rotate:  0, shadow: 'none', border: 'none',                label: 'FLIP →',  labelColor: 'white',    spring: true  }
      case 'open':         return { w: 80, h: 32, r: 999, rotate:  0, shadow: 'none', border: 'none',                label: 'OPEN ↗',  labelColor: 'white',    spring: true  }
      case 'close':        return { w:  80, h: 32, r: 999, rotate:  0, shadow: 'none', border: 'none',                label: 'CLOSE ✕',    labelColor: 'white',   spring: true  }
      case 'explore':      return { w: 110, h: 32, r: 999, rotate:  0, shadow: 'none', border: 'none',                label: 'EXPLORE ✦',  labelColor: 'white',   spring: true  }
      default: return {
        w: 14, h: 14, r: 4, rotate: 0,
        shadow: sectionBg === '#FFFFFF' ? '0 0 12px rgba(255,255,255,0.6)' : 'none',
        border: 'none', label: null, labelColor: 'white', spring: false,
      }
    }
  })()

  return (
    <motion.div
      style={{
        position: 'fixed', top: 0, left: 0,
        x, y,
        translateX: '-50%', translateY: '-50%',
        zIndex: 99999,
        pointerEvents: 'none',
      }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        ref={innerRef}
        animate={{
          width:        ap.w,
          height:       ap.h,
          borderRadius: ap.r,
          rotate:       ap.rotate,
          boxShadow:    ap.shadow,
        }}
        transition={
          ap.spring
            ? { type: 'spring', stiffness: 300, damping: 25 }
            : { duration: 0.2, ease: 'easeInOut' }
        }
        style={{
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          overflow:        'hidden',
          border:           ap.border,
          boxSizing:       'border-box',
          /* Initial bg — will be overridden immediately by onMove / useEffect */
          background: 'linear-gradient(135deg, hsl(220,90%,55%), hsl(190,85%,55%))',
        }}
      >
        {ap.label && (
          <motion.span
            key={ap.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            style={{
              color:          ap.labelColor,
              fontFamily:    'var(--font-body)',
              fontWeight:     600,
              fontSize:       11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              whiteSpace:    'nowrap',
            }}
          >
            {ap.label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  )
}
