import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import HeroSection from './HeroSection'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('HeroSection', () => {
  test('renders without crashing', () => {
    renderWithRouter(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  test('displays the main heading', () => {
    renderWithRouter(<HeroSection />)
    expect(
      screen.getByRole('heading', { name: /hi, i'm matteo ricci/i })
    ).toBeInTheDocument()
  })

  test('displays Full-Stack Developer text', () => {
    renderWithRouter(<HeroSection />)
    expect(screen.getByText(/full-stack developer/i)).toBeInTheDocument()
  })

  test('displays description with Django, React, TypeScript', () => {
    renderWithRouter(<HeroSection />)
    expect(screen.getByText(/django/i)).toBeInTheDocument()
    expect(screen.getByText(/react/i)).toBeInTheDocument()
    expect(screen.getByText(/typescript/i)).toBeInTheDocument()
  })

  test('renders View Projects button', () => {
    renderWithRouter(<HeroSection />)
    expect(
      screen.getByRole('button', { name: /view projects/i })
    ).toBeInTheDocument()
  })

  test('renders Download CV button', () => {
    renderWithRouter(<HeroSection />)
    expect(
      screen.getByRole('button', { name: /download cv/i })
    ).toBeInTheDocument()
  })

  test('renders at least one button', () => {
    renderWithRouter(<HeroSection />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  test('renders image with correct alt text', () => {
    renderWithRouter(<HeroSection />)
    expect(
      screen.getByAltText(/portrait of matteo ricci/i)
    ).toBeInTheDocument()
  })

  test('has proper section structure with hero id', () => {
    const { container } = renderWithRouter(<HeroSection />)
    const section = container.querySelector('#hero')
    expect(section).toBeInTheDocument()
    expect(section?.tagName).toBe('SECTION')
  })
})
