import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProjectsSection from './ProjectsSection'

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

const renderProjectsSection = () => {
  const queryClient = createTestQueryClient()
  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ProjectsSection />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

describe('ProjectsSection', () => {
  test('renders without crashing', () => {
    renderProjectsSection()
    // Should render skeleton during loading
    expect(screen.getAllByRole('status').length).toBeGreaterThan(0)
  })

  test('shows loading state initially', () => {
    renderProjectsSection()
    // Check for skeleton elements
    const skeletons = screen.getAllByRole('status')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  test('displays section title', async () => {
    renderProjectsSection()
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /featured projects/i })).toBeInTheDocument()
    })
  })

  test('displays section description', async () => {
    renderProjectsSection()
    await waitFor(() => {
      expect(
        screen.getByText(/a selection of my recent work showcasing/i)
      ).toBeInTheDocument()
    })
  })

  test('displays correct number of project cards', async () => {
    renderProjectsSection()
    await waitFor(() => {
      const projectCards = screen.getAllByRole('heading', { level: 3 })
      expect(projectCards.length).toBeLessThanOrEqual(4)
      expect(projectCards.length).toBeGreaterThan(0)
    })
  })

  test('displays View All Projects button', async () => {
    renderProjectsSection()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /view all projects/i })).toBeInTheDocument()
    })
  })

  test('View All Projects button links to /projects', async () => {
    renderProjectsSection()
    await waitFor(() => {
      const link = screen.getByRole('button', { name: /view all projects/i }).closest('a')
      expect(link).toHaveAttribute('href', '/projects')
    })
  })

  test('displays projects after loading', async () => {
    renderProjectsSection()
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /featured projects/i })).toBeInTheDocument()
    })
  })
})
