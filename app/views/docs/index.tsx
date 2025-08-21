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

export default function DocsPage() {
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
                <BreadcrumbPage>Documentation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Documentation</h2>
          <p className="text-muted-foreground">
            Learn how to use this application effectively.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Getting Started</h3>
            <div className="space-y-2">
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Quick Start Guide</h4>
                <p className="text-sm text-muted-foreground">
                  Get up and running with the basics in minutes.
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Installation</h4>
                <p className="text-sm text-muted-foreground">
                  Step-by-step installation instructions.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Advanced Topics</h3>
            <div className="space-y-2">
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2">API Reference</h4>
                <p className="text-sm text-muted-foreground">
                  Complete API documentation and examples.
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Best Practices</h4>
                <p className="text-sm text-muted-foreground">
                  Learn the recommended patterns and practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
