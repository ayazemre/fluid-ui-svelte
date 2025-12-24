# Folder Structure Guideline

## Introduction
This document defines the organization of the codebase. Agents must adhere to these structural rules when creating or moving files. Consistency in folder organization is critical for the maintainability of this UI library.

## Source Code (`src/lib/`)
The core of the library resides in `src/lib/`, divided into three primary categories:

### 1. Base Elements (`src/lib/base/`)
- **Purpose**: Low-level, fundamental building blocks that act as simple wrappers over native HTML elements.
- **Complexity**: Must not contain complex logic. 
- **Size Constraint**: Files should generally stay under 100 lines of code.
- **Agent Rule**: If a base element exceeds 100 lines or requires significant logic, you **must notify the user** and suggest moving it to the `components` folder.

### 2. Components (`src/lib/components/`)
- **Purpose**: More complex UI elements often composed of multiple base elements or requiring internal state management.
- **Logic**: Can contain component-specific state logic, but complex procedural logic should be moved to `utilities`.

### 3. Utilities (`src/lib/utilities/`)
- **Purpose**: Extracted logic, TypeScript helpers, and pure functions.
- **Constraint**: No Svelte components are allowed here; only `.ts` files.

## Documentation (`src/routes/`)
- **documentation/**: Contains the library's documentation site, structured by component category.
- **Documentation Pages**: Each component category (base/components) has a corresponding route for live examples and API docs.
- **Agent Rule**: When creating a documentation page, you **must be provided** with the `documentation_guideline.md` file and at least one existing documentation example. If not provided, you must ask for them.

## Testing (`tests/`)
- Contains Vitest unit and integration tests, mirroring the structure of `src/lib/`.
- File naming convention: `ComponentName.svelte.test.ts`.