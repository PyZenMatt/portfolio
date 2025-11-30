/**
 * Tests for useDesktopParallax hook - Issue 14.2b
 */

import { renderHook, act } from '@testing-library/react'
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest'

// Mock useReducedMotion
vi.mock('./useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}))

// Setup matchMedia mock
const mockMatchMedia = (pointerType: 'fine' | 'coarse' | 'none') => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query.includes(pointerType),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

describe('useDesktopParallax', () => {
  let useDesktopParallax: typeof import('./useDesktopParallax').useDesktopParallax

  beforeEach(async () => {
    vi.resetModules()
    mockMatchMedia('fine') // Default to desktop
    const module = await import('./useDesktopParallax')
    useDesktopParallax = module.useDesktopParallax
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('hook initializes without errors', () => {
    const targetRef = { current: document.createElement('div') }
    const { result } = renderHook(() => useDesktopParallax(targetRef))
    expect(result.current.isActive).toBe(false)
  })

  test('does not attach listeners on mobile (coarse pointer)', async () => {
    vi.resetModules()
    mockMatchMedia('coarse')
    const module = await import('./useDesktopParallax')
    
    const targetRef = { current: document.createElement('div') }
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    
    renderHook(() => module.useDesktopParallax(targetRef))
    
    expect(addEventListenerSpy).not.toHaveBeenCalledWith('mousemove', expect.any(Function), expect.any(Object))
  })

  test('attaches listeners on desktop (fine pointer)', () => {
    const targetRef = { current: document.createElement('div') }
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    
    renderHook(() => useDesktopParallax(targetRef))
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function), { passive: true })
  })

  test('calls onMouseMove callback on mouse movement', () => {
    const targetRef = { current: document.createElement('div') }
    const onMouseMove = vi.fn()
    
    renderHook(() => useDesktopParallax(targetRef, { onMouseMove }))
    
    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 100 }))
    })
    
    expect(onMouseMove).toHaveBeenCalled()
  })

  test('calls onMouseIdle callback after idle timeout', async () => {
    vi.useFakeTimers()
    const targetRef = { current: document.createElement('div') }
    const onMouseIdle = vi.fn()
    
    renderHook(() => useDesktopParallax(targetRef, { onMouseIdle, idleTimeout: 1500 }))
    
    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 100 }))
    })
    
    expect(onMouseIdle).not.toHaveBeenCalled()
    
    act(() => {
      vi.advanceTimersByTime(1500)
    })
    
    expect(onMouseIdle).toHaveBeenCalled()
    vi.useRealTimers()
  })

  test('cleans up listeners on unmount', () => {
    const targetRef = { current: document.createElement('div') }
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    
    const { unmount } = renderHook(() => useDesktopParallax(targetRef))
    unmount()
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
  })
})

describe('useDesktopParallax with reduced motion', () => {
  beforeEach(() => {
    vi.resetModules()
    mockMatchMedia('fine')
  })

  test('does not attach listeners when reduced motion is preferred', async () => {
    vi.doMock('./useReducedMotion', () => ({
      useReducedMotion: () => true,
    }))
    
    const module = await import('./useDesktopParallax')
    const targetRef = { current: document.createElement('div') }
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    
    renderHook(() => module.useDesktopParallax(targetRef))
    
    expect(addEventListenerSpy).not.toHaveBeenCalledWith('mousemove', expect.any(Function), expect.any(Object))
  })
})
