import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    tanstackRouter({ 
      autoCodeSplitting: true 
    }),
    viteReact(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});
