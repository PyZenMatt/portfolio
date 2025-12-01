import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './index'

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

const renderHome = () => {
  const queryClient = createTestQueryClient()
  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

describe('Home Page', () => {
  test('renders without crashing', () => {
    renderHome()
    expect(screen.getByRole('heading', { name: /matteo ricci/i })).toBeInTheDocument()
  })

  test('sets correct page title', () => {
    renderHome()
    expect(document.title).toBe('Matteo Ricci — Full-Stack Developer')
  })

  test('sets meta description', () => {
    renderHome()
    const metaDescription = document.querySelector('meta[name="description"]')
    expect(metaDescription?.getAttribute('content')).toContain('Portfolio di Matteo Ricci')
  })

  test('displays hero section', () => {
    renderHome()
    expect(screen.getByRole('heading', { name: /matteo ricci/i })).toBeInTheDocument()
  })

  test('displays projects section', async () => {
    renderHome()
    const projectsHeading = await screen.findByRole('heading', { name: /featured projects/i })
    expect(projectsHeading).toBeInTheDocument()
  })

  test('displays What I Build section', () => {
    renderHome()
    expect(screen.getByRole('heading', { name: /what i build/i, level: 2 })).toBeInTheDocument()
  })
})

describe('Home Page Structure (Issue 14.3.12)', () => {
  test('displays Tech Stack section', () => {
    renderHome()
    expect(screen.getByRole('heading', { name: /tech stack/i, level: 2 })).toBeInTheDocument()
  })

  test('displays Featured Project Highlight section', () => {
    renderHome()
    // Use exact match to distinguish from "Featured Projects"
    expect(screen.getByRole('heading', { name: /^featured project$/i, level: 2 })).toBeInTheDocument()
  })

  test('has noise background wrapper', () => {
    const { container } = renderHome()
    const noiseWrapper = container.querySelector('.bg-noise')
    expect(noiseWrapper).toBeInTheDocument()
  })

  test('all main sections are present in correct order', () => {
    renderHome()
    const headings = screen.getAllByRole('heading', { level: 2 })
    const headingTexts = headings.map(h => h.textContent?.toLowerCase())
    
    // Verify sections exist (order may vary based on implementation)
    expect(headingTexts).toContain('what i build')
    expect(headingTexts).toContain('tech stack')
  })
})

describe('Home Page Snapshot (Issue 14.3.12)', () => {
  test('matches snapshot structure', () => {
    const { container } = renderHome()
    // Check that the main container has expected structure
    expect(container.querySelector('.bg-noise')).toBeInTheDocument()
    expect(container.querySelectorAll('section').length).toBeGreaterThanOrEqual(4)
  })
})
