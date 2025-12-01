/**
 * TechIcon Component Tests - Issue 14.3.5
 * 
 * Tests for:
 * - Icon presence (6 techs)
 * - Tooltip logic (show/hide on hover/focus)
 * - Accessibility (aria-label, role, keyboard)
 * - Animation states
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import TechIcon, { techConfigs, type TechName } from './TechIcon'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { animate, whileHover, initial, exit, transition, ...rest } = props
      return <div data-testid="motion-div" {...rest}>{children}</div>
    },
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

// Mock useReducedMotion
vi.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}))

const allTechs: TechName[] = ['typescript', 'react', 'django', 'python', 'docker', 'github']

describe('TechIcon', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Test 1: Renders TypeScript icon with correct aria-label
  it('renders TypeScript icon with correct aria-label', () => {
    render(<TechIcon tech="typescript" />)
    const icon = screen.getByRole('button', { name: 'TypeScript' })
    expect(icon).toBeInTheDocument()
  })

  // Test 2: Renders React icon with correct aria-label
  it('renders React icon with correct aria-label', () => {
    render(<TechIcon tech="react" />)
    const icon = screen.getByRole('button', { name: 'React' })
    expect(icon).toBeInTheDocument()
  })

  // Test 3: Renders Django icon with correct aria-label
  it('renders Django icon with correct aria-label', () => {
    render(<TechIcon tech="django" />)
    const icon = screen.getByRole('button', { name: 'Django' })
    expect(icon).toBeInTheDocument()
  })

  // Test 4: Renders Python icon with correct aria-label
  it('renders Python icon with correct aria-label', () => {
    render(<TechIcon tech="python" />)
    const icon = screen.getByRole('button', { name: 'Python' })
    expect(icon).toBeInTheDocument()
  })

  // Test 5: Renders Docker icon with correct aria-label
  it('renders Docker icon with correct aria-label', () => {
    render(<TechIcon tech="docker" />)
    const icon = screen.getByRole('button', { name: 'Docker' })
    expect(icon).toBeInTheDocument()
  })

  // Test 6: Renders GitHub icon with correct aria-label
  it('renders GitHub icon with correct aria-label', () => {
    render(<TechIcon tech="github" />)
    const icon = screen.getByRole('button', { name: 'GitHub' })
    expect(icon).toBeInTheDocument()
  })

  // Test 7: Shows tooltip on mouse enter
  it('shows tooltip on mouse enter', () => {
    render(<TechIcon tech="typescript" />)
    const container = screen.getByRole('listitem')
    
    // Tooltip should not be visible initially
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    
    // Hover over icon
    fireEvent.mouseEnter(container)
    
    // Tooltip should be visible with tech name
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(screen.getByRole('tooltip')).toHaveTextContent('TypeScript')
  })

  // Test 8: Hides tooltip on mouse leave
  it('hides tooltip on mouse leave', () => {
    render(<TechIcon tech="react" />)
    const container = screen.getByRole('listitem')
    
    // Show tooltip
    fireEvent.mouseEnter(container)
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    
    // Hide tooltip
    fireEvent.mouseLeave(container)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  // Test 9: Shows tooltip on focus (keyboard accessibility)
  it('shows tooltip on focus for keyboard accessibility', () => {
    render(<TechIcon tech="python" />)
    const container = screen.getByRole('listitem')
    
    // Focus the container
    fireEvent.focus(container)
    
    // Tooltip should appear
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(screen.getByRole('tooltip')).toHaveTextContent('Python')
  })

  // Test 10: Has correct role="listitem" for list context
  it('has correct role="listitem" for list context', () => {
    render(<TechIcon tech="docker" />)
    expect(screen.getByRole('listitem')).toBeInTheDocument()
  })

  // Test 11: Icon button is focusable (tabIndex)
  it('icon button is focusable with tabIndex', () => {
    render(<TechIcon tech="github" />)
    const button = screen.getByRole('button', { name: 'GitHub' })
    expect(button).toHaveAttribute('tabindex', '0')
  })

  // Test 12: All tech configs have required properties
  it('all tech configs have name, color, and icon', () => {
    allTechs.forEach((tech) => {
      const config = techConfigs[tech]
      expect(config.name).toBeDefined()
      expect(config.name.length).toBeGreaterThan(0)
      expect(config.color).toBeDefined()
      expect(config.color).toMatch(/^#[0-9A-Fa-f]{6}$/)
      expect(config.icon).toBeDefined()
    })
  })
})
