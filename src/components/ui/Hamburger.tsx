import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

interface HamburgerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean
}

const Hamburger = forwardRef<HTMLButtonElement, HamburgerProps>(
  ({ isOpen, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'inline-flex items-center justify-center p-2 rounded-md text-neutral-700 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors',
          className
        )}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        {...props}
      >
        <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
        <div className="w-6 h-5 flex flex-col justify-between">
          <span
            className={cn(
              'block h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out',
              isOpen && 'rotate-45 translate-y-2'
            )}
          />
          <span
            className={cn(
              'block h-0.5 w-full bg-current transition-all duration-300 ease-in-out',
              isOpen && 'opacity-0'
            )}
          />
          <span
            className={cn(
              'block h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out',
              isOpen && '-rotate-45 -translate-y-2'
            )}
          />
        </div>
      </button>
    )
  }
)

Hamburger.displayName = 'Hamburger'

export default Hamburger
