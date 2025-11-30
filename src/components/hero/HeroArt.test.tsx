import { render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import HeroArt from './HeroArt'

// Mock useReducedMotion
vi.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}))

describe('HeroArt', () => {
  test('renders without crashing', () => {
    const { container } = render(<HeroArt />)
    expect(container).toBeInTheDocument()
  })

  test('renders Portrait component', () => {
    const { container } = render(<HeroArt />)
    // Portrait SVG should be present
    const svg = container.querySelector('svg[viewBox="0 0 200 240"]')
    expect(svg).toBeInTheDocument()
  })

  test('renders TechFloaters component', () => {
    const { container } = render(<HeroArt />)
    // Should have tech icon floaters
    const floaters = container.querySelectorAll('[title]')
    expect(floaters.length).toBe(6)
  })

  test('renders glow effect element', () => {
    const { container } = render(<HeroArt />)
    // Should have glow blur element
    const glowElements = container.querySelectorAll('.blur-3xl')
    expect(glowElements.length).toBeGreaterThanOrEqual(1)
  })

  test('applies custom className', () => {
    const { container } = render(<HeroArt className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  test('has perspective-1000 for 3D transforms', () => {
    const { container } = render(<HeroArt />)
    const perspectiveElement = container.querySelector('.perspective-1000')
    expect(perspectiveElement).toBeInTheDocument()
  })

  test('renders with proper aspect ratio container', () => {
    const { container } = render(<HeroArt />)
    const aspectContainer = container.querySelector('.aspect-\\[5\\/6\\]')
    expect(aspectContainer).toBeInTheDocument()
  })
})

describe('HeroArt Mobile Motion - Issue 14.2', () => {
  test('portrait container has hero-idle class for mobile animation', () => {
    const { container } = render(<HeroArt />)
    const portraitContainer = container.querySelector('.aspect-\\[5\\/6\\]')
    expect(portraitContainer).toHaveClass('hero-idle')
  })

  test('tech floater icons have hero-icon-idle class for mobile animation', () => {
    const { container } = render(<HeroArt />)
    const floaters = container.querySelectorAll('[title]')
    floaters.forEach(floater => {
      expect(floater).toHaveClass('hero-icon-idle')
    })
  })

  test('portrait container does not have touch-active class initially', () => {
    const { container } = render(<HeroArt />)
    const portraitContainer = container.querySelector('.aspect-\\[5\\/6\\]')
    expect(portraitContainer).not.toHaveClass('touch-active')
  })

  test('tech icons do not have touch-active class initially', () => {
    const { container } = render(<HeroArt />)
    const floaters = container.querySelectorAll('[title]')
    floaters.forEach(floater => {
      expect(floater).not.toHaveClass('touch-active')
    })
  })
})

describe('HeroArt with reduced motion', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  test('does not have hero-idle class when reduced motion is preferred', async () => {
    vi.doMock('../../hooks/useReducedMotion', () => ({
      useReducedMotion: () => true,
    }))

    const { default: HeroArtMocked } = await import('./HeroArt')
    const { container } = render(<HeroArtMocked />)
    
    const portraitContainer = container.querySelector('.aspect-\\[5\\/6\\]')
    expect(portraitContainer).not.toHaveClass('hero-idle')
  })

  test('tech icons do not have hero-icon-idle class when reduced motion is preferred', async () => {
    vi.doMock('../../hooks/useReducedMotion', () => ({
      useReducedMotion: () => true,
    }))

    const { default: HeroArtMocked } = await import('./HeroArt')
    const { container } = render(<HeroArtMocked />)
    
    const floaters = container.querySelectorAll('[title]')
    floaters.forEach(floater => {
      expect(floater).not.toHaveClass('hero-icon-idle')
    })
  })
})
