/**
 * PremiumFooter.tsx
 * Issue 14.3.10 — Premium Footer Revision (UI scaffold)
 * Issue 14.3.11 — Footer Animations + Social Icons
 *
 * Layout:
 * - Left: Mini logo (brand name)
 * - Center: Nav links
 * - Right: Social icons with hover glow
 *
 * Features:
 * - CSS variables for theming
 * - Reduced motion support
 * - Responsive layout
 * - Glowing border-top
 * - Animated social icons with hover glow
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// Social icons as SVG components
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

const socialLinks = [
  { href: 'https://github.com/matteoricci', label: 'GitHub', Icon: GitHubIcon },
  { href: 'https://linkedin.com/in/matteoricci', label: 'LinkedIn', Icon: LinkedInIcon },
]

const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const socialIconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function PremiumFooter() {
  const currentYear = new Date().getFullYear()
  const prefersReducedMotion = useReducedMotion()
  const MotionFooter = prefersReducedMotion ? 'footer' : motion.footer
  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

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
      className="relative mt-auto bg-[var(--color-surface)]"
    >
      {/* Glowing border-top */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-60"
        data-testid="footer-glow-border"
        aria-hidden="true"
      />
      <div className="border-t border-[var(--color-border)]">
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

            {/* Center: Nav Links */}
            <nav
              aria-label="Footer navigation"
              className="flex items-center gap-4 sm:gap-6"
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

            {/* Right: Social Icons */}
            <MotionDiv
              {...(!prefersReducedMotion && {
                initial: 'hidden',
                whileInView: 'visible',
                viewport: { once: true },
                variants: staggerContainerVariants,
              })}
              className="flex items-center gap-3"
              data-testid="footer-social"
            >
              {socialLinks.map(({ href, label, Icon }) => (
                <MotionDiv
                  key={label}
                  {...(!prefersReducedMotion && { variants: socialIconVariants })}
                >
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                    aria-label={label}
                    data-testid={`social-${label.toLowerCase()}`}
                  >
                    {/* Hover glow effect */}
                    <span
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-md bg-[var(--color-primary)]"
                      aria-hidden="true"
                    />
                    <Icon className="w-5 h-5 relative z-10" />
                  </motion.a>
                </MotionDiv>
              ))}
            </MotionDiv>
          </div>

          {/* Copyright */}
          <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
            <p className="text-xs text-center text-[var(--color-text-secondary)]">
              © {currentYear} Matteo Ricci. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </MotionFooter>
  )
}
