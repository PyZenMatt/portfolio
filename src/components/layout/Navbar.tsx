import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from '../ui/ThemeToggle'
import Hamburger from '../ui/Hamburger'
import { useMobileMenu } from '../../hooks/useMobileMenu'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/cn'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    closeMenu()
  }, [location.pathname, closeMenu])

  const handleNavigation = (path: string) => {
    navigate(path)
    closeMenu()
  }

  return (
    <nav
      className="border-b border-[var(--color-border)] bg-[var(--color-card)]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
          >
            Matteo Ricci
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium transition-colors group',
                  location.pathname === link.path
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                )}
              >
                {/* Background highlight on hover */}
                <span className="absolute inset-0 rounded-md bg-[var(--color-surface)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                
                {/* Label */}
                <span className="relative">{link.label}</span>
                
                {/* Animated underline for active link */}
                {location.pathname === link.path && (
                  <motion.span
                    layoutId={prefersReducedMotion ? undefined : "activeNavUnderline"}
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-[var(--color-primary)] rounded-full"
                    transition={prefersReducedMotion ? undefined : { type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <Hamburger isOpen={isOpen} onClick={toggleMenu} />
          </div>
        </div>
      </div>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden border-t border-[var(--color-border)] overflow-hidden"
            aria-hidden={!isOpen}
          >
            <div className="px-4 py-4 space-y-1 bg-[var(--color-card)]">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.path}
                  onClick={() => handleNavigation(link.path)}
                  initial={prefersReducedMotion ? undefined : { opacity: 0, x: -10 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                  transition={prefersReducedMotion ? undefined : { delay: 0.05 * index }}
                  className={cn(
                    'w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors relative',
                    location.pathname === link.path
                      ? 'bg-[var(--color-surface)] text-[var(--color-primary)]'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]'
                  )}
                >
                  {link.label}
                  {/* Active indicator */}
                  {location.pathname === link.path && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[var(--color-primary)] rounded-r-full" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
