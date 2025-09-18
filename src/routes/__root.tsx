import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'
import { ThemeProvider } from '@/components/theme-provider'
import { NotFound } from '@/components/not-found'
import '../App.css'

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <Outlet />
      <TanstackDevtools
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
  ),
  notFoundComponent: () => (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <NotFound showSidebar={false} />
    </div>
  ),
})
