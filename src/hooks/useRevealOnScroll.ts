/**
 * useRevealOnScroll Hook - Issue 13.5
 * 
 * Combines IntersectionObserver with Framer Motion for
 * elegant scroll-based reveal animations.
 * 
 * Features:
 * - Configurable threshold and margin
 * - Once-only or repeat animations
 * - Stagger delay support
 * - Reduced motion safe
 */

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface UseRevealOnScrollOptions {
  /** Intersection threshold (0-1) */
  threshold?: number
  /** Root margin for earlier/later triggering */
  rootMargin?: string
  /** Only trigger once */
  once?: boolean
  /** Delay before animation starts (ms) */
  delay?: number
}

interface UseRevealOnScrollReturn {
  /** Ref to attach to the element */
  ref: React.RefObject<HTMLElement | null>
  /** Whether the element is in view */
  inView: boolean
  /** Animation state: 'hidden' | 'visible' */
  animationState: 'hidden' | 'visible'
}

export function useRevealOnScroll(
  options: UseRevealOnScrollOptions = {}
): UseRevealOnScrollReturn {
  const {
    threshold = 0.1,
    rootMargin = '-50px',
    once = true,
    delay = 0,
  } = options

  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // If reduced motion, immediately show
    if (prefersReducedMotion) {
      setInView(true)
      return
    }

    const element = ref.current
    if (!element) return

    // If once mode and already triggered, don't observe
    if (once && hasTriggered) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply delay if specified
            if (delay > 0) {
              setTimeout(() => {
                setInView(true)
                setHasTriggered(true)
              }, delay)
            } else {
              setInView(true)
              setHasTriggered(true)
            }

            // Unobserve if once mode
            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            setInView(false)
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, once, delay, hasTriggered, prefersReducedMotion])

  return {
    ref,
    inView,
    animationState: inView ? 'visible' : 'hidden',
  }
}

export default useRevealOnScroll
