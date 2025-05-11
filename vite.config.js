import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // Change to "/repo-name/" if deploying to GitHub Pages
  build: {
    outDir: "dist", // Vite's default (must match Vercel settings)
  }
});
