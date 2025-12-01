import Seo from '../../components/seo/Seo'
import HeroSection from '../../components/sections/HeroSection'
import WhatIBuild from '../../components/sections/WhatIBuild'
import ProjectsSection from '../../components/sections/ProjectsSection'

export default function Home() {
  return (
    <>
      <Seo
        title="Matteo Ricci — Full-Stack Developer"
        description="Portfolio di Matteo Ricci, sviluppatore full-stack specializzato in React, TypeScript, Django e DevOps. Progetti moderni con architetture scalabili."
        canonical="https://matteoricci.net"
      />
      <HeroSection />
      <WhatIBuild />
      <ProjectsSection />
    </>
  )
}
