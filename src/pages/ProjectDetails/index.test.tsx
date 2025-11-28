import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProjectDetails from './index'

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

const renderProjectDetailsPage = (id: string = 'blog-manager') => {
  const queryClient = createTestQueryClient()
  return render(
    <MemoryRouter initialEntries={[`/projects/${id}`]}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
      </QueryClientProvider>
    </MemoryRouter>
  )
}

describe('ProjectDetails Page', () => {
  describe('Routing and Loading', () => {
    test('renders without crashing', () => {
      renderProjectDetailsPage()
      expect(screen.getAllByRole('status').length).toBeGreaterThan(0)
    })

    test('shows loading skeleton initially', () => {
      renderProjectDetailsPage()
      const skeletons = screen.getAllByRole('status')
      expect(skeletons.length).toBeGreaterThan(0)
    })

    test('route /projects/:id renders correctly', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /blogmanager/i })).toBeInTheDocument()
      })
    })
  })

  describe('Project Not Found', () => {
    test('shows empty state for non-existent project', async () => {
      renderProjectDetailsPage('non-existent-project')
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /project not found/i })).toBeInTheDocument()
      })
    })

    test('shows description in not-found state', async () => {
      renderProjectDetailsPage('non-existent-project')
      await waitFor(() => {
        expect(
          screen.getByText(/the project you're looking for doesn't exist/i)
        ).toBeInTheDocument()
      })
    })

    test('shows View All Projects button in not-found state', async () => {
      renderProjectDetailsPage('non-existent-project')
      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /view all projects/i })
        ).toBeInTheDocument()
      })
    })

    test('shows back to projects link in not-found state', async () => {
      renderProjectDetailsPage('non-existent-project')
      await waitFor(() => {
        expect(screen.getByRole('link', { name: /back to projects/i })).toBeInTheDocument()
      })
    })
  })

  describe('Project Content', () => {
    test('displays project title as h1', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        const heading = screen.getByRole('heading', { level: 1, name: /blogmanager/i })
        expect(heading).toBeInTheDocument()
      })
    })

    test('displays project description', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        expect(
          screen.getByText(/piattaforma full-stack per gestione blog/i)
        ).toBeInTheDocument()
      })
    })

    test('displays tech stack badges', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        expect(screen.getAllByText('Django').length).toBeGreaterThan(0)
        expect(screen.getAllByText('Python').length).toBeGreaterThan(0)
        expect(screen.getAllByText('PostgreSQL').length).toBeGreaterThan(0)
      })
    })

    test('displays Overview section with long description', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /overview/i })).toBeInTheDocument()
        expect(screen.getByText(/blogmanager nasce dall'esigenza/i)).toBeInTheDocument()
      })
    })

    test('displays Key Features section', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /key features/i })).toBeInTheDocument()
        expect(screen.getByText(/autenticazione jwt con refresh token/i)).toBeInTheDocument()
      })
    })

    test('displays Technologies Used section', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /technologies used/i })).toBeInTheDocument()
      })
    })

    test('displays Screenshots section', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /screenshots/i })).toBeInTheDocument()
      })
    })

    test('displays Technical Approach section', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /technical approach/i })).toBeInTheDocument()
      })
    })
  })

  describe('CTA Buttons', () => {
    test('displays View Repository button when repoUrl exists', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /blogmanager/i })).toBeInTheDocument()
      })
      const repoLink = screen.getByRole('link', { name: /view repository/i })
      expect(repoLink).toBeInTheDocument()
      expect(repoLink).toHaveAttribute('href', 'https://github.com/matteo/blog-manager')
    })

    test('displays Live Demo button when liveUrl exists', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /blogmanager/i })).toBeInTheDocument()
      })
      const liveLink = screen.getByRole('link', { name: /live demo/i })
      expect(liveLink).toBeInTheDocument()
      expect(liveLink).toHaveAttribute('href', 'https://blogmanager-demo.example.com')
    })

    test('repo link opens in new tab with security attributes', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /blogmanager/i })).toBeInTheDocument()
      })
      const repoLink = screen.getByRole('link', { name: /view repository/i })
      expect(repoLink).toHaveAttribute('target', '_blank')
      expect(repoLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    test('live demo link opens in new tab with security attributes', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /blogmanager/i })).toBeInTheDocument()
      })
      const liveLink = screen.getByRole('link', { name: /live demo/i })
      expect(liveLink).toHaveAttribute('target', '_blank')
      expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    test('does not show Live Demo button when liveUrl is missing', async () => {
      renderProjectDetailsPage('school-platform')
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /schoolplatform/i })).toBeInTheDocument()
      })
      expect(screen.queryByRole('link', { name: /live demo/i })).not.toBeInTheDocument()
    })
  })

  describe('Sidebar', () => {
    test('displays Project Info card with status', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        expect(screen.getByText('In Production')).toBeInTheDocument()
      })
    })

    test('displays created date', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        expect(screen.getByText(/created/i)).toBeInTheDocument()
        expect(screen.getByText(/mar 15, 2024/i)).toBeInTheDocument()
      })
    })

    test('displays last updated date', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        expect(screen.getByText(/last updated/i)).toBeInTheDocument()
        expect(screen.getByText(/nov 20, 2024/i)).toBeInTheDocument()
      })
    })

    test('displays Related Projects section', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /related projects/i })).toBeInTheDocument()
      })
    })

    test('related projects are links', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        // Blog manager uses Django, so SchoolPlatform and Portfolio should be related
        const relatedLinks = screen.getAllByRole('link')
        const relatedProjectLinks = relatedLinks.filter((link) =>
          link.getAttribute('href')?.startsWith('/projects/')
        )
        expect(relatedProjectLinks.length).toBeGreaterThan(0)
      })
    })
  })

  describe('SEO', () => {
    test('sets correct page title', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        expect(document.title).toBe('BlogManager — Matteo Ricci')
      })
    })

    test('sets meta description', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        const metaDescription = document.querySelector('meta[name="description"]')
        expect(metaDescription?.getAttribute('content')).toContain(
          'Piattaforma full-stack per gestione blog'
        )
      })
    })

    test('sets canonical URL', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        const canonical = document.querySelector('link[rel="canonical"]')
        expect(canonical?.getAttribute('href')).toBe(
          'https://matteoricci.net/projects/blog-manager'
        )
      })
    })

    test('sets not-found SEO when project not found', async () => {
      renderProjectDetailsPage('non-existent')
      await waitFor(() => {
        expect(document.title).toBe('Project Not Found — Matteo Ricci')
      })
    })
  })

  describe('Navigation', () => {
    test('back to projects link exists', async () => {
      renderProjectDetailsPage('blog-manager')
      await waitFor(() => {
        const backLink = screen.getByRole('link', { name: /back to projects/i })
        expect(backLink).toHaveAttribute('href', '/projects')
      })
    })
  })

  describe('Different Projects', () => {
    test('renders MessyMind project correctly', async () => {
      renderProjectDetailsPage('messymind')
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /messymind/i })).toBeInTheDocument()
        expect(screen.getAllByText('Next.js').length).toBeGreaterThan(0)
      })
    })

    test('renders SchoolPlatform project correctly', async () => {
      renderProjectDetailsPage('school-platform')
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /schoolplatform/i })).toBeInTheDocument()
        expect(screen.getAllByText('Blockchain').length).toBeGreaterThan(0)
        expect(screen.getByText('In Progress')).toBeInTheDocument()
      })
    })

    test('renders archived project with correct status', async () => {
      renderProjectDetailsPage('api-automation')
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /api testing suite/i })).toBeInTheDocument()
        expect(screen.getByText('Archived')).toBeInTheDocument()
      })
    })
  })
})
