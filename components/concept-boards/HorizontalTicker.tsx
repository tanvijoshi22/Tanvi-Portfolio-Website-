'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import ConceptCard, { type ConceptCardData } from './ConceptCard'

const CARDS: ConceptCardData[] = [
  {
    id:        1,
    title:     'Empowerment Through Design: Shaping Safer Worker Experiences',
    imgSrc:    '/Skill-vault/Concept-board/1.png',
    imgAlt:    'Concept board 1 — Worker Safety Design',
    bg:        '#0D1B2A',
    textColor: 'light',
    link:      'https://www.figma.com/proto/Dd6317LkunymVw4cuBj47U/My-portfolio-page?node-id=708-30965&viewport=273%2C169%2C0.04&t=RN3TJMnyp1m0gzC9-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=688%3A10977&page-id=104%3A6525',
  },
  {
    id:        2,
    title:     'Designing with a spirit of adventure — bold, focused, and delightful',
    imgSrc:    '/Skill-vault/Concept-board/2.png',
    imgAlt:    'Concept board 2 — Adventure & Fitness',
    bg:        '#0D2B1A',
    textColor: 'light',
    link:      'https://www.figma.com/proto/Dd6317LkunymVw4cuBj47U/My-portfolio-page?node-id=708-31274&viewport=273%2C169%2C0.04&t=RN3TJMnyp1m0gzC9-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=688%3A10977&page-id=104%3A6525',
  },
  {
    id:        3,
    title:     'Guided Simplicity in Product Experience',
    imgSrc:    '/Skill-vault/Concept-board/3.png',
    imgAlt:    'Concept board 3 — Guided Simplicity',
    bg:        '#EEF2F8',
    textColor: 'dark',
    link:      'https://www.figma.com/proto/Dd6317LkunymVw4cuBj47U/My-portfolio-page?node-id=708-31768&viewport=273%2C169%2C0.04&t=RN3TJMnyp1m0gzC9-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=688%3A10977&page-id=104%3A6525',
  },
  {
    id:        4,
    title:     'A high-tech, guided, and radiant design language that brings clarity and confidence to complex experiences.',
    imgSrc:    '/Skill-vault/Concept-board/4.png',
    imgAlt:    'Concept board 4 — High-tech Radiant Design',
    bg:        '#0A0F1E',
    textColor: 'light',
    link:      'https://www.figma.com/proto/Dd6317LkunymVw4cuBj47U/My-portfolio-page?node-id=708-31633&viewport=273%2C169%2C0.04&t=RN3TJMnyp1m0gzC9-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=688%3A10977&page-id=104%3A6525',
  },
  {
    id:        5,
    title:     'Modern, geometric design language that brings clarity and structure',
    imgSrc:    '/Skill-vault/Concept-board/5.png',
    imgAlt:    'Concept board 5 — Geometric Clarity',
    bg:        '#FAF8F5',
    textColor: 'dark',
    link:      'https://www.figma.com/proto/Dd6317LkunymVw4cuBj47U/My-portfolio-page?node-id=708-31442&viewport=273%2C169%2C0.04&t=RN3TJMnyp1m0gzC9-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=688%3A10977&page-id=104%3A6525',
  },
  {
    id:        6,
    title:     'Visionary design direction making the design look and feel futuristic',
    imgSrc:    '/Skill-vault/Concept-board/6.png',
    imgAlt:    'Concept board 6 — Futuristic Vision',
    bg:        '#080C14',
    textColor: 'light',
    link:      'https://www.figma.com/proto/Dd6317LkunymVw4cuBj47U/My-portfolio-page?node-id=708-31682&viewport=273%2C169%2C0.04&t=RN3TJMnyp1m0gzC9-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=688%3A10977&page-id=104%3A6525',
  },
]

const GAP      = 24
const CARD_W   = 440
const STEP     = 0.8  // px per frame when hovered

