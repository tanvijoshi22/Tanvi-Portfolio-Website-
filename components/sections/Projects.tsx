'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { useLenis } from '@/contexts/LenisContext'

/* ─────────────────────────────────────────────────────────────────── */
/*  Data                                                               */
/* ─────────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'p1', index: '01',
    projectName: 'IoT Device Integration Platform',
    logoColor:   '#2B4EFF',
    tags:        ['IoT Device Integration', 'B2B', 'Product Design', 'Web | Mobile'],
    title:       'Transforming industrial worker safety with an IoT platform with seamless device integration',
    outcome:     'Real-time threat detection across web and mobile',
    href:        'https://www.figma.com/proto/Dd6317LkunymVw4cuBj47U/My-portfolio-page?page-id=104%3A6525&node-id=819-39408&viewport=77%2C218%2C0.06&t=3lZcSwKe5d3IUISK-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=819%3A39408',
    locked: false,
    bg:          'radial-gradient(circle at 85% 20%, rgba(43,78,255,0.20) 0%, transparent 55%), #0D1117',
    textColor:   '#FFFFFF',
    tagBg:       'rgba(255,255,255,0.12)',
    tagColor:    'rgba(255,255,255,0.80)',
    ctaColor:    '#FFFFFF',
    accentColor: '#2B4EFF',
    hoverShadow: '0 20px 60px rgba(0,0,0,0.38)',
    hoverBorder: 'rgba(255,255,255,0.13)',
    mockupSrc:   '/Project-images/Device-modal.jpg',
    mockupAlt:   'IoT Device Integration Platform mockup',
    mockupShadow:'0 20px 60px rgba(0,0,0,0.3)',
  },
  {
    id: 'p2', index: '02',
    projectName: 'Gym Management Web Application',
    logoColor:   '#FFFFFF',
    tags:        ['Gym Management', 'B2B', 'Visual Design', 'Design System', 'Web'],
    title:       'Cut booking conflicts and reduce scheduling time with AI powered gym management platform',
    outcome:     'AI-powered scheduling that eliminates booking friction',
    href:        'https://www.figma.com/proto/Dd6317LkunymVw4cuBj47U/My-portfolio-page?page-id=104%3A6525&node-id=149-11908&viewport=77%2C218%2C0.06&t=3lZcSwKe5d3IUISK-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=819%3A39408',
    locked: false,
    bg:          '#1A56FF',
    textColor:   '#FFFFFF',
    tagBg:       'rgba(255,255,255,0.18)',
    tagColor:    '#FFFFFF',
    ctaColor:    '#FFFFFF',
    accentColor: '#FFD234',
    hoverShadow: '0 20px 60px rgba(0,0,0,0.30)',
    hoverBorder: 'rgba(255,255,255,0.15)',
    mockupSrc:   '/Project-images/Dashboard.jpg',
    mockupAlt:   'Gym Management Dashboard mockup',
    mockupShadow:'0 20px 60px rgba(0,0,0,0.3)',
  },
  {
    id: 'p3', index: '03',
    projectName: 'Sony LIV OTT Application',
    logoColor:   '#7C3AED',
    tags:        ['OTT Platform', 'B2C', 'Product Design', 'Mobile | Web | TV | Tablet'],
    title:       'From Conversion Blocker to Playback Driver, Transformed Search Experience',
    outcome:     'Ongoing — available for discussion in interviews',
    href:        '#',
    locked: true,
    bg:          'radial-gradient(circle at 85% 20%, rgba(124,58,237,0.20) 0%, transparent 55%), #1A0533',
    textColor:   '#FFFFFF',
    tagBg:       'rgba(255,255,255,0.15)',
    tagColor:    '#FFFFFF',
    ctaColor:    '#FFFFFF',
    accentColor: '#7C3AED',
    hoverShadow: '0 20px 60px rgba(124,58,237,0.30)',
    hoverBorder: '#7C3AED',
    mockupSrc:   '/Project-images/Sony.jpg',
    mockupAlt:   'Sony LIV OTT Application mockup',
    mockupShadow:'0 20px 60px rgba(124,58,237,0.3)',
  },
]
type Project = typeof PROJECTS[0]

const FILTER_TABS = [
  { emoji: '🟣', text: 'IoT Device Integration Platform' },
  { emoji: '🔵', text: 'Gym Management Web Application' },
  { emoji: '🟣', text: 'Sony LIV OTT Application' },
]

/* ─────────────────────────────────────────────────────────────────── */
/*  Layout constants                                                    */
/* ─────────────────────────────────────────────────────────────────── */
const CARD_H       = 480
const STACKED_TOPS = [60, 68, 76]
const CARD_GAP     = 28
const INITIAL_TOPS = [
  STACKED_TOPS[0],
  STACKED_TOPS[0] + CARD_H + CARD_GAP,
  STACKED_TOPS[0] + (CARD_H + CARD_GAP) * 2,
]

