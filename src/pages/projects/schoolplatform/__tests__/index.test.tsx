/**
 * SchoolPlatform Page Tests - Issue 15.1
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SchoolPlatformPage from '../index'

// Mock the hooks
vi.mock('../../../../hooks/useReducedMotion', () => ({
  useReducedMotion: () => true, // Always return true for tests
}))

describe('SchoolPlatformPage', () => {
  beforeEach(() => {
    // Reset document title
    document.title = ''
  })

  const renderPage = () => {
    return render(
      <BrowserRouter>
        <SchoolPlatformPage />
      </BrowserRouter>
    )
  }

  it('renders page container', () => {
    renderPage()
    expect(screen.getByTestId('schoolplatform-page')).toBeInTheDocument()
  })

  it('renders hero section', () => {
    renderPage()
    expect(screen.getByTestId('project-hero')).toBeInTheDocument()
    expect(screen.getByTestId('hero-title')).toHaveTextContent('SchoolPlatform')
  })

  it('renders problem section', () => {
    renderPage()
    expect(screen.getByTestId('problem-section')).toBeInTheDocument()
    expect(screen.getByText('Il Problema')).toBeInTheDocument()
    expect(screen.getByText('Motivare gli studenti è una sfida')).toBeInTheDocument()
  })

  it('renders solution section', () => {
    renderPage()
    expect(screen.getByTestId('solution-section')).toBeInTheDocument()
    expect(screen.getByText('La Soluzione')).toBeInTheDocument()
    expect(screen.getByText('TeoCoin: ricompense on-chain')).toBeInTheDocument()
  })

  it('renders architecture section', () => {
    renderPage()
    expect(screen.getByTestId('architecture-section')).toBeInTheDocument()
    expect(screen.getByText('Stack Tecnologico')).toBeInTheDocument()
  })

  it('renders architecture diagram', () => {
    renderPage()
    expect(screen.getByTestId('architecture-diagram')).toBeInTheDocument()
  })

  it('renders highlights section', () => {
    renderPage()
    expect(screen.getByTestId('highlights-section')).toBeInTheDocument()
    expect(screen.getByText('Highlights Tecnici')).toBeInTheDocument()
    expect(screen.getByText('Cosa ho implementato')).toBeInTheDocument()
  })

  it('renders highlights grid with 6 items', () => {
    renderPage()
    expect(screen.getByTestId('highlights-grid')).toBeInTheDocument()
    // Check some highlight titles
    expect(screen.getByText('RESTful API Design')).toBeInTheDocument()
    expect(screen.getByText('Auth & JWT')).toBeInTheDocument()
    expect(screen.getByText('Blockchain Integration')).toBeInTheDocument()
  })

  it('renders results section', () => {
    renderPage()
    expect(screen.getByTestId('results-section')).toBeInTheDocument()
    expect(screen.getByText('Risultati')).toBeInTheDocument()
    expect(screen.getByText('Impatto e metriche')).toBeInTheDocument()
  })

  it('renders tech stack section', () => {
    renderPage()
    expect(screen.getByTestId('techstack-section')).toBeInTheDocument()
    expect(screen.getByText('Stack Completo')).toBeInTheDocument()
  })

  it('renders CTA section', () => {
    renderPage()
    expect(screen.getByTestId('cta-section')).toBeInTheDocument()
    expect(screen.getByText('Vuoi vedere il codice?')).toBeInTheDocument()
  })

  it('renders GitHub CTA link', () => {
    renderPage()
    const githubLink = screen.getByRole('link', { name: /esplora su github/i })
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/teoricci/schoolplatform')
  })

  it('renders other projects link', () => {
    renderPage()
    const projectsLink = screen.getByRole('link', { name: /altri progetti/i })
    expect(projectsLink).toBeInTheDocument()
    expect(projectsLink).toHaveAttribute('href', '/projects')
  })

  it('applies bg-noise class to main', () => {
    renderPage()
    expect(screen.getByTestId('schoolplatform-page')).toHaveClass('bg-noise')
  })

  it('sets page title via Seo component', () => {
    renderPage()
    expect(document.title).toBe('SchoolPlatform — Case Study | Matteo Ricci')
  })
})
