import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('Card', () => {
  test('renders card with content', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText(/card content/i)).toBeInTheDocument()
  })

  test('renders as div by default', () => {
    const { container } = render(<Card>Content</Card>)
    expect(container.querySelector('div[role="group"]')).toBeInTheDocument()
  })

  test('renders as custom element', () => {
    const { container } = render(<Card as="section">Content</Card>)
    expect(container.querySelector('section[role="group"]')).toBeInTheDocument()
  })

  test('applies custom className', () => {
    const { container } = render(<Card className="custom">Content</Card>)
    const card = container.querySelector('[role="group"]')
    expect(card).toHaveClass('custom')
  })
})
