import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Components Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Components", "Carousel");
  });

  test("Carousel", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Carousel documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Carousel" }).click();
    await expect(page).toHaveTitle(/Carousel/);

    // Verify section headings for carousel samples
    await expect(page.getByRole("heading", { name: "Horizontal Examples" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Vertical Examples" })).toBeVisible();

    // Verify Autoplay controls
    const autoplayToggleButton = page.getByRole("button", { name: "Pause Autoplay" });
    await expect(autoplayToggleButton).toBeVisible();
    await autoplayToggleButton.click();
    await expect(page.getByRole("button", { name: "Start Autoplay" })).toBeVisible();

    // Verify navigation control buttons
    const nextNavigationButton = page.getByRole("button", { name: "Next" }).first();
    const previousNavigationButton = page.getByRole("button", { name: "Prev" }).first();
    await expect(nextNavigationButton).toBeVisible();
    await expect(previousNavigationButton).toBeVisible();
  });
});
