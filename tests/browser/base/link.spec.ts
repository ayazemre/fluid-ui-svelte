import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Base Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Base", "Link");
  });

  test("Link", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Link documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { exact: true, name: "Link" }).click();
    await expect(page).toHaveTitle(/Link/);

    // Check existence of standard and custom link samples
    const buttonDocumentationPageLink = page.getByRole("link", { name: "Navigate to Button" });
    await expect(buttonDocumentationPageLink).toBeVisible();

    const imageDocumentationPageLink = page.getByRole("link", { name: "Bold Primary Link" });
    await expect(imageDocumentationPageLink).toBeVisible();

    // Perform happy-path click navigation
    await buttonDocumentationPageLink.click();
    await expect(page).toHaveURL(/\/documentation\/base\/button/);
  });
});
