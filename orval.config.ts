import { defineConfig } from "orval";

export default defineConfig({
  // Users API (authenticated)
  users: {
    input: "./api/specs/users.openapi.yaml",
    output: {
      mode: "tags-split",
      target: "./api/generated/users",
      schemas: "./api/generated/users/models",
      client: "react-query",
      override: {
        mutator: {
          path: "./api/fetchers/authenticated.ts",
          name: "authenticatedFetch",
        },
        query: {
          useQuery: true,
          useMutation: true,
        },
      },
    },
  },

  health: {
    input: "./api/specs/health.openapi.yaml",
    output: {
      mode: "tags-split",
      target: "./api/generated/health",
      schemas: "./api/generated/health/models",
      client: "react-query",
      override: {
        mutator: {
          path: "./api/fetchers/public.ts",
          name: "publicFetch",
        },
      },
    },
  },
});

