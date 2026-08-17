import { page } from "@vitest/browser/context";
import { createRawSnippet } from "svelte";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-svelte";

import { Popover } from "#src/lib/components/index.ts";

describe("Popover", () => {
  test("Default", async () => {
    render(Popover, {
      componentId: "popover-default",
      content: createRawSnippet(() => {
        return { render: () => "<div>Popover Content</div>" };
      }),
      trigger: createRawSnippet(() => {
        return { render: () => "<span>Trigger</span>" };
      }),
    });

    // Structure Check
    const popoverWrapper = page.getByTestId("popover-default");
    await expect.element(popoverWrapper).toBeInTheDocument();
    await expect.element(popoverWrapper).toHaveClass("fluid-popover-container");

    // Trigger Button should be visible
    const triggerButton = popoverWrapper.getByRole("button");
    await expect.element(triggerButton).toBeInTheDocument();
    expect(triggerButton.element().textContent).toContain("Trigger");

    // Content should not be present initially
    await expect.element(page.getByText("Popover Content")).not.toBeInTheDocument();
  });

  test("Interaction", async () => {
    render(Popover, {
      componentId: "popover-interaction",
      content: createRawSnippet(() => {
        return { render: () => "<div>Popover Content</div>" };
      }),
      trigger: createRawSnippet(() => {
        return { render: () => "<span>Open</span>" };
      }),
    });

    const popoverWrapper = page.getByTestId("popover-interaction");
    const triggerButton = popoverWrapper.getByRole("button");

    // Open
    await triggerButton.click();
    await expect.element(page.getByText("Popover Content")).toBeInTheDocument();

    // Content should have correct classes
    const content = page.getByTestId("popover-interaction-content");
    await expect.element(content).toHaveClass("fluid-popover-content");
    await expect.element(content).toHaveClass("fluid-popover-bottom");

    // Close by backdrop
    const backdrop = page.getByTestId("popover-interaction-backdrop");
    await backdrop.click();
    await expect.element(page.getByText("Popover Content")).not.toBeInTheDocument();
  });

  test("Positions", async () => {
    for (const position of ["top", "bottom", "left", "right"] as const) {
      render(Popover, {
        componentId: `popover-${position}`,
        content: createRawSnippet(() => ({ render: () => "<div>Content</div>" })),
        isOpen: true,
        position,
        trigger: createRawSnippet(() => ({ render: () => "<span>Trigger</span>" })),
      });

      const content = page.getByTestId(`popover-${position}-content`);
      await expect.element(content).toHaveClass(`fluid-popover-${position}`);
    }
  });

  test("Variant", async () => {
    render(Popover, {
      componentId: "popover-variant",
      content: createRawSnippet(() => ({ render: () => "<div>Content</div>" })),
      isOpen: true,
      trigger: createRawSnippet(() => ({ render: () => "<span>Trigger</span>" })),
      variant: "custom-variant",
    });

    const popoverWrapper = page.getByTestId("popover-variant");
    await expect.element(popoverWrapper).toHaveClass("custom-variant");

    const content = page.getByTestId("popover-variant-content");
    await expect.element(content).toHaveClass("custom-variant");
  });
});
