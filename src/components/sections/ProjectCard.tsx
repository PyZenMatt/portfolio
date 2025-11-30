import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import type { Project } from '../../lib/projects'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, tech, image, repoUrl, liveUrl } = project
  const prefersReducedMotion = useReducedMotion()

  // Mouse position for tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Spring physics for smooth tilt
  const springConfig = { damping: 30, stiffness: 200 }
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [3, -3]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-3, 3]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleViewProject = () => {
    if (liveUrl) {
      window.open(liveUrl, '_blank', 'noopener,noreferrer')
    } else if (repoUrl) {
      window.open(repoUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={prefersReducedMotion ? undefined : { rotateX, rotateY }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="perspective-1000"
    >
      <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:border-primary/20 group">
        {/* Image with zoom effect */}
        <div className="aspect-video bg-[var(--color-surface)] rounded-t-lg overflow-hidden">
          {image ? (
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--color-text-secondary)] relative">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] to-transparent opacity-50" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 relative z-10"
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
          <h3 className="text-2xl font-semibold text-[var(--color-text)] mb-2">
            {title}
          </h3>

          <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-4 flex-1">
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
    </motion.div>
  )
}