/* ─────────────────────────────────────────────────────────────────── */
/*  Desktop project card                                               */
/* ─────────────────────────────────────────────────────────────────── */
interface CardProps {
  project:        Project
  topValue:       number | MotionValue<number>
  scaleValue:     number | MotionValue<number>
  overlayOpacity: number | MotionValue<number>
  zIndex:         number
  clipPath?:      MotionValue<string>
}

function ProjectCard({
  project, topValue, scaleValue, overlayOpacity, zIndex, clipPath,
}: CardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      style={{
        position:        'absolute',
        left: 0, right: 0, margin: '0 auto',
        width:           '100%',
        maxWidth:         780,
        height:           CARD_H,
        top:              topValue,
        zIndex,
        scale:            scaleValue,
        opacity:          1,
        transformOrigin: 'top center',
        isolation:       'isolate',
        clipPath,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="project"
    >
      {/* ── Card shell ── */}
      <motion.div
        animate={{
          y:           hovered ? -8 : 0,
          boxShadow:   hovered ? project.hoverShadow : '0 4px 28px rgba(0,0,0,0.10)',
          borderColor: hovered ? project.hoverBorder  : 'transparent',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          width:        '100%',
          height:       '100%',
          background:   project.bg,
          borderRadius:  24,
          border:       '1px solid transparent',
          overflow:     'hidden',
          position:     'relative',
        }}
      >
        {/* Burial overlay — covers card content when stacked beneath another card */}
        <motion.div
          style={{
            position:       'absolute',
            inset:           0,
            borderRadius:   'inherit',
            background:     '#000',
            opacity:         overlayOpacity,
            zIndex:          10,
            pointerEvents:  'none',
            transition:     'background 300ms ease',
          }}
        />

        {/* ── Two-zone layout ── */}
        <div style={{
          display:  'flex',
          height:   '100%',
          position: 'relative',
          zIndex:    2,
        }}>

          {/* ── LEFT ZONE — text (60%) ── */}
          <div style={{
            width:         '60%',
            padding:        40,
            display:       'flex',
            flexDirection: 'column',
            flexShrink:     0,
          }}>

            {/* Top: logo + project name + tags */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: project.logoColor,
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight:  700,
                  fontSize:    14,
                  color:       project.textColor,
                  letterSpacing: '-0.01em',
                }}>
                  {project.projectName}
                </span>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{
                    background:    project.tagBg,
                    color:         project.tagColor,
                    borderRadius:  999,
                    padding:       '4px 10px',
                    fontSize:       10,
                    fontFamily:    'var(--font-mono)',
                    letterSpacing: '0.04em',
                    lineHeight:     1.6,
                    textTransform: 'uppercase',
                    whiteSpace:    'nowrap',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Flex spacer */}
            <div style={{ flex: 1 }} />

            {/* Bottom: title + outcome + CTA */}
            <div>
              <h3 style={{
                fontFamily:       'var(--font-display)',
                fontWeight:        700,
                fontSize:         'clamp(18px, 1.75vw, 26px)',
                color:             project.textColor,
                lineHeight:        1.2,
                marginBottom:      12,
                display:          '-webkit-box',
                WebkitLineClamp:   3,
                WebkitBoxOrient:  'vertical',
                overflow:         'hidden',
              } as React.CSSProperties}>
                {project.title}
              </h3>

              <p style={{
                fontFamily:   'var(--font-body)',
                fontSize:      14,
                color:         project.textColor,
                opacity:       0.65,
                lineHeight:    1.55,
                margin:        '0 0 24px',
              }}>
                {project.outcome}
              </p>

              {/* CTA */}
              {project.locked ? (
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight:  600,
                  fontSize:    14,
                  color:       project.ctaColor,
                  display:    'inline-flex',
                  alignItems: 'center',
                  gap:         6,
                  opacity:     0.85,
                  border:     `1px solid ${project.ctaColor}`,
                  borderRadius: 4,
                  padding:    '6px 12px',
                }}>
                  🔒 Discuss in Interview
                </span>
              ) : (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily:     'var(--font-body)',
                    fontWeight:      600,
                    fontSize:        14,
                    color:           project.ctaColor,
                    textDecoration: 'none',
                    display:        'inline-flex',
                    alignItems:     'center',
                    gap:             4,
                  }}
                >
                  View Case Study
                  <span style={{
                    display:    'inline-block',
                    transform:   hovered ? 'translateX(4px)' : 'translateX(0)',
                    transition: 'transform 0.2s ease',
                  }}>
                    →
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* ── RIGHT ZONE — image mockup (40%) ── */}
          <div style={{
            width:          '40%',
            height:         '100%',
            flexShrink:      0,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            padding:        '20px 16px 20px 8px',
            overflow:       'hidden',
          }}>
            <motion.div
              animate={{ scale: hovered ? 1.04 : 1, y: hovered ? -4 : 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                position:     'relative',
                width:        '100%',
                height:       '100%',
                borderRadius:  8,
                overflow:     'hidden',
              }}
            >
              <Image
                src={project.mockupSrc}
                alt={project.mockupAlt}
                fill
                sizes="(max-width:768px) 50vw, 280px"
                style={{
                  objectFit:      'cover',
                  objectPosition: 'center top',
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* ── Bottom accent line — appears on hover ── */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position:        'absolute',
            bottom: 0, left: 0,
            height:           3,
            width:           '100%',
            background:       project.accentColor,
            transformOrigin: 'left center',
            zIndex:           11,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Mobile card                                                        */
/* ─────────────────────────────────────────────────────────────────── */
function MobileCard({ project, i }: { project: Project; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-60px' }}
      style={{
        background:    project.bg,
        borderRadius:  16,
        overflow:     'hidden',
        position:     'relative',
        padding:       24,
      }}
    >
      {/* Logo + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{
          width: 24, height: 24, borderRadius: '50%',
          background: project.logoColor, flexShrink: 0,
        }} />
        <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 700,
          fontSize: 13, color: project.textColor,
        }}>
          {project.projectName}
        </span>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            background: project.tagBg, color: project.tagColor,
            borderRadius: 999, padding: '3px 8px',
            fontSize: 9, fontFamily: 'var(--font-mono)',
            letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Image mockup */}
      <div style={{
        height: 160, borderRadius: 8,
        marginBottom: 20, position: 'relative', overflow: 'hidden',
      }}>
        <Image
          src={project.mockupSrc}
          alt={project.mockupAlt}
          fill
          sizes="(max-width:768px) 100vw, 400px"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 20, color: project.textColor,
        lineHeight: 1.25, marginBottom: 8,
      }}>
        {project.title}
      </h3>

      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 13,
        color: project.textColor, opacity: 0.65,
        lineHeight: 1.55, marginBottom: 20,
      }}>
        {project.outcome}
      </p>

      {/* CTA */}
      {project.locked ? (
        <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 600,
          fontSize: 13, color: project.ctaColor,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          border: `1px solid ${project.ctaColor}`,
          borderRadius: 4, padding: '5px 10px',
        }}>
          🔒 Discuss in Interview
        </span>
      ) : (
        <a href={project.href} target="_blank" rel="noopener noreferrer" style={{
          fontFamily: 'var(--font-body)', fontWeight: 600,
          fontSize: 13, color: project.ctaColor,
          textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}>
          View Case Study →
        </a>
      )}

      {/* Bottom accent line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        height: 3, width: '100%',
        background: project.accentColor,
      }} />
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Mobile section                                                     */
/* ─────────────────────────────────────────────────────────────────── */
function MobileProjects() {
  const [activeFilter, setActiveFilter] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardRefs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveFilter(i) },
        { threshold: 0.5 },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  const scrollToCard = (i: number) =>
    cardRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section id="work" data-section="work" style={{ paddingTop: 80, paddingBottom: 60, position: 'relative' }}>
      <div style={{ textAlign: 'center', padding: '0 24px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.p
            className="film-label"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
          >
            SELECTED WORK
          </motion.p>
        </div>
        <motion.h2
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 36, color: '#1C1C1C', marginTop: 12 }}
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}
        >
          Project Case Studies
        </motion.h2>
      </div>

      {/* Filter tabs */}
      <div style={{
        overflowX: 'auto', display: 'flex', gap: 8,
        padding: '0 24px 32px', scrollbarWidth: 'none',
      } as React.CSSProperties}>
        {FILTER_TABS.map((tab, i) => (
          <button key={i} onClick={() => scrollToCard(i)} style={{
            flexShrink: 0, minHeight: 44,
            background: 'white',
            border: `1px solid ${activeFilter === i ? '#2B4EFF' : '#E5E5E5'}`,
            color: activeFilter === i ? '#2B4EFF' : '#6B6B6B',
            borderRadius: 100, padding: '6px 14px',
            fontSize: 13, fontFamily: 'var(--font-body)',
            cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
            {tab.emoji} {tab.text}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '0 24px' }}>
        {PROJECTS.map((project, i) => (
          <div key={project.id} ref={el => { cardRefs.current[i] = el }}>
            <MobileCard project={project} i={i} />
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Desktop section                                                    */
/* ─────────────────────────────────────────────────────────────────── */
export default function Projects() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeFilter, setActiveFilter] = useState(0)
  const stackRef = useRef<HTMLDivElement>(null)
  const lenis    = useLenis()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    return scrollYProgress.on('change', v => {
      setActiveFilter(v < 0.33 ? 0 : v < 0.66 ? 1 : 2)
    })
  }, [scrollYProgress])

  const scrollToCard = (index: number) => {
    if (!stackRef.current) return
    const el  = stackRef.current
    const top = window.scrollY + el.getBoundingClientRect().top
    const target = top + [0, 0.33, 0.66][index] * el.offsetHeight
    if (lenis) lenis.scrollTo(target, { duration: 1.2 })
    else window.scrollTo({ top: target, behavior: 'smooth' })
  }

  /* ── Scroll-driven scale transforms ── */
  const card1Scale = useTransform(scrollYProgress, [0, 0.33, 0.66], [1, 0.98, 0.96])

  const card2Top   = useTransform(scrollYProgress, [0, 0.33], [INITIAL_TOPS[1], STACKED_TOPS[1]])
  const card2Scale = useTransform(scrollYProgress, [0.33, 0.66], [1, 0.98])

  const card3Top   = useTransform(scrollYProgress, [0.33, 0.66], [INITIAL_TOPS[2], STACKED_TOPS[2]])

  /* ── Burial overlays — high opacity so no content bleeds through ── */
  const card1Overlay = useTransform(
    scrollYProgress,
    [0.20, 0.33, 0.53, 0.66],
    [0,    0.72, 0.72, 0.85],
  )
  const card2Overlay = useTransform(
    scrollYProgress,
    [0.53, 0.66],
    [0,    0.72],
  )

  /* ── Clip lower cards so content hides behind card above ── */
  const card1ClipPath = useTransform(card2Top, (y: number) =>
    `inset(0px 0px ${Math.max(0, STACKED_TOPS[0] + CARD_H - y)}px 0px)`
  )
  const card2ClipPath = useTransform(card3Top, (y: number) =>
    `inset(0px 0px ${Math.max(0, STACKED_TOPS[1] + CARD_H - y)}px 0px)`
  )

  if (isMobile) return <MobileProjects />

  return (
    <section id="work" data-section="work" style={{ position: 'relative' }}>

      {/* Static ambient blob — bottom left */}
      <div className="ambient-blob" style={{
        bottom: '-100px', left: '-100px',
        background: 'rgba(43,78,255,0.06)',
      }} />

      {/* ── Section header ── */}
      <div style={{ textAlign: 'center', padding: '80px 24px 60px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.p
            className="film-label"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            SELECTED WORK
          </motion.p>
        </div>
        <motion.h2
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(36px, 4vw, 48px)', color: '#1C1C1C',
            marginTop: 16, lineHeight: 1.1,
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          viewport={{ once: true }}
        >
          Project Case Studies
        </motion.h2>

        <motion.div
          style={{ marginTop: 32, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {FILTER_TABS.map((tab, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              data-cursor="nav"
              style={{
                background: 'white',
                border: `1px solid ${activeFilter === i ? '#2B4EFF' : '#E5E5E5'}`,
                color: activeFilter === i ? '#2B4EFF' : '#6B6B6B',
                borderRadius: 100, padding: '6px 14px',
                fontSize: 13, fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, color 0.2s ease',
              }}
            >
              {tab.emoji} {tab.text}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── Stacking scroll zone ── */}
      <div ref={stackRef} style={{ height: 'calc(100vh * 3)' }}>
        <div style={{
          position: 'sticky', top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: 'transparent',
          padding: '0 24px',
        }}>
          <ProjectCard
            project={PROJECTS[0]}
            topValue={STACKED_TOPS[0]}
            scaleValue={card1Scale}
            overlayOpacity={card1Overlay}
            zIndex={1}
            clipPath={card1ClipPath}
          />
          <ProjectCard
            project={PROJECTS[1]}
            topValue={card2Top}
            scaleValue={card2Scale}
            overlayOpacity={card2Overlay}
            zIndex={2}
            clipPath={card2ClipPath}
          />
          <ProjectCard
            project={PROJECTS[2]}
            topValue={card3Top}
            scaleValue={1}
            overlayOpacity={0}
            zIndex={3}
          />
        </div>
      </div>

      <div style={{ height: 80 }} />
    </section>
  )
}
