import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Components Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Components", "Drawer");
  });

  test("Drawer", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Drawer documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Drawer" }).click();
    await expect(page).toHaveTitle(/Drawer/);

    // Open drawer and verify overlay drawer content visibility
    const openDrawerButtonElement = page.getByRole("button", { name: "Open Drawer" });
    await expect(openDrawerButtonElement).toBeVisible();
    await openDrawerButtonElement.click();

    const drawerHeadingElement = page.getByRole("heading", { name: "Navigation" });
    await expect(drawerHeadingElement).toBeVisible();

    // Close drawer
    const closeDrawerButtonElement = page.getByRole("button", { name: "Close" }).first();
    await closeDrawerButtonElement.click();
  });
});
