'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

/* ─── Panel data ────────────────────────────────────────────────── */
/* C-01 imgRotate false  C-02 desc  C-03 tags  C-04 stats[]
   C-05 cta              C-06 stats[]
   C-07 desc             C-08 tags[]  C-09 cta  C-10 shadow none  C-11 colRatio
   C-12 heading          C-13 cta                                              */

const PANELS = [
  {
    /* ── Panel 1 — Concept Boards ── */
    id:          1,
    num:         '01 / 04',
    icon:        '🎨',
    heading:     'Concept Boards',
    headingPx:   36,
    label2:      null as string | null,
    accent:      '#E85D26',
    sectionBg:   '#FDF0EC',
    bg:          'linear-gradient(135deg, #FFF4EE 0%, #FFE8D6 100%)',
    colRatio:    '40% 60%',
    /* C-02 */ desc:    'Visual direction setting through mood boards, foundations and framework — defining how a product feels before a single screen is designed.',
    tags:        [] as string[],
    stats:       [] as { v: string; l: string }[],
    badge:       null as string | null,
    cta:         { label: 'View All', href: '/concept-boards', align: 'left' as 'left' | 'right', newTab: true },
    imgSrc:      '/Skill-vault/Concepts.png',
    imgAlt:      'Concept Boards — Visual Direction Work',
    imgFallback: '#FFF4EE',
    imgFit:      'cover'   as 'cover' | 'contain',
    imgPos:      'top left',
    /* C-01 */ imgRotate:   false,
    imgPriority: true,
    imgShadow:   '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)',
    imgShadowHov:'0 24px 70px rgba(0,0,0,0.18), 0 6px 20px rgba(0,0,0,0.10)',
  },
  {
    /* ── Panel 2 — Design Systems ── */
    id:          2,
    num:         '02 / 04',
    icon:        '🧱',
    heading:     'Design Systems',
    headingPx:   36,
    label2:      null as string | null,
    accent:      '#2B4EFF',
    sectionBg:   '#EEF0FF',
    bg:          'linear-gradient(135deg, #EEF2FF 0%, #E0E8FF 100%)',
    colRatio:    '40% 60%',
    desc:        'Scalable component libraries, token structures, and documented patterns that bring consistency to every product I touch — across teams and platforms.',
    tags:        [] as string[],
    stats:       [] as { v: string; l: string }[],
    badge:       null as string | null,
    cta:         { label: 'View All', href: 'https://www.figma.com/proto/Dd6317LkunymVw4cuBj47U/My-portfolio-page?node-id=689-22823&viewport=273%2C169%2C0.04&t=RN3TJMnyp1m0gzC9-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=689%3A22823&page-id=104%3A6525', align: 'left' as 'left' | 'right' },
    imgSrc:      '/Skill-vault/Design-system.png',
    imgAlt:      'Design Systems — Component Library Work',
    imgFallback: '#EEF2FF',
    imgFit:      'cover'   as 'cover' | 'contain',
    imgPos:      'top left',
    imgRotate:   false,
    imgPriority: false,
    imgShadow:   '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)',
    imgShadowHov:'0 24px 70px rgba(0,0,0,0.18), 0 6px 20px rgba(0,0,0,0.10)',
  },
  {
    /* ── Panel 3 — FitForge ── */
    id:          3,
    num:         '03 / 04',
    icon:        '⚡',
    heading:     'My First Vibe Coded Mobile Application',
    headingPx:   28,
    label2:      'VIBE CODING · FIRST BUILD',
    accent:      '#7C3AED',
    sectionBg:   '#F3EEFF',
    bg:          'linear-gradient(135deg, #F3EEFF 0%, #E8D8FF 100%)',
    /* C-11 */ colRatio:    '30% 70%',
    /* C-07 */ desc:    'FitForge is an AI-driven mobile application that helps you efficiently manage your fitness journey — track workouts, plan diets, and get personalised guidance to hit your goals.',
    tags:        [] as string[],
    stats:       [] as { v: string; l: string }[],
    badge:       null as string | null,
    cta:         { label: 'View Project', href: '#', align: 'left' as 'left' | 'right' },
    imgSrc:      '/Skill-vault/Fitforge.png',
    imgAlt:      'FitForge — Vibe Coded Mobile Application',
    imgFallback: '#F3EEFF',
    imgFit:      'contain' as 'cover' | 'contain',
    imgPos:      'center center',
    imgRotate:   false,
    imgPriority: false,
    /* C-10 */ imgShadow:   'none',
    /* C-10 */ imgShadowHov:'none',
  },
  {
    /* ── Panel 4 — Movie Recommendation ── */
    id:          4,
    num:         '04 / 04',
    icon:        '💚',
    /* C-12 */ heading:     'My First Project — a movie recommendation website where you can explore and suggest movies across different genres.',
    /* C-12 */ headingPx:   20,
    label2:      'LOVABLE · FIRST CREATION',
    accent:      '#2D7A4F',
    sectionBg:   '#F0F7F2',
    bg:          'linear-gradient(135deg, #F0F7F0 0%, #E0EFE0 100%)',
    colRatio:    '40% 60%',
    desc:        'Built with love and a lot of iterations. My first project created entirely with Lovable — from idea to shipped product, no code handoff required.',
    tags:        [] as string[],
    stats:       [] as { v: string; l: string }[],
    badge:       null as string | null,
    cta:         { label: 'Explore Project', href: 'https://holo-reel-hub.lovable.app/', align: 'left' as 'left' | 'right' },
    imgSrc:      '/Skill-vault/Movie.png',
    imgAlt:      'Galaxy Explorer — My First Lovable Creation',
    imgFallback: '#0D1117',
    imgFit:      'cover'   as 'cover' | 'contain',
    imgPos:      'top center',
    imgRotate:   false,
    imgPriority: false,
    imgShadow:   '0 20px 60px rgba(0,0,0,0.20)',
    imgShadowHov:'0 24px 70px rgba(0,0,0,0.28)',
  },
]

