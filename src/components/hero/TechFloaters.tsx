/**
 * TechFloaters Component - Issue 14 + 14.2
 * 
 * Floating tech stack icons around the portrait silhouette.
 * Features:
 * - Django, React, TypeScript, Docker, Python, GitHub icons
 * - Slow floating animation (4-8s period) via Framer Motion (desktop)
 * - CSS idle animation for mobile (hero-icon-idle class)
 * - Staggered random start positions
 * - Low opacity (75%) for non-intrusive effect
 * - Respects prefers-reduced-motion
 * - aria-hidden for accessibility
 */

import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface TechFloatersProps {
  /** Whether touch is active (pauses idle animation) */
  isTouchActive?: boolean
}

interface FloaterConfig {
  id: string
  icon: React.ReactNode
  label: string
  position: { x: string; y: string }
  delay: number
  duration: number
  floatRange: number
}

// Simple, minimal tech icons as inline SVGs
const techIcons = {
  react: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
      <path fillRule="evenodd" d="M12 9.75c4.65 0 8.58 1.5 10.5 3.75-1.92 2.25-5.85 3.75-10.5 3.75S3.42 15.75 1.5 13.5c1.92-2.25 5.85-3.75 10.5-3.75Zm0 6c3.86 0 7.12-1.18 8.72-2.25C19.12 12.43 15.86 11.25 12 11.25S4.88 12.43 3.28 13.5c1.6 1.07 4.86 2.25 8.72 2.25Z" clipRule="evenodd"/>
      <ellipse cx="12" cy="13.5" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 13.5)"/>
      <ellipse cx="12" cy="13.5" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(-60 12 13.5)"/>
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <text x="6" y="17" fontSize="10" fontWeight="bold" fontFamily="system-ui">TS</text>
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2C8.5 2 7 3.5 7 5.5V8h5v1H6c-2 0-4 1.5-4 5s2 5 4 5h2v-2.5c0-2 1.5-3.5 3.5-3.5H16c1.5 0 2.5-1 2.5-2.5v-5C18.5 3.5 16 2 12 2Zm-2 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"/>
      <path d="M12 22c3.5 0 5-1.5 5-3.5V16h-5v-1h6c2 0 4-1.5 4-5s-2-5-4-5h-2v2.5c0 2-1.5 3.5-3.5 3.5H8c-1.5 0-2.5 1-2.5 2.5v5C5.5 20.5 8 22 12 22Zm2-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
    </svg>
  ),
  django: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M7 4h3v12c-1.5.3-2.6.4-3.8.4-3.6 0-5.5-1.6-5.5-4.7 0-3 2-5 5.1-5 .5 0 .9 0 1.2.1V4Zm0 5.6c-.3-.1-.6-.1-.9-.1-1.5 0-2.4 1-2.4 2.6 0 1.6.8 2.5 2.3 2.5.3 0 .6 0 1-.1V9.6Z"/>
      <path d="M13 4h3v9.6c0 3.3-.2 4.9-.9 6.3-.6 1.3-1.5 2.1-3.2 3l-2.8-1.3c1.7-.8 2.6-1.6 3.1-2.8.5-1.2.8-2.6.8-5.9V4Z"/>
      <circle cx="14.5" cy="2" r="1.8"/>
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M13 3h2v2h-2V3Zm-3 0h2v2h-2V3ZM7 3h2v2H7V3Zm6 3h2v2h-2V6Zm-3 0h2v2h-2V6ZM7 6h2v2H7V6ZM4 6h2v2H4V6Zm6 3h2v2h-2V9ZM7 9h2v2H7V9ZM4 9h2v2H4V9ZM1 9h2v2H1V9Z"/>
      <path d="M23 11.5c-.4-.3-1.3-.5-2-.4-.2-1.1-.8-2-1.6-2.7l-.3-.2-.3.3c-.4.4-.6 1-.7 1.5-.1.7 0 1.3.3 1.9-.5.3-1.3.5-2.4.5H.5l-.1.6c-.1 1.5.1 3 .7 4.4.6 1.3 1.6 2.3 2.8 2.9 1.5.7 3.9 1.1 6.7.4 2.2-.5 4.1-1.5 5.7-3 1.3-1.2 2.1-2.6 2.7-4l.2-.1c.8 0 2-.2 2.7-.8.3-.2.5-.5.7-.9l.1-.3-.3-.2Z"/>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.8c.85.004 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12c0-5.52-4.48-10-10-10Z" clipRule="evenodd"/>
    </svg>
  ),
}

// Seeded random for consistent positions across renders
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const TechFloaters = memo(function TechFloaters({ isTouchActive = false }: TechFloatersProps) {
  const prefersReducedMotion = useReducedMotion()

  // Build idle class for mobile - paused during touch
  const iconIdleClass = !prefersReducedMotion 
    ? `hero-icon-idle${isTouchActive ? ' touch-active' : ''}`
    : ''

  // Generate floater configurations with consistent random positions
  const floaters: FloaterConfig[] = useMemo(() => [
    {
      id: 'react',
      icon: techIcons.react,
      label: 'React',
      position: { x: '-15%', y: '20%' },
      delay: 0,
      duration: 5 + seededRandom(1) * 2,
      floatRange: 8,
    },
    {
      id: 'typescript',
      icon: techIcons.typescript,
      label: 'TypeScript',
      position: { x: '105%', y: '15%' },
      delay: 0.5,
      duration: 6 + seededRandom(2) * 2,
      floatRange: 6,
    },
    {
      id: 'python',
      icon: techIcons.python,
      label: 'Python',
      position: { x: '-10%', y: '65%' },
      delay: 1,
      duration: 5.5 + seededRandom(3) * 2,
      floatRange: 7,
    },
    {
      id: 'django',
      icon: techIcons.django,
      label: 'Django',
      position: { x: '108%', y: '55%' },
      delay: 1.5,
      duration: 6.5 + seededRandom(4) * 2,
      floatRange: 6,
    },
    {
      id: 'docker',
      icon: techIcons.docker,
      label: 'Docker',
      position: { x: '-5%', y: '90%' },
      delay: 2,
      duration: 5 + seededRandom(5) * 3,
      floatRange: 5,
    },
    {
      id: 'github',
      icon: techIcons.github,
      label: 'GitHub',
      position: { x: '100%', y: '85%' },
      delay: 2.5,
      duration: 7 + seededRandom(6) * 2,
      floatRange: 6,
    },
  ], [])

  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      {floaters.map((floater, index) => (
        <motion.div
          key={floater.id}
          className={`absolute w-6 h-6 md:w-7 md:h-7 text-[var(--color-hero-icons)] opacity-75 ${iconIdleClass}`}
          style={{
            left: floater.position.x,
            top: floater.position.y,
            // Stagger animation delay for each icon on mobile
            animationDelay: `${index * 0.3}s`,
          }}
          initial={prefersReducedMotion ? undefined : { 
            opacity: 0, 
            scale: 0.5 
          }}
          animate={prefersReducedMotion ? undefined : { 
            opacity: 0.75, 
            scale: 1,
            y: [0, -floater.floatRange, 0],
          }}
          transition={prefersReducedMotion ? undefined : {
            opacity: { duration: 0.5, delay: floater.delay },
            scale: { duration: 0.5, delay: floater.delay },
            y: {
              duration: floater.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: floater.delay,
            },
          }}
          title={floater.label}
        >
          {floater.icon}
        </motion.div>
      ))}
    </div>
  )
})

export default TechFloaters
