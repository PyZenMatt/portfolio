/**
 * FeaturedProjectHighlight Section - Issue 14.3.7 + 14.3.8 + 14.3.9 + 14.3.12
 * 
 * Showcases a featured/flagship project with premium Vercel-style presentation.
 * Features:
 * - Alternating layout (image left / text right, reversible)
 * - Premium gradient + noise placeholder for images
 * - CTA "View Case Study" button
 * - Mobile-first responsive design
 * - Fade-in + slide-up animations
 * - Subtle parallax float on image
 * - Reduced motion support
 * - Full accessibility
 * 
 * Issue 14.3.12: Section spacing alignment
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export interface FeaturedProject {
  id: string
  title: string
  subtitle: string
  description: string
  techStack: string[]
  image?: string
  caseStudyUrl?: string
  liveUrl?: string
}

interface FeaturedProjectHighlightProps {
  project?: FeaturedProject
  /** Reverse layout: text left, image right */
  reverse?: boolean
}

// Default featured project data
const defaultProject: FeaturedProject = {
  id: 'school-platform',
  title: 'SchoolPlatform',
  subtitle: 'Blockchain-Certified Education',
  description:
    'A comprehensive school management system integrating blockchain technology for credential verification. Features real-time dashboards, WebSocket notifications, and immutable certificate storage on Ethereum.',
  techStack: ['React', 'Django', 'Blockchain', 'WebSocket', 'PostgreSQL'],
  caseStudyUrl: '/projects/school-platform',
  liveUrl: 'https://schoolplatform-demo.example.com',
}

export default function FeaturedProjectHighlight({
  project = defaultProject,
  reverse = false,
}: FeaturedProjectHighlightProps) {
  const prefersReducedMotion = useReducedMotion()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const MotionSection = prefersReducedMotion ? 'section' : motion.section
  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  // Container with stagger for children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  }

  // Fade-in + slide-up for content elements
  const slideUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  }

  // Image container with scale reveal
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  }

  // Subtle parallax float animation for image
  const floatAnimation = prefersReducedMotion
    ? {}
    : {
        y: [0, -8, 0],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      }

  // Content items stagger
  const contentItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  }

  const showPlaceholder = !project.image || imageError || !imageLoaded

  return (
    <MotionSection
      {...(!prefersReducedMotion && {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-100px' },
        variants: containerVariants,
      })}
      className="section-spacing bg-[var(--color-bg)]"
      aria-labelledby="featured-project-title"
      aria-label="Featured Project"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionDiv
          {...(!prefersReducedMotion && { variants: slideUpVariants })}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            id="featured-project-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4"
          >
            Featured Project
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            A showcase of my most impactful work
          </p>
        </MotionDiv>

        {/* Featured Project Card */}
        <MotionDiv
          {...(!prefersReducedMotion && { variants: slideUpVariants })}
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden"
          role="article"
          aria-label={`Featured project: ${project.title}`}
        >
          {/* Content Grid - Mobile stacked, Desktop side-by-side */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 ${
              reverse ? 'lg:[direction:rtl]' : ''
            }`}
          >
            {/* Image Section */}
            <MotionDiv 
              {...(!prefersReducedMotion && { 
                variants: imageVariants,
                animate: floatAnimation,
              })}
              className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px] lg:[direction:ltr]"
              data-testid="image-container"
            >
              {/* Premium Gradient Placeholder */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  showPlaceholder ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden="true"
                data-testid="image-placeholder"
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 via-[var(--color-surface)] to-[var(--color-primary)]/10" />
                {/* Noise texture overlay */}
                <div
                  className="absolute inset-0 opacity-[0.15]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />
                {/* Decorative elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Glow effect */}
                    <div className="absolute inset-0 blur-3xl bg-[var(--color-primary)]/30 rounded-full scale-150" />
                    {/* Icon placeholder */}
                    <svg
                      className="relative w-20 h-20 text-[var(--color-text-secondary)]/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Actual Image */}
              {project.image && (
                <img
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
              )}
            </MotionDiv>

            {/* Content Section */}
            <MotionDiv 
              {...(!prefersReducedMotion && { 
                initial: 'hidden',
                whileInView: 'visible',
                viewport: { once: true },
                variants: {
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1, 
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
                  },
                },
              })}
              className="p-6 md:p-8 lg:p-12 flex flex-col justify-center lg:[direction:ltr]"
            >
              {/* Subtitle / Category */}
              <MotionDiv
                {...(!prefersReducedMotion && { variants: contentItemVariants })}
              >
                <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-3 block">
                  {project.subtitle}
                </span>
              </MotionDiv>

              {/* Title */}
              <MotionDiv
                {...(!prefersReducedMotion && { variants: contentItemVariants })}
              >
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4">
                  {project.title}
                </h3>
              </MotionDiv>

              {/* Description */}
              <MotionDiv
                {...(!prefersReducedMotion && { variants: contentItemVariants })}
              >
                <p className="text-base md:text-lg text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                  {project.description}
                </p>
              </MotionDiv>

              {/* Tech Stack */}
              <MotionDiv
                {...(!prefersReducedMotion && { variants: contentItemVariants })}
                className="flex flex-wrap gap-2 mb-8" 
                role="list" 
                aria-label="Technologies used"
              >
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    role="listitem"
                    className="px-3 py-1 text-xs md:text-sm font-medium rounded-full 
                      bg-[var(--color-surface)] text-[var(--color-text-secondary)]
                      border border-[var(--color-border)]"
                  >
                    {tech}
                  </span>
                ))}
              </MotionDiv>

              {/* CTAs */}
              <MotionDiv
                {...(!prefersReducedMotion && { variants: contentItemVariants })}
                className="flex flex-wrap gap-4"
              >
                {project.caseStudyUrl && (
                  <Link
                    to={project.caseStudyUrl}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
                      bg-[var(--color-primary)] text-white font-medium
                      hover:bg-[var(--color-primary-dark)] 
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2
                      transition-colors duration-200"
                    aria-label={`View case study for ${project.title}`}
                  >
                    View Case Study
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
                      bg-transparent text-[var(--color-text)] font-medium
                      border border-[var(--color-border)]
                      hover:border-[var(--color-primary)]/60 hover:text-[var(--color-primary)]
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2
                      transition-colors duration-200"
                    aria-label={`View live demo of ${project.title} (opens in new tab)`}
                  >
                    Live Demo
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </MotionDiv>
            </MotionDiv>
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  )
}
