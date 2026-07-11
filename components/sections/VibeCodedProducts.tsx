'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const BUTTON_BLUE = '#2563EB'

const PRODUCTS = [
  {
    id:          1,
    label:       'LOVABLE · FIRST CREATION',
    title:       'Movie recommendation tool for movie lovers.',
    desc:        'My first exploration with vibe coding created entirely with Lovable.',
    accent:      '#2D7A4F',
    imgFallback: '#F5F5F5',
    imgSrc:      '/Skill-vault/Movie.png',
    imgAlt:      'Galaxy Explorer — My First Lovable Creation',
    imgFit:      'cover'   as 'cover' | 'contain',
    imgPos:      'top center',
    cta:         { label: 'Explore', href: 'https://holo-reel-hub.lovable.app/' },
  },
  {
    id:          2,
    label:       'VIBE CODING · CLAUDE CODE',
    title:       'My First Vibe Coded Mobile Application',
    desc:        'FitForge is an AI-driven mobile application built with Claude Code — helping you efficiently manage your fitness journey with workout tracking, diet planning, and personalised guidance.',
    accent:      '#7C3AED',
    imgFallback: '#F5F5F5',
    imgSrc:      '/Skill-vault/Fitforge.png',
    imgAlt:      'FitForge — Vibe Coded Mobile Application',
    imgFit:      'contain' as 'cover' | 'contain',
    imgPos:      'center center',
    cta:         { label: 'Read Blog', href: 'https://fitforge-case-study.vercel.app/' },
  },
  {
    id:          3,
    label:       'AI TOOL · DESIGN',
    title:       'Concept Board Generator Tool',
    desc:        'An AI-powered tool to instantly generate visual concept boards — mood, tone, and direction all in one place, ready to inspire any design process.',
    accent:      '#E85D26',
    imgFallback: '#F5F5F5',
    imgSrc:      '/Skill-vault/Concept.png',
    imgAlt:      'Concept Board Generator Tool',
    imgFit:      'cover'   as 'cover' | 'contain',
    imgPos:      'center center',
    cta:         { label: 'Explore Tool', href: 'https://concept-board-generator.vercel.app/' },
  },
]

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const [hov, setHov]       = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex:          '1 1 0',
        minWidth:       0,
        borderRadius:   20,
        overflow:      'hidden',
        background:    '#FFFFFF',
        display:       'flex',
        flexDirection: 'column',
        transform:      hov ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow:      hov
          ? '0 20px 56px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.07)'
          : '0 4px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
        transition:    'transform 350ms ease, box-shadow 350ms ease',
      }}
    >
      {/* Image */}
      <div style={{
        position:  'relative',
        width:     '100%',
        height:     200,
        background: product.imgFallback,
        flexShrink: 0,
        overflow:  'hidden',
      }}>
        {!imgLoaded && (
          <div style={{
            position:       'absolute',
            inset:           0,
            background:     'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation:      'vcp-shimmer 1.5s infinite',
          }} />
        )}
        <Image
          src={product.imgSrc}
          alt={product.imgAlt}
          fill
          sizes="(max-width: 768px) 90vw, 33vw"
          onLoad={() => setImgLoaded(true)}
          style={{
            objectFit:      product.imgFit,
            objectPosition: product.imgPos,
            transform:      hov ? 'scale(1.03)' : 'scale(1)',
            transition:     'transform 600ms ease',
          }}
        />
      </div>

      {/* Content */}
      <div style={{
        padding:       '20px 20px 24px',
        display:       'flex',
        flexDirection: 'column',
        flex:           1,
      }}>
        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:       10,
          fontWeight:     700,
          color:          product.accent,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom:   10,
        }}>
          {product.label}
        </p>

        <h3 style={{
          fontFamily:   'var(--font-display)',
          fontWeight:    700,
          fontSize:      18,
          color:        '#1C1C1C',
          lineHeight:   1.3,
          marginBottom:  10,
        }}>
          {product.title}
        </h3>

        <p style={{
          fontFamily:   'var(--font-body)',
          fontSize:      13,
          color:        '#5A5A5A',
          lineHeight:   1.65,
          marginBottom:  20,
          flex:          1,
        }}>
          {product.desc}
        </p>

        {product.cta && (
          <a
            href={product.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              justifyContent: 'center',
              background:      BUTTON_BLUE,
              color:          'white',
              fontFamily:     'var(--font-body)',
              fontWeight:      600,
              fontSize:        13,
              padding:        '0 20px',
              borderRadius:    999,
              textDecoration: 'none',
              minHeight:       40,
              alignSelf:      'flex-start',
              letterSpacing:  '0.02em',
            }}
          >
            {product.cta.label}
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function VibeCodedProducts() {
  return (
    <section
      id="vibe-coded-products"
      data-section="vibe-coded-products"
      style={{
        background: '#F7F6F9',
        padding:    '100px 80px 100px',
      }}
    >
      <style>{`
        @keyframes vcp-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @media (max-width: 768px) {
          #vibe-coded-products {
            padding: 80px 24px 60px !important;
          }
          .vcp-grid {
            flex-direction: column !important;
          }
        }
        @media (min-width: 769px) {
          .vcp-grid > * {
            max-width: 340px;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <motion.p
          className="film-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 20 }}
        >
          BUILT WITH VIBES
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily:   'var(--font-display)',
            fontWeight:    700,
            fontSize:     'clamp(36px, 5vw, 56px)',
            color:        '#1C1C1C',
            lineHeight:   1.1,
            marginBottom:  12,
          }}
        >
          My Vibe Coded Products
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
          }}
        >
          Real products, shipped with AI — from zero to live.
        </motion.p>
      </div>

      {/* Cards */}
      <div
        className="vcp-grid"
        style={{
          display:        'flex',
          gap:             32,
          alignItems:     'stretch',
          justifyContent: 'center',
        }}
      >
        {PRODUCTS.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  )
}
