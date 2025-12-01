import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PremiumFooter from './PremiumFooter'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    footer: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <footer {...props}>{children}</footer>
    ),
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
    a: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <a {...props}>{children}</a>
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
    // 4 nav links + 1 logo link + 2 social links
    expect(links.length).toBeGreaterThanOrEqual(7)
  })
})

describe('PremiumFooter Social Icons (Issue 14.3.11)', () => {
  test('displays social icons section', () => {
    renderWithRouter(<PremiumFooter />)
    expect(screen.getByTestId('footer-social')).toBeInTheDocument()
  })

  test('displays GitHub social icon', () => {
    renderWithRouter(<PremiumFooter />)
    const github = screen.getByTestId('social-github')
    expect(github).toBeInTheDocument()
    expect(github).toHaveAttribute('href', 'https://github.com/matteoricci')
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('displays LinkedIn social icon', () => {
    renderWithRouter(<PremiumFooter />)
    const linkedin = screen.getByTestId('social-linkedin')
    expect(linkedin).toBeInTheDocument()
    expect(linkedin).toHaveAttribute('href', 'https://linkedin.com/in/matteoricci')
  })

  test('social icons have accessible labels', () => {
    renderWithRouter(<PremiumFooter />)
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
  })

  test('displays glowing border-top', () => {
    renderWithRouter(<PremiumFooter />)
    expect(screen.getByTestId('footer-glow-border')).toBeInTheDocument()
  })
})

describe('PremiumFooter Responsive (Issue 14.3.11)', () => {
  test('footer has flex-col for mobile and flex-row for desktop', () => {
    renderWithRouter(<PremiumFooter />)
    const footer = screen.getByTestId('premium-footer')
    // The flex container inside has these classes
    const container = footer.querySelector('.flex.flex-col.sm\\:flex-row')
    expect(container).toBeInTheDocument()
  })
})

describe('PremiumFooter Accessibility (Issue 14.3.11)', () => {
  test('has contentinfo landmark role', () => {
    renderWithRouter(<PremiumFooter />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  test('footer navigation has proper aria-label', () => {
    renderWithRouter(<PremiumFooter />)
    const nav = screen.getByRole('navigation', { name: /footer navigation/i })
    expect(nav).toBeInTheDocument()
  })

  test('social icons have aria-label for screen readers', () => {
    renderWithRouter(<PremiumFooter />)
    const github = screen.getByLabelText('GitHub')
    const linkedin = screen.getByLabelText('LinkedIn')
    expect(github).toBeInTheDocument()
    expect(linkedin).toBeInTheDocument()
  })

  test('glowing border is hidden from assistive technology', () => {
    renderWithRouter(<PremiumFooter />)
    const glowBorder = screen.getByTestId('footer-glow-border')
    expect(glowBorder).toHaveAttribute('aria-hidden', 'true')
  })
})
