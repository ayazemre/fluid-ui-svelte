import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Prebuilt Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Prebuilt", "Breadcrumb");
  });

  test("Breadcrumb", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Breadcrumb documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Breadcrumb" }).click();
    await expect(page).toHaveTitle(/Breadcrumb/);

    // Verify breadcrumb item links exist
    const homeNavigationLink = page.getByRole("link", { exact: true, name: "Home" }).first();
    const prebuiltNavigationLink = page.getByRole("link", { exact: true, name: "Prebuilt" }).first();

    await expect(homeNavigationLink).toBeVisible();
    await expect(prebuiltNavigationLink).toBeVisible();
  });
});
