/**
 * HeroArt Component - Issue 14 + 14.2 + 14.2b
 * 
 * Composite creative identity block for the Hero section.
 * Combines:
 * - Portrait silhouette SVG
 * - Dynamic glow effect
 * - Floating tech icons
 * - Parallax motion response to mouse (desktop)
 * - Touch parallax + idle micro-motion (mobile)
 * 
 * Features:
 * - Layered motion architecture (parallax layer + idle layer)
 * - Full reduced motion support
 * - Theme-aware styling
 * - Responsive sizing
 * - Desktop + Mobile motion systems
 * 
 * Motion Priority:
 * Desktop:
 * 1. Mouse move → parallax active, idle paused
 * 2. Mouse idle (1.5s) → idle resumes
 * 
 * Mobile:
 * 1. Touch active → touch parallax, idle paused
 * 2. Touch end → idle resumes after decay
 * 
 * Reduced motion → fully static
 */

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Portrait from './Portrait'
import TechFloaters from './TechFloaters'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useTouchParallax } from '../../hooks/useTouchParallax'
import { useDesktopParallax } from '../../hooks/useDesktopParallax'
import { useIdleControl } from '../../hooks/useIdleControl'
import { zoomIn } from '../../motion'

interface HeroArtProps {
  className?: string
}

export default function HeroArt({ className = '' }: HeroArtProps) {
  const prefersReducedMotion = useReducedMotion()
  
  // Refs for the two-layer architecture
  const parallaxLayerRef = useRef<HTMLDivElement>(null)
  const idleLayerRef = useRef<HTMLDivElement>(null)
  
  // Interaction state - controls idle animation pause
  const [isInteracting, setIsInteracting] = useState(false)

  // Desktop parallax - only on pointer:fine devices
  useDesktopParallax(parallaxLayerRef, {
    maxX: 15,
    maxY: 15,
    sensitivityX: 40,
    sensitivityY: 40,
    idleTimeout: 1500,
    onMouseMove: () => setIsInteracting(true),
    onMouseIdle: () => setIsInteracting(false),
  })

  // Mobile touch parallax - only on pointer:coarse devices
  useTouchParallax(parallaxLayerRef, {
    maxX: 12,
    maxY: 12,
    sensitivityX: 10,
    sensitivityY: 12,
    decayDuration: 350,
    onTouchStart: () => setIsInteracting(true),
    onTouchEnd: () => setIsInteracting(false),
  })

  // Control idle animation based on interaction state
  useIdleControl(idleLayerRef, {
    isInteracting,
    resumeDelay: 350,
  })

  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  return (
    <MotionDiv
      {...(!prefersReducedMotion && {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true },
        variants: zoomIn,
      })}
      className={`relative ${className}`}
    >
      <div className="relative w-full max-w-[320px] md:max-w-[380px] mx-auto perspective-1000">
        {/* Dynamic glow behind portrait */}
        <div
          className="absolute inset-0 rounded-full blur-3xl scale-110"
          style={{
            background: 'radial-gradient(circle at center, var(--color-hero-glow) 0%, transparent 70%)',
            opacity: prefersReducedMotion ? 0.8 : 1,
          }}
          aria-hidden="true"
        />

        {/* 
          Two-layer architecture for motion:
          - Outer layer (parallaxLayerRef): receives JS transform from mouse/touch
          - Inner layer (idleLayerRef): receives CSS idle animation
          This prevents transform conflicts between JS and CSS animations
        */}
        <div
          ref={parallaxLayerRef}
          className="hero-parallax-layer"
        >
          <div
            ref={idleLayerRef}
            className={`hero-idle-layer relative aspect-[5/6] rounded-2xl overflow-visible ${
              !prefersReducedMotion ? 'hero-idle' : ''
            }`}
          >
            {/* Portrait SVG */}
            <Portrait className="relative z-10 drop-shadow-lg" />

            {/* Floating tech icons with idle animation */}
            <TechFloaters isTouchActive={isInteracting} />
          </div>
        </div>

        {/* Subtle ambient animation ring */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-full border border-[var(--color-hero-portrait)]/20 scale-125"
            animate={{
              scale: [1.25, 1.35, 1.25],
              opacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </MotionDiv>
  )
}
