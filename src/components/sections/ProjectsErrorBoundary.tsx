import { Component } from 'react'
import type { ReactNode } from 'react'
import Button from '../ui/Button'

interface ProjectsErrorBoundaryProps {
  children: ReactNode
  onRetry?: () => void
}

interface ProjectsErrorBoundaryState {
  hasError: boolean
}

export default class ProjectsErrorBoundary extends Component<
  ProjectsErrorBoundaryProps,
  ProjectsErrorBoundaryState
> {
  constructor(props: ProjectsErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(): ProjectsErrorBoundaryState {
    return {
      hasError: true,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.warn('ProjectsErrorBoundary caught an error:', error, errorInfo)
  }

  handleRetry = (): void => {
    this.setState({ hasError: false })
    
    if (this.props.onRetry) {
      this.props.onRetry()
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="py-16 px-4 text-center">
          <div className="max-w-md mx-auto">
            {/* Warning Icon */}
            <div className="mb-6 flex justify-center">
              <svg
                className="h-16 w-16 text-yellow-500 dark:text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            {/* Error Message */}
            <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">
              Unable to load projects
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              There was a problem loading the projects. Please check your connection and try again.
            </p>

            {/* Retry Button */}
            <Button variant="primary" size="md" onClick={this.handleRetry}>
              Retry
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
