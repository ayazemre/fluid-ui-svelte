import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Components Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Components", "Switch");
  });

  test("Switch", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Switch documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Switch" }).click();
    await expect(page).toHaveTitle(/Switch/);

    // Check initial status text
    const initialStatusTextElement = page.getByText("Status: Disabled");
    await expect(initialStatusTextElement).toBeVisible();

    // Toggle switch element and verify status changes to Enabled
    const targetSwitchElement = page.getByRole("switch").first();
    await targetSwitchElement.click();

    const enabledStatusTextElement = page.getByText("Status: Enabled");
    await expect(enabledStatusTextElement).toBeVisible();
  });
});
