/**
 * ProjectHero Component - Issue 15.1
 * 
 * Premium hero section for case study pages.
 * Features:
 * - Full-width mockup/screenshot with gradient overlay
 * - Project title + subtitle
 * - CTA buttons (View Repo, Live Demo)
 * - Tech stack icons with animation
 * - Parallax effect on image (subtle)
 * - Reduced motion support
 */

import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import TechStackList, { type CaseTechName } from './TechStackList'

interface ProjectHeroProps {
  title: string
  subtitle: string
  description: string
  techStack: CaseTechName[]
  repoUrl?: string
  liveUrl?: string
  imageUrl?: string
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

export default function ProjectHero({
  title,
  subtitle,
  description,
  techStack,
  repoUrl,
  liveUrl,
  imageUrl,
}: ProjectHeroProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionSection = prefersReducedMotion ? 'section' : motion.section
  const MotionDiv = prefersReducedMotion ? 'div' : motion.div
  const MotionH1 = prefersReducedMotion ? 'h1' : motion.h1

  return (
    <MotionSection
      {...(!prefersReducedMotion && {
        initial: 'hidden',
        animate: 'visible',
        variants: staggerContainerVariants,
      })}
      className="relative py-16 md:py-24 overflow-hidden"
      aria-label="Project hero"
      data-testid="project-hero"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface)] via-transparent to-transparent opacity-50"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <MotionDiv
            {...(!prefersReducedMotion && { variants: staggerContainerVariants })}
            className="space-y-6"
          >
            {/* Subtitle badge */}
            <MotionDiv
              {...(!prefersReducedMotion && { variants: fadeUpVariants })}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                {subtitle}
              </span>
            </MotionDiv>

            {/* Title */}
            <MotionH1
              {...(!prefersReducedMotion && { variants: fadeUpVariants })}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)]"
              data-testid="hero-title"
            >
              {title}
            </MotionH1>

            {/* Description */}
            <MotionDiv
              {...(!prefersReducedMotion && { variants: fadeUpVariants })}
            >
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
                {description}
              </p>
            </MotionDiv>

            {/* Tech Stack */}
            <MotionDiv
              {...(!prefersReducedMotion && { variants: fadeUpVariants })}
              className="pt-4"
            >
              <TechStackList techs={techStack} className="justify-start" />
            </MotionDiv>

            {/* CTAs */}
            <MotionDiv
              {...(!prefersReducedMotion && { variants: fadeUpVariants })}
              className="flex flex-wrap gap-4 pt-4"
            >
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-light)] transition-colors"
                  data-testid="cta-repo"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  View Repository
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] font-medium hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                  data-testid="cta-live"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Demo
                </a>
              )}
            </MotionDiv>
          </MotionDiv>

          {/* Image/Mockup */}
          <MotionDiv
            {...(!prefersReducedMotion && {
              variants: fadeUpVariants,
              animate: prefersReducedMotion ? undefined : {
                y: [0, -10, 0],
                transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              },
            })}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/20 via-[var(--color-surface)] to-[var(--color-primary-light)]/20 border border-[var(--color-border)]">
              {/* Glow effect */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent"
                aria-hidden="true"
              />
              
              {/* Noise texture overlay */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
                aria-hidden="true"
              />

              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={`${title} screenshot`}
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Placeholder mockup */
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-[var(--color-primary)]/20 flex items-center justify-center">
                      <svg className="w-10 h-10 text-[var(--color-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)]">Project Preview</p>
                  </div>
                </div>
              )}
            </div>
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  )
}
