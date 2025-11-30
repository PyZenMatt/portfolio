/**
 * useTouchParallax Hook - Issue 14.2 + 14.2b
 * 
 * Touch-based parallax effect for mobile devices only.
 * Features:
 * - Only activates on devices with coarse pointer (touch)
 * - Smooth touch-responsive parallax movement
 * - RAF-based updates for 60fps performance
 * - Smooth decay animation on touch end
 * - Max transform clamp ±12px
 * - Respects prefers-reduced-motion
 * - Memory cleanup on unmount
 */

import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface TouchParallaxConfig {
  /** Max horizontal offset in pixels (default: 12) */
  maxX?: number
  /** Max vertical offset in pixels (default: 12) */
  maxY?: number
  /** Sensitivity factor for X axis (default: 10) */
  sensitivityX?: number
  /** Sensitivity factor for Y axis (default: 12) */
  sensitivityY?: number
  /** Duration of decay animation in ms (default: 350) */
  decayDuration?: number
  /** Callback when touch starts */
  onTouchStart?: () => void
  /** Callback when touch ends */
  onTouchEnd?: () => void
}

interface TouchParallaxReturn {
  /** Whether touch is currently active */
  isTouching: boolean
}

/**
 * Hook for touch-based parallax on mobile devices only.
 * Applies translate3d transforms based on touch movement.
 * Only activates on devices with coarse pointer (touch screens).
 * 
 * @param targetRef - Ref to the element to apply parallax to
 * @param config - Configuration options
 * @returns Object with touch state
 */
export function useTouchParallax(
  targetRef: React.RefObject<HTMLElement | null>,
  config: TouchParallaxConfig = {}
): TouchParallaxReturn {
  const {
    maxX = 12,
    maxY = 12,
    sensitivityX = 10,
    sensitivityY = 12,
    decayDuration = 350,
    onTouchStart,
    onTouchEnd,
  } = config

  const prefersReducedMotion = useReducedMotion()
  const isTouchingRef = useRef(false)
  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const currentXRef = useRef(0)
  const currentYRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)
  const inactivityTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Check if device has coarse pointer (touch/mobile)
  const isMobile = useCallback((): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: coarse)').matches
  }, [])

  // Clamp value within bounds
  const clamp = useCallback((value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max)
  }, [])

  // Apply transform using RAF for performance
  const applyTransform = useCallback((x: number, y: number, withTransition = false) => {
    if (!targetRef.current) return

    const clampedX = clamp(x, -maxX, maxX)
    const clampedY = clamp(y, -maxY, maxY)

    if (withTransition) {
      targetRef.current.style.transition = `transform ${decayDuration}ms ease-out`
    } else {
      targetRef.current.style.transition = 'none'
    }

    targetRef.current.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`
  }, [targetRef, maxX, maxY, decayDuration, clamp])

  // Reset transform with smooth animation
  const resetTransform = useCallback(() => {
    if (!targetRef.current) return

    targetRef.current.style.transition = `transform ${decayDuration}ms ease-out`
    targetRef.current.style.transform = 'translate3d(0, 0, 0)'
    
    currentXRef.current = 0
    currentYRef.current = 0
  }, [targetRef, decayDuration])

  // Handle touch start
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (prefersReducedMotion) return
    if (e.touches.length !== 1) return // Single touch only

    isTouchingRef.current = true
    startXRef.current = e.touches[0].clientX
    startYRef.current = e.touches[0].clientY

    // Clear any pending inactivity timeout
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current)
      inactivityTimeoutRef.current = null
    }

    onTouchStart?.()
  }, [prefersReducedMotion, onTouchStart])

  // Handle touch move with RAF
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (prefersReducedMotion) return
    if (!isTouchingRef.current) return
    if (e.touches.length !== 1) return

    // Cancel any pending RAF
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
    }

    rafIdRef.current = requestAnimationFrame(() => {
      const deltaX = (e.touches[0].clientX - startXRef.current) / sensitivityX
      const deltaY = (e.touches[0].clientY - startYRef.current) / sensitivityY

      currentXRef.current = deltaX
      currentYRef.current = deltaY

      applyTransform(deltaX, deltaY, false)
    })
  }, [prefersReducedMotion, sensitivityX, sensitivityY, applyTransform])

  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    if (prefersReducedMotion) return

    isTouchingRef.current = false

    // Cancel any pending RAF
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }

    // Smooth reset with decay animation
    resetTransform()

    // Set inactivity timeout for callback
    inactivityTimeoutRef.current = setTimeout(() => {
      onTouchEnd?.()
    }, decayDuration)
  }, [prefersReducedMotion, resetTransform, decayDuration, onTouchEnd])

  // Set up event listeners - only on mobile devices
  useEffect(() => {
    const element = targetRef.current
    if (!element || prefersReducedMotion) return
    
    // Only activate on mobile (coarse pointer) devices
    if (!isMobile()) return

    // Use passive: true for better scroll performance
    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchmove', handleTouchMove, { passive: true })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })
    element.addEventListener('touchcancel', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
      element.removeEventListener('touchcancel', handleTouchEnd)

      // Cleanup RAF
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }

      // Cleanup timeout
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current)
      }
    }
  }, [targetRef, prefersReducedMotion, isMobile, handleTouchStart, handleTouchMove, handleTouchEnd])

  return {
    isTouching: isTouchingRef.current,
  }
}

export default useTouchParallax
