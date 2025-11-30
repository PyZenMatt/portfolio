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
        'bg-primary text-white hover:bg-primary-light focus-visible:ring-primary dark:bg-primary dark:hover:bg-primary-light',
      secondary:
        'bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 focus-visible:ring-neutral-700 dark:bg-neutral-700 dark:text-neutral-50 dark:hover:bg-neutral-700/80',
      ghost:
        'hover:bg-neutral-100 text-neutral-700 focus-visible:ring-neutral-700 dark:hover:bg-neutral-700 dark:text-neutral-100',
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
