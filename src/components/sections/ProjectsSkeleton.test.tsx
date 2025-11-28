import { render } from '@testing-library/react'
import ProjectsSkeleton from './ProjectsSkeleton'

describe('ProjectsSkeleton', () => {
  test('renders skeleton grid', () => {
    const { container } = render(<ProjectsSkeleton />)
    const cards = container.querySelectorAll('.grid > div')
    expect(cards.length).toBe(4) // default count
  })

  test('renders custom count of skeletons', () => {
    const { container } = render(<ProjectsSkeleton count={6} />)
    const cards = container.querySelectorAll('.grid > div')
    expect(cards.length).toBe(6)
  })

  test('renders skeleton cards with proper structure', () => {
    const { container } = render(<ProjectsSkeleton count={2} />)
    const cards = container.querySelectorAll('.grid > div')
    expect(cards.length).toBe(2)
  })

  test('has grid layout classes', () => {
    const { container } = render(<ProjectsSkeleton />)
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3')
  })

  test('skeleton cards have dark mode styles', () => {
    const { container } = render(<ProjectsSkeleton count={1} />)
    const card = container.querySelector('.grid > div')
    expect(card).toHaveClass('dark:bg-gray-800', 'dark:border-gray-700')
  })

  test('renders image skeleton with aspect-video', () => {
    const { container } = render(<ProjectsSkeleton count={1} />)
    const imageSkeleton = container.querySelector('.aspect-video')
    expect(imageSkeleton).toBeInTheDocument()
  })

  test('renders title skeleton', () => {
    const { container } = render(<ProjectsSkeleton count={1} />)
    const skeletons = container.querySelectorAll('[role="status"]')
    // Check that there are multiple skeleton elements (image, title, desc lines, badges)
    expect(skeletons.length).toBeGreaterThan(1)
  })

  test('renders description line skeletons', () => {
    const { container } = render(<ProjectsSkeleton count={1} />)
    const contentArea = container.querySelector('.p-6')
    expect(contentArea).toBeInTheDocument()
  })

  test('renders badge skeletons', () => {
    const { container } = render(<ProjectsSkeleton count={1} />)
    const badgeSkeletons = container.querySelectorAll('.rounded-full')
    expect(badgeSkeletons.length).toBeGreaterThan(0)
  })
})
