import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProjectCard from './ProjectCard'
import type { Project } from '../../lib/projects'

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  description: 'This is a test project description',
  tech: ['React', 'TypeScript', 'TailwindCSS'],
  repoUrl: 'https://github.com/test/repo',
  liveUrl: 'https://test-project.com',
}

const renderProjectCard = (project: Project = mockProject) => {
  return render(
    <BrowserRouter>
      <ProjectCard project={project} />
    </BrowserRouter>
  )
}

describe('ProjectCard', () => {
  test('renders without crashing', () => {
    renderProjectCard()
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  test('displays project title', () => {
    renderProjectCard()
    expect(screen.getByRole('heading', { name: /test project/i })).toBeInTheDocument()
  })

  test('displays project description', () => {
    renderProjectCard()
    expect(screen.getByText(/this is a test project description/i)).toBeInTheDocument()
  })

  test('displays all tech badges', () => {
    renderProjectCard()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('TailwindCSS')).toBeInTheDocument()
  })

  test('displays View Project button', () => {
    renderProjectCard()
    expect(screen.getByRole('button', { name: /view project/i })).toBeInTheDocument()
  })

  test('button is enabled when project has liveUrl or repoUrl', () => {
    renderProjectCard()
    const button = screen.getByRole('button', { name: /view project/i })
    expect(button).not.toBeDisabled()
  })

  test('button is disabled when project has no links', () => {
    const projectWithoutLinks: Project = {
      ...mockProject,
      repoUrl: undefined,
      liveUrl: undefined,
    }
    renderProjectCard(projectWithoutLinks)
    const button = screen.getByRole('button', { name: /view project/i })
    expect(button).toBeDisabled()
  })

  test('displays placeholder when no image provided', () => {
    renderProjectCard()
    // Check for placeholder container
    const container = screen.getByText('Test Project').closest('div')
    expect(container).toBeInTheDocument()
  })

  test('displays image when provided', () => {
    const projectWithImage: Project = {
      ...mockProject,
      image: 'https://example.com/image.jpg',
    }
    renderProjectCard(projectWithImage)
    const img = screen.getByAltText('Test Project')
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg')
  })
})
