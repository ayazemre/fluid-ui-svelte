import { page } from "@vitest/browser/context";
import { createRawSnippet } from "svelte";
import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import { Draggable } from "#src/lib/components/index.ts";

describe("Draggable", () => {
  test("Default", async () => {
    render(Draggable, {
      children: createRawSnippet(() => ({
        render: () => "<span>Drag Me</span>",
      })),
      componentId: "draggable-test",
    });

    const element = page.getByTestId("draggable-test");
    await expect.element(element).toBeInTheDocument();
    await expect.element(element).toHaveAttribute("draggable", "true");
    await expect.element(element).toHaveClass("fluid-draggable");
    await expect.element(element).toHaveTextContent("Drag Me");
  });

  test("Variant", async () => {
    render(Draggable, {
      children: createRawSnippet(() => ({
        render: () => "<span>Content</span>",
      })),
      componentId: "draggable-variant",
      variant: "primary",
    });

    const element = page.getByTestId("draggable-variant");
    await expect.element(element).toHaveClass("primary");
  });

  test("ondragstart event", async () => {
    const ondragstart = vi.fn();
    render(Draggable, {
      children: createRawSnippet(() => ({
        render: () => "<span>Drag Me</span>",
      })),
      componentId: "draggable-event",
      ondragstart,
    });

    const element = page.getByTestId("draggable-event");

    // In browser mode, we can dispatch events
    element.element().dispatchEvent(new DragEvent("dragstart"));
    expect(ondragstart).toHaveBeenCalled();
  });
});
