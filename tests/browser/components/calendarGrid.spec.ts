import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Components Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Components", "Calendar Grid");
  });

  test("CalendarGrid", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Calendar Grid documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Calendar Grid" }).click();
    await expect(page).toHaveTitle(/Calendar Grid/);

    // Verify single month calendar section heading and weekday headers
    await expect(page.getByRole("heading", { name: "1. Single Month with External Navigation" })).toBeVisible();
    await expect(page.getByText("Mon").first()).toBeVisible();
  });
});
