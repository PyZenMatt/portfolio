/**
 * useIdleControl Hook - Issue 14.2b
 * 
 * Controls the idle animation state for the Hero portrait.
 * Manages the animation-play-state CSS property based on:
 * - Desktop: pauses during mouse movement, resumes after idle timeout
 * - Mobile: pauses during touch, resumes after touch end
 * 
 * Features:
 * - Smooth state transitions
 * - Respects prefers-reduced-motion
 * - Memory cleanup on unmount
 */

import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface IdleControlConfig {
  /** Whether parallax/touch is currently active */
  isInteracting: boolean
  /** Delay before resuming idle animation in ms (default: 350 for mobile, 1500 for desktop) */
  resumeDelay?: number
}

/**
 * Hook for controlling idle animation play state.
 * Pauses animation during interaction, resumes after delay.
 * 
 * @param targetRef - Ref to the element with idle animation
 * @param config - Configuration options
 */
export function useIdleControl(
  targetRef: React.RefObject<HTMLElement | null>,
  config: IdleControlConfig
): void {
  const {
    isInteracting,
    resumeDelay = 350,
  } = config

  const prefersReducedMotion = useReducedMotion()
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Pause animation
  const pauseAnimation = useCallback(() => {
    if (!targetRef.current) return
    targetRef.current.style.animationPlayState = 'paused'
  }, [targetRef])

  // Resume animation
  const resumeAnimation = useCallback(() => {
    if (!targetRef.current) return
    targetRef.current.style.animationPlayState = 'running'
  }, [targetRef])

  // Handle interaction state changes
  useEffect(() => {
    if (prefersReducedMotion) return
    if (!targetRef.current) return

    // Clear any pending resume timeout
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = null
    }

    if (isInteracting) {
      // Immediately pause when interaction starts
      pauseAnimation()
    } else {
      // Resume after delay when interaction ends
      resumeTimeoutRef.current = setTimeout(() => {
        resumeAnimation()
      }, resumeDelay)
    }

    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current)
      }
    }
  }, [isInteracting, prefersReducedMotion, targetRef, pauseAnimation, resumeAnimation, resumeDelay])
}

export default useIdleControl
