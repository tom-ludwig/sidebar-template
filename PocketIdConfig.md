# Pocket ID Configuration

## Setup

1. Start Pocket ID:
   ```bash
   docker compose -f docker-compose.dev.yaml up -d
   ```

2. Open Pocket ID at `http://localhost:1411` and complete initial setup

3. Go to **OIDC Clients** → **Add OIDC Client**

4. Configure the client:
   - **Name**: Your app name
   - **Callback URLs**: `http://localhost:5173/callback`
   - **Logout URLs**: `http://localhost:5173/`

5. Copy the **Client ID** after creation

## Environment Variables

```bash
VITE_OIDC_AUTHORITY=http://localhost:1411
VITE_OIDC_CLIENT_ID=your-client-id
VITE_OIDC_REDIRECT_URI=http://localhost:5173/callback
VITE_OIDC_POST_LOGOUT_REDIRECT_URI=http://localhost:5173/
```

## User Registration

To enable user self-registration, go to **Settings** → **App Configuration** and set **Allow User Signups** to one of:
- `withToken` — users need an invite token
- `open` — anyone can register

## Notes

- Pocket ID uses passkeys (WebAuthn) for authentication by default
- The authority URL for Pocket ID is just the base URL (e.g., `http://localhost:1411`)
- For production, generate a secure `ENCRYPTION_KEY` with: `openssl rand -base64 32`

## Reference

- [Pocket ID Documentation](https://pocket-id.org/docs)

