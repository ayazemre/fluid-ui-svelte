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