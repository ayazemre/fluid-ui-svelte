import adapter from "@sveltejs/adapter-node";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter(),
      typescript: {
        config: () => {
          return {
            compilerOptions: {
              isolatedModules: true,
              lib: ["esnext", "DOM", "DOM.Iterable"],
              module: "esnext",
              moduleResolution: "bundler",
              noEmit: true,
              rewriteRelativeImportExtensions: true,
              rootDirs: ["..", "./types"],
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
