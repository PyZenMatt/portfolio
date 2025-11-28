export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  image?: string
  repoUrl?: string
  liveUrl?: string
}

export const PROJECTS_MOCK: Project[] = [
  {
    id: 'blog-manager',
    title: 'BlogManager',
    description:
      'Piattaforma full-stack per gestione blog con Django REST Framework backend e Jekyll frontend. Sistema di autenticazione, CRUD completo per articoli, categorizzazione avanzata e deployment automatico.',
    tech: ['Django', 'Python', 'Jekyll', 'PostgreSQL', 'REST API'],
    repoUrl: 'https://github.com/matteo/blog-manager',
    liveUrl: 'https://blogmanager-demo.example.com',
  },
  {
    id: 'messymind',
    title: 'MessyMind',
    description:
      'Blog personale ottimizzato per SEO con focus su performance e accessibilità. Implementa lazy loading, code splitting, sitemap dinamica e schema markup per migliorare ranking Google.',
    tech: ['React', 'Next.js', 'TypeScript', 'SEO', 'Analytics'],
    liveUrl: 'https://messymind.example.com',
  },
  {
    id: 'school-platform',
    title: 'SchoolPlatform',
    description:
      'Sistema innovativo per gestione scolastica con integrazione blockchain per certificazione crediti formativi. Dashboard per studenti e docenti, sistema di notifiche real-time, gestione presenze.',
    tech: ['React', 'Django', 'Blockchain', 'WebSocket', 'Smart Contracts'],
    repoUrl: 'https://github.com/matteo/school-platform',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description:
      'Portfolio professionale responsive sviluppato con React, TypeScript e TailwindCSS. Implementa dark mode, lazy loading, testing completo e architettura scalabile con best practices moderne.',
    tech: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Vitest'],
    repoUrl: 'https://github.com/matteo/portfolio',
    liveUrl: 'https://matteo-portfolio.example.com',
  },
  {
    id: 'data-analyzer',
    title: 'Data Analyzer Tool',
    description:
      'Tool Python per analisi dati con pandas e visualizzazioni interattive. Supporta import CSV/Excel, statistiche descrittive, grafici personalizzabili e export report in PDF.',
    tech: ['Python', 'Pandas', 'Matplotlib', 'Jupyter'],
    repoUrl: 'https://github.com/matteo/data-analyzer',
  },
  {
    id: 'api-automation',
    title: 'API Testing Suite',
    description:
      'Suite di testing automatizzato per REST API con Python. Include test parametrizzati, report dettagliati, integrazione CI/CD e monitoraggio performance endpoint.',
    tech: ['Python', 'Pytest', 'REST API', 'CI/CD'],
    repoUrl: 'https://github.com/matteo/api-automation',
  },
]
