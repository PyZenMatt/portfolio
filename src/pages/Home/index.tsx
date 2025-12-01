import Seo from '../../components/seo/Seo'
import HeroSection from '../../components/sections/HeroSection'
import WhatIBuild from '../../components/sections/WhatIBuild'
import TechStackSpotlight from '../../components/sections/TechStackSpotlight'
import FeaturedProjectHighlight from '../../components/sections/FeaturedProjectHighlight'
import ProjectsSection from '../../components/sections/ProjectsSection'

/**
 * Home Page - Issue 14.3 Home WOW Upgrade
 * Issue 14.3.12: Final Integration & Polish
 * 
 * Sections:
 * 1. HeroSection - Premium hero with identity block
 * 2. WhatIBuild - Service cards (bg-noise)
 * 3. TechStackSpotlight - Tech wall (surface bg)
 * 4. FeaturedProjectHighlight - Flagship project (bg-noise)
 * 5. ProjectsSection - Featured projects grid (surface bg)
 */
export default function Home() {
  return (
    <div className="bg-noise">
      <Seo
        title="Matteo Ricci — Full-Stack Developer"
        description="Portfolio di Matteo Ricci, sviluppatore full-stack specializzato in React, TypeScript, Django e DevOps. Progetti moderni con architetture scalabili."
        canonical="https://matteoricci.net"
      />
      <HeroSection />
      <WhatIBuild />
      <TechStackSpotlight />
      <FeaturedProjectHighlight />
      <ProjectsSection />
    </div>
  )
}
