import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../../contexts/ThemeContext'
import Navbar from './Navbar'

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    </BrowserRouter>
  )
}

describe('Navbar', () => {
  test('renders navbar', () => {
    renderNavbar()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  test('renders logo with link to home', () => {
    renderNavbar()
    const logo = screen.getByRole('link', { name: /matteo ricci/i })
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('href', '/')
  })

  test('renders all navigation links', () => {
    renderNavbar()
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  test('renders theme toggle button', () => {
    renderNavbar()
    const themeToggles = screen.getAllByRole('button', { name: /toggle theme/i })
    expect(themeToggles.length).toBeGreaterThan(0)
  })

  test('renders hamburger menu button', () => {
    renderNavbar()
    const hamburger = screen.getByRole('button', { name: /open menu/i })
    expect(hamburger).toBeInTheDocument()
  })

  test('hamburger button has correct aria-expanded state', () => {
    renderNavbar()
    const hamburger = screen.getByRole('button', { name: /open menu/i })
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
  })

  test('clicking hamburger opens mobile menu', async () => {
    const user = userEvent.setup()
    renderNavbar()
    const hamburger = screen.getByRole('button', { name: /open menu/i })
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    
    await user.click(hamburger)
    
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')
    expect(hamburger).toHaveAttribute('aria-label', 'Close menu')
  })

  test('mobile menu contains navigation buttons', async () => {
    const user = userEvent.setup()
    renderNavbar()
    const hamburger = screen.getByRole('button', { name: /open menu/i })
    
    await user.click(hamburger)
    
    const nav = screen.getByRole('navigation')
    const mobileMenu = nav.querySelector('[aria-hidden]')
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'false')
    
    const mobileButtons = mobileMenu?.querySelectorAll('button')
    expect(mobileButtons?.length).toBe(4)
  })

  test('clicking mobile menu item closes the menu', async () => {
    const user = userEvent.setup()
    renderNavbar()
    const hamburger = screen.getByRole('button', { name: /open menu/i })
    
    await user.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')
    
    const nav = screen.getByRole('navigation')
    const mobileMenu = nav.querySelector('[aria-hidden]')
    const homeButton = mobileMenu?.querySelector('button')
    
    if (homeButton) {
      await user.click(homeButton)
    }
    
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'true')
  })

  test('pressing Escape closes mobile menu', async () => {
    const user = userEvent.setup()
    renderNavbar()
    const hamburger = screen.getByRole('button', { name: /open menu/i })
    
    await user.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')
    
    await user.keyboard('{Escape}')
    
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    expect(hamburger).toHaveAttribute('aria-label', 'Open menu')
  })

  test('mobile menu is hidden by default', () => {
    renderNavbar()
    const mobileMenuContainer = screen.getByRole('navigation').querySelector('[aria-hidden]')
    expect(mobileMenuContainer).toHaveAttribute('aria-hidden', 'true')
  })

  test('mobile menu is visible when opened', async () => {
    const user = userEvent.setup()
    renderNavbar()
    const hamburger = screen.getByRole('button', { name: /open menu/i })
    
    await user.click(hamburger)
    
    const nav = screen.getByRole('navigation')
    const mobileMenuContainer = nav.querySelector('[aria-hidden]')
    expect(mobileMenuContainer).toHaveAttribute('aria-hidden', 'false')
  })
})
