import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, isInvalid, ...props }, ref) => {
    const baseStyles =
      'flex h-10 w-full rounded-md border bg-[var(--color-bg)] px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-text-secondary)]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

    const validStyles =
      'border-[color:var(--color-surface)] focus-visible:ring-primary'

    const invalidStyles =
      'border-red-500 focus-visible:ring-red-600 dark:border-red-500'

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
