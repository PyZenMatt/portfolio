import type { Project } from '../../lib/projects'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, tech, image, repoUrl, liveUrl } = project

  const handleViewProject = () => {
    if (liveUrl) {
      window.open(liveUrl, '_blank', 'noopener,noreferrer')
    } else if (repoUrl) {
      window.open(repoUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      {/* Image */}
      <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-t-lg overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
          {title}
        </h3>

        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-1">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((techItem) => (
            <Badge key={techItem} variant="default">
              {techItem}
            </Badge>
          ))}
        </div>

        {/* CTA */}
        <Button
          variant="primary"
          size="md"
          onClick={handleViewProject}
          disabled={!liveUrl && !repoUrl}
          className="w-full"
        >
          View Project
        </Button>
      </div>
    </Card>
  )
}
