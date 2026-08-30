import { expect, test } from "@playwright/test";

test.describe("Prebuilt Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the getting started page before each test and expand the Prebuilt sidebar section
    await page.goto("/documentation/getting-started");
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");
    await desktopSidebarContainer.getByRole("button", { name: "Prebuilt" }).click();
    await page.waitForTimeout(500);
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
