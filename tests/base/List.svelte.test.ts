import { page } from "@vitest/browser/context";
import { createRawSnippet } from "svelte";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-svelte";

import { List } from "#src/lib/base/index.ts";

describe("List", () => {
  test("Default", async () => {
    render(List, {
      "aria-label": "list",
      id: "list-default",
      itemTemplate: createRawSnippet((prop: any) => {
        return {
          render: () => `<span>${prop()}</span>`,
        };
      }),
      items: ["Item 1", "Item 2"],
    });

    // Structure Check
    const list = page.getByTestId("list-default");
    await expect.element(list).toBeInTheDocument();
    expect(list.element().tagName).toBe("UL");

    // Attributes & Content
    expect(list.element().ariaLabel).toBe("list");
    const items = list.element().querySelectorAll("li");
    expect(items.length).toBe(2);
    expect(items[0].textContent).toBe("Item 1");
    expect(items[1].textContent).toBe("Item 2");
  });

  test("Types", async () => {
    const listTypes = ["ul", "ol"];

    for (const listType of listTypes) {
      render(List, {
        id: `list-${listType}`,
        itemTemplate: createRawSnippet((prop: any) => {
          return { render: () => `<p>${prop()}</p>` };
        }),
        items: ["Item"],
        type: listType as any,
      });

      // Polymorphism Check
      const list = page.getByTestId(`list-${listType}`);
      await expect.element(list).toBeInTheDocument();
      expect(list.element().tagName).toBe(listType.toUpperCase());
    }
  });

  test("Styling and itemClass", async () => {
    for (const overrideDefaultStyling of [false, true]) {
      render(List, {
        class: "list-override",
        id: "list-styling-" + overrideDefaultStyling,
        itemClass: "item-override",
        itemTemplate: createRawSnippet((prop: any) => {
          return { render: () => `<p>${prop()}</p>` };
        }),
        items: ["Item"],
        overrideDefaultStyling,
      });

      // Existence Check
      const list = page.getByTestId("list-styling-" + overrideDefaultStyling);
      await expect.element(list).toBeInTheDocument();

      // List Class Validation
      if (overrideDefaultStyling) {
        await expect.element(list).toHaveClass("list-override");
        await expect.element(list).not.toHaveClass("fluid-unordered-list");
      } else {
        await expect.element(list).toHaveClass("fluid-unordered-list");
        await expect.element(list).toHaveClass("list-override");
      }

      // Item Class Validation
      const item = list.element().querySelector("li");
      expect(item).not.toBeNull();
      if (item) {
        if (overrideDefaultStyling) {
          expect(item.classList.contains("item-override")).toBe(true);
          expect(item.classList.contains("fluid-unordered-list-item")).toBe(false);
        } else {
          expect(item.classList.contains("item-override")).toBe(true);
          expect(item.classList.contains("fluid-unordered-list-item")).toBe(true);
        }
      }
    }
  });
});
