'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

const CHAPTERS = [
  { num: 'I',   label: 'Hero',      href: '/#hero'    },
  { num: 'II',  label: 'Work',      href: '/#work'    },
  { num: 'III', label: 'Skills',    href: '/#skills'  },
  { num: 'IV',  label: 'About',     href: '/#about'   },
  { num: 'V',   label: 'Why Me',    href: '/#why-me'  },
  { num: 'VI',  label: 'Contact',   href: '/#contact' },
  { num: 'VII', label: 'Concepts',  href: '/concept-boards', active: true },
]

export default function ConceptFooter() {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid #1A1A1A' }}>
      {/* Chapter nav */}
      <div style={{
        padding:        'clamp(48px, 8vw, 80px) clamp(24px, 6vw, 80px)',
        borderBottom:   '1px solid #1A1A1A',
      }}>
        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:       10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         '#333',
          marginBottom:   32,
        }}>
          Navigate the story
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {CHAPTERS.map((ch, i) => (
            <motion.div
              key={ch.num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                href={ch.href}
                data-cursor="nav"
                style={{
                  display:        'flex',
                  alignItems:     'center',
                  gap:             10,
                  padding:        '10px 20px',
                  borderRadius:    999,
                  border:         `1px solid ${ch.active ? '#E85D26' : '#222'}`,
                  background:      ch.active ? 'rgba(232,93,38,0.08)' : 'transparent',
                  textDecoration: 'none',
                  transition:     'border-color 200ms ease, background 200ms ease',
                }}
              >
                <span style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:       10,
                  color:         ch.active ? '#E85D26' : '#444',
                  letterSpacing: '0.1em',
                }}>
                  Ch.{ch.num}
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:    13,
                  fontWeight:  600,
                  color:      ch.active ? '#F7F6F3' : '#555',
                }}>
                  {ch.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        flexWrap:       'wrap',
        gap:             16,
        padding:        '28px clamp(24px, 6vw, 80px)',
      }}>
        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:       11,
          color:         '#333',
          letterSpacing: '0.08em',
          margin:         0,
        }}>
          © {new Date().getFullYear()} Tanvi Joshi. All rights reserved.
        </p>

        <Link
          href="/#hero"
          data-cursor="nav"
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:       11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         '#444',
            textDecoration: 'none',
            transition:    'color 200ms ease',
          }}
        >
          Back to top ↑
        </Link>
      </div>
    </footer>
  )
}
