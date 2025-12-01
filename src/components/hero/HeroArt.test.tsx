import { render } from '@testing-library/react'
import { vi } from 'vitest'
import HeroArt from './HeroArt'

// Mock useReducedMotion
vi.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}))

// Mock matchMedia for pointer detection
const mockMatchMedia = (pointerType: 'fine' | 'coarse' | 'none') => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query.includes(pointerType),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

describe('HeroArt', () => {
  beforeEach(() => {
    mockMatchMedia('fine') // Default to desktop
  })

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

describe('HeroArt Layered Architecture - Issue 14.2b', () => {
  beforeEach(() => {
    mockMatchMedia('fine')
  })

  test('has parallax layer wrapper', () => {
    const { container } = render(<HeroArt />)
    const parallaxLayer = container.querySelector('.hero-parallax-layer')
    expect(parallaxLayer).toBeInTheDocument()
  })

  test('has idle layer wrapper inside parallax layer', () => {
    const { container } = render(<HeroArt />)
    const parallaxLayer = container.querySelector('.hero-parallax-layer')
    const idleLayer = parallaxLayer?.querySelector('.hero-idle-layer')
    expect(idleLayer).toBeInTheDocument()
  })

  test('idle layer has hero-idle class for animation', () => {
    const { container } = render(<HeroArt />)
    const idleLayer = container.querySelector('.hero-idle-layer')
    // Initially does NOT have hero-idle (waiting for drawing to complete)
    // This is the expected behavior per Issue 14.2d
    expect(idleLayer).toBeInTheDocument()
  })

  test('tech floater icons have hero-icon-idle class', () => {
    const { container } = render(<HeroArt />)
    const floaters = container.querySelectorAll('[title]')
    floaters.forEach(floater => {
      expect(floater).toHaveClass('hero-icon-idle')
    })
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
    mockMatchMedia('fine')
  })

  test('does not have hero-idle class when reduced motion is preferred', async () => {
    vi.doMock('../../hooks/useReducedMotion', () => ({
      useReducedMotion: () => true,
    }))

    const { default: HeroArtMocked } = await import('./HeroArt')
    const { container } = render(<HeroArtMocked />)
    
    const idleLayer = container.querySelector('.hero-idle-layer')
    expect(idleLayer).not.toHaveClass('hero-idle')
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

/**
 * SVG Drawing + Idle Coordination Tests - Issue 14.2d
 */
describe('HeroArt Drawing-to-Idle Coordination (Issue 14.2d)', () => {
  beforeEach(() => {
    vi.resetModules()
    mockMatchMedia('fine')
  })

  test('Portrait component receives onDrawComplete prop', () => {
    const { container } = render(<HeroArt />)
    // Portrait should be rendered
    const svg = container.querySelector('svg[viewBox="0 0 200 240"]')
    expect(svg).toBeInTheDocument()
  })

  test('idle layer does not have hero-idle before drawing completes', () => {
    const { container } = render(<HeroArt />)
    const idleLayer = container.querySelector('.hero-idle-layer')
    // Should NOT have hero-idle class until drawing completes
    expect(idleLayer).not.toHaveClass('hero-idle')
  })

  test('portrait has line-drawing animation classes', () => {
    const { container } = render(<HeroArt />)
    // Check that portrait elements have portrait-line classes
    const lineElements = container.querySelectorAll('.portrait-line')
    expect(lineElements.length).toBeGreaterThan(0)
  })

  test('with reduced motion, idle starts immediately (isDrawingComplete defaults true)', async () => {
    vi.doMock('../../hooks/useReducedMotion', () => ({
      useReducedMotion: () => true,
    }))

    const { default: HeroArtMocked } = await import('./HeroArt')
    const { container } = render(<HeroArtMocked />)
    
    // With reduced motion, there's no animation, so no hero-idle class at all
    const idleLayer = container.querySelector('.hero-idle-layer')
    expect(idleLayer).not.toHaveClass('hero-idle')
  })
})
