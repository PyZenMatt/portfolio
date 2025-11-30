/**
 * Motion System - Issue 13.3 + 13.5
 * 
 * Central export for all motion utilities, presets, and components.
 */

// Core motion presets (13.3) - primary exports
export * from './motion'

// Advanced motion presets (13.5) - named exports to avoid conflicts
export {
  advancedTransitions,
  fadeInDown,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  zoomIn,
  springPop,
  smoothStagger,
  fastStagger,
  staggerItem,
  cardTilt,
  pageEnter,
  magneticConfig,
  parallaxConfig,
  glowConfig,
  themeTransition,
} from './presets'

// Motion components
export * from './components'
