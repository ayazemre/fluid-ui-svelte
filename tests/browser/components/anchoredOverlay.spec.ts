import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Components Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Components", "Anchored Overlay");
  });

  test("AnchoredOverlay", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Anchored Overlay documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Anchored Overlay" }).click();
    await expect(page).toHaveTitle(/Anchored Overlay/);

    // Click anchor trigger element and verify overlay content
    const anchorTriggerElement = page.getByRole("button", { name: "Click to Toggle" });
    await expect(anchorTriggerElement).toBeVisible();
    await anchorTriggerElement.click();

    const overlayItemElement = page.locator("#anchored-overlay-click-title");
    await expect(overlayItemElement).toBeVisible();

    const closeButtonElement = page.locator("#anchored-overlay-click-close-btn");
    await closeButtonElement.click();
    await expect(overlayItemElement).toBeHidden();
  });
});
