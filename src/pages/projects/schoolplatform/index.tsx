/**
 * SchoolPlatform Case Study Page - Issue 15.1
 * 
 * Premium case study page for the SchoolPlatform project.
 * 
 * Sections:
 * - Hero with mockup + tech stack
 * - Problem section (TextBlock)
 * - Solution section (TextBlock)
 * - Architecture diagram (animated SVG)
 * - Technical highlights grid (6 items)
 * - Results/Impact section
 * - Tech stack section
 * - Final CTA
 */

import { motion } from 'framer-motion'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import Seo from '../../../components/seo/Seo'
import {
  ProjectHero,
  ArchitectureDiagram,
  HighlightsGrid,
  TextBlock,
  TechStackList,
  type ArchitectureBlock,
  type ArchitectureConnection,
  type Highlight,
  type CaseTechName,
} from '../../../components/casestudies'

// Architecture diagram data
const architectureBlocks: ArchitectureBlock[] = [
  { id: 'frontend', label: 'React Frontend', x: 20, y: 20, color: '#61DAFB' },
  { id: 'api', label: 'Django REST API', x: 200, y: 20, color: '#092E20' },
  { id: 'db', label: 'PostgreSQL', x: 380, y: 20, color: '#336791' },
  { id: 'blockchain', label: 'Polygon Testnet', x: 200, y: 120, color: '#8247E5' },
  { id: 'metamask', label: 'MetaMask', x: 20, y: 120, color: '#F6851B' },
  { id: 'docker', label: 'Docker Compose', x: 380, y: 120, color: '#2496ED' },
]

const architectureConnections: ArchitectureConnection[] = [
  { from: 'frontend', to: 'api', label: 'REST' },
  { from: 'api', to: 'db', label: 'ORM' },
  { from: 'api', to: 'blockchain', label: 'Web3.py' },
  { from: 'frontend', to: 'metamask', label: 'Web3.js' },
  { from: 'metamask', to: 'blockchain', label: 'Tx' },
]

// Technical highlights
const highlights: Highlight[] = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'RESTful API Design',
    description: 'Architettato 25+ endpoint REST con Django REST Framework, seguendo le best practice OpenAPI.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Auth & JWT',
    description: 'Sistema di autenticazione completo con JWT, refresh token, e gestione ruoli (studenti/docenti/admin).',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: 'Blockchain Integration',
    description: 'Smart contract Solidity per TeoCoin token ERC-20 deployato su Polygon testnet con Web3.js/py.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: 'Docker DevOps',
    description: 'Ambiente containerizzato con Docker Compose: frontend, backend, PostgreSQL, Redis per cache.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    ),
    title: 'React Architecture',
    description: 'SPA con React 18, Context API per state management, lazy loading e code splitting.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: 'Testing & QA',
    description: 'Suite di test con pytest (backend) e Vitest/RTL (frontend), coverage >80%.',
  },
]

// Full tech stack
const fullTechStack: CaseTechName[] = [
  'react',
  'typescript',
  'django',
  'python',
  'postgresql',
  'redis',
  'solidity',
  'web3',
  'docker',
  'github',
]

