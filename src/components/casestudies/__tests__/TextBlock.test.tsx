/**
 * TextBlock Component Tests - Issue 15.1
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TextBlock from '../TextBlock'

describe('TextBlock', () => {
  const defaultProps = {
    heading: 'Test Heading',
    body: 'Test body content.',
  }

  it('renders heading', () => {
    render(<TextBlock {...defaultProps} />)
    expect(screen.getByRole('heading', { name: /test heading/i })).toBeInTheDocument()
  })

  it('renders body as single string', () => {
    render(<TextBlock {...defaultProps} />)
    expect(screen.getByText('Test body content.')).toBeInTheDocument()
  })

  it('renders body as array of paragraphs', () => {
    render(
      <TextBlock
        heading="Test"
        body={['Paragraph one.', 'Paragraph two.', 'Paragraph three.']}
      />
    )
    expect(screen.getByText('Paragraph one.')).toBeInTheDocument()
    expect(screen.getByText('Paragraph two.')).toBeInTheDocument()
    expect(screen.getByText('Paragraph three.')).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    render(<TextBlock {...defaultProps} label="Section Label" />)
    expect(screen.getByText('Section Label')).toBeInTheDocument()
  })

  it('does not render label when not provided', () => {
    render(<TextBlock {...defaultProps} />)
    expect(screen.queryByText(/section label/i)).not.toBeInTheDocument()
  })

  it('renders with data-testid', () => {
    render(<TextBlock {...defaultProps} />)
    expect(screen.getByTestId('text-block')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<TextBlock {...defaultProps} className="custom-class" />)
    expect(screen.getByTestId('text-block')).toHaveClass('custom-class')
  })
})
