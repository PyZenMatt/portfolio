import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Seo from '../../components/seo/Seo'
import { useProjects } from '../../hooks/useProjects'
import ProjectCard from '../../components/sections/ProjectCard'
import ProjectsSkeleton from '../../components/sections/ProjectsSkeleton'
import ProjectsErrorBoundary from '../../components/sections/ProjectsErrorBoundary'
import EmptyState from '../../components/ui/EmptyState'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { staggerContainer, staggerChild, slideUp } from '../../motion'
import { cn } from '../../lib/cn'

const TECH_FILTERS = ['All', 'React', 'Django', 'Python', 'Blockchain', 'TypeScript']

function ProjectsContent() {
  const { data: projects, isLoading } = useProjects()
  const [activeFilter, setActiveFilter] = useState('All')
  const prefersReducedMotion = useReducedMotion()

  const filteredProjects = useMemo(() => {
    if (!projects) return []
    if (activeFilter === 'All') return projects
    return projects.filter((project) => project.tech.includes(activeFilter))
  }, [projects, activeFilter])

  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-text)]">All Projects</h1>
          <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
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
      <MotionDiv
        {...(!prefersReducedMotion && {
          initial: "hidden",
          animate: "visible",
          variants: slideUp,
        })}
        className="mb-12 space-y-4"
      >
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-text)]">All Projects</h1>
        <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
          Explore my portfolio of full-stack projects, tools, and experiments
        </p>
      </MotionDiv>

      {/* Filters with stagger animation */}
      <MotionDiv
        {...(!prefersReducedMotion && {
          initial: "hidden",
          animate: "visible",
          variants: staggerContainer,
        })}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-2">
          {TECH_FILTERS.map((filter) => (
            <MotionDiv
              key={filter}
              {...(!prefersReducedMotion && { variants: staggerChild })}
            >
              <button
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  'relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200',
                  'hover:scale-[1.02] active:scale-[0.98]',
                  activeFilter === filter
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-primary-light hover:bg-[var(--color-surface)]/80'
                )}
              >
                {filter}
                {/* Animated underline for active state */}
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-primary rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            </MotionDiv>
          ))}
        </div>
      </MotionDiv>

      {/* Projects Grid with AnimatePresence */}
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <MotionDiv
            key={activeFilter}
            {...(!prefersReducedMotion && {
              initial: "hidden",
              animate: "visible",
              exit: { opacity: 0, transition: { duration: 0.15 } },
              variants: staggerContainer,
            })}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <MotionDiv
                key={project.id}
                {...(!prefersReducedMotion && { variants: staggerChild })}
              >
                <ProjectCard project={project} />
              </MotionDiv>
            ))}
          </MotionDiv>
        ) : (
          <MotionDiv
            key="empty"
            {...(!prefersReducedMotion && {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
            })}
          >
            <EmptyState
              title={`No projects found for "${activeFilter}"`}
              description="Try selecting a different filter to see more projects."
              actionLabel="Show All Projects"
              onAction={() => setActiveFilter('All')}
            />
          </MotionDiv>
        )}
      </AnimatePresence>
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
