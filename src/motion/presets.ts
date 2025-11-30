/**
 * Advanced Motion Presets - Issue 13.5
 * 
 * Premium motion presets for polished, modern animations.
 * All presets respect prefers-reduced-motion via useReducedMotion hook.
 * 
 * Principles:
 * - Micro-motion → depth → fluidity → perceived quality
 * - Durations: 0.2s – 0.45s for snappy, elegant feel
 * - Spring physics for natural movement
 * - No visual noise or layout shifts
 */

import type { Variants, Transition } from 'framer-motion'

// ============================================
// Core Transitions (Advanced)
// ============================================

export const advancedTransitions = {
  /** Ultra-fast micro-interaction */
  micro: {
    duration: 0.15,
    ease: [0.25, 0.1, 0.25, 1],
  } as Transition,

  /** Fast entrance */
  fastIn: {
    duration: 0.2,
    ease: [0.0, 0.0, 0.2, 1], // ease-out
  } as Transition,

  /** Fast exit */
  fastOut: {
    duration: 0.15,
    ease: [0.4, 0.0, 1, 1], // ease-in
  } as Transition,

  /** Smooth default */
  smooth: {
    duration: 0.35,
    ease: [0.25, 0.1, 0.25, 1],
  } as Transition,

  /** Premium spring for UI elements */
  springSmooth: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
    mass: 1,
  } as Transition,

  /** Bouncy spring for playful elements */
  springBouncy: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
    mass: 0.8,
  } as Transition,

  /** Soft spring for parallax/tilt */
  springSoft: {
    type: 'spring',
    stiffness: 150,
    damping: 25,
    mass: 1,
  } as Transition,

  /** Magnetic button spring */
  springMagnetic: {
    type: 'spring',
    stiffness: 200,
    damping: 20,
    mass: 0.5,
  } as Transition,
} as const

// ============================================
// Fade Presets
// ============================================

/** Simple fade in */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: advancedTransitions.smooth,
  },
}

/** Fade in from above */
export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -15,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: advancedTransitions.smooth,
  },
}

/** Fade in from below (premium reveal) */
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: advancedTransitions.smooth,
  },
}

/** Fade in from left */
export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: advancedTransitions.smooth,
  },
}

/** Fade in from right */
export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 20,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: advancedTransitions.smooth,
  },
}

// ============================================
// Slide Presets
// ============================================

/** Slide in from left */
export const slideLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -30,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: advancedTransitions.springSmooth,
  },
}

/** Slide in from right */
export const slideRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 30,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: advancedTransitions.springSmooth,
  },
}

/** Slide up with spring */
export const slideUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 25,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: advancedTransitions.springSmooth,
  },
}

// ============================================
// Scale/Zoom Presets
// ============================================

/** Subtle zoom in (elegant reveal) */
export const zoomIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: advancedTransitions.smooth,
  },
}

/** Spring pop (playful entrance) */
export const springPop: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: advancedTransitions.springBouncy,
  },
}

// ============================================
// Stagger Container Presets
// ============================================

/** Smooth stagger container */
export const smoothStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

/** Fast stagger for UI elements */
export const fastStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

/** Stagger child item */
export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 15,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: advancedTransitions.smooth,
  },
}

// ============================================
// Card Tilt Presets
// ============================================

/** Card tilt configuration */
export const cardTilt = {
  /** Maximum rotation in degrees */
  maxRotation: 3,
  /** Spring config for tilt */
  spring: advancedTransitions.springSoft,
  /** Scale on hover */
  hoverScale: 1.02,
} as const

// ============================================
// Page Transition Presets
// ============================================

/** Premium page enter animation */
export const pageEnter: Variants = {
  initial: { 
    opacity: 0, 
    y: 15,
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.0, 0.0, 0.2, 1],
    },
  },
  exit: { 
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.15,
      ease: [0.4, 0.0, 1, 1],
    },
  },
}

// ============================================
// Magnetic Button Config
// ============================================

/** Magnetic button configuration */
export const magneticConfig = {
  /** Maximum displacement in pixels */
  maxDisplacement: 6,
  /** Scale on hover */
  hoverScale: 1.03,
  /** Spring config */
  spring: advancedTransitions.springMagnetic,
} as const

// ============================================
// Parallax Config
// ============================================

/** Parallax configuration for Hero */
export const parallaxConfig = {
  /** Y axis range in pixels */
  yRange: 10,
  /** X axis range in pixels */
  xRange: 6,
  /** Spring config */
  spring: advancedTransitions.springSoft,
} as const

// ============================================
// Glow Cursor Config
// ============================================

/** Glow cursor configuration */
export const glowConfig = {
  /** Radius in pixels */
  radius: 200,
  /** Opacity (0-1) */
  opacity: 0.15,
  /** Color */
  color: 'var(--color-primary-light)',
  /** Lerp factor (0-1, lower = smoother) */
  lerp: 0.1,
} as const

// ============================================
// Theme Transition Config
// ============================================

/** Theme morph transition */
export const themeTransition = {
  duration: 500, // ms
  easing: 'ease-out',
  properties: ['background-color', 'color', 'border-color', 'box-shadow'],
} as const
