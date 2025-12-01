import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PremiumFooter from './PremiumFooter'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    footer: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <footer {...props}>{children}</footer>
    ),
  },
}))

// Mock useReducedMotion
vi.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: () => false,
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(<MemoryRouter>{component}</MemoryRouter>)
}

describe('PremiumFooter', () => {
  test('renders without crashing', () => {
    renderWithRouter(<PremiumFooter />)
    expect(screen.getByTestId('premium-footer')).toBeInTheDocument()
  })

  test('displays mini logo', () => {
    renderWithRouter(<PremiumFooter />)
    const logo = screen.getByTestId('footer-logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveTextContent('MR')
  })

  test('displays nav links', () => {
    renderWithRouter(<PremiumFooter />)
    const nav = screen.getByTestId('footer-nav')
    expect(nav).toBeInTheDocument()
    
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  test('has contentinfo role', () => {
    renderWithRouter(<PremiumFooter />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  test('displays copyright with current year', () => {
    renderWithRouter(<PremiumFooter />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument()
  })

  test('logo links to home', () => {
    renderWithRouter(<PremiumFooter />)
    const logo = screen.getByTestId('footer-logo')
    expect(logo).toHaveAttribute('href', '/')
  })
})

describe('PremiumFooter Layout (Issue 14.3.10)', () => {
  test('has footer navigation with aria-label', () => {
    renderWithRouter(<PremiumFooter />)
    expect(screen.getByLabelText(/footer navigation/i)).toBeInTheDocument()
  })

  test('all nav links are present', () => {
    renderWithRouter(<PremiumFooter />)
    const links = screen.getAllByRole('link')
    // 4 nav links + 1 logo link
    expect(links.length).toBeGreaterThanOrEqual(5)
  })
})