export default function SchoolPlatformPage() {
  const prefersReducedMotion = useReducedMotion()
  const MotionSection = prefersReducedMotion ? 'section' : motion.section

  return (
    <>
      <Seo
        title="SchoolPlatform — Case Study | Matteo Ricci"
        description="Full-stack educational platform con React, Django, PostgreSQL e blockchain Polygon. Sistema di ricompense TeoCoin, autenticazione JWT e gestione ruoli."
        canonical="https://matteoricci.net/projects/schoolplatform"
      />

      <main className="min-h-screen bg-noise" data-testid="schoolplatform-page">
        {/* Hero Section */}
        <ProjectHero
          title="SchoolPlatform"
          subtitle="Full-Stack Educational Platform"
          description="Piattaforma educativa completa con sistema di ricompense blockchain-based. Gli studenti guadagnano TeoCoin completando attività e possono riscattarli per ricompense reali."
          techStack={['react', 'django', 'postgresql', 'solidity', 'docker']}
          repoUrl="https://github.com/teoricci/schoolplatform"
        />

        {/* Problem Section */}
        <MotionSection
          {...(!prefersReducedMotion && {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
          })}
          className="section-spacing"
          data-testid="problem-section"
        >
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <TextBlock
              label="Il Problema"
              heading="Motivare gli studenti è una sfida"
              body={[
                "Le scuole faticano a mantenere alto l'engagement degli studenti. I sistemi di valutazione tradizionali non forniscono incentivi immediati e tangibili per il completamento delle attività.",
                "Serviva una soluzione moderna che premiasse i comportamenti positivi in modo trasparente e immutabile, creando un senso di ownership negli studenti.",
              ]}
            />
          </div>
        </MotionSection>

        {/* Solution Section */}
        <MotionSection
          {...(!prefersReducedMotion && {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
          })}
          className="section-spacing bg-[var(--color-surface)]"
          data-testid="solution-section"
        >
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <TextBlock
              label="La Soluzione"
              heading="TeoCoin: ricompense on-chain"
              body={[
                "Ho progettato e sviluppato SchoolPlatform, una piattaforma full-stack che integra un token ERC-20 custom (TeoCoin) per ricompensare gli studenti.",
                "I docenti assegnano TeoCoin per compiti completati, partecipazione e comportamento positivo. Gli studenti possono visualizzare il loro bilancio nel wallet MetaMask e riscattare token per premi reali.",
                "L'architettura include un backend Django robusto, un frontend React reattivo e smart contract Solidity deployati su Polygon testnet per costi di gas minimi.",
              ]}
            />
          </div>
        </MotionSection>

        {/* Architecture Section */}
        <MotionSection
          {...(!prefersReducedMotion && {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
          })}
          className="section-spacing"
          data-testid="architecture-section"
        >
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-[var(--color-primary)] uppercase tracking-wider">
                Architettura
              </span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[var(--color-text)]">
                Stack Tecnologico
              </h2>
            </div>
            <ArchitectureDiagram
              blocks={architectureBlocks}
              connections={architectureConnections}
            />
          </div>
        </MotionSection>

        {/* Highlights Section */}
        <MotionSection
          {...(!prefersReducedMotion && {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
          })}
          className="section-spacing bg-[var(--color-surface)]"
          data-testid="highlights-section"
        >
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-[var(--color-primary)] uppercase tracking-wider">
                Highlights Tecnici
              </span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[var(--color-text)]">
                Cosa ho implementato
              </h2>
            </div>
            <HighlightsGrid highlights={highlights} />
          </div>
        </MotionSection>

        {/* Results Section */}
        <MotionSection
          {...(!prefersReducedMotion && {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
          })}
          className="section-spacing"
          data-testid="results-section"
        >
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <TextBlock
              label="Risultati"
              heading="Impatto e metriche"
              body={[
                "Il progetto dimostra competenze full-stack end-to-end: dalla progettazione del database relazionale alla scrittura di smart contract, dalla gestione dell'autenticazione JWT all'implementazione di UI responsive.",
                "Stack tecnologico moderno e production-ready con Docker, CI/CD, e testing automatizzato. Architettura scalabile che può gestire centinaia di utenti concorrenti.",
              ]}
            />
          </div>
        </MotionSection>

        {/* Full Tech Stack Section */}
        <MotionSection
          {...(!prefersReducedMotion && {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
          })}
          className="section-spacing bg-[var(--color-surface)]"
          data-testid="techstack-section"
        >
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-sm font-medium text-[var(--color-primary)] uppercase tracking-wider">
              Tecnologie
            </span>
            <h2 className="mt-2 mb-8 text-3xl md:text-4xl font-bold text-[var(--color-text)]">
              Stack Completo
            </h2>
            <TechStackList techs={fullTechStack} className="justify-center" />
          </div>
        </MotionSection>

        {/* CTA Section */}
        <MotionSection
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
          })}
          className="section-spacing"
          data-testid="cta-section"
        >
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
              Vuoi vedere il codice?
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
              Il repository è pubblico su GitHub. Esplora l'architettura, leggi la documentazione e prova tu stesso la piattaforma.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://github.com/teoricci/schoolplatform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-light)] transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                Esplora su GitHub
              </a>
              <a
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] font-medium hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Altri Progetti
              </a>
            </div>
          </div>
        </MotionSection>
      </main>
    </>
  )
}
