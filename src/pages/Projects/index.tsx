import { useState, useMemo } from 'react'
import { useProjects } from '../../hooks/useProjects'
import ProjectCard from '../../components/sections/ProjectCard'
import Button from '../../components/ui/Button'
import { cn } from '../../lib/cn'

const TECH_FILTERS = ['All', 'React', 'Django', 'Python', 'Blockchain', 'TypeScript']

export default function Projects() {
  const { data: projects, isLoading } = useProjects()
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredProjects = useMemo(() => {
    if (!projects) return []
    if (activeFilter === 'All') return projects
    return projects.filter((project) => project.tech.includes(activeFilter))
  }, [projects, activeFilter])

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="text-xl text-gray-600 dark:text-gray-400">Loading projects...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">All Projects</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explore my portfolio of full-stack projects, tools, and experiments
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {TECH_FILTERS.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'transition-colors',
                activeFilter === filter && 'shadow-md'
              )}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No projects found for <strong>{activeFilter}</strong>
          </p>
          <Button
            variant="secondary"
            size="md"
            onClick={() => setActiveFilter('All')}
            className="mt-4"
          >
            Show All Projects
          </Button>
        </div>
      )}
    </div>
  )
}
