/**
 * Tests for TechStackSpotlight section - Issue 14.3.4 + 14.3.5 + 14.3.6
 */

import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
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

// Helper to render with Router
const renderWithRouter = (ui: React.ReactNode) => {
  return render(
    <MemoryRouter>
      {ui}
    </MemoryRouter>
  )
}

describe('TechStackSpotlight', () => {
  test('renders section', () => {
    renderWithRouter(<TechStackSpotlight />)
    expect(screen.getByRole('region', { name: /tech stack/i })).toBeInTheDocument()
  })

  test('renders heading', () => {
    renderWithRouter(<TechStackSpotlight />)
    expect(screen.getByRole('heading', { name: /tech stack/i, level: 2 })).toBeInTheDocument()
  })

  test('renders technologies grid', () => {
    renderWithRouter(<TechStackSpotlight />)
    expect(screen.getByRole('list', { name: /technologies/i })).toBeInTheDocument()
  })

  test('renders all 6 tech icons', () => {
    renderWithRouter(<TechStackSpotlight />)
    const icons = screen.getAllByRole('listitem')
    expect(icons).toHaveLength(6)
  })
})

