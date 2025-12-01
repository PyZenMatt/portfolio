/**
 * TechStackList Component Tests - Issue 15.1
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TechStackList, { type CaseTechName } from '../TechStackList'

describe('TechStackList', () => {
  const techs: CaseTechName[] = ['react', 'django', 'python']

  it('renders container with data-testid', () => {
    render(<TechStackList techs={techs} />)
    expect(screen.getByTestId('tech-stack-list')).toBeInTheDocument()
  })

  it('renders all provided techs', () => {
    render(<TechStackList techs={techs} />)
    expect(screen.getByTestId('tech-react')).toBeInTheDocument()
    expect(screen.getByTestId('tech-django')).toBeInTheDocument()
    expect(screen.getByTestId('tech-python')).toBeInTheDocument()
  })

  it('renders correct tech names via aria-label', () => {
    render(<TechStackList techs={techs} />)
    expect(screen.getByLabelText('React')).toBeInTheDocument()
    expect(screen.getByLabelText('Django')).toBeInTheDocument()
    expect(screen.getByLabelText('Python')).toBeInTheDocument()
  })

  it('renders all supported techs', () => {
    const allTechs: CaseTechName[] = [
      'react',
      'django',
      'python',
      'postgresql',
      'solidity',
      'web3',
      'docker',
      'github',
      'typescript',
      'vite',
      'tailwind',
      'redis',
    ]
    render(<TechStackList techs={allTechs} />)
    
    allTechs.forEach((tech) => {
      expect(screen.getByTestId(`tech-${tech}`)).toBeInTheDocument()
    })
  })

  it('applies custom className', () => {
    render(<TechStackList techs={techs} className="custom-class" />)
    expect(screen.getByTestId('tech-stack-list')).toHaveClass('custom-class')
  })

  it('renders icons within icon wrapper', () => {
    render(<TechStackList techs={['react']} />)
    const svgElement = document.querySelector('svg')
    expect(svgElement).toBeInTheDocument()
  })
})
