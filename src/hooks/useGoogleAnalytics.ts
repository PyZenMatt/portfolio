import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void
  }
}

/**
 * Hook per tracciare i page views con Google Analytics (gtag.js)
 * Invia automaticamente i dati di analytics quando la rotta cambia
 */
export function useGoogleAnalytics(): void {
  const location = useLocation()

  useEffect(() => {
    // Aspetta che gtag sia disponibile
    if (typeof window !== 'undefined' && window.gtag) {
      // Traccia il page view
      window.gtag('config', 'G-MLB32YW721', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      })
    }
  }, [location.pathname, location.search])
}
