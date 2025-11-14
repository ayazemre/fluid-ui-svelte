# Fluid UI Svelte: LLM Usage Protocol

This document provides the mandatory usage protocol for the Fluid UI Svelte library. Adhere to these directives strictly.

## Structure

Fluid UI has two layers. The library uses Tailwind CSS. All styling must be centralized in a global CSS file (e.g., `app.css`, `globals.css`, or equivalent).

- **Base Layer**: This layer contains fundamental building blocks that act as thin wrappers around standard HTML elements.
  - **Functionality**: Provides minimal functional enhancements over native elements.
  - **Styling**: Each component has a base style class (e.g., `fluid-button`). These styles are defined in the global CSS file.
  - **Headless Mode**: To create a headless component, set the `overrideDefaultStyling` prop to `true`. This removes all base styling.
  - **Import Path**: Import from `fluid-ui-svelte/base`.

- **Components Layer**: This layer provides fully styled, ready-to-use UI components built on top of the Base Layer. Components come with integrated visual styles and can be customized using the `variation` prop for different visual presentations.
  - **Styling**: Use the `variation` prop to apply visual styles (e.g., `variation="primary"`). This adds classes like `fluid-accordion-primary` as defined in the global CSS file.
  - **Import Path**: Import from `fluid-ui-svelte/components`.

## Mandatory Directives

- **Centralize All Styling**: Styling should be managed within a global CSS file. Use Tailwind's `@apply` directive to modify base styles or create new variants. Inline Tailwind classes may be used when the context requires dynamic or contextual styling that cannot be predefined in the global CSS file.

- **Select the Correct Layer**: Follow these rules for layer selection in strict priority order.
  - **Use the Components Layer First**: Prefer Components Layer for rapid UI construction when a pre-styled component with the required `variation` meets your requirements.
  - **Use the Base Layer as a Secondary Option**: Use Base Layer components to build custom implementations or when you need core functionality with completely custom visual design.
  - **Try to Use Base Layer Before Native HTML**: Attempt to use Base Layer components as much as possible. Only resort to native HTML elements when a Base Layer component is not available for your use case.

- **Utilize Headless Mode for Customization**: If a Base Layer component's style is not suitable for your use case, set `overrideDefaultStyling={true}`. This removes all library-applied classes. Apply your own Tailwind classes directly to the component.

- **Strictly Use Svelte 5 and Runes**: All generated code must use Svelte 5 syntax, including Runes (`$props`, `$state`, `$effect`, etc.). Do not generate code using syntax from any older Svelte version. If internet search is available, consult https://svelte.dev/docs for the most current syntax.

## Component Reference

This section details the available components in each layer. Use this as the definitive source for component APIs.

### Base Layer Components

Base Layer components are functional wrappers around HTML elements. Use them for custom implementations.

#### `Button`

**Description**: Renders a standard HTML `<button>` element with minimal functionality enhancements.

**Import Path**: `import { Button } from 'fluid-ui-svelte/base';`

**Props**:

| Prop                     | Type                              | Default      | Description                                                                     |
| :----------------------- | :-------------------------------- | :----------- | :------------------------------------------------------------------------------ |
| `onclick`                | `(event, state) => Promise<void>` | **Required** | Async event handler. Set `state.inProgress` to manage loading state.            |
| `overrideDefaultStyling` | `boolean`                         | `false`      | If `true`, removes the base `fluid-button` class.                               |
| `loadingPlaceholder`     | `Snippet`                         | `undefined`  | Svelte Snippet to render when `onclick` is in progress.                         |
| `...rest`                | `HTMLButtonAttributes`            | `—`          | All other standard `<button>` attributes (except `onclick`) are passed through. |

#### `Container`

**Description**: Renders a semantic HTML container element with minimal functionality enhancements. Supports multiple element types and custom transitions.

**Import Path**: `import { Container } from 'fluid-ui-svelte/base';`

**Props**:

| Prop                     | Type                                                                                    | Default     | Description                                                    |
| :----------------------- | :-------------------------------------------------------------------------------------- | :---------- | :------------------------------------------------------------- |
| `type`                   | `'div' \| 'nav' \| 'section' \| 'main' \| 'header' \| 'footer' \| 'aside' \| 'article'` | `'div'`     | The semantic HTML element type to render.                      |
| `transitionFn`           | `(node: Element, params?: any) => TransitionConfig`                                     | `() => {}`  | Svelte transition function to apply to the element.            |
| `transitionParams`       | `TransitionConfig`                                                                      | `undefined` | Parameters to pass to the transition function.                 |
| `overrideDefaultStyling` | `boolean`                                                                               | `false`     | If `true`, removes the base `fluid-container` class.           |
| `...rest`                | `HTMLAttributes`                                                                        | `—`         | All other standard HTML element attributes are passed through. |

