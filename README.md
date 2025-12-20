# Sidebar Template

A modern tanstack router template with a beautiful sidebar navigation and dark mode support.

<img width="2014" height="1125" alt="image" src="https://github.com/user-attachments/assets/00942b1b-8bee-4a66-b81e-b869157e9c3b" />

## Features

- **Beautiful Sidebar** - Collapsible navigation with shadcn/ui components
- **Dark Mode** - Toggle between light, dark, and system themes
- **Stack** - Built with tanstack router and Vite
- **TypeScript**
- **Tailwind CSS**
- **Shadcn**
- **OIDC Authentication** - Works with Pocket ID, Zitadel, Keycloak, etc. (optional)

## Quick Start

### Without Authentication

```bash
cp .env.example .env # Set VITE_AUTH_BYPASS to true for local dev
npm install
npm run dev
```

Visit `http://localhost:5173`

### With Authentication

```bash
cp .env.example .env # Update with your OIDC provider config
npm install
npm run dev
```

See [PocketIdConfig.md](./PocketIdConfig.md) or [ZitadelConfig.md](./ZitadelConfig.md) for provider-specific setup.

## Environment Variables

| Variable                          | Example Value                              | Description                                                      |
| --------------------------------- | ------------------------------------------ | ---------------------------------------------------------------- |
| `VITE_AUTH_BYPASS`                | `true` / `false`                           | **Dev only**. If `true`, bypasses OIDC and logs in as fake user. |
| `VITE_OIDC_AUTHORITY`             | `https://auth.example.com/application/o/myapp` | OIDC authority/issuer URL from your provider.                |
| `VITE_OIDC_CLIENT_ID`             | `1234567890abcdef`                         | OAuth2 client ID from your OIDC provider.                        |
| `VITE_OIDC_REDIRECT_URI`          | `http://localhost:5173/callback`           | Redirect URL after login (must match provider config).           |
| `VITE_OIDC_POST_LOGOUT_REDIRECT_URI` | `http://localhost:5173/`                | Post-logout redirect URL.                                        |

## Authentication

This project uses standard OIDC for authentication, compatible with providers like Pocket ID, Zitadel, Keycloak, etc.

- See [PocketIdConfig.md](./PocketIdConfig.md) for Pocket ID setup
- See [ZitadelConfig.md](./ZitadelConfig.md) for Zitadel setup

For local development, set `VITE_AUTH_BYPASS` to `true` to skip authentication.

## Tech Stack

- tanstack router
- TypeScript
- Tailwind CSS
- shadcn/ui
- next-themes
