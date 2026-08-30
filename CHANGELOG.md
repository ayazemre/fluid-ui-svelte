# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
