# Documentation Guideline

Directives for generating `+page.svelte` documentation for Fluid UI Svelte components.

## Core Rules
- **Internal Project Context**: Being provided this guideline implies documentation is being created *within* the library project.
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
4. **Variations**: `<Text type="h2">Samples and Variations</Text>`. For each: `<Text type="h3">`, description, and rendered component.
5. **Usage**: `<Text type="h2">Usage</Text>` followed by `<CodeBlock>`. The code inside `CodeBlock` should show the **external** import path (`fluid-ui-svelte`) for end-users.

## Examples

### Internal Imports (Script Tag)
```svelte
<script>
  import { Button, Text, Table, CodeBlock } from '$lib/base';
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