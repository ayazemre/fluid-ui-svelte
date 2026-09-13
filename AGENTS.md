# Agent Development Guidelines for Fluid UI Svelte

Directives and architectural rules for AI agents developing, maintaining, and creating documentation within the Fluid UI Svelte library.

---

## 1. Architectural Layers & General Ruleset

Fluid UI Svelte is organized into three distinct layers with strict boundaries and composition rules:

### 1.1. Base Layer (`src/lib/base/`)

- Fundamental, low-level semantic wrappers around native HTML elements (Buttons, Inputs, Containers, Tables, Text, Links).
- **Purpose**: Reduce HTML tag fatigue, enforce semantic consistency, and maintain accessibility without imposing heavy styles.
- **Utility Responsibility**: Base Layer elements encapsulate foundational utilities such as class deduplication, class merging, and attribute sanitization.
- **Implementation Constraint**: Base elements can be constructed directly from native HTML elements.
- **Underlying Element Binding**: Every base element must expose an `underlyingElement` prop as a `$bindable` reference typed to the corresponding HTML element or null (e.g., `let { underlyingElement = $bindable(null) }: { underlyingElement?: HTMLElement | null } = $props();`).
- **Style Overrides (`overrideDefaultStyling`)**: Base elements must accept an `overrideDefaultStyling: boolean` prop (default `false`). When `true`, it strips default base styling classes, giving consumers complete unopinionated styling control.

### 1.2. Components Layer (`src/lib/components/`)

- Assembled UI elements (Accordions, Modals, Calendars, Drawers, Dropzones, Switches, Pagination).
- **Purpose & Scope**: Provide focused, cohesive functional primitives. Components deliver distinct functionality and can either be used directly on their own with thin layout wrappers or merged with other components to construct fully ready prebuilt elements.
- **Composition Law**: All components **must** be assembled strictly from Base Layer elements.
- **Style Injection (`variant`)**: Components must accept a `variant: string` prop (or custom class props) so users can inject custom theme classes and override default styling.

### 1.3. Prebuilt Layer (`src/lib/prebuilt/`)

- High-level, fully usable, self-contained domain components (Breadcrumbs, International Inputs, Notification Areas).
- **Purpose**: Combine multiple base and composed components into full turnkey workflows ready for immediate application use.
- **Composition Law**: Prebuilt components **must** compose Base Layer elements and Components Layer elements.
- **Style Injection (`variant`)**: Prebuilt elements must accept a `variant: string` prop so users can inject custom theme classes and override default styling.

### 1.4. General Ruleset

- **Mandatory Element Identifier (`id`) & Scoped Child Identifiers**: Every element across all three layers (Base, Components, Prebuilt) must accept a mandatory `id` prop (`id: string`) passed from the outside. When a component or prebuilt element renders internal child Base Layer elements, it must pass deterministic scoped IDs derived from the parent `id` to each child element (e.g., `${id}-button`, `${id}-header`, `${id}-content`, `${id}-panel`). This ensures deterministic DOM targeting, accessibility attribute associations (such as `aria-labelledby`, `aria-controls`, or `aria-describedby`), and reliable testing hooks.
- **Mandatory Composition Law**: Anything above the Base Layer (components, prebuilt elements, documentation pages, and sample views) **must strictly use Base Layer elements** (e.g., `<Text>`, `<Container>`, `<Button>`, `<Table>`, `<Link>`, `<Canvas>`) rather than raw HTML tags (`<div>`, `<p>`, `<span>`, `<button>`, `<a>`, `<table>`, `<canvas>`).
- **Missing Base Warning**: If a required primitive or attribute wrapper is missing from the Base Layer, the agent **must warn the user** before building components, prebuilt elements, or documentation pages that depend on it.
- **No Redundant Utilities**: Because all higher-level elements compose Base Layer elements, low-level utilities like class deduplication, class merging, or styling cleanup must be handled exclusively by the Base Layer. Higher-level components and prebuilt elements must not perform redundant class deduplication.
- **Prioritize Snippet-Based Passing**: Prioritize Svelte 5 Snippets over complex configuration objects or data arrays whenever delegating custom markup rendering, slots, or item templates. Snippets give consumers flexible composition while maintaining semantic consistency.
- **Internal vs. External Imports**:
  - **Library Code & Internal Documentation**: Use internal paths and module aliases (e.g., `#src/lib/base/index.ts`, `#src/lib/components/index.ts`, `#src/lib/prebuilt/index.ts`). Never import from `"fluid-ui-svelte"` inside the library repository.
  - **Usage Examples in Documentation CodeBlocks**: Show the external package name (`"fluid-ui-svelte"`, `"fluid-ui-svelte/base"`, `"fluid-ui-svelte/components"`, `"fluid-ui-svelte/prebuilt"`) intended for consumer end-users.

