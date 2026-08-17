import { page } from "@vitest/browser/context";
import { createRawSnippet } from "svelte";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-svelte";

import { Modal } from "#src/lib/components/index.ts";

describe("Modal", () => {
  test("Default", async () => {
    const { rerender } = render(Modal, {
      children: createRawSnippet(() => ({
        render: () => "<span>Modal Content</span>",
      })),
      componentId: "modal-default",
      isOpen: false,
    });

    // Should not be in the document initially
    await expect.element(page.getByTestId("modal-default")).not.toBeInTheDocument();

    // Open modal
    await rerender({ isOpen: true });

    const modalContainer = page.getByTestId("modal-default");
    await expect.element(modalContainer).toBeInTheDocument();
    await expect.element(modalContainer).toHaveClass("fluid-modal-container");
    await expect.element(modalContainer).toHaveAttribute("role", "dialog");
    await expect.element(modalContainer).toHaveAttribute("aria-modal", "true");

    // Check panel
    const modalPanel = page.getByTestId("modal-default-panel");
    await expect.element(modalPanel).toBeInTheDocument();
    await expect.element(modalPanel).toHaveClass("fluid-modal-panel");
    expect(modalPanel.element().textContent).toContain("Modal Content");
  });

  test("Interaction", async () => {
    let isOpen = true;

    render(Modal, {
      children: createRawSnippet(() => ({
        render: () => "<span>Content</span>",
      })),
      closeOnBackdropClick: true,
      componentId: "modal-interaction",
      get isOpen() {
        return isOpen;
      },
      set isOpen(value) {
        isOpen = value;
      },
    });

    const modalContainer = page.getByTestId("modal-interaction");
    const modalPanel = page.getByTestId("modal-interaction-panel");

    // Click panel (should NOT close due to stopPropagation)
    await modalPanel.click();
    expect(isOpen).toBe(true);

    // Click backdrop (the container itself)
    await modalContainer.click({ position: { x: 0, y: 0 } });

    // Small wait for state update
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(isOpen).toBe(false);
  });

  test("Variant", async () => {
    render(Modal, {
      children: createRawSnippet(() => ({
        render: () => "<span>Content</span>",
      })),
      componentId: "modal-variant",
      isOpen: true,
      variant: "custom-variant",
    });

    const modalContainer = page.getByTestId("modal-variant");
    await expect.element(modalContainer).toHaveClass("custom-variant");

    const modalPanel = page.getByTestId("modal-variant-panel");
    await expect.element(modalPanel).toHaveClass("custom-variant");
  });
});
