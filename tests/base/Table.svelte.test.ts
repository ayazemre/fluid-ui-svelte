import { page } from "@vitest/browser/context";
import { createRawSnippet } from "svelte";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-svelte";

import { Table } from "#src/lib/base/index.ts";

describe("Table", () => {
  test("Default", async () => {
    render(Table, {
      "aria-label": "table",
      bodyTemplate: createRawSnippet((item: any) => ({
        render: () => `<span>${item()}</span>`,
      })),
      caption: "Test Caption",
      footerTemplate: createRawSnippet((item: any) => ({
        render: () => `<span>${item()}</span>`,
      })),
      headTemplate: createRawSnippet((item: any) => ({
        render: () => `<span>${item()}</span>`,
      })),
      id: "table-default",
      tableFooterItems: ["Footer 1"],
      tableHeadItems: ["Header 1"],
      tableRowItems: [["Cell 1"]],
    });

    // Structure Check
    const table = page.getByTestId("table-default");
    await expect.element(table).toBeInTheDocument();
    expect(table.element().tagName).toBe("TABLE");

    // Attributes
    expect(table.element().ariaLabel).toBe("table");

    // Caption Check
    await expect.element(page.getByText("Test Caption")).toBeInTheDocument();

    // Content Counts Check
    const headers = table.element().querySelectorAll("th");
    const bodyCells = table.element().querySelectorAll("tbody td");
    const footerCells = table.element().querySelectorAll("tfoot td");

    expect(headers.length).toBe(1);
    expect(bodyCells.length).toBe(1);
    expect(footerCells.length).toBe(1);

    // Content Value Check
    expect(headers[0].textContent).toBe("Header 1");
    expect(bodyCells[0].textContent).toBe("Cell 1");
    expect(footerCells[0].textContent).toBe("Footer 1");
  });

  test("Styling", async () => {
    for (const overrideDefaultStyling of [false, true]) {
      render(Table, {
        bodyClass: "body-override",
        bodyTemplate: createRawSnippet((item: any) => ({ render: () => `<p>${item()}</p>` })),
        footerClass: "footer-override",
        footerTemplate: createRawSnippet((item: any) => ({ render: () => `<p>${item()}</p>` })),
        headClass: "head-override",
        headTemplate: createRawSnippet((item: any) => ({ render: () => `<p>${item()}</p>` })),
        id: "table-styling-" + overrideDefaultStyling,
        overrideDefaultStyling,
        tableFooterItems: ["F"],
        tableHeadItems: ["H"],
        tableRowItems: [["B"]],
      });

      // Existence Check
      const table = page.getByTestId("table-styling-" + overrideDefaultStyling);
      await expect.element(table).toBeInTheDocument();

      // Section Extraction
      const head = table.element().querySelector("thead");
      const body = table.element().querySelector("tbody");
      const foot = table.element().querySelector("tfoot");

      // Styling Validation
      if (overrideDefaultStyling) {
        await expect.element(table).not.toHaveClass("fluid-table");

        // Head
        expect(head?.classList.contains("head-override")).toBe(true);
        expect(head?.classList.contains("fluid-table-head")).toBe(false);

        // Body
        expect(body?.classList.contains("body-override")).toBe(true);
        expect(body?.classList.contains("fluid-table-body")).toBe(false);

        // Foot
        expect(foot?.classList.contains("footer-override")).toBe(true);
        expect(foot?.classList.contains("fluid-table-footer")).toBe(false);
      } else {
        await expect.element(table).toHaveClass("fluid-table");

        // Head
        expect(head?.classList.contains("head-override")).toBe(true);
        expect(head?.classList.contains("fluid-table-head")).toBe(true);

        // Body
        expect(body?.classList.contains("body-override")).toBe(true);
        expect(body?.classList.contains("fluid-table-body")).toBe(true);

        // Foot
        expect(foot?.classList.contains("footer-override")).toBe(true);
        expect(foot?.classList.contains("fluid-table-footer")).toBe(true);
      }
    }
  });
});
