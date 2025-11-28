import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import SkipLink from './SkipLink'

const renderSkipLink = () => {
  return render(
    <BrowserRouter>
      <div>
        <SkipLink />
        <main id="main-content" tabIndex={-1}>
          <h1>Main Content</h1>
        </main>
      </div>
    </BrowserRouter>
  )
}

describe('SkipLink', () => {
  test('renders skip link', () => {
    renderSkipLink()
    const skipLink = screen.getByText(/skip to main content/i)
    expect(skipLink).toBeInTheDocument()
  })

  test('skip link has correct href', () => {
    renderSkipLink()
    const skipLink = screen.getByText(/skip to main content/i)
    expect(skipLink).toHaveAttribute('href', '#main-content')
  })

  test('skip link is hidden by default (sr-only)', () => {
    renderSkipLink()
    const skipLink = screen.getByText(/skip to main content/i)
    expect(skipLink).toHaveClass('sr-only')
  })

  test('skip link focuses main content when clicked', async () => {
    const user = userEvent.setup()
    renderSkipLink()
    
    const skipLink = screen.getByText(/skip to main content/i)
    const mainContent = document.getElementById('main-content')
    
    await user.click(skipLink)
    
    expect(mainContent).toHaveFocus()
  })

  test('skip link is keyboard accessible', async () => {
    const user = userEvent.setup()
    renderSkipLink()
    
    const skipLink = screen.getByText(/skip to main content/i)
    
    // Tab to the skip link
    await user.tab()
    
    expect(skipLink).toHaveFocus()
  })
})
