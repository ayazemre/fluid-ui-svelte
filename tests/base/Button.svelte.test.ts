import { render, screen, fireEvent } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { describe, expect, test } from "vitest";

import { Button } from "#src/lib/base/index.ts";

describe("Button", () => {
  test("Default", async () => {
    let clicked = false;
    render(Button, {
      "aria-label": "button",
      children: createRawSnippet(() => {
        return { render: () => "<p>Button</p>" };
      }),
      id: "button-default",
      onclick: async () => {
        clicked = true;
      },
    });

    // Structure Check
    const button = screen.getByTestId("button-default");
    expect(button).not.toBeNull();
    expect(button.tagName).toBe("BUTTON");

    // Attributes & Content
    expect(button.innerHTML).toContain("<p>Button</p>");
    expect(button.getAttribute("aria-label")).toBe("button");

    // Interaction & State Change
    await fireEvent.click(button);
    expect(clicked).toBe(true);
  });

  test("Loading Placeholder", async () => {
    render(Button, {
      children: createRawSnippet(() => {
        return { render: () => "<p>Button</p>" };
      }),
      id: "button-loading",
      loadingPlaceholder: createRawSnippet(() => {
        return { render: () => "<p>Loading</p>" };
      }),
      onclick: async (event, state) => {
        state.inProgress = !state.inProgress;
      },
    });

    // Initial State
    const button = screen.getByTestId("button-loading");
    expect(button).not.toBeNull();
    expect(button.tagName).toBe("BUTTON");

    // Content & Styling
    expect(button.innerHTML).toContain("<p>Button</p>");
    expect(button.classList.contains("fluid-button")).toBe(true);

    // Loading State (Toggle On)
    await fireEvent.click(button);
    expect(button.innerHTML).toContain("<p>Loading</p>");

    // Reset State (Toggle Off)
    await fireEvent.click(button);
    expect(button.innerHTML).toContain("<p>Button</p>");
  });

  test("No Loading Placeholder", async () => {
    render(Button, {
      children: createRawSnippet(() => {
        return { render: () => "<p>Button</p>" };
      }),
      id: "button-loading-none",
      onclick: async (event, state) => {
        state.inProgress = !state.inProgress;
      },
    });

    // Initial State
    const button = screen.getByTestId("button-loading-none");
    expect(button).not.toBeNull();
    expect(button.tagName).toBe("BUTTON");

    // Content & Styling
    expect(button.innerHTML).toContain("<p>Button</p>");
    expect(button.classList.contains("fluid-button")).toBe(true);

    // Interaction (Should not change visually without placeholder)
    await fireEvent.click(button);
    expect(button.innerHTML).toContain("<p>Button</p>");

    await fireEvent.click(button);
    expect(button.innerHTML).toContain("<p>Button</p>");
  });
});
