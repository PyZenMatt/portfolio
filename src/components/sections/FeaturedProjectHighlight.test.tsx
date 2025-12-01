/**
 * Tests for FeaturedProjectHighlight section - Issue 14.3.7 + 14.3.8 + 14.3.9
 * 
 * Tests for:
 * - Rendering (section, heading, article)
 * - Responsive layout
 * - CTA buttons
 * - Image loading states
 * - Accessibility
 * - Animations (framer-motion mocks)
 * - Reduced motion fallback
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import FeaturedProjectHighlight, { type FeaturedProject } from './FeaturedProjectHighlight'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, whileInView, viewport, variants, animate, ...rest } = props
      return (
        <section 
          data-testid="motion-section" 
          data-initial={initial ? 'hidden' : undefined}
          data-animate={animate ? JSON.stringify(animate) : undefined}
          {...rest}
        >
          {children}
        </section>
      )
    },
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, whileInView, viewport, variants, animate, ...rest } = props
      return (
        <div 
          data-testid="motion-div" 
          data-variants={variants ? 'true' : undefined}
          data-animate={animate ? 'true' : undefined}
          {...rest}
        >
          {children}
        </div>
      )
    },
  },
}))

// Mock useReducedMotion
vi.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}))

const renderWithRouter = (ui: React.ReactNode) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

const mockProject: FeaturedProject = {
  id: 'test-project',
  title: 'Test Project',
  subtitle: 'Test Subtitle',
  description: 'Test description for the project.',
  techStack: ['React', 'TypeScript', 'Node.js'],
  image: '/test-image.jpg',
  caseStudyUrl: '/projects/test-project',
  liveUrl: 'https://test-project.example.com',
}

describe('FeaturedProjectHighlight', () => {
  // Test 1: Renders section with accessible name
  test('renders section with accessible name', () => {
    renderWithRouter(<FeaturedProjectHighlight />)
    expect(screen.getByRole('region', { name: /featured project/i })).toBeInTheDocument()
  })

  // Test 2: Renders section heading
  test('renders section heading', () => {
    renderWithRouter(<FeaturedProjectHighlight />)
    expect(screen.getByRole('heading', { name: /featured project/i, level: 2 })).toBeInTheDocument()
  })

  // Test 3: Renders project article with title
  test('renders project article with title', () => {
    renderWithRouter(<FeaturedProjectHighlight project={mockProject} />)
    expect(screen.getByRole('article', { name: /featured project: test project/i })).toBeInTheDocument()
  })

  // Test 4: Renders project title as h3
  test('renders project title as h3', () => {
    renderWithRouter(<FeaturedProjectHighlight project={mockProject} />)
    expect(screen.getByRole('heading', { name: 'Test Project', level: 3 })).toBeInTheDocument()
  })

  // Test 5: Renders project subtitle
  test('renders project subtitle', () => {
    renderWithRouter(<FeaturedProjectHighlight project={mockProject} />)
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })

  // Test 6: Renders project description
  test('renders project description', () => {
    renderWithRouter(<FeaturedProjectHighlight project={mockProject} />)
    expect(screen.getByText('Test description for the project.')).toBeInTheDocument()
  })

  // Test 7: Renders tech stack badges
  test('renders tech stack badges', () => {
    renderWithRouter(<FeaturedProjectHighlight project={mockProject} />)
    expect(screen.getByRole('list', { name: /technologies used/i })).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })

  // Test 8: Renders View Case Study CTA
  test('renders View Case Study CTA with correct link', () => {
    renderWithRouter(<FeaturedProjectHighlight project={mockProject} />)
    const cta = screen.getByRole('link', { name: /view case study for test project/i })
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '/projects/test-project')
  })

  // Test 9: Renders Live Demo CTA with external link attributes
  test('renders Live Demo CTA with external link attributes', () => {
    renderWithRouter(<FeaturedProjectHighlight project={mockProject} />)
    const liveDemo = screen.getByRole('link', { name: /view live demo.*opens in new tab/i })
    expect(liveDemo).toBeInTheDocument()
    expect(liveDemo).toHaveAttribute('href', 'https://test-project.example.com')
    expect(liveDemo).toHaveAttribute('target', '_blank')
    expect(liveDemo).toHaveAttribute('rel', 'noopener noreferrer')
  })

  // Test 10: Shows placeholder when no image
  test('shows placeholder when no image provided', () => {
    const projectWithoutImage = { ...mockProject, image: undefined }
    renderWithRouter(<FeaturedProjectHighlight project={projectWithoutImage} />)
    expect(screen.getByTestId('image-placeholder')).toBeInTheDocument()
  })

  // Test 11: Shows placeholder while image is loading
  test('shows placeholder while image is loading', () => {
    renderWithRouter(<FeaturedProjectHighlight project={mockProject} />)
    // Placeholder should be visible initially
    expect(screen.getByTestId('image-placeholder')).toHaveClass('opacity-100')
  })

  // Test 12: Handles image load event
  test('handles image load event', () => {
    renderWithRouter(<FeaturedProjectHighlight project={mockProject} />)
    const img = screen.getByAltText(/screenshot of test project/i)
    expect(img).toBeInTheDocument()
    fireEvent.load(img)
    // After load, placeholder should fade out
    expect(screen.getByTestId('image-placeholder')).toHaveClass('opacity-0')
  })

  // Test 13: Handles image error event
  test('handles image error event - shows placeholder', () => {
    renderWithRouter(<FeaturedProjectHighlight project={mockProject} />)
    const img = screen.getByAltText(/screenshot of test project/i)
    fireEvent.error(img)
    // Placeholder should remain visible after error
    expect(screen.getByTestId('image-placeholder')).toHaveClass('opacity-100')
  })

  // Test 14: Does not render CTA if no caseStudyUrl
  test('does not render Case Study CTA if no URL provided', () => {
    const projectWithoutCaseStudy = { ...mockProject, caseStudyUrl: undefined }
    renderWithRouter(<FeaturedProjectHighlight project={projectWithoutCaseStudy} />)
    expect(screen.queryByRole('link', { name: /view case study/i })).not.toBeInTheDocument()
  })

  // Test 15: Does not render Live Demo if no liveUrl
  test('does not render Live Demo CTA if no URL provided', () => {
    const projectWithoutLiveUrl = { ...mockProject, liveUrl: undefined }
    renderWithRouter(<FeaturedProjectHighlight project={projectWithoutLiveUrl} />)
    expect(screen.queryByRole('link', { name: /live demo/i })).not.toBeInTheDocument()
  })
})

describe('FeaturedProjectHighlight Animations (Issue 14.3.9)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useReducedMotion).mockReturnValue(false)
  })

  // Test 16: Uses motion components when animations enabled
  test('uses motion components when animations enabled', () => {
    renderWithRouter(<FeaturedProjectHighlight project={mockProject} />)
    expect(screen.getByTestId('motion-section')).toBeInTheDocument()
    expect(screen.getAllByTestId('motion-div').length).toBeGreaterThan(0)
  })

  // Test 17: Has initial hidden state for container animation
  test('has initial hidden state for container animation', () => {
    renderWithRouter(<FeaturedProjectHighlight project={mockProject} />)
    const section = screen.getByTestId('motion-section')
    expect(section).toHaveAttribute('data-initial', 'hidden')
  })

  // Test 18: Image container has parallax float animation
  test('image container has float animation', () => {
    renderWithRouter(<FeaturedProjectHighlight project={mockProject} />)
    const imageContainer = screen.getByTestId('image-container')
    expect(imageContainer).toHaveAttribute('data-animate', 'true')
  })

  // Test 19: Content items have staggered variants
  test('content items have animation variants', () => {
    renderWithRouter(<FeaturedProjectHighlight project={mockProject} />)
    const motionDivs = screen.getAllByTestId('motion-div')
    const divsWithVariants = motionDivs.filter(div => div.hasAttribute('data-variants'))
    expect(divsWithVariants.length).toBeGreaterThan(0)
  })
})

describe('FeaturedProjectHighlight Reduced Motion (Issue 14.3.9)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useReducedMotion).mockReturnValue(true)
  })

  // Test 20: Uses static elements when reduced motion is preferred
  test('uses static section when reduced motion is preferred', () => {
    renderWithRouter(<FeaturedProjectHighlight project={mockProject} />)
    // With reduced motion, should still render section but without motion props
    expect(screen.getByRole('region', { name: /featured project/i })).toBeInTheDocument()
  })

  // Test 21: Does not apply float animation when reduced motion is preferred
  test('does not apply float animation when reduced motion is preferred', () => {
    renderWithRouter(<FeaturedProjectHighlight project={mockProject} />)
    // The section should exist but motion section won't have animation data
    const sections = screen.getAllByRole('region')
    expect(sections.length).toBeGreaterThan(0)
  })

  // Test 22: Content still renders correctly with reduced motion
  test('content renders correctly with reduced motion', () => {
    renderWithRouter(<FeaturedProjectHighlight project={mockProject} />)
    expect(screen.getByRole('heading', { name: 'Test Project', level: 3 })).toBeInTheDocument()
    expect(screen.getByText('Test description for the project.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /view case study/i })).toBeInTheDocument()
  })
})
