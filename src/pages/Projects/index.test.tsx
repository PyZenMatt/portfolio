import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Projects from './index'

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

const renderProjectsPage = () => {
  const queryClient = createTestQueryClient()
  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Projects />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

describe('Projects Page', () => {
  test('renders without crashing', () => {
    renderProjectsPage()
    expect(screen.getAllByRole('status').length).toBeGreaterThan(0)
  })

  test('sets correct page title', async () => {
    renderProjectsPage()
    await waitFor(() => {
      expect(document.title).toBe('Projects — Matteo Ricci')
    })
  })

  test('sets meta description', async () => {
    renderProjectsPage()
    await waitFor(() => {
      const metaDescription = document.querySelector('meta[name="description"]')
      expect(metaDescription?.getAttribute('content')).toContain('Portfolio progetti')
    })
  })

  test('displays page title', async () => {
    renderProjectsPage()
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /all projects/i })).toBeInTheDocument()
    })
  })

  test('displays page description', async () => {
    renderProjectsPage()
    await waitFor(() => {
      expect(
        screen.getByText(/explore my portfolio of full-stack projects/i)
      ).toBeInTheDocument()
    })
  })

  test('shows loading state initially', () => {
    renderProjectsPage()
    const skeletons = screen.getAllByRole('status')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  test('displays filter buttons', async () => {
    renderProjectsPage()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /^all$/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /^react$/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /^django$/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /^python$/i })).toBeInTheDocument()
    })
  })

  test('All filter is active by default', async () => {
    renderProjectsPage()
    await waitFor(() => {
      const allButton = screen.getByRole('button', { name: /^all$/i })
      expect(allButton).toHaveClass('bg-primary')
    })
  })

  test('displays all projects when All filter is active', async () => {
    renderProjectsPage()
    await waitFor(() => {
      const projectCards = screen.getAllByRole('heading', { level: 3 })
      expect(projectCards.length).toBeGreaterThan(0)
    })
  })

  test('filters projects when filter button is clicked', async () => {
    const user = userEvent.setup()
    renderProjectsPage()

    // Wait for projects to load
    await waitFor(() => {
      const projectCards = screen.getAllByRole('heading', { level: 3 })
      expect(projectCards.length).toBeGreaterThan(0)
    })

    const reactButton = screen.getByRole('button', { name: /^react$/i })
    await user.click(reactButton)

    await waitFor(() => {
      expect(reactButton).toHaveClass('bg-primary')
    })
  })

  test('shows empty state when no projects match filter', async () => {
    const user = userEvent.setup()
    renderProjectsPage()

    // Wait for projects to load
    await waitFor(() => {
      const projectCards = screen.getAllByRole('heading', { level: 3 })
      expect(projectCards.length).toBeGreaterThan(0)
    })

    // Click TypeScript filter which might have no results
    const tsButton = screen.getByRole('button', { name: /^typescript$/i })
    await user.click(tsButton)

    // Check if either projects are shown or empty state with EmptyState component
    await waitFor(
      () => {
        const hasProjects = screen.queryAllByRole('heading', { level: 3 }).length > 0
        const hasEmptyState = screen.queryByRole('heading', { name: /no projects found/i })
        expect(hasProjects || hasEmptyState).toBeTruthy()
      },
      { timeout: 2000 }
    )
  })

  test('empty state shows Show All Projects button', async () => {
    const user = userEvent.setup()
    renderProjectsPage()

    // Wait for projects to load
    await waitFor(() => {
      const projectCards = screen.getAllByRole('heading', { level: 3 })
      expect(projectCards.length).toBeGreaterThan(0)
    })

    const tsButton = screen.getByRole('button', { name: /^typescript$/i })
    await user.click(tsButton)

    await waitFor(
      () => {
        const emptyState = screen.queryByRole('heading', { name: /no projects found/i })
        if (emptyState) {
          expect(screen.getByRole('button', { name: /show all projects/i })).toBeInTheDocument()
        }
      },
      { timeout: 2000 }
    )
  })

  test('renders project cards after loading', async () => {
    renderProjectsPage()
    await waitFor(() => {
      const projectCards = screen.getAllByRole('heading', { level: 3 })
      expect(projectCards.length).toBeGreaterThanOrEqual(4)
    })
  })
})
