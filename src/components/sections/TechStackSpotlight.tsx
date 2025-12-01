/**
 * TechStackSpotlight Section - Issue 14.3.4 + 14.3.5
 * 
 * Animated tech wall showing professional tech stack.
 * Features:
 * - 6 tech icons: TypeScript, React, Django, Python, Docker, GitHub
 * - Hover tooltips with tech names
 * - Neon-like hover glow effects
 * - Micro-floating animations
 * - Responsive grid layout
 * - Reduced motion support
 */

import TechIcon, { type TechName } from './TechIcon'

const techStack: TechName[] = [
  'typescript',
  'react',
  'django',
  'python',
  'docker',
  'github',
]

export default function TechStackSpotlight() {
  return (
    <section
      className="py-16 md:py-24 bg-[var(--color-surface)]"
      aria-labelledby="tech-stack-title"
      aria-label="Tech Stack"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            id="tech-stack-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4"
          >
            Tech Stack
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Technologies I work with daily to build modern applications
          </p>
        </div>

        {/* Tech Icons Grid */}
        <div 
          className="grid grid-cols-3 sm:grid-cols-6 gap-4 md:gap-6 justify-items-center max-w-3xl mx-auto"
          role="list"
          aria-label="Technologies"
        >
          {techStack.map((tech, index) => (
            <TechIcon key={tech} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
