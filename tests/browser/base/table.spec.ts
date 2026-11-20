import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Base Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Base", "Table");
  });

  test("Table", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Table documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Table" }).click();
    await expect(page).toHaveTitle(/Table/);

    // Verify table head headers
    await expect(page.getByText("ID").first()).toBeVisible();
    await expect(page.getByText("Name").first()).toBeVisible();
    await expect(page.getByText("Age").first()).toBeVisible();

    // Verify table body row items
    await expect(page.getByText("Alice").first()).toBeVisible();
    await expect(page.getByText("Bob").first()).toBeVisible();
    await expect(page.getByText("Charlie").first()).toBeVisible();

    // Verify table footer summary
    await expect(page.getByText("3 Users")).toBeVisible();
  });
});
