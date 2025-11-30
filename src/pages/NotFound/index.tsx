import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <h1 className="mb-4">404</h1>
      <p className="text-[var(--text-xl)] text-[var(--color-text-secondary)] mb-8">Page not found</p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        Go Home
      </Link>
    </div>
  )
}
