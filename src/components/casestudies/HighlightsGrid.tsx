/**
 * HighlightsGrid Component - Issue 15.1
 * 
 * Grid of technical highlights for case studies.
 * Features:
 * - 6 items grid (3x2 on desktop, 2x3 on tablet, 1x6 on mobile)
 * - Icon + title + description
 * - Staggered entrance animation
 * - Hover lift effect
 * - Reduced motion support
 */

import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export interface Highlight {
  icon: React.ReactNode
  title: string
  description: string
}

interface HighlightsGridProps {
  highlights: Highlight[]
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function HighlightsGrid({ highlights, className = '' }: HighlightsGridProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  return (
    <MotionDiv
      {...(!prefersReducedMotion && {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-50px' },
        variants: containerVariants,
      })}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      data-testid="highlights-grid"
      role="list"
      aria-label="Technical highlights"
    >
      {highlights.map((highlight, index) => (
        <MotionDiv
          key={index}
          {...(!prefersReducedMotion && { variants: itemVariants })}
          className="group p-6 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          role="listitem"
          data-testid={`highlight-${index}`}
        >
          {/* Icon */}
          <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-[var(--color-surface)] text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/10 transition-colors">
            {highlight.icon}
          </div>

          {/* Title */}
          <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2">
            {highlight.title}
          </h4>

          {/* Description */}
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {highlight.description}
          </p>
        </MotionDiv>
      ))}
    </MotionDiv>
  )
}
