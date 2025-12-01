/**
 * Tests for WhatIBuild section - Issue 14.3.1
 */

import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import WhatIBuild from './WhatIBuild'

describe('WhatIBuild', () => {
  test('renders section', () => {
    render(<WhatIBuild />)
    expect(screen.getByRole('region', { name: /what i build/i })).toBeInTheDocument()
  })

  test('renders heading', () => {
    render(<WhatIBuild />)
    expect(screen.getByRole('heading', { name: /what i build/i, level: 2 })).toBeInTheDocument()
  })

  test('renders services grid', () => {
    render(<WhatIBuild />)
    expect(screen.getByRole('list', { name: /services offered/i })).toBeInTheDocument()
  })
})
