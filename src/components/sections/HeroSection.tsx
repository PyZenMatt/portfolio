import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

export default function HeroSection() {
  const navigate = useNavigate()

  const handleViewProjects = () => {
    navigate('/projects')
  }

  const handleDownloadCV = () => {
    // TODO: replace with real CV file
    window.open('/assets/matteo-ricci-cv.pdf', '_blank')
  }

  return (
    <section
      id="hero"
      className="py-20 md:py-28"
      aria-label="Hero section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Badge variant="default">Full-Stack Developer</Badge>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                Hi, I'm Matteo Ricci
              </h1>
            </div>

            <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-100 leading-relaxed">
              Building modern web applications with Django, React, and
              TypeScript. Passionate about clean code, user experience, and
              scalable architecture.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleViewProjects}
              >
                View Projects
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={handleDownloadCV}
              >
                Download CV
              </Button>
            </div>
          </div>

          {/* Image Column */}
          <div className="flex justify-center md:justify-end">
            <div className="relative max-w-sm w-full">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-primary-light/20 dark:from-primary/30 dark:to-primary-light/30 shadow-lg flex items-center justify-center">
                <img
                  src="/placeholder-portrait.jpg"
                  alt="Portrait of Matteo Ricci"
                  className="rounded-xl object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-neutral-100 dark:text-neutral-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
