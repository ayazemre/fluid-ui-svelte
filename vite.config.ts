import adapter from "@sveltejs/adapter-node";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      adapter: adapter(),
      typescript: {
        config: () => {
          return {
            compilerOptions: {
              allowImportingTsExtensions: true,
              isolatedModules: true,
              lib: ["esnext", "DOM", "DOM.Iterable"],
              module: "esnext",
              moduleResolution: "bundler",
              noEmit: true,
              resolveJsonModule: true,
              rootDirs: ["..", "./types"],
              skipLibCheck: true,
              sourceMap: true,
              strict: true,
              target: "esnext",
              verbatimModuleSyntax: true,
            },
            exclude: [
              "../node_modules/**",
              "../src/service-worker.js",
              "../src/service-worker/**/*.js",
              "../src/service-worker.ts",
              "../src/service-worker/**/*.ts",
              "../src/service-worker.d.ts",
              "../src/service-worker/**/*.d.ts",
            ],
            include: [
              "ambient.d.ts",
              "env.d.ts",
              "non-ambient.d.ts",
              "./types/**/$types.d.ts",
              "../vite.config.js",
              "../vite.config.ts",
              "../src/**/*.js",
              "../src/**/*.ts",
              "../src/**/*.svelte",
              "../test/**/*.js",
              "../test/**/*.ts",
              "../test/**/*.svelte",
              "../tests/**/*.js",
              "../tests/**/*.ts",
              "../tests/**/*.svelte",
            ],
          };
        },
      },
    }),
  ],
});