const GAP = 20

/* ─── CTA button (handles hover state internally) ───────────────── */
function PanelCTA({ label, href, accent, align, newTab }: {
  label:   string
  href:    string
  accent:  string
  align:   'left' | 'right'
  newTab?: boolean
}) {
  const [hov, setHov] = useState(false)
  const isInternal = href.startsWith('/') && !newTab
  const sharedStyle: React.CSSProperties = {
    display:        'inline-flex',
    alignItems:     'center',
    justifyContent: 'center',
    background:      accent,
    color:          'white',
    fontFamily:     'var(--font-body)',
    fontWeight:      600,
    fontSize:        13,
    padding:        '0 20px',
    borderRadius:    999,
    textDecoration: 'none',
    minHeight:       44,
    minWidth:        44,
    cursor:         'pointer',
    opacity:         hov ? 0.88 : 1,
    transform:       hov ? 'translateY(-1px)' : 'none',
    transition:     'opacity 200ms ease, transform 200ms ease',
    letterSpacing:  '0.02em',
    whiteSpace:     'nowrap',
  }
  return (
    <div style={{ display: 'flex', justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
      {isInternal ? (
        <Link
          href={href}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={sharedStyle}
        >
          {label}
        </Link>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={sharedStyle}
        >
          {label}
        </a>
      )}
    </div>
  )
}

/* ─── Panel image with shimmer + Ken Burns hover ────────────────── */
function PanelImage({ panel, isMobile }: { panel: typeof PANELS[0]; isMobile: boolean }) {
  const [hov,    setHov]    = useState(false)
  const [loaded, setLoaded] = useState(false)

  const shadow = hov ? panel.imgShadowHov : panel.imgShadow

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:    'relative',
        width:        '100%',
        height:       isMobile ? 200 : '100%',
        borderRadius: 16,
        overflow:    'hidden',
        background:   panel.imgFallback,
        boxShadow:    shadow === 'none' ? undefined : shadow,
        transition:  'box-shadow 600ms ease',
        flexShrink:   0,
      }}
    >
      {!loaded && (
        <div
          className="sv-shimmer"
          style={{ position: 'absolute', inset: 0, borderRadius: 16, zIndex: 1 }}
        />
      )}

      <div style={{
        position:      'absolute',
        inset:          0,
        zIndex:         2,
        background:    'rgba(0,0,0,0.05)',
        opacity:        hov ? 1 : 0,
        transition:    'opacity 300ms ease',
        pointerEvents: 'none',
        borderRadius:   16,
      }} />

      <Image
        src={panel.imgSrc}
        alt={panel.imgAlt}
        fill
        priority={panel.imgPriority}
        sizes="(max-width: 768px) 88vw, 55vw"
        onLoad={() => setLoaded(true)}
        style={{
          objectFit:      panel.imgFit,
          objectPosition: panel.imgPos,
          transform:      `${panel.imgRotate ? 'rotate(1deg) ' : ''}scale(${hov ? 1.02 : 1})`,
          transition:     'transform 600ms ease',
        }}
      />
    </div>
  )
}

