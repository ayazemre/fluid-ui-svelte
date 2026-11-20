import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Components Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Components", "Dropzone");
  });

  test("Dropzone", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Dropzone documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Dropzone" }).click();
    await expect(page).toHaveTitle(/Dropzone/);

    // Verify file dropzone placeholder text
    const dropzonePlaceholderTextElement = page.getByText("Drag & Drop Files Here", { exact: true });
    await expect(dropzonePlaceholderTextElement).toBeVisible();
  });
});
