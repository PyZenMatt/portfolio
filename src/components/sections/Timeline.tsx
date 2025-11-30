import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { staggerContainer, staggerChild } from '../../motion'

interface TimelineEntry {
  year: string
  title: string
  description: string
}

const TIMELINE: TimelineEntry[] = [
  {
    year: '2023',
    title: 'Python Foundation',
    description:
      'Started journey with Python, building automation scripts and data analysis tools. Explored pandas, matplotlib, and modern development practices.',
  },
  {
    year: '2024',
    title: 'Full-Stack Development',
    description:
      'Mastered Django and React ecosystem. Built REST APIs with Django REST Framework and modern SPAs with React + TypeScript. Integrated PostgreSQL databases.',
  },
  {
    year: '2024',
    title: 'Major Projects Launch',
    description:
      'Shipped BlogManager (Django + Jekyll), MessyMind (SEO-optimized blog), and SchoolPlatform (React + Django + Blockchain integration).',
  },
  {
    year: '2025',
    title: 'Modern Stack & AI',
    description:
      'Adopted Vite, TailwindCSS, and advanced TypeScript patterns. Integrated AI workflows with prompt engineering and LLM tools for enhanced development.',
  },
]

export default function Timeline() {
  const prefersReducedMotion = useReducedMotion()
  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  return (
    <MotionDiv
      {...(!prefersReducedMotion && {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-50px" },
        variants: staggerContainer,
      })}
      className="space-y-8 relative"
    >
      {/* Animated line background */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-[var(--color-border)] origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        />
      )}
      
      {TIMELINE.map((entry, index) => (
        <MotionDiv
          key={`${entry.year}-${entry.title}`}
          {...(!prefersReducedMotion && { variants: staggerChild })}
          className="relative pl-8 pb-8 border-l-2 border-[var(--color-border)] last:pb-0"
        >
          {/* Dot indicator with pulse animation */}
          <motion.div
            className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-[var(--color-primary)] ring-4 ring-[var(--color-bg)]"
            initial={prefersReducedMotion ? undefined : { scale: 0 }}
            whileInView={prefersReducedMotion ? undefined : { scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              delay: prefersReducedMotion ? 0 : 0.1 * index,
              type: 'spring',
              stiffness: 400,
              damping: 20,
            }}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.2 }}
          />
          
          {/* Content */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[var(--text-sm)] font-semibold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-1 rounded-full">
                {entry.year}
              </span>
              <h3 className="text-[var(--text-xl)] font-medium">
                {entry.title}
              </h3>
            </div>
            <p className="text-[var(--color-text-secondary)]">
              {entry.description}
            </p>
          </div>
        </MotionDiv>
      ))}
    </MotionDiv>
  )
}
