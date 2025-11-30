/**
 * HeroArt Component - Issue 14
 * 
 * Composite creative identity block for the Hero section.
 * Combines:
 * - Portrait silhouette SVG
 * - Dynamic glow effect
 * - Floating tech icons
 * - Parallax motion response to mouse
 * 
 * Features:
 * - Full reduced motion support
 * - Theme-aware styling
 * - Responsive sizing
 */

import { useCallback } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import Portrait from './Portrait'
import TechFloaters from './TechFloaters'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { parallaxConfig, zoomIn } from '../../motion'

interface HeroArtProps {
  className?: string
}

export default function HeroArt({ className = '' }: HeroArtProps) {
  const prefersReducedMotion = useReducedMotion()

  // Mouse parallax values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics for parallax
  const springConfig = parallaxConfig.spring
  const translateX = useSpring(
    useTransform(mouseX, [-200, 200], [-8, 8]),
    springConfig
  )
  const translateY = useSpring(
    useTransform(mouseY, [-200, 200], [-10, 10]),
    springConfig
  )
  const rotateX = useSpring(
    useTransform(mouseY, [-200, 200], [4, -4]),
    springConfig
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-200, 200], [-4, 4]),
    springConfig
  )

  // Glow movement - slightly offset from main element
  const glowX = useSpring(
    useTransform(mouseX, [-200, 200], [-12, 12]),
    { ...springConfig, stiffness: 80 }
  )
  const glowY = useSpring(
    useTransform(mouseY, [-200, 200], [-14, 14]),
    { ...springConfig, stiffness: 80 }
  )

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }, [prefersReducedMotion, mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

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
      <div
        className="relative w-full max-w-[320px] md:max-w-[380px] mx-auto perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Dynamic glow behind portrait */}
        {!prefersReducedMotion ? (
          <motion.div
            className="absolute inset-0 rounded-full blur-3xl scale-110"
            style={{
              background: 'radial-gradient(circle at center, var(--color-hero-glow) 0%, transparent 70%)',
              opacity: 1,
              x: glowX,
              y: glowY,
            }}
            aria-hidden="true"
          />
        ) : (
          <div
            className="absolute inset-0 rounded-full blur-3xl scale-110"
            style={{
              background: 'radial-gradient(circle at center, var(--color-hero-glow) 0%, transparent 70%)',
              opacity: 0.8,
            }}
            aria-hidden="true"
          />
        )}

        {/* Main portrait container with parallax */}
        <motion.div
          className="relative aspect-[5/6] rounded-2xl overflow-visible"
          style={prefersReducedMotion ? undefined : {
            rotateX,
            rotateY,
            x: translateX,
            y: translateY,
          }}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Portrait SVG */}
          <Portrait className="relative z-10 drop-shadow-lg" />

          {/* Floating tech icons */}
          <TechFloaters />
        </motion.div>

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
