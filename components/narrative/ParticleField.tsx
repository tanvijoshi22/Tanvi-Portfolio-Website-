'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Props {
  beat: number
  explode: boolean
}

export default function ParticleField({ beat, explode }: Props) {
  const mountRef   = useRef<HTMLDivElement>(null)
  const explodeRef = useRef(explode)
  const beatRef    = useRef(beat)
  explodeRef.current = explode
  beatRef.current    = beat

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Scene + Camera ─────────────────────────────────────────────────────
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = 6

    // ── Particles ──────────────────────────────────────────────────────────
    const COUNT = 800
    const origPos   = new Float32Array(COUNT * 3)
    const velocities = new Float32Array(COUNT * 3)
    const positions  = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      origPos[i * 3]       = (Math.random() - 0.5) * 8
      origPos[i * 3 + 1]   = (Math.random() - 0.5) * 8
      origPos[i * 3 + 2]   = (Math.random() - 0.5) * 4
      velocities[i * 3]     = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01
    }
    positions.set(origPos)

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x2b4eff,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ─────────────────────────────────────────────────────
    let rafId: number
    let start: number | null = null
    let explosionTime = -9999

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp
      const t = (timestamp - start) / 1000

      if (explodeRef.current) explosionTime = t

      const pos = geo.attributes.position.array as Float32Array
      const elapsed = t - explosionTime
      const burst   = elapsed < 0.8 ? Math.max(0, 1 - elapsed * 1.25) : 0

      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3, iy = ix + 1
        pos[ix] = origPos[ix] + Math.sin(t * 0.4 + i * 0.3) * 0.3 + velocities[ix] * t * 20
        pos[iy] = origPos[iy] + Math.cos(t * 0.3 + i * 0.2) * 0.3 + velocities[iy] * t * 20
        if (burst > 0) {
          const angle = (i / COUNT) * Math.PI * 2
          pos[ix] += Math.cos(angle) * burst * 2
          pos[iy] += Math.sin(angle) * burst * 2
        }
      }
      geo.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])  // mount once — beat/explode read via refs

  return <div ref={mountRef} className="absolute inset-0" />
}
