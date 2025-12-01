/**
 * ArchitectureDiagram Component Tests - Issue 15.1
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ArchitectureDiagram, { type ArchitectureBlock, type ArchitectureConnection } from '../ArchitectureDiagram'

describe('ArchitectureDiagram', () => {
  const testBlocks: ArchitectureBlock[] = [
    { id: 'frontend', label: 'Frontend', x: 20, y: 20 },
    { id: 'backend', label: 'Backend', x: 200, y: 20 },
    { id: 'database', label: 'Database', x: 380, y: 20, color: '#336791' },
  ]

  const testConnections: ArchitectureConnection[] = [
    { from: 'frontend', to: 'backend', label: 'API' },
    { from: 'backend', to: 'database' },
  ]

  it('renders container with data-testid', () => {
    render(<ArchitectureDiagram blocks={testBlocks} connections={testConnections} />)
    expect(screen.getByTestId('architecture-diagram')).toBeInTheDocument()
  })

  it('renders all blocks', () => {
    render(<ArchitectureDiagram blocks={testBlocks} connections={testConnections} />)
    expect(screen.getByTestId('arch-block-frontend')).toBeInTheDocument()
    expect(screen.getByTestId('arch-block-backend')).toBeInTheDocument()
    expect(screen.getByTestId('arch-block-database')).toBeInTheDocument()
  })

  it('renders block labels', () => {
    render(<ArchitectureDiagram blocks={testBlocks} connections={testConnections} />)
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByText('Database')).toBeInTheDocument()
  })

  it('renders connection label', () => {
    render(<ArchitectureDiagram blocks={testBlocks} connections={testConnections} />)
    expect(screen.getByText('API')).toBeInTheDocument()
  })

  it('has correct aria-label', () => {
    render(<ArchitectureDiagram blocks={testBlocks} connections={testConnections} />)
    expect(screen.getByLabelText('Architecture diagram')).toBeInTheDocument()
  })

  it('has correct role', () => {
    render(<ArchitectureDiagram blocks={testBlocks} connections={testConnections} />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <ArchitectureDiagram
        blocks={testBlocks}
        connections={testConnections}
        className="custom-class"
      />
    )
    expect(screen.getByTestId('architecture-diagram')).toHaveClass('custom-class')
  })

  it('renders with empty connections', () => {
    render(<ArchitectureDiagram blocks={testBlocks} connections={[]} />)
    expect(screen.getByTestId('architecture-diagram')).toBeInTheDocument()
  })

  it('renders blocks with custom dimensions', () => {
    const customBlocks: ArchitectureBlock[] = [
      { id: 'custom', label: 'Custom', x: 20, y: 20, width: 200, height: 100 },
    ]
    render(<ArchitectureDiagram blocks={customBlocks} connections={[]} />)
    expect(screen.getByTestId('arch-block-custom')).toBeInTheDocument()
  })
})
