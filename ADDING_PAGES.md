# Adding New Pages

This application uses React Router v7 with a layout-based routing structure and follows a Rails-like convention for organizing routes. Here's how to quickly add new pages:

## File Structure

```
app/
├── resources/                    # Resource Routes (API, webhooks, etc.)
│   ├── api/                     # API Routes
│   └── webhooks/                # Webhook Routes
├── views/                       # UI Routes
│   ├── layouts/                 # Layout Routes
│   │   └── app.tsx             # Main app layout with sidebar
│   ├── home/                    # Home resource
│   │   └── index.tsx           # Home page (/)
│   ├── dashboard/               # Dashboard resource
│   │   └── index.tsx           # Dashboard page (/dashboard)
│   ├── settings/                # Settings resource
│   │   └── index.tsx           # Settings page (/settings)
│   ├── docs/                    # Documentation resource
│   │   └── index.tsx           # Documentation page (/docs)
│   └── [resource]/              # Your new resource
│       ├── index.tsx           # List route (/your-resource)
│       ├── show.tsx            # Detail route (/your-resource/:id)
│       ├── new.tsx             # Create route (/your-resource/new)
│       └── edit.tsx            # Edit route (/your-resource/:id/edit)
└── routes.ts                    # Route configuration
```

## How to Add a New Page

### 1. Create the Resource Directory

Create a new directory in `app/views/` for your resource (e.g., `users`):

```bash
mkdir -p app/views/users
```

### 2. Create the Page Component

Create the appropriate route files in your resource directory:

**For a list page (`index.tsx`):**
```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '~/components/ui/breadcrumb'
import { Separator } from '~/components/ui/separator'
import {
  SidebarInset,
  SidebarTrigger,
} from '~/components/ui/sidebar'

export default function UsersPage() {
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
                <BreadcrumbPage>Users</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1>Users</h1>
        {/* Your page content here */}
      </div>
    </SidebarInset>
  )
}
```

**For a detail page (`show.tsx`):**
```tsx
import { useParams } from "react-router"
// ... other imports

export default function UserDetailPage() {
  const { id } = useParams()
  
  return (
    <SidebarInset>
      {/* Similar header structure */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1>User {id}</h1>
        {/* User detail content */}
      </div>
    </SidebarInset>
  )
}
```

### 3. Add the Route

Update `app/routes.ts` to include your new routes:

```tsx
import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("views/layouts/app.tsx", [
    index("views/home/index.tsx"),
    route("dashboard", "views/dashboard/index.tsx"),
    route("settings", "views/settings/index.tsx"),
    route("docs", "views/docs/index.tsx"),
    
    // Add your new routes
    route("users", "views/users/index.tsx"),
    route("users/:id", "views/users/show.tsx"),
    route("users/new", "views/users/new.tsx"),
    route("users/:id/edit", "views/users/edit.tsx"),
  ]),
] satisfies RouteConfig;
```

### 4. Add to Sidebar Navigation (Optional)

Update the navigation data in `app/components/app-sidebar.tsx`:

```tsx
const data = {
  navMain: [
    // ... existing items
    {
      title: "Users",
      url: "/users",
      icon: Users, // Import from lucide-react
      items: [
        {
          title: "All Users",
          url: "/users",
        },
        {
          title: "New User",
          url: "/users/new",
        },
      ],
    },
  ],
  // ... rest of data
}
```

## Resource Routes (CSR Approach)

Since this application uses Client-Side Rendering (CSR), resource routes work differently:

### API Routes
For API calls, you'll typically:
- Use external API endpoints
- Create service functions in `app/lib/` or `app/services/`
- Use React Query, SWR, or similar for data fetching

### Example Service Structure:
```
app/
├── lib/
│   └── api.ts          # API client configuration
├── services/
│   ├── users.ts        # User-related API calls
│   └── posts.ts        # Post-related API calls
└── hooks/
    ├── useUsers.ts     # Custom hooks for data fetching
    └── usePosts.ts
```

## Key Points

- **Layout Structure**: All pages are wrapped in the `app.tsx` layout which provides the sidebar
- **SidebarInset**: Use `SidebarInset` to wrap your page content
- **Consistent Header**: Include the header with `SidebarTrigger` and breadcrumbs for consistency
- **Resource Organization**: Group related routes in resource directories
- **URL Control**: URLs are defined in `app/routes.ts`, not by file structure
- **CSR**: Use external APIs and data fetching libraries for server communication

## Example: Adding a "Posts" Resource

1. Create `app/views/posts/index.tsx`
2. Create `app/views/posts/show.tsx`
3. Create `app/views/posts/new.tsx`
4. Create `app/views/posts/edit.tsx`
5. Add routes to `app/routes.ts`
6. Update sidebar navigation in `app-sidebar.tsx`

This structure makes it very easy to iterate and add new pages quickly while maintaining consistency across your application!
