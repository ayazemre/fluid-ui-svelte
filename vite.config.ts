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
              types: ["node"],
              verbatimModuleSyntax: true,
            },
          };
        },
      },
    }),
  ],
});
