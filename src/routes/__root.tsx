import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/lib/auth'
import { NotFound } from '@/components/not-found'
import '../App.css'

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <ThemeProvider>
        <div className="h-screen w-screen overflow-hidden">
          <Outlet />
        </div>
        <TanStackDevtools
          config={{
            position: 'bottom-left',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </ThemeProvider>
    </AuthProvider>
  ),
  notFoundComponent: () => (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <NotFound showSidebar={false} />
    </div>
  ),
})
