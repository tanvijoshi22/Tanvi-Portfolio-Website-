'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

/* ─── Polaroid data ──────────────────────────────────────────────── */
const COL_A_DATA = [
  { src: '/About-me/Location.jpg',      caption: 'Hyderabad ☀',      rotation: -3   },
  { src: '/About-me/Coffee.jpg',        caption: 'Coffee + pixels ☕', rotation:  1.5 },
  { src: '/About-me/Award.jpg',         caption: 'Award day 🏆',      rotation: -1   },
  { src: '/About-me/Cooking.jpg',       caption: 'Chef mode 👩‍🍳',     rotation:  2   },
  { src: '/About-me/Sunsets.jpg',       caption: 'Golden hour 🌅',    rotation: -2.5 },
]

const COL_B_DATA = [
  { src: '/About-me/Cat.jpg',           caption: 'My fur baby 🐱',   rotation:  2   },
  { src: '/About-me/Certificate-1.jpg', caption: 'Certified! ✨',     rotation: -1.5 },
  { src: '/About-me/Talent.jpg',        caption: 'On stage 🎤',       rotation:  1   },
  { src: '/About-me/Certificate-2.jpg', caption: 'Level up 🎓',       rotation: -2   },
  { src: '/About-me/Certificate-3.jpg', caption: 'Keep learning',     rotation:  2.5 },
]

const TIMELINE = [
  { year: '2020', role: 'Visual Design Apprentice',   company: 'UXReactor',             note: '6 months of training, built a real foundation in problem solving and design process.' },
  { year: '2021', role: 'Visual Experience Designer', company: 'UXReactor',             note: 'No more shadowing. Real projects, real problems, real ownership. This is where I found my design voice.' },
  { year: '2023', role: 'Senior UI Designer',         company: 'Lollypop Design Studio', note: 'Jumped across fintech, health, OTT, B2B, B2C — you name it. Turned out, variety was exactly what I needed.' },
]

/* ─── Types ──────────────────────────────────────────────────────── */
interface CardData {
  src:      string
  caption:  string
  rotation: number
}

type CardSize = 'desktop' | 'mobile'

/* ─── Single polaroid card ───────────────────────────────────────── */
function PolaroidCard({
  src, caption, rotation,
  onEnter, onLeave,
  size = 'desktop',
}: CardData & {
  onEnter: () => void
  onLeave: () => void
  size?: CardSize
}) {
  const [hovered, setHovered] = useState(false)

  const w       = size === 'mobile' ? 80  : 130
  const pad     = size === 'mobile' ? '8px 8px 28px 8px' : '10px 10px 40px 10px'
  const capSize = size === 'mobile' ? 8   : 9

  return (
    <div
      onMouseEnter={() => { setHovered(true);  onEnter() }}
      onMouseLeave={() => { setHovered(false); onLeave() }}
      style={{
        background:   '#FFFFFF',
        padding:      pad,
        borderRadius: 2,
        width:        w,
        flexShrink:   0,
        boxShadow:    hovered
          ? '0 12px 40px rgba(0,0,0,0.18)'
          : '0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
        transform: hovered
          ? 'scale(1.56) rotate(0deg)'
          : `scale(1) rotate(${rotation}deg)`,
        transition: '300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        position:   'relative',
        zIndex:     hovered ? 10 : 1,
      }}
    >
      {/* Photo */}
      <div style={{
        width:        '100%',
        aspectRatio:  '1 / 1',
        position:     'relative',
        overflow:     'hidden',
        background:   '#F0EEEB',
      }}>
        <Image
          src={src}
          alt={caption}
          fill
          style={{ objectFit: 'cover' }}
          sizes="130px"
        />
      </div>

      {/* Caption */}
      <div style={{
        marginTop:  size === 'mobile' ? 4 : 6,
        textAlign:  'center',
        fontSize:   capSize,
        color:      '#888888',
        fontFamily: '"Caveat", cursive',
        lineHeight: 1.2,
        userSelect: 'none',
      }}>
        {caption}
      </div>
    </div>
  )
}