#### `Image`

**Description**: Renders a standard HTML `<img>` element with minimal functionality enhancements.

**Import Path**: `import { Image } from 'fluid-ui-svelte/base';`

**Props**:

| Prop                     | Type                | Default      | Description                                               |
| :----------------------- | :------------------ | :----------- | :-------------------------------------------------------- |
| `src`                    | `string`            | **Required** | The image source URL.                                     |
| `alt`                    | `string`            | **Required** | Alternative text for the image.                           |
| `overrideDefaultStyling` | `boolean`           | `false`      | If `true`, removes the base `fluid-image` class.          |
| `...rest`                | `HTMLImgAttributes` | `—`          | All other standard `<img>` attributes are passed through. |

#### `InputField`

**Description**: Renders a standard HTML `<input>` element with minimal functionality enhancements. Supports character filtering.

**Import Path**: `import { InputField } from 'fluid-ui-svelte/base';`

**Props**:

| Prop                     | Type                   | Default     | Description                                                           |
| :----------------------- | :--------------------- | :---------- | :-------------------------------------------------------------------- |
| `value`                  | `string`               | `''`        | The input field value (bindable).                                     |
| `type`                   | `'text' \| 'password'` | `'text'`    | The input field type.                                                 |
| `characterFilter`        | `Array<string>`        | `undefined` | Array of characters to allow. Filters input to only these characters. |
| `overrideDefaultStyling` | `boolean`              | `false`     | If `true`, removes the base `fluid-input-field` class.                |
| `...rest`                | `HTMLInputAttributes`  | `—`         | All other standard `<input>` attributes are passed through.           |

#### `Link`

**Description**: Renders a standard HTML `<a>` element with minimal functionality enhancements. Handles client-side navigation.

**Import Path**: `import { Link } from 'fluid-ui-svelte/base';`

**Props**:

| Prop                     | Type                   | Default      | Description                                             |
| :----------------------- | :--------------------- | :----------- | :------------------------------------------------------ |
| `href`                   | `string`               | **Required** | The link destination URL.                               |
| `overrideDefaultStyling` | `boolean`              | `false`      | If `true`, removes the base `fluid-link` class.         |
| `...rest`                | `HTMLAnchorAttributes` | `—`          | All other standard `<a>` attributes are passed through. |

#### `Text`

**Description**: Renders a semantic HTML text element with minimal functionality enhancements. Supports multiple text element types.

**Import Path**: `import { Text } from 'fluid-ui-svelte/base';`

**Props**:

| Prop                     | Type                                                                                                                                                                          | Default | Description                                                    |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------- |
| `type`                   | `'p' \| 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'span' \| 'pre' \| 'code' \| 'b' \| 'strong' \| 'i' \| 'em' \| 'mark' \| 'small' \| 'del' \| 'ins' \| 'sub' \| 'sup'` | `'p'`   | The semantic HTML text element type to render.                 |
| `overrideDefaultStyling` | `boolean`                                                                                                                                                                     | `false` | If `true`, removes the base `fluid-text` class.                |
| `...rest`                | `HTMLAttributes<HTMLParagraphElement & HTMLHeadingElement & HTMLSpanElement>`                                                                                                 | `—`     | All other standard HTML element attributes are passed through. |

### Components Layer

Components Layer provides fully styled, ready-to-use UI components built on top of the Base Layer. These components come with predefined visual styles and can be customized using the `variation` prop.

#### `Accordion`

**Description**: A collapsible content container that expands and collapses with smooth transitions. Built on top of the Base Layer Button and Container components.

**Import Path**: `import { Accordion } from 'fluid-ui-svelte/components';`

**Props**:

| Prop                 | Type                                                | Default      | Description                                                                                         |
| :------------------- | :-------------------------------------------------- | :----------- | :-------------------------------------------------------------------------------------------------- |
| `variation`          | `string`                                            | `''`         | CSS class variation to apply styling (e.g., `'primary'`). Applied as `fluid-accordion-{variation}`. |
| `header`             | `Snippet<[options: { isExpanded: boolean }]>`       | **Required** | Svelte Snippet for the accordion header. Receives `isExpanded` state.                               |
| `body`               | `Snippet`                                           | **Required** | Svelte Snippet for the accordion body content.                                                      |
| `transitionFunction` | `(node: Element, params?: any) => TransitionConfig` | `slide`      | Svelte transition function for expand/collapse animation.                                           |
| `transitionDuration` | `number`                                            | `250`        | Duration of the transition animation in milliseconds.                                               |

#### `Calendar`

