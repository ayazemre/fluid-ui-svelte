# Fluid UI Svelte: LLM Usage Protocol

This document provides the mandatory usage protocol for the Fluid UI Svelte library.

## Library Structure
Fluid UI uses Tailwind CSS 4. Styling is centralized in a global CSS file (e.g., `app.css`) using `@apply`.

- **Base Layer (`fluid-ui-svelte/base`)**: Thin wrappers around standard HTML elements. Use `overrideDefaultStyling={true}` for headless mode.
- **Components Layer (`fluid-ui-svelte/components`)**: Fully styled UI components built on the Base Layer. Use the `variation` prop for visual styles.

## Mandatory Directives
- **Styling**: Manage all styles in global CSS. Use inline Tailwind only for dynamic context.
- **Layer Selection**: 
    1. Use **Components Layer** for rapid construction.
    2. Use **Base Layer** for custom designs.
    3. Use **Native HTML** only if no library element is available.
- **Svelte 5**: Use Runes (`$props`, `$state`, `$bindable`, etc.) exclusively.

---

## Component Reference

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
| `loadingPlaceholder`     | `Snippet`                         | `undefined`  | Svelte Snippet to render when `onclick` in progress.                            |
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

#### `List`

**Description**: Renders a semantic HTML list element (`<ul>` or `<ol>`) with a template for items.

**Import Path**: `import { List } from 'fluid-ui-svelte/base';`

**Props**:

| Prop                     | Type                    | Default      | Description                                                   |
| :----------------------- | :---------------------- | :----------- | :------------------------------------------------------------ |
| `type`                   | `'ul' \| 'ol'`          | `'ul'`       | The list element type.                                        |
| `items`                  | `Array<T>`              | `[]`         | Data array to iterate over.                                   |
| `itemTemplate`           | `Snippet<[T]>`          | **Required** | Svelte Snippet to render for each item.                       |
| `overrideDefaultStyling` | `boolean`               | `false`      | If `true`, removes the base `fluid-*` classes.                |
| `...rest`                | `HTMLListAttributes`    | `—`          | All other standard list attributes are passed through.        |

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

#### `Accordion`

**Description**: A collapsible content container with smooth transitions. Built on Base Layer Button and Container.

**Import Path**: `import { Accordion } from 'fluid-ui-svelte/components';`

**Props**:

| Prop                 | Type                                                | Default      | Description                                                                     |
| :------------------- | :-------------------------------------------------- | :----------- | :------------------------------------------------------------------------------ |
| `variation`          | `string`                                            | `''`         | Applied as `fluid-accordion-{variation}`.                                       |
| `header`             | `Snippet<[options: { isExpanded: boolean }]>`       | **Required** | Svelte Snippet for the header. Receives `isExpanded`.                           |
| `body`               | `Snippet`                                           | **Required** | Svelte Snippet for the body content.                                            |
| `transitionFunction` | `(node: Element, params?: any) => TransitionConfig` | `slide`      | Transition for expand/collapse.                                                 |
| `transitionDuration` | `number`                                            | `250`        | Animation duration in ms.                                                       |

#### `Calendar`

**Description**: A date range picker displaying a calendar grid. Built on Base Layer Button, Text, and Container.

**Import Path**: `import { Calendar } from 'fluid-ui-svelte/components';`

**Props**:

| Prop              | Type      | Default                    | Description                                                            |
| :---------------- | :-------- | :------------------------- | :--------------------------------------------------------------------- |
| `variant`         | `string`  | `''`                       | Applied as `fluid-calendar-{variant}`.                                 |
| `currentDate`     | `string`  | Current date in ISO format | The date to display (ISO 8601 string).                                 |
| `startDate`       | `string`  | `undefined`                | Selected start date (bindable).                                        |
| `endDate`         | `string`  | `undefined`                | Selected end date (bindable).                                          |
| `hideRollingDays` | `boolean` | `false`                    | If `true`, hides days from previous/next months.                       |

---

## Best Practices
- **Styling**: Define theme styles in global CSS via `@apply`. Use `variation` for components.
- **Composition**: Build custom elements using Base Layer components. Use Snippets for flexible content.
- **State**: Use `$state()` for local state and `$bindable()` for parent-child flow.
- **Async**: Use Button's `onclick` with `state.inProgress` for loading feedback.

## Agent Workflow
1. **Analyze**: Identify the UI target and appropriate layer.
2. **Scan CSS**: Locate global CSS to identify available `fluid-*` classes.
3. **Plan**: Define structure and prop bindings (runes).
4. **Implement**: Write Svelte 5 TypeScript code using library conventions.
5. **Optimize**: Suggest new global CSS classes for repeating inline patterns.