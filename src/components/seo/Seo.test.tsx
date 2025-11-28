import { describe, it, expect, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import Seo from './Seo'

describe('Seo', () => {
  afterEach(() => {
    // Clean up meta tags after each test
    document.title = ''
    const metas = document.querySelectorAll('meta[name="description"], meta[property^="og:"]')
    metas.forEach((meta) => meta.remove())
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.remove()
  })

  it('should render without errors', () => {
    const { container } = render(<Seo title="Test Title" />)
    expect(container).toBeTruthy()
  })

  it('should update document title', () => {
    render(<Seo title="Test Portfolio Page" />)
    expect(document.title).toBe('Test Portfolio Page')
  })

  it('should set meta description', () => {
    render(<Seo title="Test" description="Custom description for testing" />)
    const metaDescription = document.querySelector('meta[name="description"]')
    expect(metaDescription?.getAttribute('content')).toBe('Custom description for testing')
  })

  it('should use default description when not provided', () => {
    render(<Seo title="Test" />)
    const metaDescription = document.querySelector('meta[name="description"]')
    expect(metaDescription?.getAttribute('content')).toContain('Portfolio di Matteo Ricci')
  })

  it('should set Open Graph title', () => {
    render(<Seo title="My Portfolio" />)
    const ogTitle = document.querySelector('meta[property="og:title"]')
    expect(ogTitle?.getAttribute('content')).toBe('My Portfolio')
  })

  it('should set Open Graph description', () => {
    render(<Seo title="Test" description="OG description test" />)
    const ogDescription = document.querySelector('meta[property="og:description"]')
    expect(ogDescription?.getAttribute('content')).toBe('OG description test')
  })

  it('should set Open Graph URL', () => {
    render(<Seo title="Test" canonical="https://matteoricci.net/about" />)
    const ogUrl = document.querySelector('meta[property="og:url"]')
    expect(ogUrl?.getAttribute('content')).toBe('https://matteoricci.net/about')
  })

  it('should set Open Graph type to website', () => {
    render(<Seo title="Test" />)
    const ogType = document.querySelector('meta[property="og:type"]')
    expect(ogType?.getAttribute('content')).toBe('website')
  })

  it('should set canonical URL', () => {
    render(<Seo title="Test" canonical="https://matteoricci.net/projects" />)
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    expect(canonical?.href).toBe('https://matteoricci.net/projects')
  })

  it('should use default canonical when not provided', () => {
    render(<Seo title="Test" />)
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    expect(canonical?.href).toBe('https://matteoricci.net/')
  })

  it('should update meta tags when props change', () => {
    const { rerender } = render(<Seo title="First Title" description="First description" />)
    expect(document.title).toBe('First Title')

    rerender(<Seo title="Second Title" description="Second description" />)
    expect(document.title).toBe('Second Title')
    const metaDescription = document.querySelector('meta[name="description"]')
    expect(metaDescription?.getAttribute('content')).toBe('Second description')
  })
})
