import { createFileRoute } from '@tanstack/react-router'
import { SidebarInset } from '~/components/ui/sidebar'

export const Route = createFileRoute('/_layout/')({
  component: HomePage,
})

function HomePage() {
  return (
    <SidebarInset>
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your App</h1>
          <p className="text-lg text-muted-foreground mb-8">
            This is your home page. Use the sidebar to navigate between different sections.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-2">Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                View your main dashboard with analytics and data.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-2">Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure your application preferences.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-sm text-muted-foreground">
                Learn how to use this application effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
