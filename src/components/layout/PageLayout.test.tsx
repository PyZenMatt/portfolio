import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../../contexts/ThemeContext'
import PageLayout from './PageLayout'

const renderPageLayout = () => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <PageLayout />
      </ThemeProvider>
    </BrowserRouter>
  )
}

describe('PageLayout', () => {
  test('renders page layout', () => {
    renderPageLayout()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  test('has header landmark with banner role', () => {
    renderPageLayout()
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  test('has main landmark with main role', () => {
    renderPageLayout()
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    expect(main).toHaveAttribute('id', 'main-content')
  })

  test('main content is focusable', () => {
    renderPageLayout()
    const main = screen.getByRole('main')
    expect(main).toHaveAttribute('tabIndex', '-1')
  })

  test('has footer landmark with contentinfo role', () => {
    renderPageLayout()
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  test('renders skip link', () => {
    renderPageLayout()
    const skipLink = screen.getByText(/skip to main content/i)
    expect(skipLink).toBeInTheDocument()
  })

  test('skip link appears before header', () => {
    const { container } = renderPageLayout()
    const skipLink = screen.getByText(/skip to main content/i)
    const header = screen.getByRole('banner')
    
    const skipLinkPosition = Array.from(container.querySelectorAll('*')).indexOf(skipLink.closest('a')!)
    const headerPosition = Array.from(container.querySelectorAll('*')).indexOf(header)
    
    expect(skipLinkPosition).toBeLessThan(headerPosition)
  })
})
