import '@testing-library/jest-dom'
import { vi } from 'vitest'
import * as React from 'react'

// Mock matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock framer-motion for tests (Issue 13.3)
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')
  return {
    ...actual,
    motion: new Proxy({}, {
      get: (_, tag: string) => {
        // Return a component that renders the HTML tag directly
        return React.forwardRef(({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }, ref) => {
          const {
            initial,
            animate,
            exit,
            variants,
            whileHover,
            whileTap,
            whileInView,
            viewport,
            transition,
            layoutId,
            style,
            custom,
            ...rest
          } = props as Record<string, unknown>
          
          // Convert motion style object to regular style
          const cleanStyle = typeof style === 'object' ? { ...style } : undefined
          
          return React.createElement(
            tag,
            { ...rest, style: cleanStyle, ref },
            children
          )
        })
      },
    }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useMotionValue: () => ({ set: vi.fn(), get: vi.fn(() => 0) }),
    useTransform: () => 0,
    useSpring: () => 0,
  }
})
