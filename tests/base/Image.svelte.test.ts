import { page } from "@vitest/browser/context";
import { createRawSnippet } from "svelte";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-svelte";

import { Image } from "#src/lib/base/index.ts";

describe("Image", () => {
  test("Default", async () => {
    render(Image, {
      alt: "An image.",
      "aria-label": "image",
      class: "object-cover",
      id: "image-default",
      src: "https://picsum.photos/200/300",
    });

    // Structure Check
    const image = page.getByTestId("image-default");
    await expect.element(image).toBeInTheDocument();
    expect(image.element().tagName).toBe("IMG");

    // Attributes
    expect(image.element().ariaLabel).toBe("image");
  });

  test("Styling", async () => {
    for (const overrideDefaultStyling of [true, false]) {
      render(Image, {
        alt: "An image.",
        "aria-label": "image",
        class: "object-cover",
        id: "image-override-" + overrideDefaultStyling,
        overrideDefaultStyling,
        src: "https://picsum.photos/200/300",
      });

      // Existence Check
      const image = page.getByTestId("image-override-" + overrideDefaultStyling);
      await expect.element(image).toBeInTheDocument();

      // Class Validation
      if (overrideDefaultStyling) {
        await expect.element(image).not.toHaveClass("fluid-image");
        await expect.element(image).toHaveClass("object-cover");
      } else {
        await expect.element(image).toHaveClass("fluid-image");
        await expect.element(image).toHaveClass("object-cover");
      }
    }
  });
});
