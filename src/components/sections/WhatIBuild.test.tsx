/**
 * Tests for WhatIBuild section - Issue 14.3.1 + 14.3.2 + 14.3.3
 */

import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, test, expect, vi } from 'vitest'
import WhatIBuild from './WhatIBuild'

// Mock useReducedMotion
vi.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}))

const renderSection = () => {
  return render(
    <BrowserRouter>
      <WhatIBuild />
    </BrowserRouter>
  )
}

describe('WhatIBuild', () => {
  test('renders section', () => {
    renderSection()
    expect(screen.getByRole('region', { name: /what i build/i })).toBeInTheDocument()
  })

  test('renders heading', () => {
    renderSection()
    expect(screen.getByRole('heading', { name: /what i build/i, level: 2 })).toBeInTheDocument()
  })

  test('renders services grid', () => {
    renderSection()
    expect(screen.getByRole('list', { name: /services offered/i })).toBeInTheDocument()
  })

  test('renders all three service cards', () => {
    renderSection()
    expect(screen.getByRole('heading', { name: /full-stack web apps/i, level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /ai & automation/i, level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /devops & performance/i, level: 3 })).toBeInTheDocument()
  })

  test('renders three list items', () => {
    renderSection()
    const listItems = screen.getAllByRole('listitem')
    // 3 cards + features in each card
    expect(listItems.length).toBeGreaterThanOrEqual(3)
  })

  test('each card has tech stack label', () => {
    renderSection()
    expect(screen.getByText(/django \/ react \/ postgresql/i)).toBeInTheDocument()
    expect(screen.getByText(/llm integration \/ pipeline tooling/i)).toBeInTheDocument()
    expect(screen.getByText(/docker \/ ci-cd \/ monitoring/i)).toBeInTheDocument()
  })
})

describe('WhatIBuild with reduced motion', () => {
  test('renders without motion when reduced motion preferred', async () => {
    const { useReducedMotion } = await import('../../hooks/useReducedMotion')
    vi.mocked(useReducedMotion).mockReturnValue(true)
    
    renderSection()
    expect(screen.getByRole('region', { name: /what i build/i })).toBeInTheDocument()
  })
})
