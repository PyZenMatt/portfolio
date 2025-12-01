/**
 * ProjectHero Component Tests - Issue 15.1
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectHero from '../ProjectHero'

describe('ProjectHero', () => {
  const defaultProps = {
    title: 'Test Project',
    subtitle: 'Full-Stack App',
    description: 'A test project description.',
    techStack: ['react', 'django', 'python'] as const,
  }

  it('renders container with data-testid', () => {
    render(<ProjectHero {...defaultProps} />)
    expect(screen.getByTestId('project-hero')).toBeInTheDocument()
  })

  it('renders title', () => {
    render(<ProjectHero {...defaultProps} />)
    expect(screen.getByTestId('hero-title')).toHaveTextContent('Test Project')
  })

  it('renders subtitle badge', () => {
    render(<ProjectHero {...defaultProps} />)
    expect(screen.getByText('Full-Stack App')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<ProjectHero {...defaultProps} />)
    expect(screen.getByText('A test project description.')).toBeInTheDocument()
  })

  it('renders tech stack', () => {
    render(<ProjectHero {...defaultProps} />)
    expect(screen.getByTestId('tech-stack-list')).toBeInTheDocument()
    expect(screen.getByLabelText('React')).toBeInTheDocument()
  })

  it('renders repo CTA when repoUrl provided', () => {
    render(<ProjectHero {...defaultProps} repoUrl="https://github.com/test" />)
    const repoLink = screen.getByTestId('cta-repo')
    expect(repoLink).toBeInTheDocument()
    expect(repoLink).toHaveAttribute('href', 'https://github.com/test')
    expect(repoLink).toHaveAttribute('target', '_blank')
  })

  it('does not render repo CTA when repoUrl not provided', () => {
    render(<ProjectHero {...defaultProps} />)
    expect(screen.queryByTestId('cta-repo')).not.toBeInTheDocument()
  })

  it('renders live CTA when liveUrl provided', () => {
    render(<ProjectHero {...defaultProps} liveUrl="https://example.com" />)
    const liveLink = screen.getByTestId('cta-live')
    expect(liveLink).toBeInTheDocument()
    expect(liveLink).toHaveAttribute('href', 'https://example.com')
  })

  it('does not render live CTA when liveUrl not provided', () => {
    render(<ProjectHero {...defaultProps} />)
    expect(screen.queryByTestId('cta-live')).not.toBeInTheDocument()
  })

  it('renders image when imageUrl provided', () => {
    render(<ProjectHero {...defaultProps} imageUrl="/test-image.jpg" />)
    const img = screen.getByAltText('Test Project screenshot')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/test-image.jpg')
  })

  it('renders placeholder when imageUrl not provided', () => {
    render(<ProjectHero {...defaultProps} />)
    expect(screen.getByText('Project Preview')).toBeInTheDocument()
  })

  it('has correct aria-label', () => {
    render(<ProjectHero {...defaultProps} />)
    expect(screen.getByLabelText('Project hero')).toBeInTheDocument()
  })
})
