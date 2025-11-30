import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isInvalid?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isInvalid, ...props }, ref) => {
    const baseStyles =
      'flex min-h-[80px] w-full rounded-md border bg-[var(--color-bg)] px-3 py-2 text-sm transition-colors placeholder:text-[var(--color-text-secondary)]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

    const validStyles =
      'border-[color:var(--color-surface)] focus-visible:ring-primary'

    const invalidStyles =
      'border-red-500 focus-visible:ring-red-600 dark:border-red-500'

    return (
      <textarea
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

Textarea.displayName = 'Textarea'

export default Textarea
