import Seo from '../../components/seo/Seo'
import SkillsGrid from '../../components/sections/SkillsGrid'
import Timeline from '../../components/sections/Timeline'

export default function About() {
  return (
    <>
      <Seo
        title="About — Matteo Ricci"
        description="Chi sono: full-stack developer con focus su Django, React, TypeScript. Esperienza in DevOps, AI workflows e architetture scalabili."
        canonical="https://matteoricci.net/about"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-text)] mb-6">About Me</h1>
        
        {/* Bio */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-base leading-relaxed text-[var(--color-text-secondary)] mb-4">
            I'm a full-stack developer specializing in <strong>Django</strong>, <strong>React</strong>, and <strong>TypeScript</strong>. 
            My focus is building scalable web applications with clean architecture, robust APIs, and modern frontend experiences.
          </p>
          
          <p className="text-base leading-relaxed text-[var(--color-text-secondary)] mb-4">
            I work across the entire stack: from designing PostgreSQL schemas and implementing Django REST APIs, 
            to crafting responsive UIs with React and TailwindCSS. I'm comfortable with DevOps workflows using 
            Docker and GitHub Actions for continuous deployment.
          </p>
          
          <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
            Recently, I've been integrating AI tools into development workflows—leveraging LLMs for code generation, 
            documentation, and process automation. I believe in writing maintainable code, comprehensive testing, 
            and shipping products that solve real problems.
          </p>
        </div>
      </div>

      {/* Skills Section */}
      <section className="mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--color-text)] mb-6">Technical Skills</h2>
        <SkillsGrid />
      </section>

      {/* Timeline Section */}
      <section>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--color-text)] mb-6">My Journey</h2>
        <Timeline />
      </section>
    </div>
    </>
  )
}
