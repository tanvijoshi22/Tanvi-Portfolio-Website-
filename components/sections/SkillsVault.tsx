'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/* ─── Data ───────────────────────────────────────────────────────── */
const FOLDERS = [
  {
    id:      1 as const,
    label:   'Concept Boards',
    accent:  '#E85D26',
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
const PAPER_TOP = 130  // paddingTop on wrapper = room for papers to emerge

// Default: papers tucked inside folder body (behind the white surface)
const PAPERS_CLOSED = [
  { rotate: -4, y: PAPER_TOP + 40, x:  0 },
  { rotate: -1, y: PAPER_TOP + 20, x:  0 },
  { rotate:  2, y: PAPER_TOP + 30, x:  0 },
]

// Hover: papers emerge into the padding-top area (above folder body)
const PAPERS_HOVERED = [
  { rotate: -10, y: 18, x: -22 },
  { rotate:   0, y:  4, x:   0 },
  { rotate:  10, y: 12, x:  22 },
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
  const BODY_HEIGHT = 280

  return (
    <div
      style={{
        position:   'relative',
        width:       isMobile ? '100%' : 340,
        paddingTop:  isMobile ? 0 : PAPER_TOP,
        cursor:     'pointer',
      }}
      data-cursor="explore"
      data-cursor-color={folder.accent}
      onMouseEnter={() => { setHovered(true);  onHoverChange(true)  }}
      onMouseLeave={() => { setHovered(false); onHoverChange(false) }}
      onClick={() => window.open(folder.link, '_blank', 'noopener,noreferrer')}
    >
      {/* ── Papers — absolute, emerge above folder body on hover ── */}
      {!isMobile && folder.previewBgs.map((bg, i) => {
        const target = hovered ? PAPERS_HOVERED[i] : PAPERS_CLOSED[i]
        return (
          <motion.div
            key={i}
            animate={{ x: target.x, y: target.y, rotate: target.rotate }}
            transition={{
              duration: 0.5,
              ease:    [0.34, 1.20, 0.64, 1] as const,
              delay:    hovered ? i * 0.055 : (2 - i) * 0.04,
            }}
            style={{
              position:     'absolute',
              top:           0,
              left:         '50%',
              translateX:   '-50%',
              width:         200,
              height:        130,
              borderRadius:  14,
              background:    bg,
              zIndex:        i + 2,   // 2, 3, 4
              boxShadow:    '0 6px 20px rgba(0,0,0,0.12)',
              pointerEvents: 'none',
            }}
          />
        )
      })}

      {/* ── Folder body — z-index 5 covers papers in closed state ── */}
      <motion.div
        animate={{ y: hovered ? -6 : 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          position:     'relative',
          height:        BODY_HEIGHT,
          background:   '#FAFAF8',
          border:       `1.5px solid ${hovered ? folder.accent + '55' : '#E5E5E5'}`,
          borderRadius:  20,
          zIndex:        5,
          overflow:     'hidden',
          boxShadow:     hovered
            ? `0 18px 44px rgba(0,0,0,0.10), 0 0 0 3px ${folder.accent}18`
            : '0 2px 12px rgba(0,0,0,0.06)',
          transition:   'border-color 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        {/* Icon — top left */}
        <span style={{
          position: 'absolute',
          top:       18,
          left:      18,
          fontSize:  20,
          lineHeight: 1,
          userSelect: 'none',
        }}>
          {folder.icon}
        </span>

        {/* Arrow — top right, fades in on hover */}
        <motion.span
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -5 }}
          transition={{ duration: 0.2 }}
          style={{
            position:   'absolute',
            top:         18,
            right:       18,
            fontSize:    14,
            color:       folder.accent,
            fontWeight:  700,
            lineHeight:  1,
            userSelect: 'none',
          }}
        >
          ↗
        </motion.span>

        {/* Name chip — bottom center */}
        <div style={{
          position:       'absolute',
          bottom:          20,
          left:           '50%',
          transform:      'translateX(-50%)',
          background:     'white',
          border:         '1px solid rgba(0,0,0,0.08)',
          borderRadius:    999,
          padding:        '8px 24px',
          fontFamily:     'var(--font-body)',
          fontWeight:      700,
          fontSize:        15,
          color:          '#1C1C1C',
          whiteSpace:     'nowrap',
          boxShadow:      '0 2px 8px rgba(0,0,0,0.08)',
          pointerEvents:  'none',
          userSelect:     'none',
        }}>
          {folder.label}
        </div>
      </motion.div>
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
        padding:    isMobile ? '80px 24px' : '120px 24px',
        position:  'relative',
        overflowX: 'hidden',
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
            marginBottom:  isMobile ? 48 : 72,
          }}
        >
          Skills Vault
        </motion.h2>

        {/* Folder row */}
        <div style={{
          display:        'flex',
          flexDirection:   isMobile ? 'column' : 'row',
          gap:             isMobile ? 32 : 24,
          justifyContent: 'center',
          alignItems:     'flex-end',
        }}>
          {FOLDERS.map((folder, i) => (
            <motion.div
              key={folder.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type:      'spring',
                stiffness:  100,
                damping:    18,
                delay:      0.3 + i * 0.12,
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
