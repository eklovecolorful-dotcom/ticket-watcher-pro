import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Plain client-side SPA: `vite build` emits a static site to dist/.
// Deep links (/app, /sign-in, …) are resolved by React Router in the browser;
// vercel.json rewrites unknown paths to index.html so they load on refresh.
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: "dist",
  },
});
