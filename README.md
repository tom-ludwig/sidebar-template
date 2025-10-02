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
- **Zitadel** - Authentication (optional)

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
docker compose -f docker-compose.dev.yaml up -d # Start local Zitadel instance
```

Setup an application in the Zitadel console: `http://localhost:8080/ui/console?login_hint=zitadel-admin@zitadel.localhost` Password: `Password1!`

```bash
cp .env.example .env # Update with your Zitadel config
npm install
npm run dev
```

## Environment Variables

| Variable                                | Example Value                    | Description                                                           |
| --------------------------------------- | -------------------------------- | --------------------------------------------------------------------- |
| `VITE_AUTH_BYPASS`                      | `true` / `false`                 | **Dev only**. If `true`, bypasses ZITADEL and logs in as a fake user. |
| `VITE_ZITADEL_AUTHORITY`                | `https://issuer.zitadel.cloud`   | ZITADEL OIDC authority (your instance URL).                           |
| `VITE_ZITADEL_CLIENT_ID`                | `1234567890abcdef`               | OAuth2 client ID configured in ZITADEL project.                       |
| `VITE_ZITADEL_REDIRECT_URI`             | `http://localhost:5173/callback` | Redirect URL after login (must match your ZITADEL app config).        |
| `VITE_ZITADEL_POST_LOGOUT_REDIRECT_URI` | `http://localhost:5173/`         | Post-logout redirect URL.                                             |

## Authentication

This project uses Zitadel for authentication.
See `ZitadelConfig.md` for more information.
For local development set `VITE_AUTH_BYPASS` to `true`.

## Tech Stack

- tanstack router
- TypeScript
- Tailwind CSS
- shadcn/ui
- next-themes
