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
})
