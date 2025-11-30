import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-[var(--text-xs)] font-semibold transition-colors'

    const variants = {
      default:
        'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]',
      success:
        'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800',
      warning:
        'bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-800',
      danger:
        'bg-red-100 text-red-800 border border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800',
    }

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
