import { useNavigate } from '@tanstack/react-router'

interface NotFoundProps {
  showSidebar?: boolean
}

export function NotFound({ showSidebar = false }: NotFoundProps) {
  const navigate = useNavigate()

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      navigate({ to: '/' })
    }
  }

  const handleGoHome = () => {
    navigate({ to: '/' })
  }

  const content = (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-center space-y-4 max-w-md mx-auto px-4">
        <div className="text-6xl font-bold text-muted-foreground">404</div>
        <h1 className="text-2xl font-semibold">Page Not Found</h1>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="pt-4 flex gap-3 justify-center">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Go Back
          </button>
          <button
            onClick={handleGoHome}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )

  if (showSidebar) {
    return (
      <>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            >
              ←
            </button>
            <div className="text-sm text-muted-foreground">Page Not Found</div>
          </div>
        </header>
        {content}
      </>
    )
  }

  return content
}
