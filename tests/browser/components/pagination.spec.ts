import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Components Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Components", "Pagination");
  });

  test("Pagination", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Pagination documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Pagination" }).click();
    await expect(page).toHaveTitle(/Pagination/);

    // Verify page state indicator text
    const currentPageIndicatorElement = page.getByText("Current Page: 1", { exact: true });
    await expect(currentPageIndicatorElement).toBeVisible();
  });
});
