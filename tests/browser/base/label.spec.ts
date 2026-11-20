import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Base Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Base", "Label");
  });

  test("Label", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Label documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { exact: true, name: "Label" }).click();
    await expect(page).toHaveTitle(/Label/);

    // Verify label elements are visible
    const standardLabelElement = page.locator("#label-sample-standard-label");
    await expect(standardLabelElement).toBeVisible();

    const requiredLabelElement = page.locator("#label-sample-required-label");
    await expect(requiredLabelElement).toBeVisible();

    const customLabelElement = page.locator("#label-sample-custom-label");
    await expect(customLabelElement).toBeVisible();

    // Verify clicking label focuses associated input field
    await standardLabelElement.click();
    await expect(page.locator("#full-name")).toBeFocused();
  });
});
