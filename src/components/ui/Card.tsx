import { forwardRef, createElement } from 'react'
import type { HTMLAttributes, ElementType } from 'react'
import { cn } from '../../lib/cn'

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
}

const Card = forwardRef<HTMLElement, CardProps>(
  ({ className, as = 'div', children, ...props }, ref) => {
    const baseStyles =
      'rounded-lg border border-neutral-100/40 bg-white p-6 shadow-sm dark:border-neutral-700/40 dark:bg-neutral-700'

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
