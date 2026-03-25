import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PageLayout from '../components/layout/PageLayout'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics'
import { pageTransition } from '../motion'

const Home = lazy(() => import('../pages/Home'))
const Projects = lazy(() => import('../pages/Projects'))
const ProjectDetails = lazy(() => import('../pages/ProjectDetails'))
const SchoolPlatform = lazy(() => import('../pages/projects/schoolplatform'))
const About = lazy(() => import('../pages/About'))
const Contact = lazy(() => import('../pages/Contact'))
const NotFound = lazy(() => import('../pages/NotFound'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-[var(--text-xl)]">Loading...</div>
    </div>
  )
}

// Wrapper component for page transitions
function AnimatedRoutes() {
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()
  
  // Track page views with Google Analytics
  useGoogleAnalytics()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={prefersReducedMotion ? undefined : "initial"}
        animate={prefersReducedMotion ? undefined : "animate"}
        exit={prefersReducedMotion ? undefined : "exit"}
        variants={prefersReducedMotion ? undefined : pageTransition}
      >
        <Routes location={location}>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/schoolplatform" element={<SchoolPlatform />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  )
}
