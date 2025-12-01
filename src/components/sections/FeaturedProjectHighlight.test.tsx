/**
 * Tests for FeaturedProjectHighlight section - Issue 14.3.7
 */

import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import FeaturedProjectHighlight from './FeaturedProjectHighlight'

describe('FeaturedProjectHighlight', () => {
  test('renders section with accessible name', () => {
    render(<FeaturedProjectHighlight />)
    expect(screen.getByRole('region', { name: /featured project/i })).toBeInTheDocument()
  })

  test('renders heading', () => {
    render(<FeaturedProjectHighlight />)
    expect(screen.getByRole('heading', { name: /featured project/i, level: 2 })).toBeInTheDocument()
  })

  test('renders project container', () => {
    render(<FeaturedProjectHighlight />)
    expect(screen.getByRole('article', { name: /featured project details/i })).toBeInTheDocument()
  })
})
