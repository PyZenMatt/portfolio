/**
 * HeroSection Component - Issue 14
 * 
 * Premium Hero section with creative identity block.
 * Features:
 * - Authoritative copy and tech stack display
 * - HeroArt component (silhouette + glow + floating icons)
 * - Magnetic CTA buttons
 * - GlowCursor effect
 * - Full accessibility support
 */

import { useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import MagneticButton from '../ui/MagneticButton'
import GlowCursor from '../ui/GlowCursor'
import { HeroArt } from '../hero'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { smoothStagger, staggerItem } from '../../motion'

export default function HeroSection() {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)

  const handleViewWork = useCallback(() => {
    navigate('/projects')
  }, [navigate])

  const handleGetInTouch = useCallback(() => {
    navigate('/contact')
  }, [navigate])

  // Motion wrapper - falls back to static if reduced motion
  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  return (
    <section
      ref={heroRef}
      id="hero"
      className="py-20 md:py-28 lg:py-32 relative overflow-hidden"
      aria-label="Hero section"
    >
      {/* Glow cursor effect - only visible in hero */}
      <GlowCursor containerRef={heroRef} />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <MotionDiv
            {...(!prefersReducedMotion && {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              variants: smoothStagger,
            })}
            className="space-y-6 md:order-1"
          >
            {/* Name and Role */}
            <MotionDiv
              {...(!prefersReducedMotion && { variants: staggerItem })}
              className="space-y-2"
            >
              <h1 
                className="font-bold"
                style={{ 
                  fontVariationSettings: '"wght" 700, "GRAD" 20' 
                }}
              >
                Matteo Ricci
              </h1>
              <h2 className="text-[var(--text-xl)] md:text-[var(--text-2xl)] text-[var(--color-text-secondary)] font-medium">
                Full-Stack Developer
                <span className="hidden sm:inline text-[var(--color-primary)]"> · </span>
                <span className="block sm:inline text-[var(--color-text-secondary)]/80">
                  Django · React · TypeScript
                </span>
              </h2>
            </MotionDiv>

            {/* Description */}
            <MotionDiv {...(!prefersReducedMotion && { variants: staggerItem })}>
              <p className="text-[var(--text-lg)] text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
                Costruisco applicazioni scalabili, curate e veloci. 
                Django per il backend, React per il frontend, 
                DevOps per portarle in produzione.
              </p>
            </MotionDiv>

            {/* CTA Buttons with Magnetic Effect */}
            <MotionDiv
              {...(!prefersReducedMotion && { variants: staggerItem })}
              className="flex flex-wrap gap-4 pt-2"
            >
              <MagneticButton>
                <motion.div
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleViewWork}
                    className="relative overflow-hidden group"
                  >
                    <span className="relative z-10">View My Work</span>
                    {/* Ripple effect layer */}
                    <span 
                      className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 rounded-lg transition-transform duration-300 ease-out" 
                      aria-hidden="true"
                    />
                  </Button>
                </motion.div>
              </MagneticButton>
              <MagneticButton>
                <motion.div
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                >
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handleGetInTouch}
                  >
                    Get In Touch
                  </Button>
                </motion.div>
              </MagneticButton>
            </MotionDiv>
          </MotionDiv>

          {/* Creative Identity Block */}
          <div className="flex justify-center md:justify-end md:order-2">
            <HeroArt className="w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
