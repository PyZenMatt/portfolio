import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ThemeToggle from '../ui/ThemeToggle'
import Hamburger from '../ui/Hamburger'
import { useMobileMenu } from '../../hooks/useMobileMenu'
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
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  location.pathname === link.path
                    ? 'bg-[var(--color-surface)] text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]'
                )}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <Hamburger isOpen={isOpen} onClick={toggleMenu} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden border-t border-[var(--color-border)] transition-all duration-300 ease-in-out overflow-hidden',
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
        aria-hidden={!isOpen}
      >
        <div className="px-4 py-4 space-y-1 bg-[var(--color-card)]">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavigation(link.path)}
              className={cn(
                'w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors',
                location.pathname === link.path
                  ? 'bg-[var(--color-surface)] text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]'
              )}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
