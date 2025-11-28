import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SkillsGrid from './SkillsGrid'

const renderSkillsGrid = () => {
  return render(
    <BrowserRouter>
      <SkillsGrid />
    </BrowserRouter>
  )
}

describe('SkillsGrid', () => {
  test('renders without crashing', () => {
    renderSkillsGrid()
    expect(screen.getByText(/frontend/i)).toBeInTheDocument()
  })

  test('displays all skill categories', () => {
    renderSkillsGrid()
    expect(screen.getByText(/^frontend$/i)).toBeInTheDocument()
    expect(screen.getByText(/^backend$/i)).toBeInTheDocument()
    expect(screen.getByText(/^devops$/i)).toBeInTheDocument()
    expect(screen.getByText(/^ai$/i)).toBeInTheDocument()
  })

  test('displays frontend skills', () => {
    renderSkillsGrid()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Vite')).toBeInTheDocument()
    expect(screen.getByText('TailwindCSS')).toBeInTheDocument()
  })

  test('displays backend skills', () => {
    renderSkillsGrid()
    expect(screen.getByText('Django')).toBeInTheDocument()
    expect(screen.getByText('Django REST Framework')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
  })

  test('displays devops skills', () => {
    renderSkillsGrid()
    expect(screen.getByText('Docker')).toBeInTheDocument()
    expect(screen.getByText('GitHub Actions')).toBeInTheDocument()
    expect(screen.getByText('CI/CD')).toBeInTheDocument()
  })

  test('displays AI skills', () => {
    renderSkillsGrid()
    expect(screen.getByText('Prompt Engineering')).toBeInTheDocument()
    expect(screen.getByText('LLM Integration')).toBeInTheDocument()
    expect(screen.getByText('AI Workflows')).toBeInTheDocument()
  })

  test('has correct number of skill categories', () => {
    renderSkillsGrid()
    const categories = screen.getAllByRole('heading', { level: 3 })
    expect(categories).toHaveLength(4)
  })

  test('groups skills by category correctly', () => {
    renderSkillsGrid()
    const frontendHeading = screen.getByRole('heading', { name: /^frontend$/i })
    const frontendCard = frontendHeading.closest('div[class*="p-6"]')
    
    expect(frontendCard).toContainHTML('React')
    expect(frontendCard).toContainHTML('TypeScript')
  })
})
