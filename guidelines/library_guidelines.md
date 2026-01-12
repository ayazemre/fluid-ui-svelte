# Fluid UI Svelte: LLM Usage Protocol

This document provides the mandatory usage protocol for the Fluid UI Svelte library.

## Library Structure

Fluid UI uses Tailwind CSS 4. Styling is centralized in a global CSS file (e.g., `app.css`) using `@apply`.

- **Base Layer (`fluid-ui-svelte/base`)**: Thin wrappers around standard HTML elements. Use `overrideDefaultStyling={true}` for headless mode.
- **Components Layer (`fluid-ui-svelte/components`)**: Fully styled UI components built on the Base Layer. Use the `variant` prop for visual styles.

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
| `children`               | `Snippet`                         | **Required** | The button content.                                                             |
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
| `children`               | `Snippet`                                                                               | `undefined` | The container content.                                         |
| `transitionFn`           | `(node: Element, params?: any) => TransitionConfig`                                     | `() => {}`  | Svelte transition function to apply to the element.            |
| `transitionParams`       | `TransitionConfig`                                                                      | `undefined` | Parameters to pass to the transition function.                 |
| `overrideDefaultStyling` | `boolean`                                                                               | `false`     | If `true`, removes the base `fluid-container` class.           |
| `...rest`                | `HTMLAttributes`                                                                        | `—`         | All other standard HTML element attributes are passed through. |

#### `Form`

**Description**: Renders a standard HTML `<form>` element that automatically prevents default submission behavior.

**Import Path**: `import { Form } from 'fluid-ui-svelte/base';`

**Props**:

| Prop                     | Type                   | Default      | Description                                            |
| :----------------------- | :--------------------- | :----------- | :----------------------------------------------------- |
| `children`               | `Snippet`              | **Required** | The form content.                                      |
| `overrideDefaultStyling` | `boolean`              | `false`      | If `true`, removes the base `fluid-form` class.        |
| `...rest`                | `HTMLFormAttributes`   | `—`          | All other standard `<form>` attributes passed through. |

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

| Prop                     | Type                               | Default     | Description                                                           |
| :----------------------- | :--------------------------------- | :---------- | :-------------------------------------------------------------------- |
| `value`                  | `string`                           | `''`        | The input field value (bindable).                                     |
| `type`                   | `'text' \| 'password' \| 'textarea'` | `'text'`    | The input field type.                                                 |
| `characterFilter`        | `Array<string>`                    | `undefined` | Array of characters to allow. Filters input to only these characters. |
| `overrideDefaultStyling` | `boolean`                          | `false`     | If `true`, removes the base `fluid-input-field` class.                |
| `oninput`                | `(event) => void`                  | `undefined` | Custom input event handler.                                           |
| `...rest`                | `HTMLInputAttributes`               | `—`         | All other standard `<input>` attributes are passed through.           |

#### `Link`

**Description**: Renders a standard HTML `<a>` element with minimal functionality enhancements. Handles client-side navigation.

**Import Path**: `import { Link } from 'fluid-ui-svelte/base';`

**Props**:

| Prop                     | Type                   | Default      | Description                                             |
| :----------------------- | :--------------------- | :----------- | :------------------------------------------------------ |
| `href`                   | `string`               | **Required** | The link destination URL.                               |
| `children`               | `Snippet`              | **Required** | The link content.                                       |
| `overrideDefaultStyling` | `boolean`              | `false`      | If `true`, removes the base `fluid-link` class.         |
| `...rest`                | `HTMLAnchorAttributes` | `—`          | All other standard `<a>` attributes are passed through. |

#### `List`

**Description**: Renders a semantic HTML list element (`<ul>` or `<ol>`) with a template for items.

**Import Path**: `import { List } from 'fluid-ui-svelte/base';`

**Props**:

| Prop                     | Type                 | Default      | Description                                            |
| :----------------------- | :------------------- | :----------- | :----------------------------------------------------- |
| `type`                   | `'ul' \| 'ol'`       | `'ul'`       | The list element type.                                 |
| `items`                  | `Array<T>`           | `[]`         | Data array to iterate over.                            |
| `itemTemplate`           | `Snippet<[T, number]>` | **Required** | Svelte Snippet to render for each item. Receives index.|
| `itemClass`              | `string`             | `''`         | CSS class applied to individual `<li>` elements.       |
| `overrideDefaultStyling` | `boolean`            | `false`      | If `true`, removes the base `fluid-*` classes.         |
| `...rest`                | `HTMLListAttributes` | `—`          | All other standard list attributes are passed through. |

