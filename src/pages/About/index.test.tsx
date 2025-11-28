import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import About from './index'

const renderAbout = () => {
  return render(
    <BrowserRouter>
      <About />
    </BrowserRouter>
  )
}

describe('About Page', () => {
  test('renders without crashing', () => {
    renderAbout()
    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
  })

  test('displays main page title', () => {
    renderAbout()
    expect(screen.getByRole('heading', { name: /about me/i, level: 1 })).toBeInTheDocument()
  })

  test('displays bio section', () => {
    renderAbout()
    expect(screen.getByText(/full-stack developer/i)).toBeInTheDocument()
    const djangoTexts = screen.getAllByText(/django/i)
    const reactTexts = screen.getAllByText(/react/i)
    expect(djangoTexts.length).toBeGreaterThan(0)
    expect(reactTexts.length).toBeGreaterThan(0)
  })

  test('displays technical skills section', () => {
    renderAbout()
    expect(screen.getByRole('heading', { name: /technical skills/i })).toBeInTheDocument()
  })

  test('displays journey section', () => {
    renderAbout()
    expect(screen.getByRole('heading', { name: /journey/i })).toBeInTheDocument()
  })

  test('contains skills grid', () => {
    renderAbout()
    expect(screen.getByRole('heading', { name: /^frontend$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^backend$/i })).toBeInTheDocument()
  })

  test('contains timeline', () => {
    renderAbout()
    expect(screen.getByText('2023')).toBeInTheDocument()
    expect(screen.getByText(/python foundation/i)).toBeInTheDocument()
  })

  test('has proper heading hierarchy', () => {
    renderAbout()
    const h1 = screen.getByRole('heading', { level: 1 })
    const h2s = screen.getAllByRole('heading', { level: 2 })
    
    expect(h1).toBeInTheDocument()
    expect(h2s.length).toBeGreaterThanOrEqual(2)
  })

  test('bio mentions key technologies', () => {
    renderAbout()
    const djangoOccurrences = screen.getAllByText(/django/i)
    const reactOccurrences = screen.getAllByText(/react/i)
    const typescriptOccurrences = screen.getAllByText(/typescript/i)
    
    expect(djangoOccurrences.length).toBeGreaterThan(0)
    expect(reactOccurrences.length).toBeGreaterThan(0)
    expect(typescriptOccurrences.length).toBeGreaterThan(0)
  })

  test('bio mentions development approach', () => {
    renderAbout()
    expect(screen.getByText(/maintainable code/i)).toBeInTheDocument()
    expect(screen.getByText(/comprehensive testing/i)).toBeInTheDocument()
  })

  test('page has responsive layout classes', () => {
    const { container } = renderAbout()
    const mainDiv = container.firstChild
    expect(mainDiv).toHaveClass('max-w-5xl')
    expect(mainDiv).toHaveClass('mx-auto')
  })
})