/* ─── Desktop vertical column ────────────────────────────────────── */
function PolaroidColumn({
  data, direction, duration, paused, offset = 0, onCardHover,
}: {
  data:        CardData[]
  direction:   'up' | 'down'
  duration:    number
  paused:      boolean
  offset?:     number
  onCardHover: (h: boolean) => void
}) {
  const cards    = [...data, ...data]   // duplicate → seamless loop
  const animName = direction === 'up' ? 'scrollUp' : 'scrollDown'

  return (
    <div style={{
      display:             'flex',
      flexDirection:       'column',
      gap:                 12,
      marginTop:           offset,
      animation:           `${animName} ${duration}s linear infinite`,
      animationPlayState:  paused ? 'paused' : 'running',
      willChange:          'transform',
    }}>
      {cards.map((card, i) => (
        <PolaroidCard
          key={i}
          {...card}
          onEnter={() => onCardHover(true)}
          onLeave={() => onCardHover(false)}
        />
      ))}
    </div>
  )
}

/* ─── Mobile horizontal row ──────────────────────────────────────── */
function PolaroidHRow({
  data, direction, duration, onCardHover,
}: {
  data:        CardData[]
  direction:   'left' | 'right'
  duration:    number
  onCardHover: (h: boolean) => void
}) {
  const cards    = [...data, ...data]
  const animName = direction === 'left' ? 'scrollLeft' : 'scrollRight'

  return (
    <div style={{
      display:            'flex',
      flexDirection:      'row',
      gap:                12,
      animation:          `${animName} ${duration}s linear infinite`,
      willChange:         'transform',
      paddingRight:       12,
    }}>
      {cards.map((card, i) => (
        <PolaroidCard
          key={i}
          {...card}
          size="mobile"
          onEnter={() => onCardHover(true)}
          onLeave={() => onCardHover(false)}
        />
      ))}
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function About() {
  const [isMobile,         setIsMobile]         = useState(false)
  const [wallHovered,      setWallHovered]       = useState(false)
  const [colACardHovered,  setColACardHovered]   = useState(false)
  const [colBCardHovered,  setColBCardHovered]   = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  /* Slow on wall hover, pause on card hover */
  const slowMult   = 5
  const colADur    = wallHovered && !colACardHovered ? 18 * slowMult : 18
  const colBDur    = wallHovered && !colBCardHovered ? 22 * slowMult : 22
  const colAPaused = colACardHovered
  const colBPaused = colBCardHovered

  /* Gradient mask for wall edges */
  const wallMask: React.CSSProperties = {
    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
    maskImage:       'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
  }

  const hMask: React.CSSProperties = {
    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
    maskImage:       'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
  }

  return (
    <section id="about" data-section="about" style={{ position: 'relative' }}>

      {/* Static ambient blob — top left */}
      <div className="ambient-blob" style={{
        top: '-80px', left: '-80px',
        background: 'rgba(232,93,38,0.06)',
      }} />

      {/* ══════════════════════ TWO-COLUMN LAYOUT ══════════════════════ */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: isMobile ? '1fr' : '45% 55%',
        minHeight:           '100vh',
      }}>

        {/* ── LEFT: Polaroid Wall ─────────────────────────────────── */}
        {isMobile ? (

          /* Mobile → horizontal strip */
          <div style={{ overflow: 'hidden', padding: '40px 0 20px' }}>
            <div style={{
              overflow:       'hidden',
              height:         220,
              display:        'flex',
              flexDirection:  'column',
              gap:            12,
              ...hMask,
            }}>
              <PolaroidHRow
                data={COL_A_DATA}
                direction="left"
                duration={18}
                onCardHover={() => {}}
              />
              <PolaroidHRow
                data={COL_B_DATA}
                direction="right"
                duration={22}
                onCardHover={() => {}}
              />
            </div>
          </div>

        ) : (

          /* Desktop → vertical columns */
          <motion.div
            style={{ position: 'relative', overflow: 'hidden', height: '100%' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div
              onMouseEnter={() => setWallHovered(true)}
              onMouseLeave={() => setWallHovered(false)}
              style={{
                position:       'absolute',
                inset:          0,
                display:        'flex',
                gap:            32,
                justifyContent: 'center',
                alignItems:     'flex-start',
                padding:        '0 28px',
                overflow:       'hidden',
                ...wallMask,
              }}
            >
              {/* Column A — scrolls UP */}
              <PolaroidColumn
                data={COL_A_DATA}
                direction="up"
                duration={colADur}
                paused={colAPaused}
                offset={0}
                onCardHover={setColACardHovered}
              />

              {/* Column B — scrolls DOWN, offset 60px lower */}
              <PolaroidColumn
                data={COL_B_DATA}
                direction="down"
                duration={colBDur}
                paused={colBPaused}
                offset={60}
                onCardHover={setColBCardHovered}
              />
            </div>
          </motion.div>
        )}

        {/* ── RIGHT: Bio Content ──────────────────────────────────── */}
        <div style={{
          padding:        isMobile ? '40px 24px' : '80px 60px',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
        }}>
          <div style={{ maxWidth: 520 }}>

            {/* Section label */}
            <motion.p
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         '#6B6B6B',
                marginBottom:  20,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              — MY STORY
            </motion.p>

            {/* Heading */}
            <motion.h2
              style={{
                fontFamily:   'var(--font-display)',
                fontWeight:   700,
                fontSize:     isMobile ? 32 : 48,
                color:        '#1C1C1C',
                lineHeight:   1.1,
                marginBottom: 16,
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            >
              Get to Know<br />Me Better!
            </motion.h2>

            {/* Location badge */}
            <motion.div
              style={{ marginBottom: 32 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
            >
              <span style={{
                display:        'inline-flex',
                alignItems:     'center',
                background:     'white',
                border:         '1px solid #E5E5E5',
                borderRadius:   999,
                padding:        '6px 14px',
                fontFamily:     'var(--font-body)',
                fontSize:       13,
                color:          '#6B6B6B',
                boxShadow:      '0 1px 4px rgba(0,0,0,0.05)',
              }}>
                📍 Hyderabad, India
              </span>
            </motion.div>

            {/* Paragraph 1 */}
            <motion.p
              style={{
                fontFamily:   'var(--font-body)',
                fontSize:     isMobile ? 15 : 16,
                color:        '#4A4A4A',
                lineHeight:   1.7,
                marginBottom: 20,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              I&apos;m a Communication Design graduate who genuinely enjoys turning ideas into meaningful user experiences. My design journey began at UXReactor, starting with a 6-month training period that shaped my design thinking and built a strong foundation.
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p
              style={{
                fontFamily:   'var(--font-body)',
                fontSize:     isMobile ? 15 : 16,
                color:        '#4A4A4A',
                lineHeight:   1.7,
                marginBottom: 28,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
            >
              Currently, I work as a Senior UI Designer at Lollypop Design Studio, Hyderabad, designing across B2B and B2C products, websites, mobile apps, TV, and digital platforms. I enjoy being involved in shaping user experiences, storytelling through pitch decks, and collaborating closely with clients and teams.
            </motion.p>

            {/* Pull quote with animated left border */}
            <motion.div
              style={{
                position:    'relative',
                paddingLeft: 16,
                marginBottom: 24,
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
            >
              {/* Border draws itself */}
              <motion.div
                style={{
                  position:   'absolute',
                  left:        0,
                  top:         0,
                  width:       3,
                  background:  '#E85D26',
                  originY:     0,
                }}
                initial={{ height: '0%' }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.55 }}
              />
              <p style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize:   17,
                color:      '#E85D26',
                lineHeight: 1.5,
                margin:     0,
              }}>
                Every project helps me blend creativity with clarity to craft thoughtful design stories.
              </p>
            </motion.div>


          </div>
        </div>
      </div>

      {/* ══════════════════════ CAREER TIMELINE ══════════════════════ */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-24 pt-16">
        <div className="relative">
          <div className="absolute top-3 left-0 right-0 h-px bg-near-black/10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-accent-blue mb-4 relative z-10" />
                <p className="font-mono text-[13px] font-bold tracking-widest text-accent-blue uppercase mb-1">
                  {item.year}
                </p>
                <p className="font-display font-bold text-near-black text-lg leading-snug mb-0.5">
                  {item.role}
                </p>
                {item.company && (
                  <p className="font-body text-muted-text text-sm mb-2">{item.company}</p>
                )}
                <p className="font-body text-muted-text text-xs leading-relaxed">{item.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
