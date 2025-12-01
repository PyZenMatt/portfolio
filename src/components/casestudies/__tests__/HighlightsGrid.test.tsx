/**
 * HighlightsGrid Component Tests - Issue 15.1
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HighlightsGrid, { type Highlight } from '../HighlightsGrid'

describe('HighlightsGrid', () => {
  const testHighlights: Highlight[] = [
    {
      icon: <svg data-testid="icon-0" />,
      title: 'First Highlight',
      description: 'First description text.',
    },
    {
      icon: <svg data-testid="icon-1" />,
      title: 'Second Highlight',
      description: 'Second description text.',
    },
    {
      icon: <svg data-testid="icon-2" />,
      title: 'Third Highlight',
      description: 'Third description text.',
    },
  ]

  it('renders container with data-testid', () => {
    render(<HighlightsGrid highlights={testHighlights} />)
    expect(screen.getByTestId('highlights-grid')).toBeInTheDocument()
  })

  it('renders correct number of highlights', () => {
    render(<HighlightsGrid highlights={testHighlights} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('renders all highlight titles', () => {
    render(<HighlightsGrid highlights={testHighlights} />)
    expect(screen.getByText('First Highlight')).toBeInTheDocument()
    expect(screen.getByText('Second Highlight')).toBeInTheDocument()
    expect(screen.getByText('Third Highlight')).toBeInTheDocument()
  })

  it('renders all highlight descriptions', () => {
    render(<HighlightsGrid highlights={testHighlights} />)
    expect(screen.getByText('First description text.')).toBeInTheDocument()
    expect(screen.getByText('Second description text.')).toBeInTheDocument()
    expect(screen.getByText('Third description text.')).toBeInTheDocument()
  })

  it('renders highlight icons', () => {
    render(<HighlightsGrid highlights={testHighlights} />)
    expect(screen.getByTestId('icon-0')).toBeInTheDocument()
    expect(screen.getByTestId('icon-1')).toBeInTheDocument()
    expect(screen.getByTestId('icon-2')).toBeInTheDocument()
  })

  it('renders individual highlight test ids', () => {
    render(<HighlightsGrid highlights={testHighlights} />)
    expect(screen.getByTestId('highlight-0')).toBeInTheDocument()
    expect(screen.getByTestId('highlight-1')).toBeInTheDocument()
    expect(screen.getByTestId('highlight-2')).toBeInTheDocument()
  })

  it('has correct aria-label', () => {
    render(<HighlightsGrid highlights={testHighlights} />)
    expect(screen.getByLabelText('Technical highlights')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<HighlightsGrid highlights={testHighlights} className="custom-class" />)
    expect(screen.getByTestId('highlights-grid')).toHaveClass('custom-class')
  })

  it('renders with empty array', () => {
    render(<HighlightsGrid highlights={[]} />)
    expect(screen.getByTestId('highlights-grid')).toBeInTheDocument()
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })
})
