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
      screen.getByRole('heading', { name: /matteo ricci/i })
    ).toBeInTheDocument()
  })

  test('displays Full-Stack Developer text', () => {
    renderWithRouter(<HeroSection />)
    expect(screen.getByText(/full-stack developer/i)).toBeInTheDocument()
  })

  test('displays tech stack in header', () => {
    renderWithRouter(<HeroSection />)
    // Tech stack displayed in h2 subheading
    const subheading = screen.getByRole('heading', { level: 2 })
    expect(subheading).toHaveTextContent(/django/i)
    expect(subheading).toHaveTextContent(/react/i)
    expect(subheading).toHaveTextContent(/typescript/i)
  })

  test('renders View My Work button', () => {
    renderWithRouter(<HeroSection />)
    expect(
      screen.getByRole('button', { name: /view my work/i })
    ).toBeInTheDocument()
  })

  test('renders Get In Touch button', () => {
    renderWithRouter(<HeroSection />)
    expect(
      screen.getByRole('button', { name: /get in touch/i })
    ).toBeInTheDocument()
  })

  test('renders at least two CTA buttons', () => {
    renderWithRouter(<HeroSection />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  test('renders HeroArt identity block (portrait SVG)', () => {
    const { container } = renderWithRouter(<HeroSection />)
    // Portrait SVG should be present with aria-hidden
    const svg = container.querySelector('svg[aria-hidden="true"]')
    expect(svg).toBeInTheDocument()
  })

  test('has proper section structure with hero id', () => {
    const { container } = renderWithRouter(<HeroSection />)
    const section = container.querySelector('#hero')
    expect(section).toBeInTheDocument()
    expect(section?.tagName).toBe('SECTION')
  })
})
