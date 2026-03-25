import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import PremiumFooter from './PremiumFooter'
import SkipLink from './SkipLink'
import { CookieBanner } from '../ui/CookieBanner'

export default function PageLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <SkipLink />
      <header role="banner">
        <Navbar />
      </header>
      <main id="main-content" role="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
      <PremiumFooter />
      <CookieBanner />
    </div>
  )
}
