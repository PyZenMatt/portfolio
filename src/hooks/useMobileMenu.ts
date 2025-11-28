import { useState, useEffect, useCallback } from 'react'

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const openMenu = useCallback(() => setIsOpen(true), [])
  const closeMenu = useCallback(() => setIsOpen(false), [])
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeMenu])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return {
    isOpen,
    openMenu,
    closeMenu,
    toggleMenu,
  }
}
