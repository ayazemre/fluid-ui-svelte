import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Components Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Components", "Accordion");
  });

  test("Accordion", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Accordion documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Accordion" }).click();
    await expect(page).toHaveTitle(/Accordion/);

    // Expand accordion panel and verify body content visibility
    const accordionHeaderButton = page.getByRole("button", { name: /General Information/i });
    await expect(accordionHeaderButton).toBeVisible();
    await accordionHeaderButton.click();
    await page.waitForTimeout(500);

    const accordionBodyTextElement = page.getByText("Accordions are perfect for grouping content while keeping the interface clean and scannable.");
    await expect(accordionBodyTextElement).toBeVisible();
  });
});
