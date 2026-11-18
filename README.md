# Fluid UI Svelte

[![npm version](https://img.shields.io/npm/v/fluid-ui-svelte.svg)](https://www.npmjs.com/package/fluid-ui-svelte)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A pragmatic Svelte 5 component library designed for flexibility and ease of use. It separates low-level semantic wrappers from high-level interactive components, giving you complete control over your application's architecture.

## Scope

This document covers how a consumer installs, configures, and uses the `fluid-ui-svelte` package. It describes the three layers, their components, the global styling setup, and the rules that every usage follows.

It does not cover how to contribute to the repository. The development commands, test suites, and release process are described in the Development section and in `tests/tests.md`.

## Architecture

The library is organized into three layers with strict boundaries. Each layer imports from the layers below it and never from the layers above it.

### Base Layer

The base layer holds the fundamental, low-level semantic wrappers around native HTML elements. It reduces HTML tag fatigue, enforces semantic consistency and accessibility, and handles class deduplication, merging, and attribute sanitization.

Import path: `fluid-ui-svelte/base`

### Components Layer

The components layer holds focused, cohesive functional primitives assembled strictly from base elements. These components are purely visual and interactive, and they contain no application business logic.

Import path: `fluid-ui-svelte/components`

### Prebuilt Layer

The prebuilt layer holds turnkey domain workflows that compose the base and components layers. These components are ready for immediate application use.

Import path: `fluid-ui-svelte/prebuilt`

## Design Pillars

Each component is built from three parts that stay separate.

1. Reactive UI markup in `.svelte` files defines what is rendered, the structure, the snippets, and the event binding.
2. Pure TypeScript logic in `.ts` helper files defines state machines, calculations, and handlers. This logic is pure, immutable, and free of side effects.
3. Central styling defaults in `fluidui.css` define a dedicated class block for each element, so theming happens in one place.

## Requirements

- Svelte 5 in Runes mode (`$state`, `$derived`, `$props`, `$bindable`, `$effect`, `Snippet`). The peer dependency is `svelte` `^5.0.0`.
- Tailwind CSS 4 syntax and CSS variables, for the default styling.

## Installation

### Install the package

```bash
npm install fluid-ui-svelte
```

### Configure global styles

Fluid UI does not inject styles automatically. This keeps library styling and application styling separate.

1. Copy the reference `src/fluidui.css` file from the repository into your project, for example into `src/`.
2. Import it in your main CSS file.

```css
/* src/app.css */
@import "./fluidui.css";
```

## Usage

Import components from the layer that owns them. Svelte 5 in Runes mode is required.

```svelte
<script>
  import { Button } from "fluid-ui-svelte/base";
  import { Accordion } from "fluid-ui-svelte/components";
  import { Breadcrumb } from "fluid-ui-svelte/prebuilt";
</script>

<Button id="submit-button" onclick={async () => {}}>Submit</Button>
```

### Usage Rules

- Every element requires an `id` prop from the outside.
- Internal child base elements use deterministic scoped ids, such as `my-drawer-panel` or `my-modal-title`.
- Snippets are preferred over configuration objects for custom markup.
- Base elements accept `overrideDefaultStyling`. Components and prebuilt elements accept `variant`.

### Example: Drawer With Snippet Content

```svelte
<Drawer id="my-drawer" bind:isOpen position="left">
  <Container id="my-drawer-panel">...</Container>
</Drawer>
```

## Component Reference

The table lists each layer, its import path, and its components. The documentation registry in `src/documentation/documentation.ts` holds the full description and props table of each component.

| Layer      | Import path                  | Components                                                                                                                                         |
| ---------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Base       | `fluid-ui-svelte/base`       | Button, Canvas, Container, Form, Image, InputField, Label, Link, List, Table, Text                                                                 |
| Components | `fluid-ui-svelte/components` | Accordion, AnchoredOverlay, CalendarGrid, Carousel, CodeBlock, Draggable, Drawer, Dropzone, ImageCrop, Modal, Page, Pagination, Switch, TimePicker |
| Prebuilt   | `fluid-ui-svelte/prebuilt`   | Breadcrumb, InternationalInput, NotificationArea, SearchableSelector                                                                               |

## Naming Conventions

- No shortened names. Use `button`, not `btn`, and `configuration`, not `cfg`.
- `PascalCase` for Svelte components and type aliases.
- `camelCase` for variables, functions, and helper files.
- `kebab-case` for registry slugs.

## Development

Run these commands from the repository root.

```bash
npm install
npm run dev
npm run build
npm run lint
npm run format
npm run check
npx playwright install chromium
npm run test:browser
```

- `npm run dev` starts the documentation site.
- `npm run build` builds the site and the library into `dist/`, then checks the package with publint.
- `npm run lint` runs oxlint with automatic fixes.
- `npm run format` formats the source with oxfmt.
- `npm run check` runs the Svelte and TypeScript checks.
- `npm run test:browser` runs the Playwright browser suites in `tests/browser/`.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
