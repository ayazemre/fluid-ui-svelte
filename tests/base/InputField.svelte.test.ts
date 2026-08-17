import { page } from "@vitest/browser/context";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-svelte";

import { InputField } from "#src/lib/base/index.ts";

describe("Input Field", () => {
  test("Default", async () => {
    render(InputField, {
      "aria-label": "input",
      id: "input-field-default",
    });

    // Structure Check
    const input = page.getByTestId("input-field-default");
    await expect.element(input).toBeInTheDocument();
    expect(input.element().tagName).toBe("INPUT");

    // Attributes
    expect(input.element().ariaLabel).toBe("input");

    // Interaction (Fill)
    await input.click();
    await input.fill("Test Input");
    await expect.element(input).toHaveValue("Test Input");
  });

  test("Types", async () => {
    for (const inputFieldType of ["text", "password", "textarea"]) {
      render(InputField, {
        "aria-label": "input",
        id: "input-field-" + inputFieldType,
        type: inputFieldType as any,
      });

      // Polymorphism Check
      const input = page.getByTestId("input-field-" + inputFieldType);
      await expect.element(input).toBeInTheDocument();
      if (inputFieldType === "textarea") {
        expect(input.element().tagName).toBe("TEXTAREA");
      } else {
        expect(input.element().tagName).toBe("INPUT");
        expect(input.element().attributes.getNamedItem("type")!.value).toBe(inputFieldType);
      }
    }
  });

  test("Styling", async () => {
    for (const overrideDefaultStyling of [true, false]) {
      render(InputField, {
        class: "override",
        id: "input-field-override-" + overrideDefaultStyling,
        overrideDefaultStyling,
      });

      // Existence Check
      const input = page.getByTestId("input-field-override-" + overrideDefaultStyling);
      await expect.element(input).toBeInTheDocument();

      // Class Validation
      if (overrideDefaultStyling) {
        await expect.element(input).not.toHaveClass("fluid-input-field");
        await expect.element(input).toHaveClass("override");
      } else {
        await expect.element(input).toHaveClass("fluid-input-field");
        await expect.element(input).toHaveClass("override");
      }
    }
  });

  test("Character Filter", async () => {
    render(InputField, {
      "aria-label": "input",
      characterFilter: ["1"],
      id: "input-field-default",
    });

    // Structure Check
    const input = page.getByTestId("input-field-default");
    await expect.element(input).toBeInTheDocument();
    expect(input.element().tagName).toBe("INPUT");
    expect(input.element().ariaLabel).toBe("input");

    // Interaction (Filtering Logic)
    await input.click();
    await input.fill("Test Input 1");
    await expect.element(input).toHaveValue("1");
  });
});
