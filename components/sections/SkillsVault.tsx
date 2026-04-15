'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

/* ─── Data ───────────────────────────────────────────────────────── */
const FOLDERS = [
  {
    id:      1 as const,
    label:   'Concept Boards',
    accent:  '#E85D26',
    num:     '01',
    icon:    '🎨',
    link:    'https://www.figma.com/proto/Dd6317LkunymVw4cuBj47U/My-portfolio-page?page-id=104%3A6525&node-id=688-10977&viewport=77%2C218%2C0.06&t=3lZcSwKe5d3IUISK-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=688%3A10977',
    previewBgs: [
      'linear-gradient(135deg,#F5C8BC,#E89888)',
      'linear-gradient(135deg,#FBE0D0,#F0C0A0)',
      'linear-gradient(135deg,#F0D8C8,#D8B8A8)',
    ],
  },
  {
    id:      2 as const,
    label:   'Design Systems',
    accent:  '#2B4EFF',
    num:     '02',
    icon:    '🧱',
    link:    'https://www.figma.com/proto/Dd6317LkunymVw4cuBj47U/My-portfolio-page?page-id=104%3A6525&node-id=689-22823&viewport=77%2C218%2C0.06&t=3lZcSwKe5d3IUISK-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=689%3A22823',
    previewBgs: [
      'linear-gradient(135deg,#C4D4FF,#90B0FF)',
      'linear-gradient(135deg,#D4E0FF,#A8BCEF)',
      'linear-gradient(135deg,#D8E8FF,#B0C4F0)',
    ],
  },
  {
    id:      3 as const,
    label:   'Vibe Coding',
    accent:  '#7C3AED',
    num:     '03',
    icon:    '⚡',
    link:    'https://holo-reel-hub.lovable.app/',
    previewBgs: [
      'linear-gradient(135deg,#D8C8FF,#B098E8)',
      'linear-gradient(135deg,#E0D4FF,#C0A0E0)',
      'linear-gradient(135deg,#E8DCFF,#C8B0EC)',
    ],
  },
]

const SECTION_TINTS: Record<number, string> = {
  1: '#FDF0EC',
  2: '#EEF0FF',
  3: '#F3EEFF',
}

type FolderId   = 1 | 2 | 3
type FolderData = typeof FOLDERS[0]

/* ─── Paper positions ────────────────────────────────────────────── */
const PAPERS_CLOSED = [
  { rotate: -4, y: 22, x:   0 },
  { rotate: -1, y: 16, x:   0 },
  { rotate:  2, y: 19, x:   0 },
]
const PAPERS_HOVERED = [
  { rotate: -9, y: 56, x: -14 },
  { rotate:  0, y: 40, x:   0 },
  { rotate:  8, y: 48, x:  14 },
]

