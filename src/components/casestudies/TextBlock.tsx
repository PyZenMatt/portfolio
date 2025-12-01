/**
 * TextBlock Component - Issue 15.1
 * 
 * Reusable text block for case study sections.
 * Supports:
 * - Label (e.g., "The Problem")
 * - Heading
 * - Body text (string or paragraphs array)
 * - Fade-in animation
 * - Reduced motion support
 */

import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface TextBlockProps {
  label?: string
  heading: string
  body: string | string[]
  className?: string
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function TextBlock({ label, heading, body, className = '' }: TextBlockProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  const paragraphs = Array.isArray(body) ? body : [body]

  return (
    <MotionDiv
      {...(!prefersReducedMotion && {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-50px' },
        variants: fadeUpVariants,
      })}
      className={`space-y-4 ${className}`}
      data-testid="text-block"
    >
      {label && (
        <span className="inline-block text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
          {label}
        </span>
      )}
      <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
        {heading}
      </h3>
      <div className="space-y-4">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed"
          >
            {p}
          </p>
        ))}
      </div>
    </MotionDiv>
  )
}
