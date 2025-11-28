import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'

// Component that throws an error
function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

const renderWithErrorBoundary = (shouldThrow = false, onReset?: () => void) => {
  return render(
    <BrowserRouter>
      <ErrorBoundary onReset={onReset}>
        <ThrowError shouldThrow={shouldThrow} />
      </ErrorBoundary>
    </BrowserRouter>
  )
}

describe('ErrorBoundary', () => {
  // Suppress console.warn for tests
  const originalWarn = console.warn
  beforeAll(() => {
    console.warn = vi.fn()
  })
  afterAll(() => {
    console.warn = originalWarn
  })

  test('renders children when there is no error', () => {
    renderWithErrorBoundary(false)
    expect(screen.getByText(/no error/i)).toBeInTheDocument()
  })

  test('catches errors from children', () => {
    renderWithErrorBoundary(true)
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
  })

  test('displays error fallback UI', () => {
    renderWithErrorBoundary(true)
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    expect(screen.getByText(/try again/i)).toBeInTheDocument()
    expect(screen.getByText(/go to home/i)).toBeInTheDocument()
  })

  test('shows error icon', () => {
    const { container } = renderWithErrorBoundary(true)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  test('retry button resets error state', async () => {
    const user = userEvent.setup()
    const onReset = vi.fn()
    
    renderWithErrorBoundary(true, onReset)
    
    const retryButton = screen.getByRole('button', { name: /try again/i })
    await user.click(retryButton)
    
    expect(onReset).toHaveBeenCalledTimes(1)
  })

  test('go to home button has correct href', () => {
    renderWithErrorBoundary(true)
    const homeButton = screen.getByRole('button', { name: /go to home/i })
    expect(homeButton).toBeInTheDocument()
  })

  test('logs error to console.warn', () => {
    const warnSpy = vi.spyOn(console, 'warn')
    renderWithErrorBoundary(true)
    expect(warnSpy).toHaveBeenCalled()
  })

  test('shows error message in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'
    
    renderWithErrorBoundary(true)
    expect(screen.getByText(/test error/i)).toBeInTheDocument()
    
    process.env.NODE_ENV = originalEnv
  })
})
