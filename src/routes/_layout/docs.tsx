import { createFileRoute } from '@tanstack/react-router'
import { SidebarInset } from '@/components/ui/sidebar'

export const Route = createFileRoute('/_layout/docs')({
  component: DocsPage,
})

function DocsPage() {
  return (
    <SidebarInset>
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Learn how to use this application effectively.
          </p>
        </div>
      </div>
    </SidebarInset>
  )
}
