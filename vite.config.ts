import adapter from "@sveltejs/adapter-node";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      adapter: adapter(),
      paths: { base: process.env.BASE_PATH ? `/${process.env.BASE_PATH}` : "" },
    }),
  ],
  server: { host: process.env.HOST ? process.env.HOST : "localhost", port: process.env.PORT ? parseInt(process.env.PORT) : 4000, strictPort: true },
});
