import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import Hamburger from './Hamburger'

function TestWrapper() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <div data-testid="status">{isOpen ? 'open' : 'closed'}</div>
    </div>
  )
}

describe('Hamburger', () => {
  test('toggles state when clicked', async () => {
    const user = userEvent.setup()
    render(<TestWrapper />)
    
    expect(screen.getByTestId('status')).toHaveTextContent('closed')
    const button = screen.getByRole('button')
    
    await user.click(button)
    
    expect(screen.getByTestId('status')).toHaveTextContent('open')
  })
})