export default function HorizontalTicker() {
  const scrollRef   = useRef<HTMLDivElement>(null)
  const animRef     = useRef<number>(0)
  const hoveredRef  = useRef(false)

  const [canLeft,    setCanLeft]    = useState(false)
  const [canRight,   setCanRight]   = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef({ active: false, startX: 0, startScrollLeft: 0, moved: false })

  /* Update arrow visibility on scroll */
  const updateArrows = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 1)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }, [])

  useEffect(() => {
    updateArrows()
    const el = scrollRef.current
    el?.addEventListener('scroll', updateArrows, { passive: true })
    return () => el?.removeEventListener('scroll', updateArrows)
  }, [updateArrows])

  /* Hover-only auto-scroll via rAF */
  const tick = useCallback(() => {
    if (hoveredRef.current && !dragRef.current.active) {
      const el = scrollRef.current
      if (el) {
        el.scrollLeft += STEP
        /* Stop at the end */
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
          hoveredRef.current = false
        }
      }
    }
    animRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [tick])

  /* Arrow navigation */
  const scrollByCard = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * (CARD_W + GAP), behavior: 'smooth' })
  }

  /* Drag-to-scroll — no setPointerCapture so click events reach cards */
  const onPointerDown = (e: React.PointerEvent) => {
    if (!scrollRef.current) return
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startScrollLeft: scrollRef.current.scrollLeft,
      moved: false,
    }

    const onMove = (ev: PointerEvent) => {
      if (!dragRef.current.active || !scrollRef.current) return
      const dx = ev.clientX - dragRef.current.startX
      if (Math.abs(dx) > 4) {
        dragRef.current.moved = true
        setIsDragging(true)
      }
      scrollRef.current.scrollLeft = dragRef.current.startScrollLeft - dx
    }

    const onUp = () => {
      dragRef.current.active = false
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      setTimeout(() => {
        setIsDragging(false)
        dragRef.current.moved = false
      }, 50)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  /* Arrow button shared style */
  const arrowBtn = (visible: boolean): React.CSSProperties => ({
    position:      'absolute',
    top:           '50%',
    transform:     'translateY(-50%)',
    width:          48,
    height:         48,
    borderRadius:  '50%',
    background:    '#FFFFFF',
    border:        'none',
    boxShadow:     '0 4px 20px rgba(0,0,0,0.18)',
    display:       'flex',
    alignItems:    'center',
    justifyContent: 'center',
    cursor:        'pointer',
    zIndex:         10,
    opacity:        visible ? 1 : 0,
    pointerEvents:  visible ? 'auto' : 'none',
    transition:    'opacity 200ms ease, background 200ms ease, box-shadow 200ms ease, transform 200ms ease',
  })

  return (
    <section
      style={{
        background: '#0D1117',
        paddingBottom: 80,
        position:   'relative',
      }}
    >
      {/* Left arrow */}
      <button
        aria-label="Scroll left"
        onClick={() => scrollByCard(-1)}
        style={{ ...arrowBtn(canLeft), left: 16 }}
        onMouseEnter={e => {
          const b = e.currentTarget as HTMLButtonElement
          b.style.background  = '#F5F5F5'
          b.style.boxShadow   = '0 6px 28px rgba(0,0,0,0.25)'
          b.style.transform   = 'translateY(-50%) scale(1.05)'
        }}
        onMouseLeave={e => {
          const b = e.currentTarget as HTMLButtonElement
          b.style.background  = '#FFFFFF'
          b.style.boxShadow   = '0 4px 20px rgba(0,0,0,0.18)'
          b.style.transform   = 'translateY(-50%) scale(1)'
        }}
        data-cursor="nav"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="#1C1C1C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Right arrow */}
      <button
        aria-label="Scroll right"
        onClick={() => scrollByCard(1)}
        style={{ ...arrowBtn(canRight), right: 16 }}
        onMouseEnter={e => {
          const b = e.currentTarget as HTMLButtonElement
          b.style.background  = '#F5F5F5'
          b.style.boxShadow   = '0 6px 28px rgba(0,0,0,0.25)'
          b.style.transform   = 'translateY(-50%) scale(1.05)'
        }}
        onMouseLeave={e => {
          const b = e.currentTarget as HTMLButtonElement
          b.style.background  = '#FFFFFF'
          b.style.boxShadow   = '0 4px 20px rgba(0,0,0,0.18)'
          b.style.transform   = 'translateY(-50%) scale(1)'
        }}
        data-cursor="nav"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7.5 15L12.5 10L7.5 5" stroke="#1C1C1C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        onMouseEnter={() => { hoveredRef.current = true }}
        onMouseLeave={() => { hoveredRef.current = false }}
        onPointerDown={onPointerDown}
        data-cursor="drag"
        style={{
          display:              'flex',
          gap:                   GAP,
          overflowX:            'auto',
          overflowY:            'hidden',
          paddingLeft:          'clamp(24px, 6vw, 80px)',
          paddingRight:         'clamp(24px, 6vw, 80px)',
          paddingBottom:         8,
          paddingTop:            8,
          cursor:                isDragging ? 'grabbing' : 'grab',
          scrollbarWidth:       'none',
          touchAction:          'pan-y',
          /* Fade only on right edge */
          WebkitMaskImage:      'linear-gradient(to right, black 0%, black 88%, transparent 100%)',
          maskImage:            'linear-gradient(to right, black 0%, black 88%, transparent 100%)',
        } as React.CSSProperties}
      >
        {CARDS.map(card => (
          <ConceptCard
            key={card.id}
            card={card}
            isDragging={isDragging}
          />
        ))}
      </div>

    </section>
  )
}