**Description**: A date range picker component that displays a calendar grid. Users can select start and end dates with optional visual styling for selected ranges. Built on top of the Base Layer Button, Text, and Container components.

**Import Path**: `import { Calendar } from 'fluid-ui-svelte/components';`

**Props**:

| Prop              | Type      | Default                    | Description                                                                                      |
| :---------------- | :-------- | :------------------------- | :----------------------------------------------------------------------------------------------- |
| `variant`         | `string`  | `''`                       | CSS class variation to apply styling (e.g., `'primary'`). Applied as `fluid-calendar-{variant}`. |
| `currentDate`     | `string`  | Current date in ISO format | The date to display in the calendar (ISO 8601 string format).                                    |
| `startDate`       | `string`  | `undefined`                | The selected start date (bindable). Set by the component when a date is selected.                |
| `endDate`         | `string`  | `undefined`                | The selected end date (bindable). Set by the component when a date range is selected.            |
| `hideRollingDays` | `boolean` | `false`                    | If `true`, hides days from previous/next months in the calendar grid.                            |

## Best Practices

Follow these practices to use Fluid UI Svelte efficiently and maintain consistency across your application.

### 1. Layer Selection Priority

Always follow this hierarchy when selecting components:

1. **Components Layer First**: Check if a Components Layer component with the required `variation` meets your needs. Use it for rapid development.
2. **Base Layer Second**: If no suitable Components Layer component exists, use a Base Layer component to build your custom component.
3. **Native HTML Last**: Only use native HTML elements when neither Components Layer nor Base Layer components are available.

### 2. Styling Strategy

- **Define all theme styles in the global CSS file** using Tailwind's `@apply` directive. This ensures consistency across the application.
- **Use `variation` props for predefined styles** instead of applying inline classes to Components Layer components.
- **Apply inline Tailwind classes only for dynamic or contextual styling** that cannot be predefined (e.g., responsive layouts, conditional visibility).
- **Use `overrideDefaultStyling={true}` sparingly** — only when a component's default styling is fundamentally incompatible with your design.

### 3. Component Composition

- **Build custom components on top of Base Layer components**, not native HTML. This ensures consistency with the library's design system.
- **Use Snippets for flexible content**: Pass content to components via Snippet props rather than trying to work around component limitations.
- **Leverage bindable props** like `value` in InputField and date range properties in Calendar for two-way data binding with `$bindable()`.

### 4. State Management

- **Keep component state local** using `$state()` for simple, isolated state.
- **Use bindable props** to expose mutable state to parent components when needed.
- **Leverage `$effect()`** for reactive updates based on prop changes, similar to the Calendar component's `currentDate` example.

### 5. Async Handlers

- **Use the Button's `onclick` pattern** with the async handler signature: `(event, state) => Promise<void>`.
- **Set `state.inProgress = true`** during async operations to trigger loading states.
- **Provide `loadingPlaceholder` Snippets** to give users visual feedback during long-running operations.

### 6. Accessibility

- **Always provide semantic HTML** by using appropriate element types (e.g., `type="h1"` for headings instead of styled text).
- **Include alternative text** for images using the `alt` prop.
- **Ensure proper link semantics** by using the Link component for all navigation.

### 7. Code Organization

- **Import only what you need** from `fluid-ui-svelte/base` or `fluid-ui-svelte/components`.
- **Group related styling** in the global CSS file by component type (e.g., all button variations together).
- **Use meaningful `variation` names** that reflect their purpose (e.g., `'primary'`, `'danger'`, `'disabled'`).

### 8. Performance

- **Avoid unnecessary re-renders** by using `overrideDefaultStyling={true}` and custom classes only when required.
- **Memoize event handlers** in Components Layer components to prevent recreation on every render.
- **Use Transitions appropriately**: Set reasonable `transitionDuration` values to avoid performance issues with rapid interactions.

## Agent Usage Workflow

This section provides a mandatory workflow for AI agents (LLMs) when creating UI with Fluid UI Svelte. Follow these steps in strict order to ensure consistency and adherence to library standards. This workflow applies to creating complete pages, UI portions, isolated components, or any combination thereof.

### Step 1: Analyze the Prompt

**Objective**: Understand the requirements and gather context.

- **Read the prompt carefully** to identify:
  - What UI needs to be created (e.g., full page, section, isolated element).
  - Any specific visual requirements or `variation` styles mentioned.
  - Target use case (e.g., form input, navigation, data display, page layout).
  - Any constraints or preferences stated.
- **Identify the appropriate layer** based on the requirements:
  - Does a Components Layer element with the required styling exist? If yes, prioritize it.
  - If not, determine which Base Layer elements are needed.

### Step 2: Locate and Examine the Global CSS File

