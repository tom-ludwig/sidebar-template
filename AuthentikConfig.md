# Authentik Configuration

## Setup

1. Log in to your Authentik admin console (`http://<hostname>:9000/if/flow/initial-setup/`)
2. Go to **Applications** → **Providers** → **Create**
3. Select **OAuth2/OpenID Provider**
4. Configure the provider:
   - **Name**: Your app name
   - **Authorization flow**: default-provider-authorization-implicit-consent (or explicit if you prefer)
   - **Client type**: Public
   - **Redirect URIs**: `http://localhost:5173/callback`
5. Go to **Applications** → **Applications** → **Create**
6. Link the application to your provider

## Environment Variables

```bash
VITE_OIDC_AUTHORITY=https://your-authentik-domain/application/o/<your-app-slug>/
VITE_OIDC_CLIENT_ID=<your-client-id>
VITE_OIDC_REDIRECT_URI=http://localhost:5173/callback
VITE_OIDC_POST_LOGOUT_REDIRECT_URI=http://localhost:5173/
```

## Notes

- Authentik uses the format `https://domain/application/o/slug/` for the OIDC authority
- Make sure your redirect URIs match exactly (including trailing slashes)
- For production, add your production URLs to the redirect URI list
