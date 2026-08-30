# Documentation Guideline

Directives for generating `+page.svelte` documentation for Fluid UI Svelte components.

## Core Rules

- **Internal Project Context**: Being provided this guideline implies documentation is being created _within_ the library project.
- **Internal Imports**: In the `<script>` tag of the documentation page, do **not** use `import { ... } from 'fluid-ui-svelte'`. Instead, use internal paths to the library's index files (e.g., `import { Button } from '$lib/base';` or `import { Accordion } from '$lib/components';`).
- **Prerequisites**: You must be provided with at least one existing documentation example and the `documentation_guideline.md` file before creating a new documentation page.
- **Use Source Code**: Derive props and details strictly from component source.
- **Technical Tone**: Professional, clear, and concise.
- **No New Files**: Edit only the provided `+page.svelte`.
- **Library Components**: Use `Text`, `Table`, `CodeBlock`, etc., from the library instead of raw HTML.

## Page Structure

1. **Title**: Use `<Text type="h1">Component Name</Text>`.
2. **Summary**: Brief description using `<Text>`.
3. **Props Table**: `<Text type="h2">Props</Text>` followed by `<Table>` with columns: `Prop`, `Type`, `Default`, `Description`.
4. **Variants**: `<Text type="h2">Samples and Variants</Text>`. For each: `<Text type="h3">`, description, and rendered component.
5. **Usage**: `<Text type="h2">Usage</Text>` followed by `<CodeBlock>`. The code inside `CodeBlock` should show the **external** import path (`fluid-ui-svelte`) for end-users.

## Examples

### Internal Imports (Script Tag)

```svelte
<script>
  import { Button, Text, Table, CodeBlock } from "$lib/base";
  // Use $lib/components for items in the components folder
</script>
```

### Title & Summary

```svelte
<Text type="h1">Button</Text>
<Text>Standard interactive button component.</Text>
```

### Usage (Showing External Path for Users)

```svelte
<Text type="h2">Usage</Text>
<CodeBlock
  code={`
<script>
  import { Button } from 'fluid-ui-svelte';
</script>

<Button variant="primary">Click Me</Button>
`}
/>
```

# Programming Guidelines

## Introduction

Agents operating in this project must strictly follow these guidelines. If any instruction or project state is confusing, you must ask for clarification before proceeding. Always verify your actions and ensure they align with the established patterns of this codebase.

## Core Principles

This project follows a **procedural and functional approach** to programming. Code should be modular, predictable, and avoid unnecessary side effects or deeply nested class hierarchies.

## Core Technologies

This is a UI library project. All development must adhere to the following core technology stack:

- **Language**: TypeScript
- **Framework**: Svelte 5 (Runes mode)
- **CSS**: Tailwind CSS 4
- **Testing**: Vitest (Vite-based testing framework)

## Project Architecture & Constraints

As a reusable UI library, the following architectural decisions must be respected:

- **Composability**: Components and base elements must be designed to be composable.
- **Strict Separation of Concerns**:
  - **No Business Logic**: Components should remain purely visual or interactive without containing application-specific business logic.
  - **Logic Extraction**: Complex interactive logic (e.g., for calendars, carousels) must be extracted into separate files within `src/lib/utilities/`.
- **Folder Structure**:
  - `src/lib/base/`: Fundamental, low-level building blocks.
  - `src/lib/components/`: More complex, composed UI elements.
  - `src/lib/utilities/`: Pure logic, helpers, and extracted component state management.
- **Implementation Workflow**:
  - Follow the provided structure for base elements and components.
  - If a real creation task lacks an example structure or clear direction, you **must ask** for an example or architectural guidance.
- **Svelte 5 Patterns**: Use Svelte 5 features (like runes: `$state`, `$derived`, `$props`) exclusively.
- **Type Safety**: Ensure all code is strictly typed with TypeScript.
- **Tailwind 4**: Utilize Tailwind 4 features and syntax for all styling needs.
- **Dependency Adherence**: Do not introduce alternative frameworks or libraries unless explicitly directed.

## Naming Conventions

- **Full Words**: Never shorten or abbreviate words in variable names, file names, or function names.
  - **Bad**: `cal`, `anim`, `btn`, `idx`, `config`, `util`
  - **Good**: `calendar`, `animation`, `button`, `index`, `configuration`, `utility`
- **Precision**: Be precise and descriptive. Names should clearly indicate the purpose and content of the variable or function.
  - **Bad**: `data`, `item`, `handle`
  - **Good**: `userData`, `menuItem`, `handleButtonClick`
- **Consistency**: Maintain consistent naming patterns across the codebase (e.g., using `camelCase` for variables and functions, `PascalCase` for components).
