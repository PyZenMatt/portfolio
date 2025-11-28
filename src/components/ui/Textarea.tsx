import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isInvalid?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isInvalid, ...props }, ref) => {
    const baseStyles =
      'flex min-h-[80px] w-full rounded-md border bg-white px-3 py-2 text-sm transition-colors placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950 dark:placeholder:text-gray-400'

    const validStyles =
      'border-gray-300 focus-visible:ring-blue-600 dark:border-gray-700'

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
