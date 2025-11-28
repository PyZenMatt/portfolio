import { Link } from 'react-router-dom'
import { useProjects } from '../../hooks/useProjects'
import ProjectCard from './ProjectCard'
import Button from '../ui/Button'

export default function ProjectsSection() {
  const { data: projects, isLoading } = useProjects()

  // Show top 4 featured projects
  const featuredProjects = projects?.slice(0, 4) || []

  if (isLoading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center text-gray-600 dark:text-gray-400">
            Loading projects...
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
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
