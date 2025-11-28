import { render, screen } from '@testing-library/react'
import Skeleton from './Skeleton'

describe('Skeleton', () => {
  test('renders skeleton', () => {
    render(<Skeleton />)
    const skeleton = screen.getByRole('status')
    expect(skeleton).toBeInTheDocument()
  })

  test('has loading aria-label', () => {
    render(<Skeleton />)
    const skeleton = screen.getByLabelText(/loading/i)
    expect(skeleton).toBeInTheDocument()
  })

  test('has animate-pulse class', () => {
    render(<Skeleton />)
    const skeleton = screen.getByRole('status')
    expect(skeleton).toHaveClass('animate-pulse')
  })

  test('has background color classes', () => {
    render(<Skeleton />)
    const skeleton = screen.getByRole('status')
    expect(skeleton).toHaveClass('bg-gray-200', 'dark:bg-gray-700')
  })

  test('renders avatar variant', () => {
    render(<Skeleton variant="avatar" />)
    const skeleton = screen.getByRole('status')
    expect(skeleton).toHaveClass('rounded-full')
  })

  test('renders text variant', () => {
    render(<Skeleton variant="text" />)
    const skeleton = screen.getByRole('status')
    expect(skeleton).toHaveClass('rounded', 'h-4')
  })

  test('renders card variant', () => {
    render(<Skeleton variant="card" />)
    const skeleton = screen.getByRole('status')
    expect(skeleton).toHaveClass('rounded-lg')
  })

  test('accepts custom className', () => {
    render(<Skeleton className="w-full h-20" />)
    const skeleton = screen.getByRole('status')
    expect(skeleton).toHaveClass('w-full', 'h-20')
  })

  test('has sr-only text for screen readers', () => {
    render(<Skeleton />)
    expect(screen.getByText(/loading/i)).toHaveClass('sr-only')
  })
})
