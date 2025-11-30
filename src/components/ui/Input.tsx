import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, isInvalid, ...props }, ref) => {
    const baseStyles =
      'flex h-10 w-full rounded-md border bg-[var(--color-card)] px-3 py-2 text-[var(--text-sm)] text-[var(--color-text)] transition-colors file:border-0 file:bg-transparent file:text-[var(--text-sm)] file:font-medium placeholder:text-[var(--color-text-secondary)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

    const validStyles =
      'border-[var(--color-border)] focus-visible:ring-primary hover:border-[var(--color-text-secondary)]/40'

    const invalidStyles =
      'border-red-500 focus-visible:ring-red-600'

    return (
      <input
        ref={ref}
        className={cn(
          baseStyles,
          isInvalid ? invalidStyles : validStyles,
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