/* ─── Main section ──────────────────────────────────────────────── */
export default function SkillsVault() {
  const [isMobile,  setIsMobile]  = useState(false)
  const [active,    setActive]    = useState(0)
  const [progress,  setProgress]  = useState(0)
  const [showLeft,  setShowLeft]  = useState(false)
  const [showRight, setShowRight] = useState(true)
  const [inView,    setInView]    = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef  = useRef<HTMLDivElement>(null)

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
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el
      const max = scrollWidth - clientWidth
      setProgress(max > 0 ? scrollLeft / max : 0)
      setShowLeft(scrollLeft > 8)
      setShowRight(scrollLeft < max - 8)
      const panelW = window.innerWidth * (isMobile ? 0.88 : 0.85) + GAP
      setActive(Math.min(Math.max(Math.round(scrollLeft / panelW), 0), PANELS.length - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [isMobile])

  const scrollToPanel = useCallback((idx: number) => {
    const el = scrollRef.current
    if (!el) return
    const panelW = window.innerWidth * (isMobile ? 0.88 : 0.85) + GAP
    el.scrollTo({ left: idx * panelW, behavior: 'smooth' })
  }, [isMobile])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inView) return
      if (e.key === 'ArrowRight') scrollToPanel(Math.min(active + 1, PANELS.length - 1))
      if (e.key === 'ArrowLeft')  scrollToPanel(Math.max(active - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [inView, active, scrollToPanel])

  const accent    = PANELS[active].accent
  const sectionBg = PANELS[active].sectionBg
  const H         = isMobile ? 500 : 600
  const px        = isMobile ? 24 : 48

  return (
    <section
      id="skills-vault"
      data-section="skills-vault"
      ref={sectionRef}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <style>{`
        .sv-scroll::-webkit-scrollbar { display: none; }
        .sv-scroll { scrollbar-width: none; }
        @keyframes sv-arrow {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(6px); }
        }
        @keyframes sv-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .sv-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: sv-shimmer 1.5s infinite;
        }
      `}</style>

      <motion.div
        animate={{ backgroundColor: sectionBg }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: '#EEEDF0', zIndex: -1 }} />

      <div style={{ position: 'relative', zIndex: 1, paddingTop: isMobile ? 80 : 100 }}>

        {/* ── Header ── */}
        <div style={{ padding: `0 ${px}px 40px` }}>
          <motion.p
            className="film-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 20 }}
          >
            MY EXPERTISE
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily:   'var(--font-display)',
              fontWeight:   700,
              fontSize:     isMobile ? 40 : 'clamp(40px, 5vw, 56px)',
              color:        '#1C1C1C',
              lineHeight:   1.1,
              marginBottom: 12,
            }}
          >
            Skills Vault
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   16,
              color:      '#6B6B6B',
              display:    'flex',
              alignItems: 'center',
              gap:         4,
            }}
          >
            Scroll to explore what I do best
            <span style={{ display: 'inline-block', animation: 'sv-arrow 1.2s ease-in-out infinite' }}>→</span>
          </motion.p>
        </div>

        {/* ── Scroll area ── */}
        <div style={{ position: 'relative' }}>
          <motion.div
            ref={scrollRef}
            className="sv-scroll"
            data-cursor="scroll"
            data-cursor-color={accent}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display:        'flex',
              overflowX:      'scroll',
              overflowY:      'hidden',
              scrollSnapType: 'x mandatory',
              height:          H,
              padding:        `16px ${px}px`,
            } as React.CSSProperties}
          >
            {PANELS.map((panel, i) => {
              const isActive = active === i
              const colRatio = isMobile ? '1fr' : panel.colRatio

              return (
                <div
                  key={panel.id}
                  style={{
                    width:           isMobile ? '88vw' : '85vw',
                    height:          '100%',
                    flexShrink:       0,
                    marginRight:      GAP,
                    borderRadius:     20,
                    overflow:        'hidden',
                    background:       panel.bg,
                    scrollSnapAlign: 'start',
                    opacity:          isActive ? 1 : 0.7,
                    transform:        isActive ? 'scale(1)' : 'scale(0.97)',
                    transition:      'opacity 400ms ease, transform 400ms ease',
                    padding:          isMobile ? '24px 20px' : '36px 40px',
                    display:         'flex',
                    flexDirection:   'column',
                    boxSizing:       'border-box',
                  } as React.CSSProperties}
                >
                  {/* Top bar */}
                  <div style={{ marginBottom: 24, flexShrink: 0 }}>
                    <span style={{
                      background:    panel.accent + '22',
                      color:         panel.accent,
                      fontFamily:    'var(--font-mono)',
                      fontSize:       11,
                      fontWeight:     700,
                      letterSpacing: '0.1em',
                      padding:       '4px 10px',
                      borderRadius:   999,
                    }}>
                      {panel.num}
                    </span>
                  </div>

                  {/* Two-column grid */}
                  <div style={{
                    flex:                1,
                    display:             'grid',
                    gridTemplateColumns: colRatio,
                    gap:                  28,
                    minHeight:            0,
                    overflow:            'hidden',
                  }}>

                    {/* Left: text */}
                    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
                      {panel.label2 && (
                        <p style={{
                          fontFamily:    'var(--font-mono)',
                          fontSize:       10,
                          color:          panel.accent,
                          textTransform: 'uppercase',
                          letterSpacing: '0.15em',
                          marginBottom:   8,
                          flexShrink:     0,
                        }}>
                          {panel.label2}
                        </p>
                      )}

                      <h3 style={{
                        fontFamily:   'var(--font-display)',
                        fontWeight:    700,
                        fontSize:      isMobile ? Math.min(panel.headingPx, 22) : panel.headingPx,
                        color:        '#1C1C1C',
                        lineHeight:   1.25,
                        marginBottom:  12,
                        flexShrink:    0,
                      }}>
                        {panel.heading}
                      </h3>

                      <p style={{
                        fontFamily:    'var(--font-body)',
                        fontSize:       14,
                        color:         '#4A4A4A',
                        lineHeight:    1.7,
                        marginBottom:  16,
                        flexShrink:    0,
                        display:       '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient:'vertical',
                        overflow:      'hidden',
                      } as React.CSSProperties}>
                        {panel.desc}
                      </p>

                      {/* CTA — always left-aligned, directly below description */}
                      {panel.cta && (
                        <div style={{ marginBottom: 8, flexShrink: 0 }}>
                          <PanelCTA
                            label={panel.cta.label}
                            href={panel.cta.href}
                            accent={panel.accent}
                            align="left"
                            newTab={panel.cta.newTab}
                          />
                        </div>
                      )}

                      <div style={{ flex: 1 }} />
                    </div>

                    {/* Right: image */}
                    <PanelImage panel={panel} isMobile={isMobile} />
                  </div>
                </div>
              )
            })}

            <div style={{ flexShrink: 0, width: px, height: 1 }} />
          </motion.div>

          {/* Left arrow */}
          {!isMobile && (
            <button
              onClick={() => scrollToPanel(Math.max(active - 1, 0))}
              aria-label="Previous panel"
              style={{
                position:       'absolute',
                left:            16,
                top:            '50%',
                transform:      'translateY(-50%)',
                width:           44,
                height:          44,
                borderRadius:   '50%',
                background:     'white',
                border:         'none',
                boxShadow:      '0 4px 16px rgba(0,0,0,0.12)',
                cursor:         'pointer',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontSize:        18,
                opacity:         showLeft ? 1 : 0,
                pointerEvents:   showLeft ? 'auto' : 'none',
                transition:     'opacity 200ms ease',
                zIndex:          10,
              }}
            >←</button>
          )}

          {/* Right arrow */}
          {!isMobile && (
            <button
              onClick={() => scrollToPanel(Math.min(active + 1, PANELS.length - 1))}
              aria-label="Next panel"
              style={{
                position:       'absolute',
                right:           16,
                top:            '50%',
                transform:      'translateY(-50%)',
                width:           44,
                height:          44,
                borderRadius:   '50%',
                background:     'white',
                border:         'none',
                boxShadow:      '0 4px 16px rgba(0,0,0,0.12)',
                cursor:         'pointer',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontSize:        18,
                opacity:         showRight ? 1 : 0,
                pointerEvents:   showRight ? 'auto' : 'none',
                transition:     'opacity 200ms ease',
                zIndex:          10,
              }}
            >→</button>
          )}
        </div>

        {/* ── Dot indicators ── */}
        <div style={{
          display:        'flex',
          justifyContent: 'center',
          gap:             8,
          padding:         isMobile ? '20px 0 8px' : '24px 0 8px',
        }}>
          {PANELS.map((p, i) => (
            <button
              key={i}
              onClick={() => scrollToPanel(i)}
              aria-label={`Go to panel ${i + 1}`}
              style={{
                width:        active === i ? 24 : (isMobile ? 12 : 8),
                height:       isMobile ? 12 : 8,
                borderRadius:  999,
                background:   active === i ? p.accent : '#CCCCCC',
                border:       'none',
                cursor:       'pointer',
                padding:       0,
                transition:   'width 300ms ease, background 300ms ease',
              }}
            />
          ))}
        </div>

        {/* ── Progress bar ── */}
        <div style={{ width: '100%', height: 2, background: '#E5E5E5', marginTop: 12 }}>
          <motion.div
            animate={{ width: `${progress * 100}%`, backgroundColor: accent }}
            transition={{ duration: 0.1, ease: 'linear' }}
            style={{ height: '100%' }}
          />
        </div>

        <div style={{ height: 60 }} />
      </div>
    </section>
  )
}
