'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useSection, SECTIONS } from '@/contexts/SectionContext'

export default function SceneIndicator() {
  const { activeIndex } = useSection()
  const current = String(activeIndex + 1).padStart(2, '0')
  const total   = String(SECTIONS.length).padStart(2, '0')

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[200] hidden md:flex flex-col items-center gap-3 pointer-events-none">
      {/* Current beat */}
      <div className="overflow-hidden" style={{ height: 20 }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            className="block font-mono text-[11px] tracking-widest text-near-black"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Track */}
      <div className="relative w-px bg-near-black/10" style={{ height: 60 }}>
        <motion.div
          className="absolute top-0 left-0 w-full bg-accent-blue"
          animate={{ height: `${((activeIndex) / (SECTIONS.length - 1)) * 100}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>

      {/* Total */}
      <span className="font-mono text-[11px] tracking-widest text-muted-text">{total}</span>
    </div>
  )
}
