import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Base Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Base", "List");
  });

  test("List", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the List documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "List" }).click();
    await expect(page).toHaveTitle(/List/);

    // Verify unordered list sample items
    await expect(page.getByText("Apple").first()).toBeVisible();
    await expect(page.getByText("Banana").first()).toBeVisible();
    await expect(page.getByText("Orange").first()).toBeVisible();

    // Verify ordered list sample items
    await expect(page.getByText("Step 1")).toBeVisible();
    await expect(page.getByText("Step 2")).toBeVisible();
    await expect(page.getByText("Step 3")).toBeVisible();

    // Verify complex object list sample items
    await expect(page.getByText("Create documentation for List component")).toBeVisible();
  });
});
