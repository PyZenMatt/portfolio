/**
 * Portrait Component - Issue 14 + 14.1
 * 
 * Stylized monoline silhouette portrait SVG.
 * Features:
 * - Theme-aware colors via --color-hero-portrait CSS variable
 * - Light mode: navy/slate (#242E3D)
 * - Dark mode: primary accent (#EF552C)
 * - Uses currentColor for theme switching
 * - Entrance animation (fade + slideUp)
 * - Lightweight (~1.2KB SVG)
 */

import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { fadeInUp } from '../../motion'

interface PortraitProps {
  className?: string
}

export default function Portrait({ className = '' }: PortraitProps) {
  const prefersReducedMotion = useReducedMotion()
  
  const MotionSvg = prefersReducedMotion ? 'svg' : motion.svg

  return (
    <MotionSvg
      {...(!prefersReducedMotion && {
        initial: "hidden",
        animate: "visible",
        variants: fadeInUp,
      })}
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full text-[var(--color-hero-portrait)] ${className}`}
      aria-hidden="true"
      role="img"
    >
      {/* Head and neck silhouette - stylized developer portrait */}
      <g className="portrait-silhouette">
        {/* Head shape - slightly tilted for personality */}
        <ellipse
          cx="100"
          cy="70"
          rx="52"
          ry="58"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Hair - modern styled */}
        <path
          d="M48 55
             C48 30, 70 12, 100 12
             C130 12, 152 30, 152 55
             C152 40, 140 25, 100 25
             C60 25, 48 40, 48 55
             Z"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Side hair detail */}
        <path
          d="M48 55 C44 65, 44 80, 48 90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M152 55 C156 65, 156 80, 152 90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Ears */}
        <ellipse
          cx="46"
          cy="75"
          rx="6"
          ry="10"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <ellipse
          cx="154"
          cy="75"
          rx="6"
          ry="10"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        {/* Glasses - developer signature */}
        <g className="glasses" strokeWidth="1.5" stroke="currentColor" fill="none">
          {/* Left lens */}
          <rect
            x="60"
            y="60"
            width="30"
            height="22"
            rx="4"
            strokeLinecap="round"
          />
          {/* Right lens */}
          <rect
            x="110"
            y="60"
            width="30"
            height="22"
            rx="4"
            strokeLinecap="round"
          />
          {/* Bridge */}
          <path d="M90 71 L110 71" strokeLinecap="round" />
          {/* Temple arms */}
          <path d="M60 66 L46 64" strokeLinecap="round" />
          <path d="M140 66 L154 64" strokeLinecap="round" />
        </g>

        {/* Subtle smile */}
        <path
          d="M85 100 Q100 110, 115 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Neck */}
        <path
          d="M80 125 
             L80 150 
             Q80 165, 65 175
             L135 175
             Q120 165, 120 150
             L120 125"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Shoulders - professional look */}
        <path
          d="M65 175
             Q40 180, 20 200
             L20 240
             L180 240
             L180 200
             Q160 180, 135 175"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Collar/shirt detail */}
        <path
          d="M80 175 L100 195 L120 175"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Collar lines */}
        <path
          d="M65 175 L85 190"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M135 175 L115 190"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>
    </MotionSvg>
  )
}
