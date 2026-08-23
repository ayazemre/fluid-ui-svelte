import { createRawSnippet } from "svelte";

import { test, describe } from "node:test";

import { Button } from "#src/lib/base/index.ts";

describe("Button", () => {
  test("Default", async () => {
    render(Button, {
      "aria-label": "button",
      children: createRawSnippet(() => {
        return { render: () => "<p>Button</p>" };
      }),
      id: "button-default",
      onclick: async (event, state) => {
        const button = event.target as HTMLButtonElement;
        button.textContent = "Clicked";
      },
    });

    // Structure Check
    const button = page.getByTestId("button-default");
    await expect.element(button).toBeInTheDocument();
    expect(button.element().tagName).toBe("BUTTON");

    // Attributes & Content
    await expect.element(button).toContainHTML("<p>Button</p>");
    expect(button.element().ariaLabel).toBe("button");

    // Interaction & State Change
    await button.click();
    await expect.element(button).toContainHTML("<p>Clicked</p>");
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
    const button = page.getByTestId("button-loading");
    await expect.element(button).toBeInTheDocument();
    expect(button.element().tagName).toBe("BUTTON");

    // Content & Styling
    await expect.element(button).toContainHTML("<p>Button</p>");
    await expect.element(button).toHaveClass("fluid-button");

    // Loading State (Toggle On)
    await button.click();
    await expect.element(button).toContainHTML("<p>Loading</p>");

    // Reset State (Toggle Off)
    await button.click();
    await expect.element(button).toContainHTML("<p>Button</p>");
  });

  test("No Loading Placeholder", async () => {
    render(Button, {
      children: createRawSnippet(() => {
        return { render: () => "<p>Button</p>" };
      }),
      id: "button-loading",
      onclick: async (event, state) => {
        state.inProgress = !state.inProgress;
      },
    });

    // Initial State
    const button = page.getByTestId("button-loading");
    await expect.element(button).toBeInTheDocument();
    expect(button.element().tagName).toBe("BUTTON");

    // Content & Styling
    await expect.element(button).toContainHTML("<p>Button</p>");
    await expect.element(button).toHaveClass("fluid-button");

    // Interaction (Should not change visually without placeholder)
    await button.click();
    await expect.element(button).toContainHTML("<p>Button</p>");

    await button.click();
    await expect.element(button).toContainHTML("<p>Button</p>");
  });

  test("Styling", async () => {
    for (const overrideDefaultStyling of [true, false]) {
      render(Button, {
        children: createRawSnippet(() => {
          return { render: () => "<p>Button</p>" };
        }),
        class: "override",
        id: "button-override" + overrideDefaultStyling,
        onclick: async (event, state) => {
          state.inProgress = !state.inProgress;
        },
        overrideDefaultStyling,
      });

      // Structure Check
      const button = page.getByTestId("button-override" + overrideDefaultStyling);
      await expect.element(button).toBeInTheDocument();

      // Class Validation
      if (overrideDefaultStyling) {
        await expect.element(button).not.toHaveClass("fluid-button");
        await expect.element(button).toHaveClass("override");
      } else {
        await expect.element(button).toHaveClass("fluid-button");
        await expect.element(button).toHaveClass("override");
      }
    }
  });
});
