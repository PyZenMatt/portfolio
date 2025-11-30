import { forwardRef, createElement } from 'react'
import type { HTMLAttributes, ElementType } from 'react'
import { cn } from '../../lib/cn'

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
}

const Card = forwardRef<HTMLElement, CardProps>(
  ({ className, as = 'div', children, ...props }, ref) => {
    const baseStyles =
      'rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm'

    return createElement(
      as,
      {
        ref,
        role: 'group',
        className: cn(baseStyles, className),
        ...props,
      },
      children
    )
  }
)

Card.displayName = 'Card'

export default Card
