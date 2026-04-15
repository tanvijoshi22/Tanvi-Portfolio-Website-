'use client'
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Globe, FileText } from 'lucide-react'

/* ─── Contact card data (phone removed) ─────────────── */
const CARDS = [
  {
    icon:       Mail,
    label:      'Email',
    value:      'tanvi@email.com',
    href:       'mailto:tanvi@email.com',
    hoverColor: '#2B4EFF',
    external:   false,
  },
  {
    icon:       Globe,
    label:      'LinkedIn',
    value:      'linkedin.com/in/tanvi',
    href:       'https://www.linkedin.com/in/tanvi-joshi-ab32781a1/',
    hoverColor: '#2B4EFF',
    external:   true,
  },
  {
    icon:       FileText,
    label:      'Resume',
    value:      'Download PDF',
    href:       '/Resume-Tanvi.pdf',
    hoverColor: '#E85D26',
    external:   true,
  },
]

/* ─── Contact Card ───────────────────────────────────── */
interface CardProps {
  card:    typeof CARDS[0]
  index:   number
  visible: boolean
  mobile:  boolean
}

function ContactCard({ card, index, visible, mobile }: CardProps) {
  const [hovered, setHovered] = useState(false)
  const Icon     = card.icon
  const w        = mobile ? 120 : 158
  const h        = mobile ? 104 : 136
  const iconSize = mobile ? 26 : 32

  const handleClick = () => {
    if (!card.href) return
    if (card.external) window.open(card.href, '_blank', 'noopener noreferrer')
    else window.location.href = card.href
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      data-cursor="contact"
      style={{
        cursor:     'pointer',
        transform:  hovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      <div
        style={{
          width:        w,
          height:       h,
          background:  '#1A1A1A',
          borderRadius: 4,
          border:       `1px solid ${hovered ? card.hoverColor : '#2A2A2A'}`,
          boxShadow:    hovered
            ? `0 10px 32px ${card.hoverColor}33`
            : '0 4px 16px rgba(0,0,0,0.3)',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          gap:             mobile ? 5 : 8,
          transition:     'border-color 0.2s ease, box-shadow 0.2s ease',
          userSelect:     'none',
        }}
      >
        <Icon
          size={iconSize}
          style={{
            color:      hovered ? card.hoverColor : '#666666',
            transition: 'color 0.2s ease',
          }}
        />
        <span style={{
          fontFamily:    'var(--font-display)',
          fontWeight:     700,
          fontSize:       mobile ? 13 : 14,
          color:         'white',
          letterSpacing: '-0.01em',
        }}>
          {card.label}
        </span>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:       mobile ? 9 : 10,
          color:         '#888888',
          letterSpacing: '0.02em',
        }}>
          {card.value}
        </span>
      </div>
    </motion.div>
  )
}

/* ─── Typewriter heading ─────────────────────────────── */
const CONTACT_FULL  = "Let's talk"
const CONTACT_SPLIT = 6  // "Let's " → white, "talk" → blue

function AnimatedHeading({ triggered }: { triggered: boolean }) {
  const [displayed, setDisplayed] = useState('')
  const [done,      setDone]      = useState(false)

  useEffect(() => {
    if (!triggered) return
    let i = 0
    const t = setInterval(() => {
      i++
      setDisplayed(CONTACT_FULL.slice(0, i))
      if (i >= CONTACT_FULL.length) { setDone(true); clearInterval(t) }
    }, 60)
    return () => clearInterval(t)
  }, [triggered])

  const white = displayed.slice(0, CONTACT_SPLIT)
  const blue  = displayed.length > CONTACT_SPLIT ? displayed.slice(CONTACT_SPLIT) : ''

  return (
    <div style={{ lineHeight: 1.05 }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight:  800,
        fontSize:   'clamp(48px, 7vw, 80px)',
        color:      'white',
      }}>
        {white}
      </span>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight:  800,
        fontSize:   'clamp(48px, 7vw, 80px)',
        color:      '#2B4EFF',
      }}>
        {blue}
      </span>
      {!done && triggered && (
        <span className="blink" style={{ color: 'white', fontSize: 'clamp(48px, 7vw, 80px)', marginLeft: 2 }}>|</span>
      )}
    </div>
  )
}

