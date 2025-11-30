import { render } from '@testing-library/react'
import HeroArt from './HeroArt'

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
