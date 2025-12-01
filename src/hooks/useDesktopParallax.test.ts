/**
 * Tests for useDesktopParallax hook - Issue 14.2e + 14.2f
 * 
 * Desktop detection: pointer:fine only (no fallback)
 * Mobile: no parallax (pointer:coarse or no fine)
 * Events: pointermove/pointerleave (14.2f)
 */

import { renderHook, act } from '@testing-library/react'
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest'

// Mock useReducedMotion
vi.mock('./useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}))

// Setup matchMedia mock with configurable pointer types
interface PointerConfig {
  fine: boolean
  coarse: boolean
}

const mockMatchMedia = (config: PointerConfig) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: 
        (query === '(pointer: fine)' && config.fine) ||
        (query === '(pointer: coarse)' && config.coarse),
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
    mockMatchMedia({ fine: true, coarse: false }) // Default to desktop
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

  test('does not attach listeners on mobile (coarse pointer only)', async () => {
    vi.resetModules()
    mockMatchMedia({ fine: false, coarse: true }) // Mobile: coarse only
    const module = await import('./useDesktopParallax')
    
    const targetRef = { current: document.createElement('div') }
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    
    renderHook(() => module.useDesktopParallax(targetRef))
    
    expect(addEventListenerSpy).not.toHaveBeenCalledWith('pointermove', expect.any(Function), expect.any(Object))
  })

  test('attaches listeners on desktop (fine pointer)', () => {
    const targetRef = { current: document.createElement('div') }
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    
    renderHook(() => useDesktopParallax(targetRef))
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('pointermove', expect.any(Function), { passive: true })
  })

  test('calls onMouseMove callback on pointer movement', () => {
    const targetRef = { current: document.createElement('div') }
    const onMouseMove = vi.fn()
    
    renderHook(() => useDesktopParallax(targetRef, { onMouseMove }))
    
    act(() => {
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 100, clientY: 100 }))
    })
    
    expect(onMouseMove).toHaveBeenCalled()
  })

  test('calls onMouseIdle callback after idle timeout', async () => {
    vi.useFakeTimers()
    const targetRef = { current: document.createElement('div') }
    const onMouseIdle = vi.fn()
    
    renderHook(() => useDesktopParallax(targetRef, { onMouseIdle, idleTimeout: 1500 }))
    
    act(() => {
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 100, clientY: 100 }))
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
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('pointermove', expect.any(Function))
  })
})

describe('useDesktopParallax with reduced motion', () => {
  beforeEach(() => {
    vi.resetModules()
    mockMatchMedia({ fine: true, coarse: false })
  })

  test('does not attach listeners when reduced motion is preferred', async () => {
    vi.doMock('./useReducedMotion', () => ({
      useReducedMotion: () => true,
    }))
    
    const module = await import('./useDesktopParallax')
    const targetRef = { current: document.createElement('div') }
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    
    renderHook(() => module.useDesktopParallax(targetRef))
    
    expect(addEventListenerSpy).not.toHaveBeenCalledWith('pointermove', expect.any(Function), expect.any(Object))
  })
})

/**
 * Issue 14.2e: Simple pointer detection tests
 * 
 * Desktop = pointer:fine only. No fallbacks.
 * Mobile = no parallax (coarse or no fine pointer)
 */
describe('useDesktopParallax pointer detection (Issue 14.2e)', () => {
  beforeEach(() => {
    vi.resetModules()
    // Re-mock useReducedMotion for fresh imports
    vi.doMock('./useReducedMotion', () => ({
      useReducedMotion: () => false,
    }))
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('does NOT enable parallax when neither fine nor coarse detected (no fallback)', async () => {
    // Unlike 14.2c, we no longer fallback - no fine pointer = no parallax
    mockMatchMedia({ fine: false, coarse: false })
    
    const module = await import('./useDesktopParallax')
    const targetRef = { current: document.createElement('div') }
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    
    renderHook(() => module.useDesktopParallax(targetRef))
    
    // Should NOT attach listeners - no fine pointer detected
    expect(addEventListenerSpy).not.toHaveBeenCalledWith('pointermove', expect.any(Function), expect.any(Object))
  })

  test('does not enable parallax on mobile (coarse pointer only)', async () => {
    // Mobile always has coarse pointer from touch
    mockMatchMedia({ fine: false, coarse: true })
    
    const module = await import('./useDesktopParallax')
    const targetRef = { current: document.createElement('div') }
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    
    renderHook(() => module.useDesktopParallax(targetRef))
    
    // Should NOT attach listeners on mobile
    expect(addEventListenerSpy).not.toHaveBeenCalledWith('pointermove', expect.any(Function), expect.any(Object))
  })

  test('enables parallax on hybrid device with both fine and coarse', async () => {
    // Some laptops with touchscreen have both fine (trackpad) and coarse (touch)
    mockMatchMedia({ fine: true, coarse: true })
    
    const module = await import('./useDesktopParallax')
    const targetRef = { current: document.createElement('div') }
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    
    renderHook(() => module.useDesktopParallax(targetRef))
    
    // Should attach listeners because fine pointer is available
    expect(addEventListenerSpy).toHaveBeenCalledWith('pointermove', expect.any(Function), { passive: true })
  })

  test('enables parallax on desktop (fine pointer only)', async () => {
    mockMatchMedia({ fine: true, coarse: false })
    
    const module = await import('./useDesktopParallax')
    const targetRef = { current: document.createElement('div') }
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    
    renderHook(() => module.useDesktopParallax(targetRef))
    
    // Should attach listeners on desktop
    expect(addEventListenerSpy).toHaveBeenCalledWith('pointermove', expect.any(Function), { passive: true })
  })
})
