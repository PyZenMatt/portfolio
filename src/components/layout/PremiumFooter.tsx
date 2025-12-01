/**
 * PremiumFooter.tsx
 * Issue 14.3.10 — Premium Footer Revision (UI scaffold)
 *
 * Layout:
 * - Left: Mini logo (brand name)
 * - Right: Nav links
 *
 * Features:
 * - CSS variables for theming
 * - Reduced motion support
 * - Responsive layout
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function PremiumFooter() {
  const currentYear = new Date().getFullYear()
  const prefersReducedMotion = useReducedMotion()
  const MotionFooter = prefersReducedMotion ? 'footer' : motion.footer

  return (
    <MotionFooter
      {...(!prefersReducedMotion && {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true },
        variants: fadeInVariants,
      })}
      role="contentinfo"
      data-testid="premium-footer"
      className="border-t border-[var(--color-border)] mt-auto bg-[var(--color-surface)]"
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Mini Logo */}
          <Link
            to="/"
            data-testid="footer-logo"
            className="text-lg font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
          >
            MR
          </Link>

          {/* Right: Nav Links */}
          <nav
            aria-label="Footer navigation"
            className="flex items-center gap-6"
            data-testid="footer-nav"
          >
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
          <p className="text-xs text-center text-[var(--color-text-secondary)]">
            © {currentYear} Matteo Ricci. All rights reserved.
          </p>
        </div>
      </div>
    </MotionFooter>
  )
}
