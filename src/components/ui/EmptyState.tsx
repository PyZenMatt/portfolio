import Button from './Button'

export interface EmptyStateProps {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        {/* Empty Icon */}
        <div className="mb-6 flex justify-center">
          <svg
            className="h-16 w-16 text-neutral-100 dark:text-neutral-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">{title}</h3>

        {/* Description */}
        {description && (
          <p className="text-neutral-700 dark:text-neutral-100 mb-6">{description}</p>
        )}

        {/* Optional Action Button */}
        {actionLabel && onAction && (
          <Button variant="secondary" size="md" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