/* ─── Single Folder ──────────────────────────────────────────────── */
function Folder({
  folder, isMobile, onHoverChange,
}: {
  folder:        FolderData
  isMobile:      boolean
  onHoverChange: (h: boolean) => void
}) {
  const [hovered, setHovered] = useState(false)
  const tiltRef  = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)

  const BODY_HEIGHT = 232

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !tiltRef.current) return
    const rect = tiltRef.current.getBoundingClientRect()
    const cx   = (e.clientX - rect.left) / rect.width  - 0.5
    const cy   = (e.clientY - rect.top)  / rect.height - 0.5
    tiltRef.current.style.transition = 'transform 0.08s ease-out'
    tiltRef.current.style.transform  =
      `perspective(900px) rotateX(${(-cy * 6).toFixed(2)}deg) rotateY(${(cx * 10).toFixed(2)}deg)`
    if (shineRef.current) {
      const sx = Math.round((0.5 - cx) * 100)
      const sy = Math.round((0.5 - cy) * 100)
      shineRef.current.style.background =
        `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.32), transparent 62%)`
      shineRef.current.style.opacity = '0.12'
    }
  }

  const handleMouseEnter = () => {
    setHovered(true)
    onHoverChange(true)
  }

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    onHoverChange(false)
    if (tiltRef.current) {
      tiltRef.current.style.transition = 'transform 0.6s cubic-bezier(0.34,1.10,0.64,1)'
      tiltRef.current.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
    }
    if (shineRef.current) {
      shineRef.current.style.opacity = '0'
    }
  }, [onHoverChange])

  return (
    <div
      style={{
        width:      isMobile ? '100%' : 340,
        flexShrink: 0,
        position:   'relative',
      }}
      data-cursor="explore"
      data-cursor-color={folder.accent}
    >
      {/* Tilt wrapper */}
      <div
        ref={tiltRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={() => window.open(folder.link, '_blank', 'noopener,noreferrer')}
        style={{
          transformStyle: 'preserve-3d',
          willChange:     'transform',
          position:       'relative',
          cursor:         'pointer',
        }}
      >
        {/* ── Tab ── */}
        <div style={{
          height:          48,
          width:           '62%',
          background:      folder.accent,
          borderRadius:   '8px 8px 0 0',
          display:        'flex',
          alignItems:     'center',
          gap:             8,
          padding:        '0 14px',
          filter:          hovered ? 'brightness(1.12)' : 'brightness(1)',
          transition:     'filter 0.25s ease',
          position:       'relative',
          zIndex:          2,
          userSelect:     'none',
        }}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>{folder.icon}</span>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:       11,
            fontWeight:     700,
            color:         'rgba(255,255,255,0.7)',
            letterSpacing: '0.08em',
          }}>{folder.num}</span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight:  700,
            fontSize:    14,
            color:      'white',
            flex:         1,
          }}>{folder.label}</span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize:    13,
            color:      'rgba(255,255,255,0.85)',
            fontWeight:  600,
          }}>↗</span>
        </div>

        {/* ── Folder body ── */}
        <motion.div
          animate={{
            y: hovered ? -12 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.34, 1.10, 0.64, 1] }}
          style={{
            background:    '#FAFAF8',
            border:       '1px solid #E5E5E5',
            borderRadius: '0 12px 16px 16px',
            overflow:     'hidden',
            position:     'relative',
            height:        BODY_HEIGHT,
          }}
        >
          {/* Preview papers */}
          <div style={{
            position:      'absolute',
            inset:          0,
            overflow:      'hidden',
            pointerEvents: 'none',
          }}>
            {folder.previewBgs.map((bg, i) => {
              const target = (hovered && !isMobile) ? PAPERS_HOVERED[i] : PAPERS_CLOSED[i]
              return (
                <motion.div
                  key={i}
                  animate={{
                    x:      target.x,
                    y:      target.y,
                    rotate: target.rotate,
                  }}
                  transition={{
                    duration: 0.45,
                    ease:     [0.34, 1.20, 0.64, 1] as const,
                    delay:    hovered ? i * 0.05 : (2 - i) * 0.04,
                  }}
                  style={{
                    position:    'absolute',
                    top:          0,
                    left:        '50%',
                    translateX:  '-50%',
                    width:        isMobile ? 160 : 200,
                    height:       isMobile ? 90 : 120,
                    borderRadius: 8,
                    background:   bg,
                    zIndex:       i,
                  }}
                />
              )
            })}

            {/* Hover hint */}
            <motion.p
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position:      'absolute',
                bottom:         14,
                left:            0, right: 0,
                textAlign:     'center',
                fontFamily:    'var(--font-body)',
                fontSize:       11,
                color:          '#AAAAAA',
                margin:          0,
                pointerEvents: 'none',
              }}
            >
              Click to explore →
            </motion.p>
          </div>
        </motion.div>

        {/* Shine overlay */}
        <div
          ref={shineRef}
          style={{
            position:      'absolute',
            inset:          0,
            borderRadius:  '8px 12px 16px 16px',
            pointerEvents: 'none',
            opacity:        0,
            transition:    'opacity 0.15s ease',
            zIndex:         5,
          }}
        />
      </div>
    </div>
  )
}

/* ─── Main section ───────────────────────────────────────────────── */
export default function SkillsVault() {
  const [hoveredFolder, setHoveredFolder] = useState<FolderId | null>(null)
  const [isMobile,      setIsMobile]      = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const tintColor = hoveredFolder ? SECTION_TINTS[hoveredFolder] : 'transparent'

  return (
    <section
      id="skills-vault"
      data-section="skills-vault"
      style={{
        padding:   isMobile ? '80px 24px' : '120px 24px',
        position:  'relative',
        overflow:  'hidden',
      }}
    >
      {/* Background color bleed */}
      <motion.div
        animate={{ backgroundColor: tintColor }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Ambient blob */}
      <div className="ambient-blob" style={{
        top: '-80px', right: '-80px',
        background: 'rgba(124,58,237,0.07)',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="film-label"
          style={{ marginBottom: 20 }}
        >
          MY EXPERTISE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          style={{
            fontFamily:   'var(--font-display)',
            fontWeight:    700,
            fontSize:     'clamp(40px, 5vw, 56px)',
            color:         '#1C1C1C',
            lineHeight:    1.1,
            marginBottom:  12,
          }}
        >
          Skills Vault
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
          style={{
            fontFamily:   'var(--font-body)',
            fontSize:      16,
            color:         '#6B6B6B',
            marginBottom:  isMobile ? 48 : 72,
          }}
        >
          Three things I do really well. Click a folder to explore.
        </motion.p>

        {/* Folder row */}
        <div style={{
          display:        'flex',
          flexDirection:   isMobile ? 'column' : 'row',
          gap:             24,
          justifyContent: 'center',
          alignItems:     'flex-start',
        }}>
          {FOLDERS.map((folder, i) => (
            <motion.div
              key={folder.id}
              initial={{ opacity: 0, y: -60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type:      'spring',
                stiffness:  120,
                damping:    20,
                delay:      0.4 + i * 0.15,
              }}
              style={{ width: isMobile ? '100%' : 340 }}
            >
              <Folder
                folder={folder}
                isMobile={isMobile}
                onHoverChange={(h) => setHoveredFolder(h ? folder.id : null)}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
