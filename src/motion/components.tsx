/**
 * Motion Components - Issue 13.3
 * 
 * Wrapper components for consistent motion with reduced-motion support.
 */

import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { 
  fadeIn, 
  fadeInScale, 
  slideUp, 
  slideLeft,
  slideRight,
  popSpring,
  springOvershoot,
  staggerContainer,
  staggerContainerFast,
  staggerChild,
  pageTransition,
} from './motion'
import type { Variants } from 'framer-motion'

// ============================================
// Reveal Component
// ============================================

type RevealPreset = 'fadeIn' | 'fadeInScale' | 'slideUp' | 'slideLeft' | 'slideRight' | 'popSpring' | 'springOvershoot'

interface RevealProps {
  children: ReactNode
  preset?: RevealPreset
  delay?: number
  className?: string
  as?: 'div' | 'span' | 'section' | 'article' | 'li' | 'p' | 'h1' | 'h2' | 'h3'
}

const presetMap: Record<RevealPreset, Variants> = {
  fadeIn,
  fadeInScale,
  slideUp,
  slideLeft,
  slideRight,
  popSpring,
  springOvershoot,
}

export function Reveal({ 
  children, 
  preset = 'slideUp', 
  delay = 0, 
  className,
  as = 'div',
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const variants = presetMap[preset]
  
  const Component = motion[as]
  
  // If reduced motion, render without animation
  if (prefersReducedMotion) {
    const Element = as
    return <Element className={className}>{children}</Element>
  }
  
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants}
      custom={delay}
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Component>
  )
}

// ============================================
// Stagger Container
// ============================================

interface StaggerContainerProps {
  children: ReactNode
  fast?: boolean
  className?: string
  as?: 'div' | 'ul' | 'ol' | 'section'
}

export function StaggerContainer({ 
  children, 
  fast = false, 
  className,
  as = 'div',
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion()
  const Component = motion[as]
  
  if (prefersReducedMotion) {
    const Element = as
    return <Element className={className}>{children}</Element>
  }
  
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={fast ? staggerContainerFast : staggerContainer}
      className={className}
    >
      {children}
    </Component>
  )
}

// ============================================
// Stagger Item
// ============================================

interface StaggerItemProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}

export function StaggerItem({ 
  children, 
  className,
  as = 'div',
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion()
  const Component = motion[as]
  
  if (prefersReducedMotion) {
    const Element = as
    return <Element className={className}>{children}</Element>
  }
  
  return (
    <Component variants={staggerChild} className={className}>
      {children}
    </Component>
  )
}

// ============================================
// Page Wrapper
// ============================================

interface PageWrapperProps {
  children: ReactNode
  className?: string
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  const prefersReducedMotion = useReducedMotion()
  
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// AnimatePresence Export
// ============================================

export { AnimatePresence }
