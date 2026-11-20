import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Components Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Components", "Draggable");
  });

  test("Draggable", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Draggable documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Draggable" }).click();
    await expect(page).toHaveTitle(/Draggable/);

    // Verify draggable sample target container text
    const draggableTargetTextElement = page.getByText("Drag Me", { exact: true });
    await expect(draggableTargetTextElement).toBeVisible();
  });
});
