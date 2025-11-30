import { useParams, Link } from 'react-router-dom'
import { useMemo } from 'react'
import Seo from '../../components/seo/Seo'
import { useProjects } from '../../hooks/useProjects'
import ProjectsErrorBoundary from '../../components/sections/ProjectsErrorBoundary'
import EmptyState from '../../components/ui/EmptyState'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import Skeleton from '../../components/ui/Skeleton'
import type { Project, ProjectStatus } from '../../lib/projects'

function getStatusBadgeVariant(status?: ProjectStatus): 'default' | 'success' | 'warning' | 'danger' {
  switch (status) {
    case 'in-production':
      return 'success'
    case 'in-progress':
      return 'warning'
    case 'archived':
      return 'danger'
    case 'demo':
    default:
      return 'default'
  }
}

function getStatusLabel(status?: ProjectStatus): string {
  switch (status) {
    case 'in-production':
      return 'In Production'
    case 'in-progress':
      return 'In Progress'
    case 'archived':
      return 'Archived'
    case 'demo':
      return 'Demo'
    default:
      return 'Unknown'
  }
}

function formatDate(dateString?: string): string {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function ProjectDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Skeleton */}
          <div>
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-2/3 mb-4" />
            <div className="flex flex-wrap gap-2 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} variant="avatar" className="h-6 w-16" />
              ))}
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-10 w-36" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>

          {/* Overview Skeleton */}
          <Card>
            <Skeleton className="h-6 w-24 mb-4" />
            <Skeleton variant="text" className="w-full mb-2" />
            <Skeleton variant="text" className="w-full mb-2" />
            <Skeleton variant="text" className="w-3/4" />
          </Card>

          {/* Features Skeleton */}
          <Card>
            <Skeleton className="h-6 w-32 mb-4" />
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="text" className="w-full mb-2" />
            ))}
          </Card>

          {/* Screenshots Skeleton */}
          <Card>
            <Skeleton className="h-6 w-28 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Skeleton className="aspect-video w-full" />
              <Skeleton className="aspect-video w-full" />
            </div>
          </Card>
        </div>

        {/* Sidebar Skeleton */}
        <div className="hidden lg:block space-y-6 mt-8 lg:mt-0">
          <Card>
            <Skeleton className="h-5 w-20 mb-3" />
            <Skeleton variant="text" className="w-full mb-2" />
            <Skeleton variant="text" className="w-full mb-2" />
            <Skeleton variant="text" className="w-full" />
          </Card>
          <Card>
            <Skeleton className="h-5 w-32 mb-3" />
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="text" className="w-full mb-2" />
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}

interface ProjectDetailsContentProps {
  project: Project
  relatedProjects: Project[]
}

function ProjectDetailsContent({ project, relatedProjects }: ProjectDetailsContentProps) {
  const { id } = useParams<{ id: string }>()

  return (
    <>
      <Seo
        title={`${project.title} — Matteo Ricci`}
        description={project.description}
        canonical={`https://matteoricci.net/projects/${id}`}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <Link
          to="/projects"
          className="inline-flex items-center text-primary dark:text-primary-light hover:underline mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Projects
        </Link>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Header */}
            <header className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-text)]">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="default">
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-primary text-white hover:bg-primary-light focus-visible:ring-primary dark:bg-primary dark:hover:bg-primary-light h-10 px-4 text-base"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    View Repository
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:bg-[var(--color-surface)]/50 text-[var(--color-text-secondary)] focus-visible:ring-primary h-10 px-4 text-base"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </header>

            {/* Overview Section */}
            {project.longDescription && (
              <Card as="section">
                <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-4">
                  Overview
                </h2>
                <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                  {project.longDescription}
                </p>
              </Card>
            )}

            {/* Key Features Section */}
            {project.features && project.features.length > 0 && (
              <Card as="section">
                <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-4">
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start text-base text-[var(--color-text-secondary)] leading-relaxed"
                    >
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Technologies Section */}
            <Card as="section">
              <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-4">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 bg-[var(--color-surface)] rounded-lg text-[var(--color-text-secondary)] font-medium text-sm"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </Card>

            {/* Screenshots Section */}
            {project.screenshots && project.screenshots.length > 0 && (
              <Card as="section">
                <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-4">
                  Screenshots
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.screenshots.map((screenshot, index) => (
                    <div
                      key={index}
                      className="aspect-video bg-[var(--color-surface)] rounded-lg overflow-hidden"
                    >
                      <img
                        src={screenshot}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Technical Approach Section */}
            <Card as="section">
              <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-4">
                Technical Approach
              </h2>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                This project follows modern software development practices including clean
                architecture principles, comprehensive testing, and continuous integration.
                The codebase is structured for maintainability and scalability, with clear
                separation of concerns and well-documented APIs.
              </p>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-6 mt-8 lg:mt-0">
            {/* Project Info Card */}
            <Card>
              <h3 className="text-xl font-medium text-[var(--color-text)] mb-4">
                Project Info
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-[var(--color-text-secondary)]">Status</dt>
                  <dd className="mt-1">
                    <Badge variant={getStatusBadgeVariant(project.status)}>
                      {getStatusLabel(project.status)}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-[var(--color-text-secondary)]">Created</dt>
                  <dd className="text-base text-[var(--color-text)]">
                    {formatDate(project.createdAt)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-[var(--color-text-secondary)]">Last Updated</dt>
                  <dd className="text-base text-[var(--color-text)]">
                    {formatDate(project.updatedAt)}
                  </dd>
                </div>
              </dl>
            </Card>

            {/* Related Projects Card */}
            {relatedProjects.length > 0 && (
              <Card>
                <h3 className="text-xl font-medium text-[var(--color-text)] mb-4">
                  Related Projects
                </h3>
                <ul className="space-y-3">
                  {relatedProjects.map((related) => (
                    <li key={related.id}>
                      <Link
                        to={`/projects/${related.id}`}
                        className="block text-primary dark:text-primary-light hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded font-medium"
                      >
                        {related.title}
                      </Link>
                      <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                        {related.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </aside>
        </div>
      </div>
    </>
  )
}

function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { data: projects, isLoading } = useProjects()

  const project = useMemo(() => {
    return projects?.find((p) => p.id === id)
  }, [projects, id])

  const relatedProjects = useMemo(() => {
    if (!projects || !project) return []
    // Find projects with overlapping tech stack
    return projects
      .filter((p) => p.id !== project.id)
      .filter((p) => p.tech.some((t) => project.tech.includes(t)))
      .slice(0, 3)
  }, [projects, project])

  if (isLoading) {
    return <ProjectDetailsSkeleton />
  }

  if (!project) {
    return (
      <>
        <Seo
          title="Project Not Found — Matteo Ricci"
          description="The requested project could not be found."
          canonical={`https://matteoricci.net/projects/${id}`}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/projects"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Projects
          </Link>
          <EmptyState
            title="Project not found"
            description="The project you're looking for doesn't exist or may have been removed."
            actionLabel="View All Projects"
            onAction={() => window.location.href = '/projects'}
          />
        </div>
      </>
    )
  }

  return <ProjectDetailsContent project={project} relatedProjects={relatedProjects} />
}

export default function ProjectDetails() {
  const { refetch } = useProjects()

  return (
    <ProjectsErrorBoundary onRetry={() => refetch()}>
      <ProjectDetailsPage />
    </ProjectsErrorBoundary>
  )
}
