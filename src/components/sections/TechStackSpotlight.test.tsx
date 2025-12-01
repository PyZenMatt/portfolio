/**
 * Tests for TechStackSpotlight section - Issue 14.3.4 + 14.3.5
 */

import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import TechStackSpotlight from './TechStackSpotlight'

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

describe('TechStackSpotlight', () => {
  test('renders section', () => {
    render(<TechStackSpotlight />)
    expect(screen.getByRole('region', { name: /tech stack/i })).toBeInTheDocument()
  })

  test('renders heading', () => {
    render(<TechStackSpotlight />)
    expect(screen.getByRole('heading', { name: /tech stack/i, level: 2 })).toBeInTheDocument()
  })

  test('renders technologies grid', () => {
    render(<TechStackSpotlight />)
    expect(screen.getByRole('list', { name: /technologies/i })).toBeInTheDocument()
  })

  test('renders all 6 tech icons', () => {
    render(<TechStackSpotlight />)
    const icons = screen.getAllByRole('listitem')
    expect(icons).toHaveLength(6)
  })
})

