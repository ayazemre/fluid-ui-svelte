# LLM Guideline for Generating Component Documentation

This document provides directives for a Large Language Model (LLM) to generate documentation for UI components, specifically for the Fluid UI Svelte library.

## 1. Core Directives

- **Source Code is Mandatory**: You MUST have access to the component's source code to generate accurate documentation. If the source code is not provided, you MUST request it from the user before proceeding. All details, especially regarding props, must be derived from the source code.
- **Target Audience**: The documentation is for developers. The tone should be technical, clear, and concise.
- **Component Types**: A component can be a 'base component' (a foundational building block) or an 'actual component' (a user-facing element). The documentation structure remains the same for both, but the examples should reflect their intended use.

## 2. Required Information Structure

You must follow this specific structure and order when generating documentation for a component.

1.  **Title**
2.  **Brief Explanation**
3.  **Props**
4.  **Component Samples**
5.  **Usage Example**

---

## 3. Section-by-Section Instructions

### 3.1. Title

- **Content**: The title must be the component's name in PascalCase (e.g., `ModalDialog`, `PrimaryButton`).
- **Format**: Use a Level 1 Markdown Heading (`#`).

**Example:**
`# MyAwesomeComponent`

### 3.2. Brief Explanation

- **Content**: Write a one or two-sentence summary describing the component's primary purpose and function.
- **Format**: A simple paragraph.

**Example:**
`The MyAwesomeComponent is used to display a customizable notification banner at the top of the user's screen.`

### 3.3. Props

- **Content**: List all the properties (`props`) the component accepts. For each prop, provide its name, type, default value (if any), and a clear explanation of what it does.
- **Format**: Use a Level 2 Markdown Heading (`## Props`) followed by a table or a list. A table is preferred for clarity.

**Example (Table Format):**

`## Props`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `visible` | `boolean` | `false` | Controls the visibility of the component. |
| `title` | `string` | `''` | The main text to display as a title. |
| `variant`| `'info' \| 'warning' \| 'error'` | `'info'` | Sets the color scheme and icon for the component. |

### 3.4. Component Samples

- **Content**: Provide 2-3 distinct examples that showcase the component's variations, especially how different props change its appearance or behavior. For instance, show a 'warning' variant vs. an 'error' variant. Each sample should have a brief description.
- **Format**: Use a Level 2 Markdown Heading (`## Component Samples`) followed by sub-headings for each sample and its corresponding code block.

**Example:**

`## Component Samples`

`### Default (Info) Variant`
`A basic implementation of the component.`

```svelte
<MyAwesomeComponent title="This is for your information." />
```

`### Warning Variant`
`Using the 'warning' variant to alert the user.`

```svelte
<MyAwesomeComponent title="Something you should know." variant="warning" />
```

### 3.5. Usage Example

- **Content**: Provide a complete, practical code block demonstrating how to import and use the component within a parent Svelte component. This should be a realistic use case.
- **Format**: Use a Level 2 Markdown Heading (`## Usage Example`) followed by a Svelte code block.

**Example:**

`## Usage Example`

```svelte
<script>
	import MyAwesomeComponent from './MyAwesomeComponent.svelte';
	let showBanner = false;
</script>

<button on:click={() => (showBanner = true)}>Show Banner</button>

{#if showBanner}
	<MyAwesomeComponent
		title="This is an important message!"
		variant="error"
		on:close={() => (showBanner = false)}
	/>
{/if}
```
