import { page } from "@vitest/browser/context";
import { createRawSnippet } from "svelte";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-svelte";

import { Carousel } from "#src/lib/components/index.ts";

describe("Carousel", () => {
  const items = ["Item 1", "Item 2", "Item 3"];
  const itemTemplate = createRawSnippet((props: () => { item: unknown; index: number }) => ({
    render: () => `<div class="test-item">${props().item}</div>`,
  }));

  test("Default", async () => {
    render(Carousel, {
      componentId: "carousel-default",
      itemTemplate,
      items,
    });

    const carousel = page.getByTestId("carousel-default");
    await expect.element(carousel).toBeInTheDocument();
    await expect.element(carousel).toHaveClass("fluid-carousel-container");

    // Check Items
    const renderedItems = carousel.element().querySelectorAll(".fluid-carousel-item");
    expect(renderedItems.length).toBe(3);
    expect(renderedItems[0].textContent).toBe("Item 1");
  });

  test("Variant", async () => {
    render(Carousel, {
      componentId: "carousel-variant",
      itemTemplate,
      items,
      variant: "variant-primary",
    });

    const carousel = page.getByTestId("carousel-variant");
    await expect.element(carousel).toHaveClass("variant-primary");

    const renderedItems = carousel.element().querySelectorAll(".fluid-carousel-item");
    expect(renderedItems[0].classList.contains("variant-primary")).toBe(true);
  });

  test("Orientation", async () => {
    render(Carousel, {
      componentId: "carousel-vertical",
      itemTemplate,
      items,
      orientation: "vertical",
    });

    const carousel = page.getByTestId("carousel-vertical");
    await expect.element(carousel).toHaveClass("flex-col");
    await expect.element(carousel).toHaveClass("overflow-y-auto");
  });

  test("visibleItemCount", async () => {
    render(Carousel, {
      componentId: "carousel-visible",
      itemTemplate,
      items,
      visibleItemCount: 2,
    });

    const carousel = page.getByTestId("carousel-visible");
    const firstItem = carousel.element().querySelectorAll(".fluid-carousel-item")[0] as HTMLElement;

    // flex-basis should be calc(100% / 2)
    expect(firstItem.style.flexBasis).toBe("calc(50%)");
  });
});