**Objective**: Understand available styles and class names before creating UI.

- **Search for the global CSS file** in common locations:
  - `src/app.css`
  - `src/globals.css`
  - `src/styles/global.css`
  - `src/index.css`
  - Any file referenced in the SvelteKit configuration or main entry point.
- **If the global CSS file is found**:
  - Review available `fluid-*` class definitions and their variations.
  - Note which classes match the requirements from the prompt.
  - Identify any predefined `@apply` rules or Tailwind extensions.
  - Use only these predefined classes when building UI.
- **If the global CSS file cannot be found**:
  - Ask the user to provide the global CSS file or confirm its location.
  - Request the user to share relevant style definitions for the UI being created.
  - Do not proceed until you have visibility into available styles.

### Step 3: Design the UI Structure

**Objective**: Plan the UI before writing code.

- **Select elements** based on the layer hierarchy:
  1. Check if a Components Layer element with the required `variation` exists and fits the requirements.
  2. If not, select appropriate Base Layer elements as building blocks.
  3. Only consider native HTML if neither layer provides suitable elements.
- **Plan prop bindings**:
  - Identify which props need to be bindable (using `$bindable()`) for parent-child data flow.
  - Plan state management using `$state()` for internal UI state.
  - Plan event handlers and async operations using the Button `onclick` pattern if applicable.
- **Plan content slots**:
  - Determine which content should be passed via Snippets.
  - Plan reactive updates using `$effect()` if prop changes require UI updates.

### Step 4: Generate UI Code

**Objective**: Write the UI following Fluid UI Svelte conventions.

- **Use Svelte 5 syntax exclusively**:
  - Use `$props` for props (e.g., `let { variation = '' } = $props();`).
  - Use `$state()` for internal state.
  - Use `$effect()` for reactive side effects.
  - Avoid any Svelte 4 or earlier syntax.
- **Apply styling**:
  - Use only `fluid-*` classes found in the global CSS file.
  - Pass the `variation` prop to construct class names (e.g., `fluid-accordion-{variation}`).
  - Apply inline Tailwind classes **only** for dynamic or contextual styling that cannot be predefined.
  - Set `overrideDefaultStyling={true}` only when absolutely necessary.
- **Follow composition best practices**:
  - Build on top of Base Layer or Components Layer elements, not native HTML.
  - Use Snippets for flexible content slots.
  - Use bindable props for two-way data binding where appropriate.

### Step 5: Monitor for Repeating Patterns

**Objective**: Identify opportunities for CSS optimization without editing the global CSS file.

- **As you create the UI**, observe if the same inline Tailwind class combinations appear repeatedly across multiple elements.
- **If repeating inline patterns emerge**:
  - **Do not edit the global CSS file directly**.
  - Instead, **suggest to the user** that these patterns could be extracted into a reusable class in the global CSS file.
  - Provide concrete examples of which patterns repeat and where.
  - Recommend the new class name and the `@apply` rule that would encapsulate the pattern (e.g., `@apply flex gap-2 items-center;`).
  - Explain how adding this class would improve maintainability and consistency.
- **Example suggestion format**:

  ```
  I notice the inline classes "flex gap-2 items-center" appear 3 times in this UI.
  Consider adding a utility class to your global CSS:

  .fluid-flex-center {
    @apply flex gap-2 items-center;
  }

  This would allow us to replace inline classes and improve consistency across your application.
  ```

### Step 6: Deliver the Solution

**Objective**: Present the generated UI with clear guidance.

- **Provide the UI code** with clear explanations of:
  - Which layer elements are used and why.
  - How to use the UI (required props, optional props, Snippet usage).
  - Any styling assumptions based on the global CSS file.
- **Include suggestions** for any repeating patterns discovered during development (from Step 5).
- **Provide integration guidance**:
  - Specify the import paths used.
  - Clarify any bindable props and how to use them in parent components.
  - Explain any async handlers or event callbacks.

### Checklist for Agents

Before delivering a solution, verify:

- [ ] Global CSS file was located and examined (or user was asked to provide it).
- [ ] UI follows the layer selection hierarchy (Components → Base → Native).
- [ ] Svelte 5 syntax is used exclusively (no Svelte 4 or earlier code).
- [ ] All styling uses predefined `fluid-*` classes from the global CSS file.
- [ ] Inline Tailwind classes are used only for dynamic/contextual styling.
- [ ] UI composition uses Base Layer or Components Layer elements, not native HTML.
- [ ] Repeating inline patterns were identified and suggested for CSS optimization (without editing the global CSS file).
- [ ] Import paths are correct (`fluid-ui-svelte/base` or `fluid-ui-svelte/components`).
- [ ] Documentation or comments clarify UI usage.
