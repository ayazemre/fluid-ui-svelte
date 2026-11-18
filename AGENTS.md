# Agent Directives

## Local Development Instructions

The package is a Svelte 5 library with a documentation site in the same repository. The baseline is Node 26, and CI runs on the `26.x` line.

Run these commands from the repository root:

- `npm install` installs the dependencies and runs `svelte-kit sync`.
- `npm run dev` starts the documentation site with `vite dev`.
- `npm run build` builds the site and the library into `dist/`, then runs `svelte-package` and publint.
- `npm run start` serves the built site with `node build` on port 3000.
- `npm run lint` runs oxlint with automatic fixes. It changes files.
- `npm run format` formats the source with oxfmt.
- `npm run check` runs `svelte-check` against `tsconfig.json`.

Shell scripts live in `scripts/`. `scripts/repository.sh` is the entry point for repository operations: `help`, `check`, `integrity`, `test`, and `publish`. Use it rather than running the underlying commands by hand.

Run `npm run lint` and `npm run format` before every commit. Run `npm run check` after any change to a `.svelte` or `.ts` file.

Do not edit `dist/`, `build/`, or `.svelte-kit/`. They are generated.

## Testing Instructions

Browser tests are the only test suites. They live in `tests/browser/` as `*.spec.ts` files and are described in `tests/tests.md`.

- `npm run test:browser` runs every browser suite. It runs through `dotenvx run -- playwright test`.
- `npm run test:browser -- tests/browser/<suite_name>.spec.ts` runs one suite.
- Playwright starts the site with `npm run start` on `http://localhost:3000` before the tests run. Run `npm run build` first, or use `scripts/repository.sh test`, which builds before it runs the tests.
- Install the browser with `npx playwright install chromium` before the first run. CI also installs the system dependencies with `--with-deps`.
- The reporter writes to `tests/browser/temporary`. Do not commit that folder.

Tests run against the built site and the public entry point. They do not import internal functions. Every new behavior needs a suite, and every suite covers the success path and the failure path.

`scripts/repository.sh test` runs the full pipeline in order: Node version check, dependency install, build, browser install, and browser tests. Stop and report the failing step if any step fails.

## Repository Instructions

### Branches

Branch names use one of two categories and a kebab-case description, with full words and no abbreviations.

- `development/<description>` for work inside the package, such as features, fixes, changes, and improvements.
- `maintenance/<description>` for work around the package, such as documentation, tooling, dependencies, CI, and formatting.

The main branch is `main`. Publishing runs only from `main`.

### Commits

Each commit holds one piece of work and uses the format `type: concise description in imperative mood`, with no scope in parentheses.

- `development` for code work inside the package.
- `maintenance` for work around the package.

Do not force push. Pull the current branch before starting work, and review any incoming changes that touch the files you will edit.

### Versioning and Changelog

The package follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html). The changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and lists the newest version first.

- Every version increment needs a matching `CHANGELOG.md` entry before it is committed.
- The new version must be higher than the latest version on npm. `scripts/repository.sh integrity` checks both rules.
- Do not change the version in `package.json` without a changelog entry for it.

### Integrity and Publishing

`scripts/repository.sh integrity` runs the checks in this order: Node version, `npm ci`, shell syntax, lint, format check, changelog entry, and the npm version comparison. It writes `should_publish` to stdout and to `GITHUB_OUTPUT` when that variable is set.

The publish workflow runs only on `main` and only when `should_publish` is `true`. It publishes with provenance through npm trusted publishing and needs `id-token: write`. Do not add `packages` permissions.

Do not run `npm publish` by hand. It runs the `prepack` script, which regenerates `dist` with `.ts` import specifiers. `scripts/repository.sh publish` rewrites those specifiers before it publishes.

### Scripts

Every script follows the bash directives: the shebang, functions sorted alphabetically, a print help function, and a runner at the end. Exit codes are 0 for success, 1 for an operation that fails, and 2 for an incorrect flag or command.