#### `Table`

**Description**: A flexible component for displaying tabular data with customizable cell rendering.

**Import Path**: `import { Table } from 'fluid-ui-svelte/base';`

**Props**:

| Prop                     | Type                 | Default      | Description                                            |
| :----------------------- | :------------------- | :----------- | :----------------------------------------------------- |
| `caption`                | `string`             | `''`         | Optional table caption.                                |
| `tableHeadItems`         | `Array<T>`           | **Required** | Data for the header row.                               |
| `tableRowItems`          | `Array<Array<U>>`    | **Required** | Data for the body rows.                                |
| `tableFooterItems`       | `Array<V>`           | **Required** | Data for the footer row.                               |
| `headTemplate`           | `Snippet<[T]>`       | **Required** | Snippet for header cells.                              |
| `bodyTemplate`           | `Snippet<[U]>`       | **Required** | Snippet for body cells.                                |
| `footerTemplate`         | `Snippet<[V]>`       | **Required** | Snippet for footer cells.                              |
| `captionClass`           | `string`             | `''`         | CSS class for caption.                                 |
| `headClass`              | `string`             | `''`         | CSS class for thead.                                   |
| `bodyClass`              | `string`             | `''`         | CSS class for tbody.                                   |
| `rowClass`               | `string`             | `''`         | CSS class for tr.                                      |
| `cellClass`              | `string`             | `''`         | CSS class for th/td.                                   |
| `footerClass`            | `string`             | `''`         | CSS class for tfoot.                                   |
| `overrideDefaultStyling` | `boolean`            | `false`      | If `true`, removes the base `fluid-table` classes.     |

#### `Text`

**Description**: Renders a semantic HTML text element with minimal functionality enhancements. Supports multiple text element types.

**Import Path**: `import { Text } from 'fluid-ui-svelte/base';`

**Props**:

| Prop                     | Type                                                                                                                                                                          | Default | Description                                                    |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------- |
| `type`                   | `'p' \| 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'span' \| 'pre' \| 'code' \| 'b' \| 'strong' \| 'i' \| 'em' \| 'mark' \| 'small' \| 'del' \| 'ins' \| 'sub' \| 'sup'` | `'p'`   | The semantic HTML text element type to render.                 |
| `children`               | `Snippet`                                                                                                                                                                     | `—`     | The text content to render.                                    |
| `overrideDefaultStyling` | `boolean`                                                                                                                                                                     | `false` | If `true`, removes the base `fluid-text` class.                |
| `...rest`                | `HTMLAttributes<HTMLParagraphElement & HTMLHeadingElement & HTMLSpanElement>`                                                                                                 | `—`     | All other standard HTML element attributes are passed through. |

### Components Layer

#### `Accordion`

**Description**: A collapsible content container with smooth transitions. Built on Base Layer Button and Container.

**Import Path**: `import { Accordion } from 'fluid-ui-svelte/components';`

**Props**:

| Prop                 | Type                                                | Default      | Description                                           |
| :------------------- | :-------------------------------------------------- | :----------- | :---------------------------------------------------- |
| `variant`            | `string`                                            | `''`         | Applied as `fluid-accordion-{variant}`.               |
| `componentId`        | `string`                                            | `undefined`  | ID applied to the main container.                     |
| `header`             | `Snippet<[options: { isExpanded: boolean }]>`       | **Required** | Svelte Snippet for the header. Receives `isExpanded`. |
| `body`               | `Snippet`                                           | **Required** | Svelte Snippet for the body content.                  |
| `transitionFunction` | `(node: Element, params?: any) => TransitionConfig` | `slide`      | Transition for expand/collapse.                       |
| `transitionDuration` | `number`                                            | `250`        | Animation duration in ms.                             |

#### `DatePicker`

**Description**: A date range picker displaying a calendar grid. Built on Base Layer Button, Text, and Container.

**Import Path**: `import { DatePicker } from 'fluid-ui-svelte/components';`

**Props**:

