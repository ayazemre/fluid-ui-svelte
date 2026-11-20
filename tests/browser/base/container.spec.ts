import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Base Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Base", "Container");
  });

  test("Container", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Container documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Container" }).click();
    await expect(page).toHaveTitle(/Container/);

    // Check for existence of semantic container content samples
    await expect(page.getByText("Header Content", { exact: true })).toBeVisible();
    await expect(page.getByText("Navigation Content", { exact: true })).toBeVisible();
    await expect(page.getByText("Section Content", { exact: true })).toBeVisible();
    await expect(page.getByText("Footer Content", { exact: true })).toBeVisible();
  });
});
