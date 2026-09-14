#!/bin/sh
# Builds the fluid-ui-svelte documentation CLI into dist/cli/cli.js.
# Uses the repository's own Vite toolchain through its Node API, so no
# extra config files or dependencies are required. Safe to run after
# svelte-package: emptyOutDir is off and only dist/cli is written.
set -e

node --input-type=module -e "
import { build } from 'vite';
await build({
  configFile: false,
  logLevel: 'warn',
  build: {
    outDir: 'dist/cli',
    emptyOutDir: true,
    lib: {
      entry: 'src/cli/cli.ts',
      formats: ['es'],
      fileName: () => 'cli.js',
    },
    rollupOptions: {
      external: [/^node:/],
    },
  },
});
"
