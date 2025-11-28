import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Timeline from './Timeline'

const renderTimeline = () => {
  return render(
    <BrowserRouter>
      <Timeline />
    </BrowserRouter>
  )
}

describe('Timeline', () => {
  test('renders without crashing', () => {
    renderTimeline()
    expect(screen.getByText(/2023/)).toBeInTheDocument()
  })

  test('displays all timeline years', () => {
    renderTimeline()
    expect(screen.getByText('2023')).toBeInTheDocument()
    expect(screen.getAllByText('2024')).toHaveLength(2) // Two 2024 entries
    expect(screen.getByText('2025')).toBeInTheDocument()
  })

  test('displays timeline titles', () => {
    renderTimeline()
    expect(screen.getByText(/python foundation/i)).toBeInTheDocument()
    expect(screen.getByText(/full-stack development/i)).toBeInTheDocument()
    expect(screen.getByText(/major projects launch/i)).toBeInTheDocument()
    expect(screen.getByText(/modern stack & ai/i)).toBeInTheDocument()
  })

  test('displays timeline descriptions', () => {
    renderTimeline()
    expect(screen.getByText(/started journey with python/i)).toBeInTheDocument()
    expect(screen.getByText(/mastered django and react/i)).toBeInTheDocument()
    expect(screen.getByText(/shipped blogmanager/i)).toBeInTheDocument()
    expect(screen.getByText(/adopted vite, tailwindcss/i)).toBeInTheDocument()
  })

  test('has correct number of timeline entries', () => {
    renderTimeline()
    const titles = screen.getAllByRole('heading', { level: 3 })
    expect(titles).toHaveLength(4)
  })

  test('timeline entries have proper structure', () => {
    renderTimeline()
    const firstTitle = screen.getByRole('heading', { name: /python foundation/i })
    expect(firstTitle).toHaveClass('font-medium')
  })

  test('displays years in badge format', () => {
    renderTimeline()
    const year2023 = screen.getByText('2023')
    expect(year2023).toHaveClass('rounded-full')
  })
})
