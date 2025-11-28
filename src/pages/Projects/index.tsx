import { useState, useMemo } from 'react'
import Seo from '../../components/seo/Seo'
import { useProjects } from '../../hooks/useProjects'
import ProjectCard from '../../components/sections/ProjectCard'
import ProjectsSkeleton from '../../components/sections/ProjectsSkeleton'
import ProjectsErrorBoundary from '../../components/sections/ProjectsErrorBoundary'
import EmptyState from '../../components/ui/EmptyState'
import Button from '../../components/ui/Button'
import { cn } from '../../lib/cn'

const TECH_FILTERS = ['All', 'React', 'Django', 'Python', 'Blockchain', 'TypeScript']

function ProjectsContent() {
  const { data: projects, isLoading } = useProjects()
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredProjects = useMemo(() => {
    if (!projects) return []
    if (activeFilter === 'All') return projects
    return projects.filter((project) => project.tech.includes(activeFilter))
  }, [projects, activeFilter])

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">All Projects</h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Explore my portfolio of full-stack projects, tools, and experiments
          </p>
        </div>
        <ProjectsSkeleton count={6} />
      </div>
    )
  }

  return (
    <>
      <Seo
        title="Projects — Matteo Ricci"
        description="Portfolio progetti di Matteo Ricci: applicazioni full-stack con React, Django, TypeScript. Blockchain, e-commerce, AI workflows e architetture moderne."
        canonical="https://matteoricci.net/projects"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12 space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">All Projects</h1>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
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
        <EmptyState
          title={`No projects found for "${activeFilter}"`}
          description="Try selecting a different filter to see more projects."
          actionLabel="Show All Projects"
          onAction={() => setActiveFilter('All')}
        />
      )}
    </div>
    </>
  )
}

export default function Projects() {
  return (
    <>
      <Seo
        title="Projects — Matteo Ricci"
        description="Portfolio progetti di Matteo Ricci: applicazioni full-stack con React, Django, TypeScript. Blockchain, e-commerce, AI workflows e architetture moderne."
        canonical="https://matteoricci.net/projects"
      />
      <ProjectsErrorBoundary>
        <ProjectsContent />
      </ProjectsErrorBoundary>
    </>
  )
}
