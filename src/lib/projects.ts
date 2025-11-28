export type ProjectStatus = 'in-progress' | 'in-production' | 'archived' | 'demo'

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  features?: string[]
  tech: string[]
  image?: string
  screenshots?: string[]
  repoUrl?: string
  liveUrl?: string
  status?: ProjectStatus
  createdAt?: string
  updatedAt?: string
}

export const PROJECTS_MOCK: Project[] = [
  {
    id: 'blog-manager',
    title: 'BlogManager',
    description:
      'Piattaforma full-stack per gestione blog con Django REST Framework backend e Jekyll frontend. Sistema di autenticazione, CRUD completo per articoli, categorizzazione avanzata e deployment automatico.',
    longDescription:
      'BlogManager nasce dall\'esigenza di avere una piattaforma completa per la gestione di contenuti blog con un backend robusto e un frontend statico ad alte prestazioni. Il sistema utilizza Django REST Framework per esporre API RESTful sicure, con autenticazione JWT e permessi granulari. Il frontend Jekyll genera pagine statiche ottimizzate per SEO, con build automatiche triggerate da webhook.',
    features: [
      'Autenticazione JWT con refresh token',
      'CRUD completo articoli con draft/published states',
      'Categorizzazione e tagging avanzato',
      'Editor Markdown con preview live',
      'Deployment automatico via GitHub Actions',
      'CDN integration per assets statici',
    ],
    tech: ['Django', 'Python', 'Jekyll', 'PostgreSQL', 'REST API'],
    screenshots: ['/projects/placeholder.svg', '/projects/placeholder-1.svg'],
    repoUrl: 'https://github.com/matteo/blog-manager',
    liveUrl: 'https://blogmanager-demo.example.com',
    status: 'in-production',
    createdAt: '2024-03-15',
    updatedAt: '2024-11-20',
  },
  {
    id: 'messymind',
    title: 'MessyMind',
    description:
      'Blog personale ottimizzato per SEO con focus su performance e accessibilità. Implementa lazy loading, code splitting, sitemap dinamica e schema markup per migliorare ranking Google.',
    longDescription:
      'MessyMind è il mio blog personale dove condivido riflessioni su tecnologia, sviluppo software e crescita professionale. Ho posto particolare attenzione all\'ottimizzazione SEO e alle performance, raggiungendo un punteggio Lighthouse di 98+. Il sito implementa best practices moderne come ISR (Incremental Static Regeneration) e prefetching intelligente.',
    features: [
      'Server-side rendering con Next.js',
      'Punteggio Lighthouse 98+ su tutte le metriche',
      'Sitemap XML dinamica',
      'Schema.org markup per rich snippets',
      'Analytics privacy-friendly',
      'Newsletter integration',
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'SEO', 'Analytics'],
    screenshots: ['/projects/placeholder.svg', '/projects/placeholder-2.svg'],
    liveUrl: 'https://messymind.example.com',
    status: 'in-production',
    createdAt: '2024-01-10',
    updatedAt: '2024-11-15',
  },
  {
    id: 'school-platform',
    title: 'SchoolPlatform',
    description:
      'Sistema innovativo per gestione scolastica con integrazione blockchain per certificazione crediti formativi. Dashboard per studenti e docenti, sistema di notifiche real-time, gestione presenze.',
    longDescription:
      'SchoolPlatform rappresenta un progetto ambizioso che combina tecnologie tradizionali con blockchain per creare un sistema scolastico trasparente e verificabile. I certificati dei crediti formativi vengono registrati su blockchain, garantendo immutabilità e verifica indipendente. Il sistema real-time permette comunicazioni istantanee tra studenti, docenti e amministrazione.',
    features: [
      'Dashboard personalizzate per ruolo (studente/docente/admin)',
      'Certificazione crediti su blockchain Ethereum',
      'Notifiche real-time via WebSocket',
      'Gestione presenze con QR code',
      'Report automatici fine semestre',
      'Integrazione calendario scolastico',
    ],
    tech: ['React', 'Django', 'Blockchain', 'WebSocket', 'Smart Contracts'],
    screenshots: ['/projects/placeholder-1.svg', '/projects/placeholder-2.svg'],
    repoUrl: 'https://github.com/matteo/school-platform',
    status: 'in-progress',
    createdAt: '2024-06-01',
    updatedAt: '2024-11-25',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description:
      'Portfolio professionale responsive sviluppato con React, TypeScript e TailwindCSS. Implementa dark mode, lazy loading, testing completo e architettura scalabile con best practices moderne.',
    longDescription:
      'Questo portfolio è stato progettato con attenzione maniacale ai dettagli, seguendo le best practices moderne dello sviluppo frontend. Ogni componente è tipizzato con TypeScript strict mode, testato con Vitest e RTL, e ottimizzato per accessibilità WCAG 2.1 AA. L\'architettura modulare permette facile manutenzione e scalabilità.',
    features: [
      'TypeScript strict mode con zero any',
      'Testing coverage >90% con Vitest',
      'Accessibilità WCAG 2.1 AA compliant',
      'Dark mode con persistenza localStorage',
      'Lazy loading pagine e immagini',
      'SEO ottimizzato con meta tags dinamici',
    ],
    tech: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Vitest'],
    screenshots: ['/projects/placeholder.svg'],
    repoUrl: 'https://github.com/matteo/portfolio',
    liveUrl: 'https://matteo-portfolio.example.com',
    status: 'in-production',
    createdAt: '2024-09-01',
    updatedAt: '2024-11-28',
  },
  {
    id: 'data-analyzer',
    title: 'Data Analyzer Tool',
    description:
      'Tool Python per analisi dati con pandas e visualizzazioni interattive. Supporta import CSV/Excel, statistiche descrittive, grafici personalizzabili e export report in PDF.',
    longDescription:
      'Data Analyzer è uno strumento CLI e notebook-based per analisi dati rapide. Pensato per data scientists e analisti che necessitano di esplorare dataset velocemente. Include templates preconfigurati per analisi comuni e un sistema di plugin per estendere le funzionalità.',
    features: [
      'Import multi-formato (CSV, Excel, JSON, Parquet)',
      'Statistiche descrittive automatiche',
      'Grafici interattivi con Plotly',
      'Export report in PDF/HTML',
      'Sistema di plugin estensibile',
      'Integrazione Jupyter notebooks',
    ],
    tech: ['Python', 'Pandas', 'Matplotlib', 'Jupyter'],
    screenshots: ['/projects/placeholder-2.svg'],
    repoUrl: 'https://github.com/matteo/data-analyzer',
    status: 'demo',
    createdAt: '2023-11-15',
    updatedAt: '2024-08-10',
  },
  {
    id: 'api-automation',
    title: 'API Testing Suite',
    description:
      'Suite di testing automatizzato per REST API con Python. Include test parametrizzati, report dettagliati, integrazione CI/CD e monitoraggio performance endpoint.',
    longDescription:
      'API Testing Suite è un framework di testing costruito su pytest che semplifica il testing di REST API. Include un DSL per definire test in modo dichiarativo, asserzioni custom per risposte HTTP, e integrazione nativa con CI/CD pipelines. I report generati includono metriche di performance e trend storici.',
    features: [
      'DSL dichiarativo per definizione test',
      'Test parametrizzati con fixtures pytest',
      'Asserzioni custom per HTTP responses',
      'Report HTML con metriche performance',
      'Integrazione GitHub Actions/GitLab CI',
      'Mock server integrato per testing isolato',
    ],
    tech: ['Python', 'Pytest', 'REST API', 'CI/CD'],
    screenshots: ['/projects/placeholder-1.svg'],
    repoUrl: 'https://github.com/matteo/api-automation',
    status: 'archived',
    createdAt: '2023-08-20',
    updatedAt: '2024-02-15',
  },
]
