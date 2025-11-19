# LLM Guideline for Generating Fluid UI Svelte Component Documentation

This document provides directives for a Large Language Model (LLM) to generate component documentation pages (`+page.svelte`) for the Fluid UI Svelte library.

## 1. Core Directives

- **Source Code is Mandatory**: You MUST have access to the component's source code to generate accurate documentation. If the source code is not provided, you MUST request it from the user before proceeding. All details, especially regarding props, must be derived from the source code.
- **Target Audience**: The documentation is for developers. The tone should be technical, clear, and concise.
- **File Scope**: You MUST NOT create new files. All documentation generation must occur within the `+page.svelte` file provided by the user in the context.
- **Component Usage**: Adhere to any specific guidelines from the user on how the documentation page should be structured. If no such guidelines are provided, you MUST prioritize using the library's own base components (e.g., `Text`, `Table`, `CodeBlock`). You may use standard HTML elements only when no suitable library component is available for a specific use case.

## 2. Required Information Structure

You must follow this specific structure and order when generating documentation for a component.

1.  **Title**
2.  **Brief Explanation**
3.  **Props Table**
4.  **Samples and Variations**
5.  **Usage Example with Code Block**

---

## 3. Section-by-Section Instructions

### 3.1. Title

- **Content**: The title must be the component's name, formatted as a regular title with spaces (e.g., `Modal Dialog`, `Primary Button`).
- **Format**: Use the `Text` base component with `type="h1"`.

**Example:**

```svelte
<Text type="h1">My Awesome Component</Text>
```

### 3.2. Brief Explanation

- **Content**: Write a one or two-sentence summary describing the component's primary purpose and function.
- **Format**: Use the `Text` base component. The default `type="p"` is appropriate.

**Example:**

```svelte
<Text
	>The MyAwesomeComponent is used to display a customizable notification banner at the top of the
	user's screen.</Text
>
```

### 3.3. Props

- **Content**: List all the properties (`props`) the component accepts. For each prop, provide its name, type, default value (if any), and a clear explanation of what it does.
- **Format**: Use a `Text` component with `type="h2"` for the section title, followed by a `Table` component for the props.

**Example (Table Format):**

```svelte
<Text type="h2">Props</Text>
<Table
	headings={['Prop', 'Type', 'Default', 'Description']}
	data={[
		['visible', 'boolean', 'false', 'Controls the visibility of the component.'],
		['title', 'string', "''", 'The main text to display as a title.'],
		[
			'variant',
			"'info' | 'warning' | 'error'",
			"'info'",
			'Sets the color scheme and icon for the component.'
		]
	]}
/>
```

### 3.4. Samples and Variations

- **Content**: Show all potential samples and variations of the component. This should include live-rendered examples that demonstrate how different props affect its appearance and behavior. Each sample should have a brief description.
- **Format**: Use a `Text` component with `type="h2"` for the main section title. For each variation, use a `Text` component with `type="h3"` as a sub-heading, followed by the rendered component sample.

**Example:**

```svelte
<Text type="h2">Samples and Variations</Text>

<Text type="h3">Default (Info) Variant</Text>
<Text>A basic implementation of the component.</Text>
<MyAwesomeComponent title="This is for your information." />

<Text type="h3">Warning Variant</Text>
<Text>Using the 'warning' variant to alert the user.</Text>
<MyAwesomeComponent title="Something you should know." variant="warning" />
```

### 3.5. Usage

- **Content**: Provide a complete, practical code block demonstrating how to import and use the component within a parent Svelte component. This should be a realistic use case that shows interactivity if applicable.
- **Format**: Use a `Text` component with `type="h2"` for the section title, followed by a `CodeBlock` component containing the Svelte code.

**Example:**

```svelte
<Text type="h2">Usage</Text>
<CodeBlock
	code={`
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
`}
/>
```
