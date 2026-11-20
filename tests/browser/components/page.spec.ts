import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Components Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Components", "Page");
  });

  test("Page", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Page documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Page" }).click();
    await expect(page).toHaveTitle(/Page/);

    // Verify social preview simulator heading
    await expect(page.getByRole("heading", { name: "Social Preview Simulator" })).toBeVisible();
  });
});
