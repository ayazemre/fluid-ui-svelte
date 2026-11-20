import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Components Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Components", "Time Picker");
  });

  test("TimePicker", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Time Picker documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Time Picker" }).click();
    await expect(page).toHaveTitle(/Time Picker/);

    // Verify initial time display and select new hour
    await expect(page.getByText("Selected Time: 14:30").first()).toBeVisible();

    const hour16Button = page.locator("#fluid-time-picker-time-picker-demo-minute").getByRole("button", { exact: true, name: "16" });
    await expect(hour16Button).toBeVisible();
    await hour16Button.click();

    await expect(page.getByText("Selected Time: 16:30").first()).toBeVisible();
  });
});
