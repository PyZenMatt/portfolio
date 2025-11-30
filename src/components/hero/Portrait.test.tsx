import { render, screen } from '@testing-library/react'
import Portrait from './Portrait'

describe('Portrait', () => {
  test('renders without crashing', () => {
    render(<Portrait />)
    // SVG should be present
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  test('renders with aria-hidden for accessibility', () => {
    render(<Portrait />)
    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  test('renders with role="img"', () => {
    render(<Portrait />)
    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('role', 'img')
  })

  test('renders SVG with viewBox', () => {
    render(<Portrait />)
    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 200 240')
  })

  test('applies custom className', () => {
    render(<Portrait className="custom-class" />)
    const svg = document.querySelector('svg')
    expect(svg).toHaveClass('custom-class')
  })

  test('contains gradient definitions for theming', () => {
    render(<Portrait />)
    const gradients = document.querySelectorAll('linearGradient')
    expect(gradients.length).toBeGreaterThanOrEqual(1)
  })

  test('renders portrait silhouette elements', () => {
    const { container } = render(<Portrait />)
    // Should have head shape (ellipse)
    const ellipse = container.querySelector('ellipse')
    expect(ellipse).toBeInTheDocument()
    // Should have path elements for hair, neck, shoulders
    const paths = container.querySelectorAll('path')
    expect(paths.length).toBeGreaterThan(0)
  })

  test('renders glasses detail', () => {
    const { container } = render(<Portrait />)
    // Should have rect elements for glasses lenses
    const rects = container.querySelectorAll('rect')
    expect(rects.length).toBeGreaterThanOrEqual(2)
  })
})
