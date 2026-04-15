'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSection } from '@/contexts/SectionContext'
import SoundToggle from './SoundToggle'

const NAV_ITEMS = [
  { label: 'Projects',   sectionId: 'work'    },
  { label: 'About me',   sectionId: 'about'   },
  { label: 'Contact me', sectionId: 'contact' },
]

const SECTION_TO_NAV: Record<string, string> = {
  work:           'work',
  'skills-vault': 'work',
  about:          'about',
  'why-me':       'about',
  contact:        'contact',
}

const TRIGGER_Y = 72   // px from top edge that reveals the bar

export default function TopBar() {
  const { active }             = useSection()
  const [visible, setVisible]  = useState(false)
  const hideTimer              = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activeNav              = SECTION_TO_NAV[active.id] ?? null

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (e.clientY < TRIGGER_Y) {
        if (hideTimer.current) clearTimeout(hideTimer.current)
        setVisible(true)
      } else {
        if (hideTimer.current) clearTimeout(hideTimer.current)
        /* slight delay so hovering into the bar itself doesn't flicker */
        hideTimer.current = setTimeout(() => setVisible(false), 350)
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [])

  /* keep visible while mouse is over the bar itself */
  const handleBarEnter = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    setVisible(true)
  }
  const handleBarLeave = () => {
    hideTimer.current = setTimeout(() => setVisible(false), 350)
  }

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    /* Full-width fixed wrapper — only the pill is visible */
    <div
      style={{
        position:      'fixed',
        top:            0,
        left:           0,
        right:          0,
        zIndex:         200,
        display:       'flex',
        justifyContent:'center',
        paddingTop:     14,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        onMouseEnter={handleBarEnter}
        onMouseLeave={handleBarLeave}
        animate={{
          y:       visible ? 0   : -72,
          opacity: visible ? 1   : 0,
          scale:   visible ? 1   : 0.96,
        }}
        transition={{
          type:      'spring',
          stiffness:  420,
          damping:    36,
        }}
        style={{ pointerEvents: visible ? 'auto' : 'none' }}
      >
        <div
          style={{
            display:              'flex',
            alignItems:           'center',
            gap:                   4,
            padding:               5,
            background:           'rgba(255, 255, 255, 0.70)',
            backdropFilter:       'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border:               '1px solid rgba(0, 0, 0, 0.07)',
            borderRadius:          999,
            boxShadow:            '0 4px 28px rgba(0, 0, 0, 0.07), 0 1px 4px rgba(0, 0, 0, 0.04)',
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.sectionId
            return (
              <button
                key={item.sectionId}
                onClick={() => scrollTo(item.sectionId)}
                data-cursor="nav"
                style={{
                  position:     'relative',
                  padding:      '7px 20px',
                  borderRadius:  999,
                  border:       'none',
                  background:   'transparent',
                  color:         isActive ? '#FFFFFF' : '#5A5A5A',
                  fontFamily:   'var(--font-body)',
                  fontWeight:    600,
                  fontSize:      13,
                  cursor:       'pointer',
                  whiteSpace:   'nowrap',
                  transition:   'color 0.2s ease',
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    style={{
                      position:     'absolute',
                      inset:         0,
                      background:   '#1C1C1C',
                      borderRadius:  999,
                      zIndex:       -1,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 38 }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
              </button>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