| Prop              | Type       | Default                    | Description                                      |
| :---------------- | :--------- | :------------------------- | :----------------------------------------------- |
| `variant`         | `string`   | `''`                       | Applied as `fluid-calendar-{variant}`.           |
| `componentId`     | `string`   | `undefined`                | ID applied to the main container.                |
| `currentDate`     | `string`   | Current date in ISO format | The date to display (ISO 8601 string).           |
| `startDate`       | `string`   | `undefined`                | Selected start date (bindable).                  |
| `endDate`         | `string`   | `undefined`                | Selected end date (bindable).                    |
| `weekDays`        | `string[]` | `['Mon', 'Tue', ...]`      | Array of week day names to display in the header.|
| `hideRollingDays` | `boolean`  | `false`                    | If `true`, hides days from previous/next months. |

#### `Carousel`

**Description**: A swipeable carousel component with autoplay and snap functionality.

**Import Path**: `import { Carousel } from 'fluid-ui-svelte/components';`

**Props**:

| Prop               | Type                                     | Default               | Description                                                                 |
| :----------------- | :--------------------------------------- | :-------------------- | :-------------------------------------------------------------------------- |
| `componentId`      | `string`                                 | `crypto.randomUUID()` | Unique ID for the carousel (required for internal logic).                   |
| `variant`          | `string`                                 | `''`                  | Applied as `fluid-carousel-{variant}`.                                      |
| `orientation`      | `'horizontal' \| 'vertical'`             | `'horizontal'`        | Scroll direction.                                                           |
| `snapItems`        | `boolean`                                | `true`                | If `true`, snaps items to center/start on scroll end.                       |
| `activeIndex`      | `number`                                 | `0`                   | Index of the currently visible item (bindable).                             |
| `autoplay`         | `boolean`                                | `false`               | Enables automatic scrolling.                                                |
| `autoplayDuration` | `number`                                 | `1000`                | Duration in ms between autoplay slides.                                     |
| `visibleItemCount` | `number`                                 | `1`                   | Number of items visible at once.                                            |
| `items`            | `Array<T>`                               | **Required**          | Array of data items to render.                                              |
| `itemTemplate`     | `Snippet<[{ item: T; index: number }]>`  | **Required**          | Snippet for rendering each item. Receives `{ item, index }`.                |

#### `CodeBlock`

**Description**: Displays a block of code with syntax highlighting classes and optional line numbers.

**Import Path**: `import { CodeBlock } from 'fluid-ui-svelte/components';`

**Props**:

| Prop              | Type      | Default     | Description                                 |
| :---------------- | :-------- | :---------- | :------------------------------------------ |
| `variant`         | `string`  | `''`        | Applied as `fluid-code-block-{variant}`.    |
| `componentId`     | `string`  | `undefined` | ID applied to the main container.           |
| `code`            | `string`  | `''`        | The source code to display.                 |
| `language`        | `string`  | `''`        | Language suffix for the `language-*` class. |
| `showLineNumbers` | `boolean` | `true`      | If `true`, displays line numbers.           |

#### `Draggable`

**Description**: A wrapper component that enables native HTML5 drag operations for its content.

**Import Path**: `import { Draggable } from 'fluid-ui-svelte/components';`

**Props**:

| Prop           | Type                        | Default | Description                                      |
| :------------- | :-------------------------- | :------ | :----------------------------------------------- |
| `children`     | `Snippet`                   | **Req** | Content to make draggable.                       |
| `ondragstart`  | `(event: DragEvent) => void`| `—`     | Callback when dragging starts.                   |
| `variant`      | `string`                    | `''`    | Applied as `fluid-draggable-{variant}`.          |
| `componentId`  | `string`                    | `''`    | ID applied to the main container.                |

#### `Drawer`

**Description**: A modal drawer that slides in from a specified edge of the screen.

**Import Path**: `import { Drawer } from 'fluid-ui-svelte/components';`

**Props**:

| Prop                   | Type                                     | Default     | Description                                         |
| :--------------------- | :--------------------------------------- | :---------- | :-------------------------------------------------- |
| `isOpen`               | `boolean`                                | `false`     | Controls visibility of the drawer (bindable).       |
| `position`             | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'`    | Edge of the screen the drawer slides from.          |
| `closeOnBackdropClick` | `boolean`                                | `true`      | If `true`, clicking the backdrop closes the drawer. |
| `scrollLock`           | `boolean`                                | `true`      | If `true`, prevents body scroll when open.          |
| `variant`              | `string`                                 | `''`        | Applied as `fluid-drawer-{variant}`.                |
| `componentId`          | `string`                                 | `undefined` | ID applied to the main container.                   |
| `children`             | `Snippet`                                | `undefined` | The content to render inside the drawer panel.      |

#### `Dropzone`

