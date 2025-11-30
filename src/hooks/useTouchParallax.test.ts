/**
 * useTouchParallax Hook Tests - Issue 14.2
 */

import { renderHook, act } from '@testing-library/react'
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest'
import { useTouchParallax } from './useTouchParallax'

// Mock useReducedMotion
vi.mock('./useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}))

describe('useTouchParallax', () => {
  let mockElement: HTMLDivElement
  let rafCallback: FrameRequestCallback | null = null

  beforeEach(() => {
    // Create mock element
    mockElement = document.createElement('div')
    mockElement.style.transform = ''
    mockElement.style.transition = ''
    document.body.appendChild(mockElement)

    // Mock requestAnimationFrame
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallback = cb
      return 1
    })
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
  })

  afterEach(() => {
    document.body.removeChild(mockElement)
    vi.restoreAllMocks()
    rafCallback = null
  })

  test('returns isTouching state', () => {
    const ref = { current: mockElement }
    const { result } = renderHook(() => useTouchParallax(ref))
    
    expect(result.current).toHaveProperty('isTouching')
  })

  test('attaches touch event listeners', () => {
    const ref = { current: mockElement }
    const addEventListenerSpy = vi.spyOn(mockElement, 'addEventListener')

    renderHook(() => useTouchParallax(ref))

    expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function), { passive: true })
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchmove', expect.any(Function), { passive: true })
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchend', expect.any(Function), { passive: true })
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchcancel', expect.any(Function), { passive: true })
  })

  test('removes event listeners on unmount', () => {
    const ref = { current: mockElement }
    const removeEventListenerSpy = vi.spyOn(mockElement, 'removeEventListener')

    const { unmount } = renderHook(() => useTouchParallax(ref))
    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchmove', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchend', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchcancel', expect.any(Function))
  })

  test('applies transform on touch move', () => {
    const ref = { current: mockElement }
    renderHook(() => useTouchParallax(ref, { sensitivityX: 1, sensitivityY: 1 }))

    // Simulate touchstart
    const touchStartEvent = new TouchEvent('touchstart', {
      touches: [{ clientX: 100, clientY: 100 } as Touch],
    })
    act(() => {
      mockElement.dispatchEvent(touchStartEvent)
    })

    // Simulate touchmove
    const touchMoveEvent = new TouchEvent('touchmove', {
      touches: [{ clientX: 110, clientY: 105 } as Touch],
    })
    act(() => {
      mockElement.dispatchEvent(touchMoveEvent)
    })

    // Execute RAF callback
    if (rafCallback) {
      act(() => {
        rafCallback!(0)
      })
    }

    expect(mockElement.style.transform).toContain('translate3d')
  })

  test('clamps transform values to max bounds', () => {
    const ref = { current: mockElement }
    renderHook(() => useTouchParallax(ref, { maxX: 12, maxY: 12, sensitivityX: 1, sensitivityY: 1 }))

    // Simulate touchstart
    const touchStartEvent = new TouchEvent('touchstart', {
      touches: [{ clientX: 0, clientY: 0 } as Touch],
    })
    act(() => {
      mockElement.dispatchEvent(touchStartEvent)
    })

    // Simulate touchmove with large delta (should be clamped)
    const touchMoveEvent = new TouchEvent('touchmove', {
      touches: [{ clientX: 100, clientY: 100 } as Touch],
    })
    act(() => {
      mockElement.dispatchEvent(touchMoveEvent)
    })

    // Execute RAF callback
    if (rafCallback) {
      act(() => {
        rafCallback!(0)
      })
    }

    // Transform should be clamped to ±12px
    expect(mockElement.style.transform).toBe('translate3d(12px, 12px, 0)')
  })

  test('resets transform on touch end', () => {
    vi.useFakeTimers()
    const ref = { current: mockElement }
    renderHook(() => useTouchParallax(ref, { decayDuration: 350 }))

    // Simulate touch sequence
    const touchStartEvent = new TouchEvent('touchstart', {
      touches: [{ clientX: 100, clientY: 100 } as Touch],
    })
    const touchEndEvent = new TouchEvent('touchend', {
      touches: [],
    })

    act(() => {
      mockElement.dispatchEvent(touchStartEvent)
      mockElement.dispatchEvent(touchEndEvent)
    })

    expect(mockElement.style.transform).toBe('translate3d(0, 0, 0)')
    expect(mockElement.style.transition).toContain('350ms')

    vi.useRealTimers()
  })

  test('calls onTouchStart callback', () => {
    const onTouchStart = vi.fn()
    const ref = { current: mockElement }
    renderHook(() => useTouchParallax(ref, { onTouchStart }))

    const touchStartEvent = new TouchEvent('touchstart', {
      touches: [{ clientX: 100, clientY: 100 } as Touch],
    })
    act(() => {
      mockElement.dispatchEvent(touchStartEvent)
    })

    expect(onTouchStart).toHaveBeenCalled()
  })

  test('calls onTouchEnd callback after decay duration', () => {
    vi.useFakeTimers()
    const onTouchEnd = vi.fn()
    const ref = { current: mockElement }
    renderHook(() => useTouchParallax(ref, { onTouchEnd, decayDuration: 350 }))

    const touchStartEvent = new TouchEvent('touchstart', {
      touches: [{ clientX: 100, clientY: 100 } as Touch],
    })
    const touchEndEvent = new TouchEvent('touchend', {
      touches: [],
    })

    act(() => {
      mockElement.dispatchEvent(touchStartEvent)
      mockElement.dispatchEvent(touchEndEvent)
    })

    expect(onTouchEnd).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(350)
    })

    expect(onTouchEnd).toHaveBeenCalled()
    vi.useRealTimers()
  })

  test('ignores multi-touch events', () => {
    const onTouchStart = vi.fn()
    const ref = { current: mockElement }
    renderHook(() => useTouchParallax(ref, { onTouchStart }))

    // Multi-touch event
    const multiTouchEvent = new TouchEvent('touchstart', {
      touches: [
        { clientX: 100, clientY: 100 } as Touch,
        { clientX: 200, clientY: 200 } as Touch,
      ],
    })
    act(() => {
      mockElement.dispatchEvent(multiTouchEvent)
    })

    expect(onTouchStart).not.toHaveBeenCalled()
  })

  test('does nothing with null ref', () => {
    const ref = { current: null }
    const { result } = renderHook(() => useTouchParallax(ref))
    
    expect(result.current.isTouching).toBe(false)
  })
})

describe('useTouchParallax with reduced motion', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  test('does not apply transforms when reduced motion is preferred', async () => {
    // Re-mock with reduced motion enabled
    vi.doMock('./useReducedMotion', () => ({
      useReducedMotion: () => true,
    }))

    const { useTouchParallax: useTouchParallaxMocked } = await import('./useTouchParallax')
    
    const mockElement = document.createElement('div')
    document.body.appendChild(mockElement)
    
    const ref = { current: mockElement }
    renderHook(() => useTouchParallaxMocked(ref))

    const touchStartEvent = new TouchEvent('touchstart', {
      touches: [{ clientX: 100, clientY: 100 } as Touch],
    })
    
    act(() => {
      mockElement.dispatchEvent(touchStartEvent)
    })

    expect(mockElement.style.transform).toBe('')

    document.body.removeChild(mockElement)
  })
})
