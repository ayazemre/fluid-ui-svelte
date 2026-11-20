import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Prebuilt Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Prebuilt", "International Input");
  });

  test("International Input", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the International Input documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "International Input" }).click();
    await expect(page).toHaveTitle(/International Input/);

    // Verify placeholder input and default country code
    const phoneInput = page.getByPlaceholder("(555) 123-4567");
    await expect(phoneInput).toBeVisible();
    await phoneInput.fill("5551234567");

    await expect(page.getByText("Selected: US | Dial Code: +1 | Value: 5551234567")).toBeVisible();
  });
});
