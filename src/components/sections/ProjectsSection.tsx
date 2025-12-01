import { Link } from 'react-router-dom'
import { useProjects } from '../../hooks/useProjects'
import ProjectCard from './ProjectCard'
import ProjectsSkeleton from './ProjectsSkeleton'
import ProjectsErrorBoundary from './ProjectsErrorBoundary'
import EmptyState from '../ui/EmptyState'
import Button from '../ui/Button'

function ProjectsSectionContent() {
  const { data: projects, isLoading } = useProjects()

  // Show top 4 featured projects
  const featuredProjects = projects?.slice(0, 4) || []

  if (isLoading) {
    return (
      <section className="section-spacing px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)]">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2>
              Featured Projects
            </h2>
            <p className="text-[var(--text-lg)] text-[var(--color-text-secondary)]">
              A selection of my recent work showcasing full-stack development and problem-solving
              skills
            </p>
          </div>
          <ProjectsSkeleton count={4} />
        </div>
      </section>
    )
  }

  if (!projects || projects.length === 0) {
    return (
      <section className="section-spacing px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)]">
        <div className="w-full max-w-5xl mx-auto">
          <EmptyState
            title="No projects yet"
            description="Projects will be added soon. Stay tuned!"
          />
        </div>
      </section>
    )
  }

  return (
    <section className="section-spacing px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)]">
      <div className="w-full max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <h2>
            Featured Projects
          </h2>
          <p className="text-[var(--text-lg)] text-[var(--color-text-secondary)]">
            A selection of my recent work showcasing full-stack development and problem-solving
            skills
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/projects">
            <Button variant="secondary" size="lg">
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function ProjectsSection() {
  const { refetch } = useProjects()
  
  return (
    <ProjectsErrorBoundary onRetry={() => refetch()}>
      <ProjectsSectionContent />
    </ProjectsErrorBoundary>
  )
}
