/**
 * Tests for WhatIBuildCard component - Issue 14.3.2 + 14.3.3
 */

import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, test, expect, vi } from 'vitest'
import WhatIBuildCard from './WhatIBuildCard'

// Mock useReducedMotion to test both motion states
vi.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}))

const mockIcon = <svg data-testid="mock-icon" aria-hidden="true"><circle /></svg>

const defaultProps = {
  title: 'Test Service',
  description: 'Test description for the service.',
  techStack: 'Tech / Stack',
  features: ['Feature one', 'Feature two', 'Feature three'],
  icon: mockIcon,
  ctaText: 'View Projects',
  ctaHref: '/projects',
}

const renderCard = (props = {}) => {
  return render(
    <BrowserRouter>
      <WhatIBuildCard {...defaultProps} {...props} />
    </BrowserRouter>
  )
}

describe('WhatIBuildCard', () => {
  test('renders card as article', () => {
    renderCard()
    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  test('renders title as h3', () => {
    renderCard()
    expect(screen.getByRole('heading', { level: 3, name: /test service/i })).toBeInTheDocument()
  })

  test('renders description', () => {
    renderCard()
    expect(screen.getByText(/test description for the service/i)).toBeInTheDocument()
  })

  test('renders tech stack badge', () => {
    renderCard()
    expect(screen.getByText(/tech \/ stack/i)).toBeInTheDocument()
  })

  test('renders features list', () => {
    renderCard()
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByText('Feature one')).toBeInTheDocument()
    expect(screen.getByText('Feature two')).toBeInTheDocument()
    expect(screen.getByText('Feature three')).toBeInTheDocument()
  })

  test('renders CTA link with correct href', () => {
    renderCard()
    const link = screen.getByRole('link', { name: /view projects/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/projects')
  })

  test('renders icon container with aria-hidden', () => {
    renderCard()
    const iconContainer = screen.getByTestId('mock-icon').parentElement
    expect(iconContainer).toHaveAttribute('aria-hidden', 'true')
  })

  test('checkmark icons are aria-hidden', () => {
    renderCard()
    const checkmarks = document.querySelectorAll('ul svg')
    checkmarks.forEach(svg => {
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })
  })

  test('arrow icon in CTA is aria-hidden', () => {
    renderCard()
    const link = screen.getByRole('link', { name: /view projects/i })
    const arrowIcon = link.querySelector('svg')
    expect(arrowIcon).toHaveAttribute('aria-hidden', 'true')
  })

  test('uses default CTA text when not provided', () => {
    render(
      <BrowserRouter>
        <WhatIBuildCard
          title="Service"
          description="Description"
          techStack="Tech"
          features={['Feature']}
          icon={mockIcon}
        />
      </BrowserRouter>
    )
    expect(screen.getByRole('link', { name: /learn more/i })).toBeInTheDocument()
  })

  test('card has hover transition classes', () => {
    renderCard()
    const article = screen.getByRole('article')
    expect(article.className).toContain('hover:shadow-xl')
    expect(article.className).toContain('hover:border-')
  })

  test('accepts index prop for staggered animation', () => {
    renderCard({ index: 2 })
    expect(screen.getByRole('article')).toBeInTheDocument()
  })
})

describe('WhatIBuildCard with reduced motion', () => {
  test('renders without motion when reduced motion preferred', async () => {
    const { useReducedMotion } = await import('../../hooks/useReducedMotion')
    vi.mocked(useReducedMotion).mockReturnValue(true)
    
    renderCard()
    expect(screen.getByRole('article')).toBeInTheDocument()
  })
})
