/**
 * WhatIBuild Section - Issue 14.3.1 + 14.3.2
 * 
 * Premium feature cards section showing professional value proposition.
 * Three cards: Full-Stack Web Apps, AI & Automation, DevOps & Performance.
 */

import WhatIBuildCard from './WhatIBuildCard'

// Monoline icons (Linear-inspired)
function WebAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <circle cx="7" cy="7" r="1" fill="currentColor" />
      <circle cx="10" cy="7" r="1" fill="currentColor" />
      <path d="M8 14l2 2 4-4" />
    </svg>
  )
}

function AIIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
      <path d="M6 10v4a6 6 0 0 0 12 0v-4" />
      <path d="M12 18v4" />
      <path d="M8 22h8" />
      <circle cx="9" cy="7" r="1" fill="currentColor" />
      <circle cx="15" cy="7" r="1" fill="currentColor" />
    </svg>
  )
}

function DevOpsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  )
}

const services = [
  {
    title: 'Full-Stack Web Apps',
    techStack: 'Django / React / PostgreSQL',
    description: 'End-to-end web applications with scalable backends, modern frontends, and robust databases. From API design to deployment.',
    features: [
      'RESTful API architecture',
      'TypeScript strict mode',
      'Database optimization',
      'Authentication & security',
    ],
    icon: <WebAppIcon className="w-7 h-7" />,
    ctaHref: '/projects',
  },
  {
    title: 'AI & Automation',
    techStack: 'LLM Integration / Pipeline Tooling',
    description: 'Intelligent workflows powered by modern AI. Custom integrations, data pipelines, and automation that scales with your needs.',
    features: [
      'LLM API integration',
      'Data processing pipelines',
      'Workflow automation',
      'Custom AI solutions',
    ],
    icon: <AIIcon className="w-7 h-7" />,
    ctaHref: '/projects',
  },
  {
    title: 'DevOps & Performance',
    techStack: 'Docker / CI-CD / Monitoring',
    description: 'Production-ready infrastructure with automated deployments, containerization, and comprehensive monitoring for reliability.',
    features: [
      'Docker containerization',
      'CI/CD pipelines',
      'Performance monitoring',
      'Cloud deployment',
    ],
    icon: <DevOpsIcon className="w-7 h-7" />,
    ctaHref: '/projects',
  },
]

export default function WhatIBuild() {
  return (
    <section
      className="py-16 md:py-24"
      aria-labelledby="what-i-build-title"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            id="what-i-build-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4"
          >
            What I Build
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Crafting digital experiences with modern technologies and best practices
          </p>
        </div>

        {/* Cards Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          role="list"
          aria-label="Services offered"
        >
          {services.map((service) => (
            <div key={service.title} role="listitem">
              <WhatIBuildCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
