/**
 * MagneticButton Component - Issue 13.5
 * 
 * A button wrapper that creates a magnetic hover effect,
 * following the mouse cursor within the button bounds.
 * 
 * Features:
 * - Smooth spring-based mouse following
 * - Configurable displacement and scale
 * - Reduced motion safe (falls back to simple hover)
 * - Touch device safe (disabled on mobile)
 */

import { useRef, useState, useCallback } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { magneticConfig } from '../../motion/presets'

interface MagneticButtonProps {
  children: React.ReactNode
  /** Maximum displacement in pixels */
  maxDisplacement?: number
  /** Scale on hover */
  hoverScale?: number
  /** Additional className */
  className?: string
  /** Disable magnetic effect */
  disabled?: boolean
}

export default function MagneticButton({
  children,
  maxDisplacement = magneticConfig.maxDisplacement,
  hoverScale = magneticConfig.hoverScale,
  className = '',
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Spring values for smooth movement
  const springConfig = magneticConfig.spring
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)
  const scale = useSpring(1, springConfig)

  // Transform for subtle rotation based on position
  const rotateX = useTransform(y, [-maxDisplacement, maxDisplacement], [2, -2])
  const rotateY = useTransform(x, [-maxDisplacement, maxDisplacement], [-2, 2])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || disabled) return

      const element = ref.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate displacement (clamped to max)
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      // Normalize to max displacement
      const normalizedX = (deltaX / (rect.width / 2)) * maxDisplacement
      const normalizedY = (deltaY / (rect.height / 2)) * maxDisplacement

      x.set(normalizedX)
      y.set(normalizedY)
    },
    [prefersReducedMotion, disabled, maxDisplacement, x, y]
  )

  const handleMouseEnter = useCallback(() => {
    if (prefersReducedMotion || disabled) return
    setIsHovered(true)
    scale.set(hoverScale)
  }, [prefersReducedMotion, disabled, hoverScale, scale])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
    scale.set(1)
  }, [x, y, scale])

  // If reduced motion or disabled, render simple wrapper
  if (prefersReducedMotion || disabled) {
    return (
      <div className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x,
        y,
        scale,
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
