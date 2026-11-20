import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Components Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Components", "Modal");
  });

  test("Modal", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Modal documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Modal" }).click();
    await expect(page).toHaveTitle(/Modal/);

    // Open modal dialog and check title visibility
    const openModalButtonElement = page.getByRole("button", { name: "Open Modal" });
    await expect(openModalButtonElement).toBeVisible();
    await openModalButtonElement.click();

    const modalTitleElement = page.getByRole("heading", { name: "Modal Title" });
    await expect(modalTitleElement).toBeVisible();

    // Close modal dialog
    const cancelModalButtonElement = page.getByRole("button", { name: "Cancel" });
    await cancelModalButtonElement.click();
  });
});
