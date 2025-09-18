import { createFileRoute } from '@tanstack/react-router'
import { SidebarInset } from '~/components/ui/sidebar'

export const Route = createFileRoute('/_layout/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <SidebarInset>
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Settings</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Configure your application preferences and settings.
          </p>
        </div>
      </div>
    </SidebarInset>
  )
}
