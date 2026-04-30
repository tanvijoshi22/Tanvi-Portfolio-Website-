'use client'
import { motion } from 'framer-motion'

export default function ConceptHero() {
  const handleBack = () => {
    try { window.close() } catch {}
    window.history.back()
  }

  return (
    <section
      style={{
        background:    '#0D1117',
        color:         '#FFFFFF',
        paddingTop:     48,
        paddingBottom:  40,
        paddingLeft:   'clamp(24px, 6vw, 80px)',
        paddingRight:  'clamp(24px, 6vw, 80px)',
        minHeight:      280,
        display:       'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onClick={handleBack}
        style={{
          background:    'none',
          border:        'none',
          color:         '#FFFFFF',
          fontFamily:    'var(--font-body)',
          fontSize:       14,
          cursor:        'pointer',
          padding:        0,
          marginBottom:   28,
          alignSelf:     'flex-start',
          textDecoration: 'none',
          opacity:        1,
          transition:    'opacity 200ms ease',
          letterSpacing: '0.01em',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.7'; (e.currentTarget as HTMLButtonElement).style.textDecoration = 'underline' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; (e.currentTarget as HTMLButtonElement).style.textDecoration = 'none' }}
        data-cursor="nav"
      >
        ← Back to Portfolio
      </motion.button>

      {/* Chapter label */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:       11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.4)',
          marginBottom:   20,
        }}
      >
        Chapter VII · Concept Boards
      </motion.p>

      {/* Main heading */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(32px, 4vw, 52px)',
          fontWeight:     800,
          lineHeight:     1.1,
          letterSpacing: '-0.03em',
          color:         '#FFFFFF',
          maxWidth:       820,
          marginBottom:   20,
        }}
      >
        Concepts that define how<br />
        the product feels and{' '}
        <span style={{ color: '#E85D26' }}>flows.</span>
      </motion.h1>

      {/* Sub copy */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.22 }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize:   'clamp(14px, 1.5vw, 16px)',
          color:      'rgba(255,255,255,0.6)',
          maxWidth:    520,
          lineHeight:  1.7,
        }}
      >
        Every product has a visual personality waiting to be found. Early in the process, I use concept boards to discover it — exploring color, mood, type, and tone to set a clear direction that defines the foundation of the design. It&apos;s how I make sure the product doesn&apos;t just work, but feels right!
      </motion.p>
    </section>
  )
}
