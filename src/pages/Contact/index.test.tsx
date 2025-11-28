import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from '../../components/ui/Toast'
import Contact from './index'

const renderContact = () => {
  return render(
    <BrowserRouter>
      <ToastProvider>
        <Contact />
      </ToastProvider>
    </BrowserRouter>
  )
}

describe('Contact Page', () => {
  test('renders without crashing', () => {
    renderContact()
    expect(screen.getByRole('heading', { name: /get in touch/i })).toBeInTheDocument()
  })

  test('sets correct page title', () => {
    renderContact()
    expect(document.title).toBe('Contact — Matteo Ricci')
  })

  test('sets meta description', () => {
    renderContact()
    const metaDescription = document.querySelector('meta[name="description"]')
    expect(metaDescription?.getAttribute('content')).toContain('Contattami')
  })

  test('displays main heading', () => {
    renderContact()
    expect(screen.getByRole('heading', { name: /get in touch/i, level: 1 })).toBeInTheDocument()
  })

  test('displays page description', () => {
    renderContact()
    expect(screen.getByText(/have a project in mind/i)).toBeInTheDocument()
  })

  test('displays contact form', () => {
    renderContact()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })
})
