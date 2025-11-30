interface TimelineEntry {
  year: string
  title: string
  description: string
}

const TIMELINE: TimelineEntry[] = [
  {
    year: '2023',
    title: 'Python Foundation',
    description:
      'Started journey with Python, building automation scripts and data analysis tools. Explored pandas, matplotlib, and modern development practices.',
  },
  {
    year: '2024',
    title: 'Full-Stack Development',
    description:
      'Mastered Django and React ecosystem. Built REST APIs with Django REST Framework and modern SPAs with React + TypeScript. Integrated PostgreSQL databases.',
  },
  {
    year: '2024',
    title: 'Major Projects Launch',
    description:
      'Shipped BlogManager (Django + Jekyll), MessyMind (SEO-optimized blog), and SchoolPlatform (React + Django + Blockchain integration).',
  },
  {
    year: '2025',
    title: 'Modern Stack & AI',
    description:
      'Adopted Vite, TailwindCSS, and advanced TypeScript patterns. Integrated AI workflows with prompt engineering and LLM tools for enhanced development.',
  },
]

export default function Timeline() {
  return (
    <div className="space-y-8">
      {TIMELINE.map((entry) => (
        <div key={entry.year} className="relative pl-8 pb-8 border-l-2 border-[var(--color-border)] last:pb-0">
          {/* Dot indicator */}
          <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-[var(--color-primary)] ring-4 ring-[var(--color-bg)]" />
          
          {/* Content */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-[var(--color-primary)] bg-[var(--color-primary)]/10 rounded-full">
                {entry.year}
              </span>
              <h3 className="text-xl font-medium text-[var(--color-text)]">
                {entry.title}
              </h3>
            </div>
            <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
              {entry.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
