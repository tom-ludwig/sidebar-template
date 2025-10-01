import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AppSidebar } from '@/components/app-sidebar'
import { ProtectedLayout } from '@/components/protected-layout'
import { SidebarProvider } from '@/components/ui/sidebar'
import { SidebarInset } from '@/components/ui/sidebar'
import { NotFound } from '@/components/not-found'

export const Route = createFileRoute('/_layout')({
  component: Layout,
  notFoundComponent: () => (
    <SidebarInset>
      <NotFound showSidebar={true} />
    </SidebarInset>
  ),
})

function Layout() {
  return (
    <ProtectedLayout>
      <SidebarProvider>
        <AppSidebar />
        <Outlet />
      </SidebarProvider>
    </ProtectedLayout>
  )
}
