import { useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import MagneticButton from '../ui/MagneticButton'
import GlowCursor from '../ui/GlowCursor'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { 
  smoothStagger, 
  staggerItem,
  parallaxConfig,
  zoomIn,
} from '../../motion'

// SVG placeholder icon extracted to prevent recreation
function PlaceholderIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-24 w-24"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  )
}

export default function HeroSection() {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)

  // Mouse parallax for portrait - enhanced with parallaxConfig
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Smooth spring physics for parallax
  const springConfig = parallaxConfig.spring
  const translateX = useSpring(
    useTransform(mouseX, [-200, 200], [-parallaxConfig.xRange, parallaxConfig.xRange]), 
    springConfig
  )
  const translateY = useSpring(
    useTransform(mouseY, [-200, 200], [-parallaxConfig.yRange, parallaxConfig.yRange]), 
    springConfig
  )
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [3, -3]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-3, 3]), springConfig)

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

  const handleViewProjects = useCallback(() => {
    navigate('/projects')
  }, [navigate])

  const handleDownloadCV = useCallback(() => {
    // TODO: replace with real CV file
    window.open('/assets/matteo-ricci-cv.pdf', '_blank')
  }, [])

  // Motion wrapper - falls back to static if reduced motion
  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  return (
    <section
      ref={heroRef}
      id="hero"
      className="py-20 md:py-28 relative overflow-hidden"
      aria-label="Hero section"
    >
      {/* Glow cursor effect - only visible in hero */}
      <GlowCursor containerRef={heroRef} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <MotionDiv
            {...(!prefersReducedMotion && {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              variants: smoothStagger,
            })}
            className="space-y-6"
          >
            <MotionDiv 
              {...(!prefersReducedMotion && { variants: staggerItem })}
              className="space-y-3"
            >
              <Badge variant="default">Full-Stack Developer</Badge>
              <h1>
                Hi, I'm Matteo Ricci
              </h1>
            </MotionDiv>

            <MotionDiv {...(!prefersReducedMotion && { variants: staggerItem })}>
              <p className="text-[var(--text-xl)] text-[var(--color-text-secondary)]">
                Building modern web applications with Django, React, and
                TypeScript. Passionate about clean code, user experience, and
                scalable architecture.
              </p>
            </MotionDiv>

            {/* CTA Buttons with Magnetic Effect */}
            <MotionDiv 
              {...(!prefersReducedMotion && { variants: staggerItem })}
              className="flex flex-wrap gap-4 pt-4"
            >
              <MagneticButton>
                <motion.div
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleViewProjects}
                    className="relative overflow-hidden group"
                  >
                    <span className="relative z-10">View Projects</span>
                    {/* Ripple effect layer */}
                    <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 rounded-lg transition-transform duration-300 ease-out" />
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
                    onClick={handleDownloadCV}
                  >
                    Download CV
                  </Button>
                </motion.div>
              </MagneticButton>
            </MotionDiv>
          </MotionDiv>

          {/* Image Column with Enhanced Parallax */}
          <MotionDiv
            {...(!prefersReducedMotion && {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              variants: zoomIn,
            })}
            className="flex justify-center md:justify-end"
          >
            <div 
              className="relative max-w-sm w-full perspective-1000"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Subtle glow under portrait */}
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute inset-0 rounded-xl blur-2xl"
                  style={{
                    background: 'radial-gradient(circle at center, var(--color-primary) 0%, transparent 70%)',
                    opacity: 0.15,
                    x: translateX,
                    y: translateY,
                  }}
                  aria-hidden="true"
                />
              )}
              
              <motion.div
                style={prefersReducedMotion ? undefined : { 
                  rotateX, 
                  rotateY,
                  x: translateX,
                  y: translateY,
                }}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-primary-light/20 dark:from-primary/30 dark:to-primary-light/30 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center border border-[var(--color-border)]/30"
              >
                <img
                  src="/placeholder-portrait.jpg"
                  alt="Portrait of Matteo Ricci"
                  className="rounded-xl object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-secondary)]/40">
                  <PlaceholderIcon />
                </div>
              </motion.div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}