---

## 2. Three Architectural Pillars & Separation of Concerns

Every element in Fluid UI Svelte is formed by three core building blocks working in unison:

1. **Reactive UI Markup (`.svelte` files)**: Purely concerned with **WHAT** is rendered on the screen (semantic structure, snippet rendering, and event binding).
2. **Pure TypeScript Logic (`.ts` helper files in the same folder)**: Co-located pure functions containing state machines, calculations, and event handlers imported and bound into the `.svelte` file.
   - **No Business Logic**: Components must remain purely visual and interactive presentation primitives. They must never contain application-specific business logic or domain assumptions.
   - **Pure Functions & Immutability**: Helper functions must be pure, predictable, and avoid side effects.
3. **Central Styling Defaults (`fluidui.css`)**: Holds all default visual styling in dedicated class blocks, enabling flexible centralized theming. Every element must have its own dedicated styling block in `fluidui.css`.

---

## 3. Documentation Guidelines

The documentation system uses a central registry and a dynamic route builder structure. Agents must inspect `src/documentation/documentation.ts` and `src/routes/documentation/[category]/[slug]/` before creating or updating documentation.

### 3.1. Central Registry (`src/documentation/documentation.ts`)

- All component metadata (category, element key, title, description, props definitions) lives centrally in `documentationRegistry`.
- Props definitions must be derived strictly from the component's TypeScript source code.

### 3.2. Documentation Structure for Individual Components

When creating or editing component documentation samples in `src/documentation/samples/`, agents must follow this exact structure using Base Layer components:

1. **Title**: `<Text type="h1">Component Name</Text>`
2. **Summary**: Brief description of the component using `<Text>`
3. **Props Table**: `<Text type="h2">Props</Text>` followed by `<Table>` with columns: `Prop`, `Type`, `Default`, `Description`
4. **Variants**: `<Text type="h2">Samples and Variants</Text>`. For each variant: `<Text type="h3">Variant Name</Text>`, brief description, and the rendered component
5. **Usage**: `<Text type="h2">Usage</Text>` followed by `<CodeBlock>`. The code inside `<CodeBlock>` must display the external import path (`fluid-ui-svelte`) for end-users

Agents must check existing sample files in `src/documentation/samples/` and replicate their exact conventions.

---

## 4. Core Technologies & Code Patterns

- **Language**: TypeScript with strict typing.
- **Framework**: Svelte 5 exclusively in Runes mode (`$state`, `$derived`, `$props`, `$bindable`, `$effect`, `Snippet`).
- **Styling**: Tailwind CSS 4 syntax and CSS variables.
- **Testing**: Playwright for end-to-end integration tests.
- **Runtime**: Node 24+ native execution for TypeScript CLI scripts.

---

## 5. Naming Conventions

- **No Shorthand or Abbreviated Names**: Never use abbreviated variable, file, or function names.
  - Avoid: `btn`, `cal`, `anim`, `idx`, `cfg`, `util`, `opts`, `err`, `ctx`, `doc`, `elem`
  - Use: `button`, `calendar`, `animation`, `index`, `configuration`, `utility`, `options`, `error`, `context`, `document`, `element`
- **Descriptive & Explicit**: Names must clearly state their exact purpose and state.
- **Casing Patterns**:
  - `PascalCase` for Svelte components and type aliases.
  - `camelCase` for variables, functions, and helper files.
  - `kebab-case` for component registry slug identifiers.
