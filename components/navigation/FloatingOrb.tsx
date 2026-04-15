'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSection, SECTIONS } from '@/contexts/SectionContext'
import { useLenis } from '@/contexts/LenisContext'

const SECTION_ANGLES = [270, 306, 342, 198, 234, 162] // degrees around the orb
const ORBIT_RADIUS = 90

function deg2rad(d: number) { return (d * Math.PI) / 180 }

export default function FloatingOrb() {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const { activeIndex } = useSection()
  const lenis = useLenis()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      if (lenis) lenis.scrollTo(el, { offset: 0 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }
    setOpen(false)
  }

  return (
    <div className="fixed bottom-8 right-8 z-[300]">
      {/* Menu items */}
      <AnimatePresence>
        {open && SECTIONS.map((s, i) => {
          const angle = SECTION_ANGLES[i] ?? (270 + i * 30)
          const rad   = deg2rad(angle)
          const x     = Math.cos(rad) * ORBIT_RADIUS
          const y     = Math.sin(rad) * ORBIT_RADIUS
          const isActive = i === activeIndex

          return (
            <motion.button
              key={s.id}
              className="absolute flex items-center justify-center w-8 h-8 rounded-full font-mono text-[9px] tracking-widest uppercase border transition-colors"
              style={{
                bottom: -y,
                right:  -x,
                background: isActive ? '#2B4EFF' : '#FFFFFF',
                borderColor: isActive ? '#2B4EFF' : '#1C1C1C30',
                color: isActive ? '#FFFFFF' : '#1C1C1C',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: i * 0.04, type: 'spring', stiffness: 400, damping: 25 }}
              onClick={() => scrollTo(s.id)}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              data-cursor="nav"
            >
              {String(i + 1).padStart(2, '0')}

              {/* Tooltip */}
              <AnimatePresence>
                {hovered === i && (
                  <motion.span
                    className="absolute right-10 bg-near-black text-white font-mono text-[9px] tracking-widest uppercase px-2 py-1 rounded whitespace-nowrap pointer-events-none"
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 6 }}
                    transition={{ duration: 0.15 }}
                  >
                    {s.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </AnimatePresence>

      {/* Orb button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="w-8 h-8 rounded-full bg-accent-blue orb-pulse flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.92 }}
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        data-cursor="orb"
      >
        <span className="font-mono text-white text-[10px] font-bold">{open ? '×' : '≡'}</span>
      </motion.button>
    </div>
  )
}
