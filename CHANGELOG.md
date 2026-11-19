# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added `resolveImageCropState`, `ImageCropAspectRatio`, `ImageCropState`, and `ImageCropTransformOptions` to the `./components` export. The state holds the cover zoom, the crop area, the pan bounds, and the clamped transform.
- Added a drag to pan example to the image crop documentation, with its code block.

### Changed

- `ImageCrop` clamps zoom to the cover zoom and pans to the bounds of the source image, so the image cannot leave the crop area.
- `drawOverlay` and `generateCroppedImage` take the crop area and the shape as explicit arguments instead of computing or defaulting them.
- Image crop samples bind their zoom and pan sliders to the resolved bounds.
- `SearchableSelector` draws its chevron and check marks with CSS borders instead of `@iconify/svelte` icons.
- `src/fluidui.css` declares the cascade layers `theme, base, fluid, components, utilities`, and wraps the fluid component styles in the `fluid` layer.

### Fixed

- `serializeStructuredData` escapes `<`, `>`, `&`, and the line and paragraph separators, so structured data cannot close its script element early.

### Removed

- Removed the `section, main.fluid-container` base rule from `src/fluidui.css`.
- Removed the image crop pan range limits of plus or minus 400 and 1000 pixels in favor of the computed bounds.

## [0.5.0] - 2026-11-18

### Added

- Added a `containerfile` that builds the site on `node:26-slim` and runs `npm run start` on port 3000.
- Added repository operations `integrity`, `test`, `publish`, and `push` to `scripts/repository.sh`.
- Added GitHub workflows for integrity, test, and publish, with npm trusted publishing and provenance.
- Added browser test suites in `tests/browser/` for the base, components, and prebuilt layers.

### Changed

- Migrated the library and the documentation site to the SvelteKit 3 baseline on Svelte 5 and Node 26.
- Renamed `src/app.css` to `src/styles.css` and the export `gettingStartedAppCss` to `gettingStartedStylesCss`.
- Replaced the lint script with `oxlint --fix` and the format script with `oxfmt`, excluding `dist`, `build`, and `node_modules`.
- Rewrote `README.md` from the current code.

### Removed

- Removed the command line interface, its `bin` entry, and the `build:cli` script.
- Removed the `infrastructure/` folder, the Podman setup, and the `Dockerfile`.
- Removed the `llms` and `testing` routes, the unit and integration tests, and the `data-trails` and `zod` dependencies.
- Removed the `.npmrc` file and the `peerDependenciesMeta` entry.

## [0.4.2] - 2026-09-14

### Added

- Added missing `./components` export entry in `package.json` with `types` and `svelte` conditions.

### Changed

- Migrated remaining `#src/lib` aliases to relative `../` paths in `CodeBlock`, `TimePicker`, `codeBlock`, `InternationalInput`, `NotificationArea`, and `SearchableSelector`.

## [0.4.1] - 2026-09-14

### Added

- CLI element tutorials now include up to 3 usage examples from `codeBlockContents` with alias handling for `input-field` and `notification-area`.
- CLI generic output now reports per category element counts with install, usage, and next step guidance.
- CLI element output now reports layer import path, mandatory `id` rules, and import line.

### Changed

- Migrated single parent library imports from `#src/lib` aliases to relative `../` paths across base, components, prebuilt, routes, and samples to survive `svelte-package` `lib` flattening.
- Extended CLI help with categories, requirements, mandatory `id` rules, and examples.
- Rewrote `README.md` into a comprehensive guide from the getting started structure with architecture, pillars, install, usage, CLI reference, tech table, naming, and component lists.
- Removed website references from `README.md` and CLI output.

### Fixed

- Fixed `dist` imports rewriting to `../lib` paths by avoiding cross slice aliases for close files.

## [0.4.0] - 2026-09-14

### Added

- Generic regex parser for `CodeBlock` with language rules in `src/lib/utilities/parsers.ts` and overridable token themes.
- Condensed and full file diff views for `CodeBlock` via `sourceCode` and `modifiedCode` props.
- Per change block accept and reject review actions for diffs, with `applyDiffLineDecision` helper.
- Shippable documentation CLI (`npx fluid-ui-svelte`) with `--documentation select=<category.element>` tutorials and props tables.
- Extended `CodeBlock` end to end coverage for diff, review, accept, reject, and reset flows.

### Changed

- Renamed `CodeBlock` `code` prop to `sourceCode` with no backwards compatibility.
- Migrated `CalendarGrid` from the Temporal API to the native `Date` API.
- CLI prints registry documentation by default and no longer dumps raw component source.

## [0.3.6] - 2026-08-30

### Added

- Dynamic `sitemap.xml` route and `robots.txt` generation for documentation SEO.
- Component registry system for dynamic sample serving.
- Base UI components (`Button`, `Container`, `Form`, `Image`, `InputField`, `Link`, `List`, `Table`, `Text`).
- Advanced UI components (`Accordion`, `Breadcrumb`, `Carousel`, `CodeBlock`, `DatePicker`, `Draggable`, `Drawer`, `Dropzone`, `ImageCrop`, `Modal`, `NotificationArea`, `Page`, `Pagination`, `Popover`, `Switch`).
- Standardized TypeScript module subpath alias `#src/*`.

### Changed

- Refactored component export structure into `./base` and `./components` entrypoints.
- Updated documentation layout structure and page navigation hierarchy.
- Improved Svelte 5 Rune state handling across interactive components.
