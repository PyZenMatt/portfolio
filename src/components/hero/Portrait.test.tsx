import { render, screen, fireEvent } from '@testing-library/react'
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

  test('uses currentColor for theme-aware styling', () => {
    const { container } = render(<Portrait />)
    // Should use currentColor for stroke elements
    const strokes = container.querySelectorAll('[stroke="currentColor"]')
    expect(strokes.length).toBeGreaterThanOrEqual(1)
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

/**
 * SVG Line-Drawing Animation Tests - Issue 14.2d
 */
describe('Portrait SVG Line-Drawing Animation', () => {
  test('applies portrait-line class to SVG elements', () => {
    const { container } = render(<Portrait />)
    // Should have elements with portrait-line class
    const lineElements = container.querySelectorAll('.portrait-line')
    expect(lineElements.length).toBeGreaterThan(0)
  })

  test('has staggered animation classes', () => {
    const { container } = render(<Portrait />)
    // Check for staggered delay classes
    expect(container.querySelector('.portrait-line-1')).toBeInTheDocument()
    expect(container.querySelector('.portrait-line-7')).toBeInTheDocument() // Glasses
    expect(container.querySelector('.portrait-line-14')).toBeInTheDocument() // Shoulders
  })

  test('has portrait-line-last class on final element', () => {
    const { container } = render(<Portrait />)
    // The last element should have the special class for animation end detection
    const lastElement = container.querySelector('.portrait-line-last')
    expect(lastElement).toBeInTheDocument()
  })

  test('calls onDrawComplete when animation ends', () => {
    const onDrawComplete = vi.fn()
    const { container } = render(<Portrait onDrawComplete={onDrawComplete} />)
    
    // Find the element with portrait-line-last class
    const lastElement = container.querySelector('.portrait-line-last')
    expect(lastElement).toBeInTheDocument()
    
    // Simulate animationend event
    fireEvent.animationEnd(lastElement!)
    
    expect(onDrawComplete).toHaveBeenCalledTimes(1)
  })

  test('does not call onDrawComplete for non-last elements', () => {
    const onDrawComplete = vi.fn()
    const { container } = render(<Portrait onDrawComplete={onDrawComplete} />)
    
    // Find an element that is NOT the last one
    const firstElement = container.querySelector('.portrait-line-1')
    expect(firstElement).toBeInTheDocument()
    
    // Simulate animationend event on non-last element
    fireEvent.animationEnd(firstElement!)
    
    // Should not call the callback
    expect(onDrawComplete).not.toHaveBeenCalled()
  })

  test('works without onDrawComplete callback', () => {
    const { container } = render(<Portrait />)
    const lastElement = container.querySelector('.portrait-line-last')
    
    // Should not throw when animationend fires without callback
    expect(() => {
      fireEvent.animationEnd(lastElement!)
    }).not.toThrow()
  })
})
