import { render } from '@testing-library/react'
import { vi } from 'vitest'
import TechFloaters from './TechFloaters'

// Mock useReducedMotion
vi.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}))

describe('TechFloaters', () => {
  test('renders without crashing', () => {
    const { container } = render(<TechFloaters />)
    expect(container).toBeInTheDocument()
  })

  test('renders with aria-hidden for accessibility', () => {
    const { container } = render(<TechFloaters />)
    const wrapper = container.firstChild
    expect(wrapper).toHaveAttribute('aria-hidden', 'true')
  })

  test('renders 6 tech icon floaters', () => {
    const { container } = render(<TechFloaters />)
    // Should have 6 floating tech icons
    const floaters = container.querySelectorAll('[title]')
    expect(floaters.length).toBe(6)
  })

  test('renders icons for each tech in the stack', () => {
    const { container } = render(<TechFloaters />)
    const techs = ['React', 'TypeScript', 'Python', 'Django', 'Docker', 'GitHub']
    techs.forEach(tech => {
      const floater = container.querySelector(`[title="${tech}"]`)
      expect(floater).toBeInTheDocument()
    })
  })

  test('floaters have pointer-events-none for non-interference', () => {
    const { container } = render(<TechFloaters />)
    const wrapper = container.firstChild
    expect(wrapper).toHaveClass('pointer-events-none')
  })

  test('floaters are positioned absolutely', () => {
    const { container } = render(<TechFloaters />)
    const wrapper = container.firstChild
    expect(wrapper).toHaveClass('absolute')
  })

  test('each floater contains an SVG icon', () => {
    const { container } = render(<TechFloaters />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBe(6)
  })
})

describe('TechFloaters Mobile Idle Animation - Issue 14.2', () => {
  test('floaters have hero-icon-idle class for mobile animation', () => {
    const { container } = render(<TechFloaters />)
    const floaters = container.querySelectorAll('[title]')
    floaters.forEach(floater => {
      expect(floater).toHaveClass('hero-icon-idle')
    })
  })

  test('floaters have staggered animation delays', () => {
    const { container } = render(<TechFloaters />)
    const floaters = container.querySelectorAll('[title]')
    
    floaters.forEach((floater, index) => {
      const style = floater.getAttribute('style')
      expect(style).toContain(`animation-delay: ${index * 0.3}s`)
    })
  })

  test('floaters add touch-active class when isTouchActive is true', () => {
    const { container } = render(<TechFloaters isTouchActive={true} />)
    const floaters = container.querySelectorAll('[title]')
    floaters.forEach(floater => {
      expect(floater).toHaveClass('touch-active')
    })
  })

  test('floaters do not have touch-active class when isTouchActive is false', () => {
    const { container } = render(<TechFloaters isTouchActive={false} />)
    const floaters = container.querySelectorAll('[title]')
    floaters.forEach(floater => {
      expect(floater).not.toHaveClass('touch-active')
    })
  })
})

describe('TechFloaters with reduced motion', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  test('floaters do not have hero-icon-idle class when reduced motion is preferred', async () => {
    vi.doMock('../../hooks/useReducedMotion', () => ({
      useReducedMotion: () => true,
    }))

    const { default: TechFloatersMocked } = await import('./TechFloaters')
    const { container } = render(<TechFloatersMocked />)
    
    const floaters = container.querySelectorAll('[title]')
    floaters.forEach(floater => {
      expect(floater).not.toHaveClass('hero-icon-idle')
    })
  })
})
