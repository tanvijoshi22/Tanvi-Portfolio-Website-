'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChapterSlate({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 300)
    const t2 = setTimeout(() => setPhase('out'),  1100)
    const t3 = setTimeout(() => onDone(),          1700)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  return (
    <AnimatePresence>
      {phase !== 'out' && (
        <motion.div
          key="slate"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ y: '-100%' }}
          transition={
            phase === 'in'
              ? { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
              : { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
          }
          style={{
            position:   'fixed',
            inset:       0,
            zIndex:      9999,
            background: '#0D0D0D',
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection:  'column',
            gap: 16,
          }}
        >
          {/* Film-slate clapperboard lines */}
          <div style={{ position: 'relative', width: 260, marginBottom: 24 }}>
            {/* Clapper top */}
            <motion.div
              animate={{ rotate: phase === 'hold' ? -18 : 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{
                height: 28,
                background: 'repeating-linear-gradient(90deg, #1C1C1C 0px, #1C1C1C 18px, #F7F6F3 18px, #F7F6F3 36px)',
                borderRadius: '4px 4px 0 0',
                transformOrigin: 'left center',
                border: '2px solid #333',
              }}
            />
            {/* Body */}
            <div style={{
              background: '#1A1A1A',
              border: '2px solid #333',
              borderTop: 'none',
              padding: '16px 20px',
              borderRadius: '0 0 4px 4px',
            }}>
              <p style={{ color: '#888', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
                Chapter
              </p>
              <p style={{ color: '#F7F6F3', fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, margin: '4px 0 0' }}>
                VII
              </p>
              <p style={{ color: '#888', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '8px 0 0' }}>
                Concept Boards
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
