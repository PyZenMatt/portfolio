/**
 * Tests for TechStackSpotlight section - Issue 14.3.4
 */

import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import TechStackSpotlight from './TechStackSpotlight'

describe('TechStackSpotlight', () => {
  test('renders section', () => {
    render(<TechStackSpotlight />)
    expect(screen.getByRole('region', { name: /tech stack/i })).toBeInTheDocument()
  })

  test('renders heading', () => {
    render(<TechStackSpotlight />)
    expect(screen.getByRole('heading', { name: /tech stack/i, level: 2 })).toBeInTheDocument()
  })

  test('renders technologies grid', () => {
    render(<TechStackSpotlight />)
    expect(screen.getByRole('list', { name: /technologies/i })).toBeInTheDocument()
  })
})
