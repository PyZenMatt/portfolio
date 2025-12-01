/**
 * GlowCursor Component - Issue 13.5
 * 
 * A subtle, mouse-following glow effect for premium feel.
 * 
 * Features:
 * - Smooth lerp-based following
 * - Low opacity, non-intrusive
 * - Disabled on mobile/touch devices
 * - Disabled with reduced motion preference
 * - Zero pointer events (doesn't interfere with UI)
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { glowConfig } from '../../motion/presets'

interface GlowCursorProps {
  /** Container ref to constrain the glow area */
  containerRef?: React.RefObject<HTMLElement | null>
  /** Radius in pixels */
  radius?: number
  /** Opacity (0-1) */
  opacity?: number
  /** Custom color */
  color?: string
  /** Lerp factor (0-1, lower = smoother) */
  lerp?: number
}

export default function GlowCursor({
  containerRef,
  radius = glowConfig.radius,
  opacity = glowConfig.opacity,
  lerp = glowConfig.lerp,
}: GlowCursorProps) {
  const glowRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Current position (with lerp)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | undefined>(undefined)

  // Check for mobile/touch device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(max-width: 768px)').matches
      )
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Animation loop with lerp
  const animate = useCallback(() => {
    const glow = glowRef.current
    if (!glow) return

    // Lerp towards target
    positionRef.current.x += (targetRef.current.x - positionRef.current.x) * lerp
    positionRef.current.y += (targetRef.current.y - positionRef.current.y) * lerp

    // Update position
    glow.style.transform = `translate(${positionRef.current.x - radius}px, ${positionRef.current.y - radius}px)`

    rafRef.current = requestAnimationFrame(animate)
  }, [lerp, radius])

  // Mouse move handler
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return

    const container = containerRef?.current || document.body

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      
      // Check if mouse is within container
      const isInside = 
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom

      if (isInside) {
        setIsVisible(true)
        // Calculate position relative to container
        targetRef.current.x = e.clientX - rect.left
        targetRef.current.y = e.clientY - rect.top
      } else {
        setIsVisible(false)
      }
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [containerRef, prefersReducedMotion, isMobile, animate])

  // Don't render on mobile or with reduced motion
  if (prefersReducedMotion || isMobile) {
    return null
  }

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-0"
      style={{
        width: radius * 2,
        height: radius * 2,
        borderRadius: '50%',
        background: `radial-gradient(circle at center, var(--color-hero-cursor), transparent 70%)`,
        boxShadow: `0 0 ${radius}px ${radius / 2}px var(--color-hero-cursor-soft)`,
        opacity: isVisible ? opacity : 0,
        transition: 'opacity 0.3s ease-out',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  )
}
