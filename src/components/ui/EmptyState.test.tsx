import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EmptyState from './EmptyState'

describe('EmptyState', () => {
  test('renders empty state with title', () => {
    render(<EmptyState title="No items found" />)
    expect(screen.getByText(/no items found/i)).toBeInTheDocument()
  })

  test('renders description when provided', () => {
    render(<EmptyState title="No items" description="Try adjusting your filters" />)
    expect(screen.getByText(/try adjusting your filters/i)).toBeInTheDocument()
  })

  test('does not render description when not provided', () => {
    render(<EmptyState title="No items" />)
    const descriptions = screen.queryByText(/try/i)
    expect(descriptions).not.toBeInTheDocument()
  })

  test('renders action button when actionLabel and onAction provided', () => {
    const onAction = vi.fn()
    render(<EmptyState title="No items" actionLabel="Reset Filters" onAction={onAction} />)
    expect(screen.getByRole('button', { name: /reset filters/i })).toBeInTheDocument()
  })

  test('does not render action button when actionLabel not provided', () => {
    render(<EmptyState title="No items" onAction={vi.fn()} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  test('does not render action button when onAction not provided', () => {
    render(<EmptyState title="No items" actionLabel="Click me" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  test('calls onAction when button clicked', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    
    render(<EmptyState title="No items" actionLabel="Reset" onAction={onAction} />)
    
    const button = screen.getByRole('button', { name: /reset/i })
    await user.click(button)
    
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  test('renders empty state icon', () => {
    const { container } = render(<EmptyState title="No items" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  test('icon has correct color classes', () => {
    const { container } = render(<EmptyState title="No items" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('text-[var(--color-surface)]')
  })

  test('has correct layout structure', () => {
    const { container } = render(<EmptyState title="No items" />)
    const wrapper = container.querySelector('.text-center')
    expect(wrapper).toBeInTheDocument()
  })

  test('renders all parts together', () => {
    const onAction = vi.fn()
    render(
      <EmptyState
        title="No projects found"
        description="Try selecting a different filter"
        actionLabel="Show All"
        onAction={onAction}
      />
    )
    
    expect(screen.getByText(/no projects found/i)).toBeInTheDocument()
    expect(screen.getByText(/try selecting a different filter/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /show all/i })).toBeInTheDocument()
  })
})
