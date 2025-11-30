/**
 * useDesktopParallax Hook - Issue 14.2b
 * 
 * Desktop-only mouse parallax effect for the Hero portrait.
 * Features:
 * - Smooth mouse-responsive parallax movement
 * - Only activates on devices with fine pointer (mouse)
 * - RAF-based updates for 60fps performance
 * - Spring physics for natural feel
 * - Respects prefers-reduced-motion
 * - Memory cleanup on unmount
 */

import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface DesktopParallaxConfig {
  /** Max horizontal offset in pixels (default: 15) */
  maxX?: number
  /** Max vertical offset in pixels (default: 15) */
  maxY?: number
  /** Sensitivity divisor for X axis - higher = less sensitive (default: 40) */
  sensitivityX?: number
  /** Sensitivity divisor for Y axis - higher = less sensitive (default: 40) */
  sensitivityY?: number
  /** Callback when mouse starts moving */
  onMouseMove?: () => void
  /** Callback when mouse stops (after inactivity timeout) */
  onMouseIdle?: () => void
  /** Inactivity timeout in ms before onMouseIdle fires (default: 1500) */
  idleTimeout?: number
}

interface DesktopParallaxReturn {
  /** Whether parallax is currently active (mouse moving) */
  isActive: boolean
}

/**
 * Hook for desktop mouse parallax.
 * Only activates on devices with fine pointer (mouse/trackpad).
 * 
 * @param targetRef - Ref to the element to apply parallax transform to
 * @param config - Configuration options
 * @returns Object with parallax state
 */
export function useDesktopParallax(
  targetRef: React.RefObject<HTMLElement | null>,
  config: DesktopParallaxConfig = {}
): DesktopParallaxReturn {
  const {
    maxX = 15,
    maxY = 15,
    sensitivityX = 40,
    sensitivityY = 40,
    onMouseMove,
    onMouseIdle,
    idleTimeout = 1500,
  } = config

  const prefersReducedMotion = useReducedMotion()
  const isActiveRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const currentXRef = useRef(0)
  const currentYRef = useRef(0)
  const targetXRef = useRef(0)
  const targetYRef = useRef(0)

  // Check if device has fine pointer (desktop)
  const isDesktop = useCallback((): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: fine)').matches
  }, [])

  // Clamp value within bounds
  const clamp = useCallback((value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max)
  }, [])

  // Lerp for smooth interpolation
  const lerp = useCallback((start: number, end: number, factor: number): number => {
    return start + (end - start) * factor
  }, [])

  // Animation loop for smooth parallax
  const animate = useCallback(() => {
    if (!targetRef.current) return

    // Smooth interpolation towards target
    currentXRef.current = lerp(currentXRef.current, targetXRef.current, 0.1)
    currentYRef.current = lerp(currentYRef.current, targetYRef.current, 0.1)

    // Apply transform
    targetRef.current.style.transform = `translate3d(${currentXRef.current}px, ${currentYRef.current}px, 0)`

    // Continue animation if not at target
    const deltaX = Math.abs(targetXRef.current - currentXRef.current)
    const deltaY = Math.abs(targetYRef.current - currentYRef.current)
    
    if (deltaX > 0.01 || deltaY > 0.01) {
      rafIdRef.current = requestAnimationFrame(animate)
    }
  }, [targetRef, lerp])

  // Handle mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (prefersReducedMotion) return
    if (!isDesktop()) return
    if (!targetRef.current) return

    // Clear any pending idle timeout
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current)
    }

    // Calculate offset from center of screen
    const x = (e.clientX - window.innerWidth / 2) / sensitivityX
    const y = (e.clientY - window.innerHeight / 2) / sensitivityY

    // Clamp values
    targetXRef.current = clamp(x, -maxX, maxX)
    targetYRef.current = clamp(y, -maxY, maxY)

    // Start animation if not already running
    if (!isActiveRef.current) {
      isActiveRef.current = true
      onMouseMove?.()
      rafIdRef.current = requestAnimationFrame(animate)
    }

    // Set idle timeout
    idleTimeoutRef.current = setTimeout(() => {
      isActiveRef.current = false
      onMouseIdle?.()
    }, idleTimeout)
  }, [prefersReducedMotion, isDesktop, targetRef, sensitivityX, sensitivityY, maxX, maxY, clamp, animate, onMouseMove, onMouseIdle, idleTimeout])

  // Handle mouse leave - reset to center
  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return
    if (!isDesktop()) return

    // Reset target to center
    targetXRef.current = 0
    targetYRef.current = 0

    // Start animation to return to center
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
    }
    rafIdRef.current = requestAnimationFrame(animate)

    // Clear idle timeout and trigger idle callback
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current)
    }
    
    idleTimeoutRef.current = setTimeout(() => {
      isActiveRef.current = false
      onMouseIdle?.()
    }, 500) // Shorter timeout on leave
  }, [prefersReducedMotion, isDesktop, animate, onMouseIdle])

  // Set up event listeners on window
  useEffect(() => {
    if (prefersReducedMotion) return
    if (!isDesktop()) return

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)

      // Cleanup RAF
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }

      // Cleanup timeout
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current)
      }
    }
  }, [prefersReducedMotion, isDesktop, handleMouseMove, handleMouseLeave])

  return {
    isActive: isActiveRef.current,
  }
}

export default useDesktopParallax
