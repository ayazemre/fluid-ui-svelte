# Testing Guidelines

## Introduction

This document establishes the testing protocols for the Fluid UI Svelte library. Strict adherence to these guidelines ensures the reliability and stability of the library across all components and utilities.

## Core Principles

- **Reliability**: Tests must be deterministic and flaky tests are not tolerated.
- **Coverage**: All components and utilities must have accompanying tests.
- **Isolation**: Unit tests should test components in isolation.

## Tech Stack

- **Framework**: Vitest
- **Browser Environment**: Playwright (via Vitest Browser Mode)
- **Assertions**: Vitest built-in assertions + `vitest-dom` matchers.

## Test Structure

Tests mirror the source directory structure:

### 1. Base Elements (`tests/base/`)

- **Focus**: Verifying standard HTML attributes, basic rendering, and prop passthrough.
- **Naming**: `[ComponentName].svelte.test.ts`

### 2. Components (`tests/components/`)

- **Focus**: Interaction logic, state changes, and composition of base elements.
- **Naming**: `[ComponentName].svelte.test.ts`

### 3. Utilities (`tests/utilities/`)

- **Focus**: Pure function logic and edge cases.
- **Naming**: `[utilityName].test.ts`

## Testing Procedures

### Base Layer Components (`tests/base/`)

Base layer tests must focus on the component's functionality and its wrapping behavior, rather than re-testing native HTML features.

1.  **Default State Verification**:
    - Every test suite **must** start with a `Default` test case.
    - This verifies the component renders correctly with minimal props.

2.  **Prop Spreading & Native Attributes**:
    - Verify that standard HTML attributes (e.g., `id`, `aria-label`, custom `data-*` attributes) passed to the component are correctly spread onto the underlying DOM element.

3.  **Content Projection (Slots/Children)**:
    - Mock children content using a simple element (e.g., `<p>Test Content</p>`).
    - Assert that the passed content is rendered inside the component using `.toContainHTML()`.

4.  **Polymorphism**:
    - If a component can render different HTML tags (e.g., via a `type` prop), you **must** iterate through all supported types and verify the correct tag name is rendered (e.g., `expect(el.element().tagName).toBe('SECTION')`).

5.  **Styling & Class Merging**:
    - **Custom Classes**: Verify that classes passed via the `class` prop are appended to the element's class list.
    - **Override Logic**: Test the `overrideDefaultStyling` prop.
      - When `false` (default): Ensure the base class (e.g., `fluid-container`) is present.
      - When `true`: Ensure the base class is **removed** while keeping custom classes.

6.  **Standard Assertions**:
    - **Test ID Configuration**: `page.getByTestId('your-id')` is configured to target the standard `id` attribute, **not** the Playwright default `data-testid`. Ensure elements in your test render have a unique `id` attribute matching the selector.
    - Use `expect.element(el).toBeInTheDocument()` to verify existence.

### Components Layer Components (`tests/components/`)

Components Layer tests focus on the composition, rendering correctness, and unique interaction logic of complex components.

1.  **Mandatory Props**:
    - **Do NOT** test for missing mandatory props. If the compiler (TypeScript/Svelte 5) enforces a prop, assume the user will provide it. Tests should not fail due to compiler-caught errors.

2.  **Test Case 1: Default Rendering & Structure**:
    - Render the component with minimal/default props.
    - **Selection**: Use `page.getByTestId('your-id')` to select the component wrapper.
    - **Hierarchy Verification**: Verify the internal structure by checking children. For example, use `.element().firstElementChild` to ensure the correct hierarchy (e.g., verifying a Header is the first child).
    - **Children Check**: Verify that all expected internal parts (headers, bodies, buttons, etc.) are present in the DOM.
    - **Class/Tag Check**: Verify that children have the correct tags and default classes applied.

3.  **Test Case 2: Variation Prop**:
    - Most components accept a `variation` prop for theming.
    - Create a test case passing a specific variation string (e.g., `variation="primary"`).
    - **Propagation**: Verify that this variation class is correctly applied to **all** relevant internal elements that support styling variations (wrapper, header, body, etc.).

4.  **Test Case 3: Component-Specific Logic**:
    - Each component has unique behavior (e.g., Accordion expands/collapses, Calendar selects dates).
    - Write specific tests to cover these interactions.
    - Verify state changes (e.g., `aria-expanded` attributes, visibility changes, class updates).

## Best Practices

- **Snippet Mocking**: When using `createRawSnippet` to mock `children` or other snippet props, the `render` function **must** return a valid HTML element (e.g., `<span>Content</span>` or `<p>Content</p>`) instead of plain text. This ensures that the content is properly wrapped and can be reliably targeted or verified within the DOM hierarchy.
- **Verbose Naming**: Use clear and verbose variable names for element handles and locators (e.g., `accordionWrapper`, `headerButtonLocator`) to improve test readability.
- **Structural Precision**: When verifying component composition, prefer accessing children by index (e.g., `.element().children[0]`) or using precise locators with text filters to ensure the expected hierarchy is maintained.
