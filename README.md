# Fluid UI Svelte

[![npm version](https://img.shields.io/npm/v/fluid-ui-svelte.svg)](https://www.npmjs.com/package/fluid-ui-svelte)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A pragmatic Svelte 5 component library designed for flexibility and ease of use. It separates low-level semantic wrappers from high-level interactive components, giving you complete control over your application's architecture.

## Documentation

Use the shippable CLI for terminal docs. Full metadata lives in "src/documentation/documentation.ts".

```bash
npx fluid-ui-svelte --documentation select=base.button
```

## Architecture

Three layers with strict boundaries:

### Base Layer — fluid-ui-svelte/base

Fundamental, low-level semantic wrappers around native HTML elements (Buttons, Inputs, Containers, Tables, Text, Links).

- Reduces HTML tag fatigue and enforces semantic consistency and accessibility.
- Handles class deduplication, merging, and attribute sanitization.
- Every element exposes `underlyingElement` as `$bindable(null)`.
- Accepts `overrideDefaultStyling` boolean. When true, default base classes are stripped.

Elements: Button, Canvas, Container, Form, Image, InputField, Label, Link, List, Table, Text.

### Components Layer — fluid-ui-svelte/components

Focused, cohesive functional primitives assembled strictly from Base elements.

- Accordion, AnchoredOverlay, CalendarGrid, Carousel, CodeBlock, Draggable, Drawer, Dropzone, ImageCrop, Modal, Page, Pagination, Switch, TimePicker.
- Accepts `variant` string for theme injection.
- Purely visual and interactive. No application business logic.

### Prebuilt Layer — fluid-ui-svelte/prebuilt

Turnkey domain workflows composing Base and Components.

- Breadcrumb, InternationalInput, NotificationArea, SearchableSelector.
- Accepts `variant` string for theme injection.
- Ready for immediate application use.

## Three Pillars

1. Reactive UI Markup (.svelte): what is rendered, structure, snippets, event binding.
2. Pure TypeScript Logic (.ts helper): state machines, calculations, handlers. Pure, immutable, no side effects.
3. Central Styling Defaults (fluidui.css): dedicated class blocks per element for centralized theming.

## Requirements

- Svelte 5 Runes mode (`$state`, `$derived`, `$props`, `$bindable`, `$effect`, `Snippet`).
- Node 24+ native TypeScript execution.
- Tailwind CSS 4 syntax and CSS variables.

## Installation

```bash
npm install fluid-ui-svelte
```

Configure global styles. Fluid UI does not inject styles automatically:

```css
/* src/app.css */
@import "./fluidui.css";
```

Place the reference `fluidui.css` in your project (for example `src/`) and import it in your main CSS file.

## Usage

Svelte 5 Runes mode is required.

```svelte
<script>
  import { Button } from "fluid-ui-svelte/base";
  import { Accordion } from "fluid-ui-svelte/components";
  import { Breadcrumb } from "fluid-ui-svelte/prebuilt";
</script>

<Button id="submit-button" onclick={async () => {}}>Submit</Button>
```

Rules:

- Every element requires a mandatory `id` prop from the outside.
- Internal child Base elements use deterministic scoped ids (for example `my-drawer-panel`, `my-modal-title`).
- Prioritize snippets over config objects for custom markup.
- Base uses `overrideDefaultStyling`. Components and prebuilt use `variant`.

Example with mandatory id and snippets:

```svelte
<Drawer id="my-drawer" bind:isOpen position="left">
  <Container id="my-drawer-panel">...</Container>
</Drawer>
```

## CLI Reference

The package ships `npx fluid-ui-svelte`.

```bash
npx fluid-ui-svelte
npx fluid-ui-svelte --help
npx fluid-ui-svelte --documentation
npx fluid-ui-svelte --documentation select=base.button
npx fluid-ui-svelte --documentation select=components.code-block
npx fluid-ui-svelte --documentation select=prebuilt.breadcrumb
```

- No options prints generic library documentation with layer descriptions and element lists.
- `--documentation` prints generic documentation.
- `--documentation select=<category.element>` prints title, description, layer import path, usage snippet, and props table.
- Path format is `category.element` (for example `base.button`, `components.modal`).

## Core Technologies

| Area       | Tool / Pattern                                                                  |
| ---------- | ------------------------------------------------------------------------------- |
| Language   | TypeScript strict                                                               |
| Framework  | Svelte 5 Runes mode only                                                        |
| Styling    | Tailwind CSS 4 + CSS variables + fluidui.css                                    |
| Testing    | Playwright end to end                                                           |
| Runtime    | Node 24+ native TS, no tsx or ts-node                                           |
| Formatting | oxfmt                                                                           |
| Linting    | oxlint                                                                          |
| Imports    | Node subpath `#src/*`, relative `./` and `../` for same or single parent folder |

## Naming Conventions

- No shorthand names (`button` not `btn`, `configuration` not `cfg`).
- `PascalCase` for Svelte components and type aliases.
- `camelCase` for variables, functions, helper files.
- `kebab-case` for registry slugs.

## Components

Base (`fluid-ui-svelte/base`): Button, Canvas, Container, Form, Image, InputField, Label, Link, List, Table, Text.

Components (`fluid-ui-svelte/components`): Accordion, AnchoredOverlay, CalendarGrid, Carousel, CodeBlock, Draggable, Drawer, Dropzone, ImageCrop, Modal, Page, Pagination, Switch, TimePicker.

Prebuilt (`fluid-ui-svelte/prebuilt`): Breadcrumb, InternationalInput, NotificationArea, SearchableSelector.

See `src/documentation/documentation.ts` for full `documentationRegistry` with descriptions and props. Props are derived strictly from source.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
