import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Base Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Base", "Image");
  });

  test("Image", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Image documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Image" }).click();
    await expect(page).toHaveTitle(/Image/);

    // Verify standard image sample element is rendered
    const natureSceneImageElement = page.getByAltText("Nature scene");
    await expect(natureSceneImageElement).toBeVisible();
  });
});
