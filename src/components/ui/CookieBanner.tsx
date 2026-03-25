import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COOKIE_CONSENT_KEY = 'cookie_consent'

interface CookieConsent {
  analytics: boolean
  timestamp: number
}

/**
 * GDPR Cookie Consent Banner
 * Manages cookie preferences and integrates with Google Analytics
 */
export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasConsented, setHasConsented] = useState(false)

  // Check if user has already made a choice
  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (stored) {
      const consent: CookieConsent = JSON.parse(stored)
      setHasConsented(true)
      
      // Enable/disable analytics based on consent
      if (consent.analytics && window.gtag) {
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted'
        })
      }
    } else {
      setIsVisible(true)
      
      // Default: deny analytics until user accepts
      if (window.gtag) {
        window.gtag('consent', 'default', {
          'analytics_storage': 'denied'
        })
      }
    }
  }, [])

  const handleAccept = () => {
    const consent: CookieConsent = {
      analytics: true,
      timestamp: Date.now()
    }
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))
    
    // Enable analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      })
    }
    
    setIsVisible(false)
  }

  const handleReject = () => {
    const consent: CookieConsent = {
      analytics: false,
      timestamp: Date.now()
    }
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))
    
    // Keep analytics denied
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      })
    }
    
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && !hasConsented && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          {/* Backdrop blur */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          
          {/* Banner container */}
          <div className="relative mx-auto max-w-2xl bg-white dark:bg-[#374766] rounded-lg shadow-lg border border-[#D4D4D4] dark:border-[#4A5F7A] p-6 sm:p-8">
            {/* Content */}
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-[#242E3D] dark:text-[#F4F4F4] mb-2">
                Privacy & Cookie Policy
              </h3>
              <p className="text-sm text-[#4A5568] dark:text-[#B8C5D6] leading-relaxed">
                Questo sito utilizza Google Analytics per analizzare il traffico e migliorare l'esperienza dell'utente. 
                I cookie analitici non identificano personalmente e possono essere rifiutati.{' '}
                <a 
                  href="/privacy" 
                  className="text-[#EF552C] hover:text-[#FF9124] font-medium transition-colors"
                >
                  Scopri di più
                </a>
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={handleReject}
                className="px-6 py-2.5 text-sm font-medium text-[#242E3D] dark:text-[#F4F4F4] bg-[#E8E8E8] dark:bg-[#2F4560] rounded-md hover:bg-[#D4D4D4] dark:hover:bg-[#4A5F7A] transition-colors"
              >
                Rifiuta
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-[#EF552C] rounded-md hover:bg-[#FF9124] transition-colors"
              >
                Accetta
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

declare global {
  interface Window {
    gtag?: (
      command: string,
      ...args: unknown[]
    ) => void
  }
}
