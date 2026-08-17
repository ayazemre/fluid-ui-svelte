import { page } from "@vitest/browser/context";
import { createRawSnippet } from "svelte";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-svelte";

import { Link } from "#src/lib/base/index.ts";

describe("Link", () => {
  test("Default", async () => {
    render(Link, {
      "aria-label": "link",
      children: createRawSnippet(() => {
        return { render: () => "<p>Click Me</p>" };
      }),
      href: "/test",
      id: "link-default",
    });

    // Structure Check
    const link = page.getByTestId("link-default");
    await expect.element(link).toBeInTheDocument();
    expect(link.element().tagName).toBe("A");

    // Attributes & Content
    expect(link.element().ariaLabel).toBe("link");
    await expect.element(link).toHaveAttribute("href", "/test");
    await expect.element(link).toHaveTextContent("Click Me");
    await expect.element(link).toHaveClass("fluid-link");
  });

  test("Styling", async () => {
    for (const overrideDefaultStyling of [true, false]) {
      render(Link, {
        children: createRawSnippet(() => {
          return { render: () => "<p>Link</p>" };
        }),
        class: "override",
        href: "#",
        id: "link-override-" + overrideDefaultStyling,
        overrideDefaultStyling,
      });

      // Existence Check
      const link = page.getByTestId("link-override-" + overrideDefaultStyling);
      await expect.element(link).toBeInTheDocument();

      // Class Validation
      if (overrideDefaultStyling) {
        await expect.element(link).not.toHaveClass("fluid-link");
        await expect.element(link).toHaveClass("override");
      } else {
        await expect.element(link).toHaveClass("fluid-link");
        await expect.element(link).toHaveClass("override");
      }
    }
  });
});
