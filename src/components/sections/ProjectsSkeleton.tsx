import Skeleton from '../ui/Skeleton'

interface ProjectsSkeletonProps {
  count?: number
}

export default function ProjectsSkeleton({ count = 4 }: ProjectsSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-[var(--color-card)] rounded-lg shadow-sm border border-[var(--color-border)] overflow-hidden"
        >
          {/* Image Skeleton */}
          <Skeleton variant="card" className="aspect-video w-full" />

          {/* Content Skeleton */}
          <div className="p-6 space-y-3">
            {/* Title */}
            <Skeleton variant="text" className="h-6 w-3/4" />

            {/* Description Lines */}
            <div className="space-y-2">
              <Skeleton variant="text" className="h-4 w-full" />
              <Skeleton variant="text" className="h-4 w-5/6" />
            </div>

            {/* Badges */}
            <div className="flex gap-2 pt-2">
              <Skeleton variant="text" className="h-6 w-16 rounded-full" />
              <Skeleton variant="text" className="h-6 w-20 rounded-full" />
              <Skeleton variant="text" className="h-6 w-14 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
