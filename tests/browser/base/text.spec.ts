import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Base Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Base", "Text");
  });

  test("Text", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Text documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { exact: true, name: "Text" }).click();
    await expect(page).toHaveTitle(/Text/);

    // Verify semantic headings
    await expect(page.getByRole("heading", { name: "Heading 1" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Heading 2" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Heading 3" }).first()).toBeVisible();

    // Verify inline emphasis tags
    await expect(page.getByText("bold", { exact: true })).toBeVisible();
    await expect(page.getByText("italic", { exact: true })).toBeVisible();
    await expect(page.getByText("highlighted", { exact: true })).toBeVisible();

    // Verify code block sample text
    await expect(page.getByText("const fluid = 'awesome';", { exact: true })).toBeVisible();
  });
});
