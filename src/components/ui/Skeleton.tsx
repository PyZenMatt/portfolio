import { cn } from '../../lib/cn'

interface SkeletonProps {
  className?: string
  variant?: 'avatar' | 'text' | 'card'
}

export default function Skeleton({ className, variant = 'text' }: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-[var(--color-surface)]'
  
  const variants = {
    avatar: 'rounded-full',
    text: 'rounded h-4',
    card: 'rounded-lg',
  }

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      role="status"
      aria-label="Loading..."
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}
