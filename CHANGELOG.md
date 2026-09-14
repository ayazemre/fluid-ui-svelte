# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
