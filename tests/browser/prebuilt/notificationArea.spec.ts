import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Prebuilt Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Prebuilt", "Notification Area");
  });

  test("NotificationArea", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Notification Area documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Notification Area" }).click();
    await expect(page).toHaveTitle(/Notification Area/);

    // Trigger success notification and verify toast message
    const triggerSuccessButtonElement = page.getByRole("button", { name: "Success" });
    await expect(triggerSuccessButtonElement).toBeVisible();
    await triggerSuccessButtonElement.click();

    const notificationMessageElement = page.getByText("This is a success notification message!");
    await expect(notificationMessageElement).toBeVisible();
  });
});
