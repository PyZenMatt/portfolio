/**
 * Motion Design System - Issue 13.3
 * 
 * Framer Motion presets for consistent, performant animations.
 * All animations respect prefers-reduced-motion via useReducedMotion hook.
 * 
 * Guidelines:
 * - Durations: 0.25s – 0.45s for smooth, snappy feel
 * - No visual noise: subtle, purposeful motion only
 * - Max 1-3 concurrent animations per viewport
 */

import type { Variants, Transition, TargetAndTransition } from 'framer-motion'

// ============================================
// Core Transitions
// ============================================

export const transitions = {
  /** Fast, snappy transition for micro-interactions */
  fast: {
    duration: 0.25,
    ease: [0.25, 0.1, 0.25, 1],
  } as Transition,
  
  /** Default smooth transition */
  default: {
    duration: 0.35,
    ease: [0.25, 0.1, 0.25, 1],
  } as Transition,
  
  /** Slightly slower for emphasis */
  slow: {
    duration: 0.45,
    ease: [0.25, 0.1, 0.25, 1],
  } as Transition,
  
  /** Spring for playful, bouncy feel */
  spring: {
    type: 'spring',
    stiffness: 400,
    damping: 30,
  } as Transition,
  
  /** Soft spring with overshoot */
  springOvershoot: {
    type: 'spring',
    stiffness: 300,
    damping: 20,
  } as Transition,
} as const

// ============================================
// Variant Presets
// ============================================

/** Simple fade in */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: transitions.default,
  },
}

/** Fade in with scale (pop effect) */
export const fadeInScale: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: transitions.default,
  },
}

/** Slide up from below */
export const slideUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.default,
  },
}

/** Slide in from left */
export const slideLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: transitions.default,
  },
}

/** Slide in from right */
export const slideRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 20,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: transitions.default,
  },
}

/** Pop with spring */
export const popSpring: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: transitions.spring,
  },
}

/** Spring with overshoot for playful elements */
export const springOvershoot: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.85,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: transitions.springOvershoot,
  },
}

// ============================================
// Stagger Container Variants
// ============================================

/** Container for staggered children */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

/** Container with faster stagger */
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

/** Child item for stagger containers */
export const staggerChild: Variants = {
  hidden: { 
    opacity: 0, 
    y: 15,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.default,
  },
}

// ============================================
// Page Transition Variants
// ============================================

/** Premium page enter/exit animation with slide and fade */
export const pageTransition: Variants = {
  initial: { 
    opacity: 0, 
    y: 16,
    scale: 0.995,
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
      opacity: { duration: 0.25 },
    },
  },
  exit: { 
    opacity: 0,
    y: -8,
    scale: 0.995,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

// ============================================
// Hover States
// ============================================

/** Subtle scale on hover (cards, buttons) */
export const hoverScale: TargetAndTransition = {
  scale: 1.03,
  transition: transitions.fast,
}

/** Micro scale for buttons */
export const hoverScaleMicro: TargetAndTransition = {
  scale: 1.02,
  transition: transitions.fast,
}

/** Tap scale for buttons */
export const tapScale: TargetAndTransition = {
  scale: 0.98,
}

// ============================================
// Line/Path Animation Variants
// ============================================

/** For animated line draws (timeline, underlines) */
export const lineGrow: Variants = {
  hidden: { 
    scaleY: 0,
    originY: 0,
  },
  visible: { 
    scaleY: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

/** Horizontal line grow (underlines) */
export const underlineGrow: Variants = {
  hidden: { 
    scaleX: 0,
    originX: 0,
  },
  visible: { 
    scaleX: 1,
    transition: transitions.default,
  },
}

// ============================================
// Utility Types
// ============================================

export type MotionPreset = 
  | 'fadeIn'
  | 'fadeInScale'
  | 'slideUp'
  | 'slideLeft'
  | 'slideRight'
  | 'popSpring'
  | 'springOvershoot'

export const presetMap: Record<MotionPreset, Variants> = {
  fadeIn,
  fadeInScale,
  slideUp,
  slideLeft,
  slideRight,
  popSpring,
  springOvershoot,
}
