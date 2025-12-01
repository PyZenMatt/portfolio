/**
 * ArchitectureDiagram Component - Issue 15.1
 * 
 * Animated SVG architecture diagram for case studies.
 * Features:
 * - Block diagram with connections
 * - Staggered fade-in animation
 * - Responsive sizing
 * - Hover highlights on blocks
 * - Reduced motion support
 */

import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export interface ArchitectureBlock {
  id: string
  label: string
  icon?: React.ReactNode
  color?: string
  x: number
  y: number
  width?: number
  height?: number
}

export interface ArchitectureConnection {
  from: string
  to: string
  label?: string
}

interface ArchitectureDiagramProps {
  blocks: ArchitectureBlock[]
  connections: ArchitectureConnection[]
  className?: string
}

const blockVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

export default function ArchitectureDiagram({
  blocks,
  connections,
  className = '',
}: ArchitectureDiagramProps) {
  const prefersReducedMotion = useReducedMotion()

  // Calculate SVG viewBox based on blocks
  const padding = 40
  const maxX = Math.max(...blocks.map((b) => b.x + (b.width ?? 140))) + padding
  const maxY = Math.max(...blocks.map((b) => b.y + (b.height ?? 60))) + padding
  const viewBox = `0 0 ${maxX} ${maxY}`

  // Find block by id
  const getBlock = (id: string) => blocks.find((b) => b.id === id)

  // Calculate center of block for connections
  const getBlockCenter = (block: ArchitectureBlock | undefined) => {
    if (!block) return { x: 0, y: 0 }
    const width = block.width ?? 140
    const height = block.height ?? 60
    return {
      x: block.x + width / 2,
      y: block.y + height / 2,
    }
  }

  // Get edge point for connection
  const getEdgePoint = (from: ArchitectureBlock, to: ArchitectureBlock, side: 'from' | 'to') => {
    const fromCenter = getBlockCenter(from)
    const toCenter = getBlockCenter(to)
    const block = side === 'from' ? from : to
    const width = block.width ?? 140
    const height = block.height ?? 60

    // Determine direction
    const dx = toCenter.x - fromCenter.x
    const dy = toCenter.y - fromCenter.y

    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal connection
      return {
        x: side === 'from' ? block.x + width : block.x,
        y: block.y + height / 2,
      }
    } else {
      // Vertical connection
      return {
        x: block.x + width / 2,
        y: side === 'from' ? block.y + height : block.y,
      }
    }
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-50px' }}
      variants={prefersReducedMotion ? undefined : containerVariants}
      className={`w-full overflow-hidden ${className}`}
      data-testid="architecture-diagram"
      role="img"
      aria-label="Architecture diagram"
    >
      <svg viewBox={viewBox} className="w-full h-auto max-w-4xl mx-auto">
        <defs>
          {/* Gradient for connections */}
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.3" />
          </linearGradient>
          
          {/* Arrow marker */}
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="var(--color-primary)"
              fillOpacity="0.6"
            />
          </marker>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {connections.map((conn, index) => {
          const fromBlock = getBlock(conn.from)
          const toBlock = getBlock(conn.to)
          if (!fromBlock || !toBlock) return null

          const fromPoint = getEdgePoint(fromBlock, toBlock, 'from')
          const toPoint = getEdgePoint(toBlock, fromBlock, 'to')

          // Calculate midpoint for label
          const midX = (fromPoint.x + toPoint.x) / 2
          const midY = (fromPoint.y + toPoint.y) / 2

          return (
            <g key={`conn-${index}`}>
              <motion.line
                x1={fromPoint.x}
                y1={fromPoint.y}
                x2={toPoint.x}
                y2={toPoint.y}
                stroke="url(#connectionGradient)"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
                variants={prefersReducedMotion ? undefined : lineVariants}
              />
              {conn.label && (
                <motion.text
                  x={midX}
                  y={midY - 8}
                  textAnchor="middle"
                  className="text-xs fill-[var(--color-text-secondary)]"
                  variants={prefersReducedMotion ? undefined : blockVariants}
                >
                  {conn.label}
                </motion.text>
              )}
            </g>
          )
        })}

        {/* Blocks */}
        {blocks.map((block) => {
          const width = block.width ?? 140
          const height = block.height ?? 60
          const color = block.color ?? 'var(--color-primary)'

          return (
            <motion.g
              key={block.id}
              variants={prefersReducedMotion ? undefined : blockVariants}
              className="cursor-pointer"
              data-testid={`arch-block-${block.id}`}
            >
              {/* Block background */}
              <rect
                x={block.x}
                y={block.y}
                width={width}
                height={height}
                rx="8"
                className="fill-[var(--color-card)] stroke-[var(--color-border)] hover:stroke-[var(--color-primary)]/50 transition-colors"
                strokeWidth="1.5"
              />

              {/* Color accent line */}
              <rect
                x={block.x}
                y={block.y}
                width={width}
                height="4"
                rx="8"
                fill={color}
                opacity="0.8"
              />

              {/* Icon */}
              {block.icon && (
                <foreignObject
                  x={block.x + 8}
                  y={block.y + 16}
                  width="24"
                  height="24"
                >
                  <div className="w-6 h-6 text-[var(--color-primary)]">
                    {block.icon}
                  </div>
                </foreignObject>
              )}

              {/* Label */}
              <text
                x={block.x + (block.icon ? 40 : width / 2)}
                y={block.y + height / 2 + 5}
                textAnchor={block.icon ? 'start' : 'middle'}
                className="text-sm font-medium fill-[var(--color-text)]"
              >
                {block.label}
              </text>
            </motion.g>
          )
        })}
      </svg>
    </motion.div>
  )
}
