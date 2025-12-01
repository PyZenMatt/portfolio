import { render, screen } from '@testing-library/react'
import App from './App'

test('renders app with router', async () => {
  render(<App />)
  expect(
    await screen.findByRole('heading', { name: /matteo ricci/i }, { timeout: 3000 })
  ).toBeInTheDocument()
  // Multiple navigation elements: header nav + footer nav
  expect(screen.getAllByRole('navigation').length).toBeGreaterThanOrEqual(1)
})
