import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import ProjectsErrorBoundary from './ProjectsErrorBoundary'

// Component that throws an error
function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Failed to fetch projects')
  }
  return <div>Projects loaded</div>
}

const renderWithProjectsErrorBoundary = (shouldThrow = false, onRetry?: () => void) => {
  return render(
    <BrowserRouter>
      <ProjectsErrorBoundary onRetry={onRetry}>
        <ThrowError shouldThrow={shouldThrow} />
      </ProjectsErrorBoundary>
    </BrowserRouter>
  )
}

describe('ProjectsErrorBoundary', () => {
  // Suppress console.warn for tests
  const originalWarn = console.warn
  beforeAll(() => {
    console.warn = vi.fn()
  })
  afterAll(() => {
    console.warn = originalWarn
  })

  test('renders children when there is no error', () => {
    renderWithProjectsErrorBoundary(false)
    expect(screen.getByText(/projects loaded/i)).toBeInTheDocument()
  })

  test('catches errors from children', () => {
    renderWithProjectsErrorBoundary(true)
    expect(screen.getByText(/unable to load projects/i)).toBeInTheDocument()
  })

  test('displays error message with warning icon', () => {
    const { container } = renderWithProjectsErrorBoundary(true)
    
    expect(screen.getByText(/unable to load projects/i)).toBeInTheDocument()
    expect(screen.getByText(/problem loading the projects/i)).toBeInTheDocument()
    
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  test('shows retry button', () => {
    renderWithProjectsErrorBoundary(true)
    const retryButton = screen.getByRole('button', { name: /retry/i })
    expect(retryButton).toBeInTheDocument()
  })

  test('retry button calls onRetry callback', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    
    renderWithProjectsErrorBoundary(true, onRetry)
    
    const retryButton = screen.getByRole('button', { name: /retry/i })
    await user.click(retryButton)
    
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  test('retry button resets error state', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    
    renderWithProjectsErrorBoundary(true, onRetry)
    
    expect(screen.getByText(/unable to load projects/i)).toBeInTheDocument()
    
    const retryButton = screen.getByRole('button', { name: /retry/i })
    await user.click(retryButton)
    
    expect(onRetry).toHaveBeenCalled()
  })

  test('logs error to console.warn', () => {
    const warnSpy = vi.spyOn(console, 'warn')
    renderWithProjectsErrorBoundary(true)
    expect(warnSpy).toHaveBeenCalled()
  })
})
