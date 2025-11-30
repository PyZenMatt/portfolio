import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { fadeInScale, staggerContainer, staggerChild } from '../../motion'

export default function HeroSection() {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()

  // Mouse parallax for portrait
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Smooth spring physics
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [3, -3]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-3, 3]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleViewProjects = () => {
    navigate('/projects')
  }

  const handleDownloadCV = () => {
    // TODO: replace with real CV file
    window.open('/assets/matteo-ricci-cv.pdf', '_blank')
  }

  // Motion wrapper - falls back to static if reduced motion
  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  return (
    <section
      id="hero"
      className="py-20 md:py-28"
      aria-label="Hero section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <MotionDiv
            {...(!prefersReducedMotion && {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              variants: staggerContainer,
            })}
            className="space-y-6"
          >
            <MotionDiv 
              {...(!prefersReducedMotion && { variants: staggerChild })}
              className="space-y-3"
            >
              <Badge variant="default">Full-Stack Developer</Badge>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-text)]">
                Hi, I'm Matteo Ricci
              </h1>
            </MotionDiv>

            <MotionDiv {...(!prefersReducedMotion && { variants: staggerChild })}>
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
                Building modern web applications with Django, React, and
                TypeScript. Passionate about clean code, user experience, and
                scalable architecture.
              </p>
            </MotionDiv>

            {/* CTA Buttons */}
            <MotionDiv 
              {...(!prefersReducedMotion && { variants: staggerChild })}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
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
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
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
            </MotionDiv>
          </MotionDiv>

          {/* Image Column with Parallax */}
          <MotionDiv
            {...(!prefersReducedMotion && {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              variants: fadeInScale,
            })}
            className="flex justify-center md:justify-end"
          >
            <div 
              className="relative max-w-sm w-full perspective-1000"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                style={prefersReducedMotion ? undefined : { rotateX, rotateY }}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-primary-light/20 dark:from-primary/30 dark:to-primary-light/30 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center border border-[var(--color-border)]/30"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}
