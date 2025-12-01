/**
 * WhatIBuildCard Component - Issue 14.3.2
 * 
 * Card for the "What I Build" section.
 * Features:
 * - Monoline SVG icon
 * - h3 title
 * - Description paragraph
 * - Bullet list of features
 * - Optional CTA link
 * - Dark/light consistent styling
 * - Full accessibility support
 */

import { Link } from 'react-router-dom'

interface WhatIBuildCardProps {
  title: string
  description: string
  techStack: string
  features: string[]
  icon: React.ReactNode
  ctaText?: string
  ctaHref?: string
}

export default function WhatIBuildCard({
  title,
  description,
  techStack,
  features,
  icon,
  ctaText = 'Learn More',
  ctaHref = '/projects',
}: WhatIBuildCardProps) {
  return (
    <article
      className="flex flex-col p-6 md:p-8 rounded-2xl 
        bg-[var(--color-card)] border border-[var(--color-border)]"
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center w-14 h-14 mb-5 rounded-xl
          bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Tech Stack Badge */}
      <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
        {techStack}
      </span>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text)] mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[var(--color-text-secondary)] mb-5 leading-relaxed flex-grow">
        {description}
      </p>

      {/* Features List */}
      <ul className="space-y-2 mb-6" role="list">
        {features.map((feature, index) => (
          <li 
            key={index}
            className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
          >
            <svg 
              className="w-4 h-4 mt-0.5 text-[var(--color-primary)] flex-shrink-0" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to={ctaHref}
        className="inline-flex items-center gap-2 text-sm font-medium 
          text-[var(--color-primary)] hover:text-[var(--color-primary-light)]
          transition-colors duration-200"
      >
        {ctaText}
        <svg 
          className="w-4 h-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </article>
  )
}