**Description**: An area for receiving files or data via drag and drop events.

**Import Path**: `import { Dropzone } from 'fluid-ui-svelte/components';`

**Props**:

| Prop           | Type                                                     | Default | Description                                      |
| :------------- | :------------------------------------------------------- | :------ | :----------------------------------------------- |
| `data`         | `File[] \| string`                                       | `—`     | Dropped data result (bindable).                  |
| `children`     | `Snippet<[{ isDragOver: boolean; isInvalid: boolean }]>` | **Req** | Content to render inside the zone.               |
| `mode`         | `'file' \| 'text'`                                       | `'file'`| Accept mode.                                     |
| `dropEffect`   | `'copy' \| 'move' \| 'link' \| 'none'`                   | `'copy'`| Visual feedback for drag operation.              |
| `variant`      | `string`                                                 | `''`    | Applied as `fluid-dropzone-{variant}`.           |
| `componentId`  | `string`                                                 | `''`    | ID applied to the main container.                |

#### `ImageCrop`

**Description**: A component for cropping images with zoom and pan support.

**Import Path**: `import { ImageCrop } from 'fluid-ui-svelte/components';`

**Props**:

| Prop           | Type                        | Default | Description                                      |
| :------------- | :-------------------------- | :------ | :----------------------------------------------- |
| `sourceImage`  | `ImageBitmap`               | **Req** | Image to crop.                                   |
| `aspectRatio`  | `{ x: number; y: number }`  | **Req** | Target aspect ratio.                             |
| `resultImage`  | `string`                    | `—`     | Base64 result of crop (bindable).                |
| `zoom`         | `number`                    | `1`     | Zoom level.                                      |
| `pan`          | `{ x: number; y: number }`  | `{0,0}` | Pan offset.                                      |
| `padding`      | `number`                    | `50`    | Padding around crop area.                        |
| `shape`        | `'rectangle' \| 'circle'`   | `'rect'`| Crop area shape.                                 |
| `variant`      | `string`                    | `''`    | Applied as `fluid-image-crop-{variant}`.         |
| `componentId`  | `string`                    | `—`     | ID applied to the main container.                |

#### `Page`

**Description**: A component for setting page metadata (SEO) and consistent layout.

**Import Path**: `import { Page } from 'fluid-ui-svelte/components';`

**Props**:

| Prop           | Type                                     | Default | Description                                      |
| :------------- | :--------------------------------------- | :------ | :----------------------------------------------- |
| `title`        | `string`                                 | **Req** | Page title.                                      |
| `description`  | `string`                                 | **Req** | Meta description.                                |
| `image`        | `string`                                 | `''`    | OG image URL.                                    |
| `siteName`     | `string`                                 | `''`    | OG site name.                                    |
| `url`          | `string`                                 | `''`    | Canonical URL.                                   |
| `keywords`     | `string`                                 | `''`    | Meta keywords.                                   |
| `children`     | `Snippet`                                | `—`     | Main page content.                               |

#### `Switch`

**Description**: A toggle switch component for binary choices.

**Import Path**: `import { Switch } from 'fluid-ui-svelte/components';`

**Props**:

| Prop           | Type                                     | Default | Description                                      |
| :------------- | :--------------------------------------- | :------ | :----------------------------------------------- |
| `onclick`      | `(event, checked) => Promise<void>`      | **Req** | Async toggle handler.                            |
| `checked`      | `boolean`                                | `false` | Toggle state (bindable).                         |
| `disabled`     | `boolean`                                | `false` | Disable interactions.                            |
| `variant`      | `string`                                 | `''`    | Applied as `fluid-switch-{variant}`.             |
| `componentId`  | `string`                                 | `''`    | ID applied to the main container.                |

---

## Best Practices

- **Styling**: Define theme styles in global CSS via `@apply`. Use `variant` for components.

- **Composition**: Build custom elements using Base Layer components. Use Snippets for flexible content.
- **State**: Use `$state()` for local state and `$bindable()` for parent-child flow.
- **Async**: Use Button's `onclick` with `state.inProgress` for loading feedback.

## Agent Workflow

1. **Analyze**: Identify the UI target and appropriate layer.
2. **Scan CSS**: Locate global CSS to identify available `fluid-*` classes.
3. **Plan**: Define structure and prop bindings (runes).
4. **Implement**: Write Svelte 5 TypeScript code using library conventions.
5. **Optimize**: Suggest new global CSS classes for repeating inline patterns.