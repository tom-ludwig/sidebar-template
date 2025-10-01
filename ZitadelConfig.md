# Zitadel Configuration

1. Start Zitadel: `docker/podman compose up -d`
2. Login Zitadel `http://localhost:8080/ui/console`, with Email: `zitadel-admin@zitadel.localhost` Password: `Password1!`
3. Create a new instance via the UI
4. Create a two applications
   - A react app of type `User Agent`, copy the user id into the react apps config.
5. Start the frontend `make start-frontend` (or `npm run dev`)
6. Visit `localhost:5173` and Log in with the existing user.
