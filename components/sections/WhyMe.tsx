'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/* ─── Card data ───────────────────────────────────────────────────── */
const CARDS = [
  {
    num:   '01',
    icon:  '🧱',
    title: 'I bring design system expertise',
    body:  "Over the last 5 years, I've naturally ended up building and maintaining design systems in most of my projects. I enjoy bringing structure to chaos — creating patterns that scale and documenting behaviours so teams don't have to guess.",
  },
  {
    num:   '02',
    icon:  '✦',
    title: 'I love giving personality to products',
    body:  "I start with a strong visual direction and let everything flow from there. I love creating visual concept boards, they quietly shape how a product feels. For me, it's about making it functional, but also human.",
  },
  {
    num:   '03',
    icon:  '◈',
    title: 'I have extreme ownership of my work',
    body:  "If I'm working on something, I'm invested. I care about the outcome, not just the output. I'll push through the messy middle to make sure what we ship actually makes sense.",
  },
  {
    num:   '04',
    icon:  '🔭',
    title: 'I stay curious!',
    body:  "Design keeps changing — tools, trends, expectations. I try to keep learning without overcomplicating it. A new tool, a new perspective, a new way to solve something — I'm always open.",
  },
]

/* ─── Individual flip card ────────────────────────────────────────── */
function FlipCard({
  card,
  entranceDelay,
  isTouch,
}: {
  card:          typeof CARDS[0]
  entranceDelay: number
  isTouch:       boolean
}) {
  const [flipped, setFlipped] = useState(false)

  /* Desktop: hover toggles flip.  Mobile: tap toggles flip. */
  const handleMouseEnter = () => { if (!isTouch) setFlipped(true)  }
  const handleMouseLeave = () => { if (!isTouch) setFlipped(false) }
  const handleClick      = () => { if  (isTouch) setFlipped(f => !f) }

  return (
    <motion.div
      /* ── Entrance animation (film-strip style) ── */
      initial={{ opacity: 0, x: 120, rotate: 3 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 80, damping: 20, delay: entranceDelay }}

      /* ── Events ── */
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-cursor="flip"

      style={{
        height:      280,
        perspective: '1000px',
        cursor:      isTouch ? 'pointer' : 'none',
      }}
    >
      {/* Flip inner — rotates on X axis (top/bottom hinge = page-turn feel) */}
      <div style={{ width: '100%', height: '100%' }}>
        <div
          style={{
            position:       'relative',
            width:          '100%',
            height:         '100%',
            transformStyle: 'preserve-3d',
            transform:      flipped ? 'rotateX(180deg)' : 'rotateX(0deg)',
            transition:     'transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >

          {/* ── FRONT FACE ─────────────────────────────────────────── */}
          <div
            style={{
              position:                 'absolute',
              inset:                     0,
              backfaceVisibility:       'hidden',
              WebkitBackfaceVisibility: 'hidden',
              borderRadius:              4,
              padding:                   32,
              background:               '#FFFFFF',
              border:                   '1px solid #EBEBEB',
              display:                  'flex',
              flexDirection:            'column',
            }}
          >
            {/* Icon + number row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontSize: 32, lineHeight: 1 }}>{card.icon}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize:    13,
                fontWeight:  700,
                color:       '#AFAFAF',
              }}>
                {card.num}
              </span>
            </div>

            {/* Spacer pushes title to bottom half */}
            <div style={{ flex: 1 }} />

            {/* Title */}
            <h3 style={{
              fontFamily:  'var(--font-display)',
              fontWeight:   700,
              fontSize:     22,
              color:        '#1C1C1C',
              lineHeight:   1.25,
              margin:        0,
              marginBottom:  12,
            }}>
              {card.title}
            </h3>

            {/* Hover/tap hint */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:    11,
              color:       '#CCCCCC',
              margin:       0,
              opacity:     flipped ? 0 : 1,
              transition:  'opacity 0.2s ease',
            }}>
              {isTouch ? 'Tap to flip' : 'hover to reveal →'}
            </p>
          </div>

          {/* ── BACK FACE ──────────────────────────────────────────── */}
          <div
            style={{
              position:                 'absolute',
              inset:                     0,
              backfaceVisibility:       'hidden',
              WebkitBackfaceVisibility: 'hidden',
              borderRadius:              4,
              padding:                   32,
              background:               '#FFFFFF',
              border:                   '1px solid #D8D8D8',
              transform:                'rotateX(180deg)',
              display:                  'flex',
              flexDirection:            'column',
            }}
          >
            {/* Small number label */}
            <span style={{
              fontFamily:   'var(--font-mono)',
              fontSize:      11,
              color:         '#9B9B9B',
              marginBottom:  12,
              display:       'block',
            }}>
              {card.num}
            </span>

            {/* Title repeated (smaller) */}
            <h4 style={{
              fontFamily:   'var(--font-display)',
              fontWeight:    700,
              fontSize:      15,
              color:         '#1C1C1C',
              lineHeight:    1.3,
              margin:         0,
              marginBottom:   16,
            }}>
              {card.title}
            </h4>

            {/* Divider */}
            <div style={{
              height:        1,
              background:    '#E8E8E8',
              marginBottom:  16,
            }} />

            {/* Body text */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:    15,
              color:       '#4A4A4A',
              lineHeight:  1.7,
              margin:       0,
              flex:          1,
            }}>
              {card.body}
            </p>

            {/* Decorative emoji — bottom right */}
            <div style={{
              textAlign:  'right',
              fontSize:    20,
              opacity:     0.3,
              marginTop:   8,
              lineHeight:  1,
            }}>
              {card.icon}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  )
}

/* ─── Section ─────────────────────────────────────────────────────── */
export default function WhyMe() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) setIsTouch(true)
  }, [])

  return (
    <section id="why-me" data-section="why-me" className="relative py-24 overflow-hidden">
      {/* Static ambient blob — bottom right */}
      <div className="ambient-blob" style={{
        bottom: '-100px', right: '-100px',
        background: 'rgba(43,78,255,0.06)',
      }} />

      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* ── Section label (unchanged) ── */}
        <p className="film-label mb-6">Why Tanvi</p>

        {/* ── Heading + subtext (unchanged) ── */}
        <h2 className="font-display font-bold text-near-black text-4xl md:text-5xl mb-4">
          What makes me the ideal choice for you?
        </h2>
        <p className="font-body text-muted-text text-lg mb-16 max-w-lg">
          A few things I genuinely bring to every project — not just on paper, but in practice.
        </p>

        {/* ── Flip card grid ── */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {CARDS.map((card, i) => (
            <FlipCard
              key={card.num}
              card={card}
              entranceDelay={i * 0.15}
              isTouch={isTouch}
            />
          ))}
        </div>


      </div>
    </section>
  )
}
