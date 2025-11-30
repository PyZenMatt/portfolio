/**
 * Tests for useIdleControl hook - Issue 14.2b
 */

import { renderHook, act } from '@testing-library/react'
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest'

// Mock useReducedMotion
vi.mock('./useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}))

describe('useIdleControl', () => {
  let useIdleControl: typeof import('./useIdleControl').useIdleControl

  beforeEach(async () => {
    vi.resetModules()
    const module = await import('./useIdleControl')
    useIdleControl = module.useIdleControl
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('hook initializes without errors', () => {
    const targetRef = { current: document.createElement('div') }
    const { result } = renderHook(() => useIdleControl(targetRef, { isInteracting: false }))
    expect(result).toBeDefined()
  })

  test('pauses animation when isInteracting becomes true', () => {
    const element = document.createElement('div')
    const targetRef = { current: element }
    
    const { rerender } = renderHook(
      ({ isInteracting }) => useIdleControl(targetRef, { isInteracting }),
      { initialProps: { isInteracting: false } }
    )
    
    rerender({ isInteracting: true })
    
    expect(element.style.animationPlayState).toBe('paused')
  })

  test('resumes animation after delay when isInteracting becomes false', () => {
    vi.useFakeTimers()
    const element = document.createElement('div')
    const targetRef = { current: element }
    
    const { rerender } = renderHook(
      ({ isInteracting }) => useIdleControl(targetRef, { isInteracting, resumeDelay: 350 }),
      { initialProps: { isInteracting: true } }
    )
    
    // First pause
    expect(element.style.animationPlayState).toBe('paused')
    
    // Stop interacting
    rerender({ isInteracting: false })
    
    // Should not resume immediately
    expect(element.style.animationPlayState).toBe('paused')
    
    // Advance time
    act(() => {
      vi.advanceTimersByTime(350)
    })
    
    // Should resume after delay
    expect(element.style.animationPlayState).toBe('running')
    
    vi.useRealTimers()
  })

  test('cancels pending resume when interaction starts again', () => {
    vi.useFakeTimers()
    const element = document.createElement('div')
    const targetRef = { current: element }
    
    const { rerender } = renderHook(
      ({ isInteracting }) => useIdleControl(targetRef, { isInteracting, resumeDelay: 350 }),
      { initialProps: { isInteracting: true } }
    )
    
    // Stop interacting
    rerender({ isInteracting: false })
    
    // Wait partial time
    act(() => {
      vi.advanceTimersByTime(200)
    })
    
    // Start interacting again
    rerender({ isInteracting: true })
    
    // Advance past original resume time
    act(() => {
      vi.advanceTimersByTime(200)
    })
    
    // Should still be paused
    expect(element.style.animationPlayState).toBe('paused')
    
    vi.useRealTimers()
  })

  test('handles null ref gracefully', () => {
    const targetRef = { current: null }
    
    expect(() => {
      renderHook(() => useIdleControl(targetRef, { isInteracting: false }))
    }).not.toThrow()
  })
})

describe('useIdleControl with reduced motion', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  test('does not modify animation state when reduced motion is preferred', async () => {
    vi.doMock('./useReducedMotion', () => ({
      useReducedMotion: () => true,
    }))
    
    const module = await import('./useIdleControl')
    const element = document.createElement('div')
    element.style.animationPlayState = 'running'
    const targetRef = { current: element }
    
    const { rerender } = renderHook(
      ({ isInteracting }) => module.useIdleControl(targetRef, { isInteracting }),
      { initialProps: { isInteracting: false } }
    )
    
    rerender({ isInteracting: true })
    
    // Should not change when reduced motion is preferred
    expect(element.style.animationPlayState).toBe('running')
  })
})
