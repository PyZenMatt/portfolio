import { useEffect } from 'react'

export interface SeoProps {
  title: string
  description?: string
  canonical?: string
}

const DEFAULT_DESCRIPTION =
  'Portfolio di Matteo Ricci, sviluppatore full-stack specializzato in React, TypeScript, Django e DevOps.'
const DEFAULT_CANONICAL = 'https://matteoricci.net'

export default function Seo({ title, description, canonical }: SeoProps) {
  const finalDescription = description ?? DEFAULT_DESCRIPTION
  const finalCanonical = canonical ?? DEFAULT_CANONICAL

  useEffect(() => {
    // Update document title
    document.title = title

    // Helper function to update or create meta tags
    const updateMetaTag = (
      selector: string,
      attribute: 'name' | 'property',
      attributeValue: string,
      content: string
    ) => {
      let element = document.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, attributeValue)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Helper function to update or create link tags
    const updateLinkTag = (selector: string, rel: string, href: string) => {
      let element = document.querySelector(selector) as HTMLLinkElement
      if (!element) {
        element = document.createElement('link')
        element.setAttribute('rel', rel)
        document.head.appendChild(element)
      }
      element.href = href
    }

    // Update meta tags
    updateMetaTag('meta[name="description"]', 'name', 'description', finalDescription)

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title)
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', finalDescription)
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', finalCanonical)
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website')

    // Update canonical link
    updateLinkTag('link[rel="canonical"]', 'canonical', finalCanonical)
  }, [title, finalDescription, finalCanonical])

  return null
}
