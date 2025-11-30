import { render } from '@testing-library/react'
import TechFloaters from './TechFloaters'

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
