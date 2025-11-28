import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

    const variants = {
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600',
      secondary:
        'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
      ghost:
        'hover:bg-gray-100 text-gray-700 focus-visible:ring-gray-400 dark:hover:bg-gray-800 dark:text-gray-300',
    }

    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export default Button
