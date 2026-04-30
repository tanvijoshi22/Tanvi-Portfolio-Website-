'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export type ConceptCardData = {
  id:        number
  title:     string
  imgSrc:    string
  imgAlt:    string
  bg:        string
  textColor: 'light' | 'dark'
  link:      string
}

export default function ConceptCard({ card, isDragging }: { card: ConceptCardData; isDragging: boolean }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [hov,       setHov]       = useState(false)

  const isDark   = card.textColor === 'light'
  const titleCol = isDark ? '#FFFFFF' : '#1C1C1C'
  const numCol   = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'
  const numLabel = `${String(card.id).padStart(2, '0')}/06`

  const handleClick = () => {
    if (!isDragging) window.open(card.link, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <motion.article
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={handleClick}
        style={{
          width:         440,
          height:        460,
          flexShrink:     0,
          borderRadius:   16,
          overflow:       'hidden',
          background:     card.bg,
          border:        `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
          cursor:         isDragging ? 'grabbing' : 'pointer',
          display:       'flex',
          flexDirection: 'column',
          userSelect:    'none',
        }}
      >
        {/* Image — 68% */}
        <div style={{ position: 'relative', height: '68%', flexShrink: 0, overflow: 'hidden' }}>
          {!imgLoaded && (
            <div className="cb-shimmer" style={{ position: 'absolute', inset: 0 }} />
          )}
          <motion.div
            animate={{ scale: hov ? 1.04 : 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src={card.imgSrc}
              alt={card.imgAlt}
              fill
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
              onLoad={() => setImgLoaded(true)}
            />
          </motion.div>

          {/* Bottom vignette */}
          <div style={{
            position:      'absolute',
            inset:          0,
            background:    'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.45) 100%)',
            pointerEvents: 'none',
          }} />

          {/* Hover overlay */}
          <motion.div
            animate={{ opacity: hov ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position:       'absolute',
              inset:           0,
              background:     'rgba(0,0,0,0.28)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              pointerEvents:  'none',
            }}
          >
            <span style={{
              fontFamily:    'var(--font-body)',
              fontSize:       12,
              fontWeight:     700,
              color:         'white',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              border:        '1.5px solid rgba(255,255,255,0.6)',
              padding:       '7px 18px',
              borderRadius:   999,
            }}>
              View ↗
            </span>
          </motion.div>
        </div>

        {/* Info — 32% */}
        <div style={{
          flex:          1,
          padding:       '10px 18px 14px',
          display:       'flex',
          flexDirection: 'column',
          background:     card.bg,
        }}>
          {/* Number — top right */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6 }}>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:       10,
              color:          numCol,
              letterSpacing: '0.1em',
            }}>
              {numLabel}
            </span>
          </div>

          {/* Title */}
          <p style={{
            fontFamily:          'var(--font-display)',
            fontSize:             14,
            fontWeight:           700,
            color:                titleCol,
            margin:               0,
            lineHeight:           1.35,
            display:             '-webkit-box',
            WebkitLineClamp:      3,
            WebkitBoxOrient:     'vertical',
            overflow:            'hidden',
          }}>
            {card.title}
          </p>
        </div>
      </motion.article>

      <style>{`
        .cb-shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 100%);
          background-size: 200% 100%;
          animation: cb-shimmer 1.6s ease infinite;
        }
        @keyframes cb-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  )
}
