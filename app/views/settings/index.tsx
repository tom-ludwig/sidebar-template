import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { Separator } from '~/components/ui/separator'
import {
  SidebarInset,
  SidebarTrigger,
} from '~/components/ui/sidebar'

export default function SettingsPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-muted-foreground">
            Manage your application settings and preferences.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="font-semibold mb-2">General</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Basic application settings and preferences.
            </p>
            <button className="text-sm text-primary hover:underline">
              Configure →
            </button>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="font-semibold mb-2">Team</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Manage team members and permissions.
            </p>
            <button className="text-sm text-primary hover:underline">
              Manage →
            </button>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="font-semibold mb-2">Billing</h3>
            <p className="text-sm text-muted-foreground mb-4">
              View and manage your billing information.
            </p>
            <button className="text-sm text-primary hover:underline">
              View →
            </button>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