/* ─── Main Contact Section ───────────────────────────── */
export default function Contact() {
  const sectionRef               = useRef<HTMLElement>(null)
  const [triggered, setTriggered] = useState(false)
  const [isMobile,  setIsMobile]  = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true) },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-section="contact"
      style={{
        background: '#0F0F0F',
        color:      'white',
        padding:    isMobile ? '56px 24px 40px' : '72px 60px 48px',
        position:   'relative',
        overflow:   'hidden',
      }}
    >
      {/* Ambient glow */}
      <motion.div
        style={{
          position:     'absolute',
          bottom:       '5%', left: '50%',
          transform:    'translateX(-50%)',
          width:         500, height: 500,
          borderRadius: '50%',
          background:   'radial-gradient(ellipse, rgba(43,78,255,0.07) 0%, transparent 70%)',
          filter:       'blur(40px)',
          pointerEvents:'none',
          zIndex:        0,
        }}
        animate={{ opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>

        {/* Heading zone */}
        <div style={{ marginBottom: isMobile ? 36 : 52 }}>
          <motion.div
            style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}
            initial={{ opacity: 0, y: 20 }}
            animate={triggered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <p className="film-label" style={{ color: '#6B6B6B' }}>CHAPTER VI — FIN</p>
          </motion.div>

          <div style={{ marginTop: 20, textAlign: isMobile ? 'center' : 'left' }}>
            <AnimatedHeading triggered={triggered} />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={triggered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
            style={{
              marginTop:   20,
              maxWidth:    480,
              fontFamily: 'var(--font-body)',
              fontSize:    15,
              color:       '#AAAAAA',
              lineHeight:  1.7,
              marginLeft:  isMobile ? 'auto' : 0,
              marginRight: isMobile ? 'auto' : 0,
              textAlign:   isMobile ? 'center' : 'left',
            }}
          >
            I&apos;d love to hear what you&apos;re building. Share the problem you&apos;re trying to solve, how your team is shaped, and where design lives in your process.
          </motion.p>
        </div>

        {/* Contact cards — 3 columns */}
        <div
          style={{
            display:               'grid',
            gridTemplateColumns:    isMobile ? 'repeat(3, auto)' : 'repeat(3, auto)',
            gap:                    isMobile ? 12 : 20,
            justifyContent:        'center',
            marginBottom:           isMobile ? 36 : 52,
          }}
        >
          {CARDS.map((card, i) => (
            <ContactCard
              key={card.label}
              card={card}
              index={i}
              visible={triggered}
              mobile={isMobile}
            />
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={triggered ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeInOut' }}
          style={{
            height:          1,
            background:     '#222',
            transformOrigin:'left center',
            marginBottom:    20,
          }}
        />

        {/* Footer row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={triggered ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            flexWrap:       'wrap',
            gap:             8,
            marginBottom:    24,
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#444', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            © 2026 Tanvi. All rights reserved.
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#444', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Coded by AI. Designed by me.
          </span>
        </motion.div>

        {/* Rolling credits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={triggered ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
          style={{ overflow: 'hidden', height: 20 }}
        >
          <div
            className="roll-credits"
            style={{ whiteSpace: 'nowrap' }}
            onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#333', letterSpacing: '0.1em' }}>
              Designed by Tanvi ✦ Coded by AI ✦ Built with Next.js ✦ Deployed on Vercel ✦ Typography: Plus Jakarta Sans &amp; DM Sans ✦ © 2026 ✦&nbsp;&nbsp;&nbsp;
              Designed by Tanvi ✦ Coded by AI ✦ Built with Next.js ✦ Deployed on Vercel ✦ Typography: Plus Jakarta Sans &amp; DM Sans ✦ © 2026 ✦&nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
