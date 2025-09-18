import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AppSidebar } from '~/components/app-sidebar'
import { SidebarProvider } from '~/components/ui/sidebar'

export const Route = createFileRoute('/_layout')({
  component: Layout,
})

function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Outlet />
    </SidebarProvider>
  )
}
