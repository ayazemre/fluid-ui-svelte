import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Base Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Base", "Button");
  });

  test("Button", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Button documentation sample page via the desktop sidebar link
    await desktopSidebarContainer.getByRole("link", { name: "Button" }).click();
    await expect(page).toHaveTitle(/Button/);

    const buttonSampleConfigurations = [
      { headingName: "Primary", originalTextPattern: /Primary Button/ },
      { headingName: "Secondary", originalTextPattern: /Secondary Button/ },
      { headingName: "Outline", originalTextPattern: /Outline Button/ },
      { headingName: "Transparent", originalTextPattern: /Transparent Button/ },
      { headingName: "With Icon", originalTextPattern: /GitHub/ },
    ];

    for (const buttonConfiguration of buttonSampleConfigurations) {
      // Find the specific card container corresponding to the section heading
      const sectionHeadingElement = page.getByRole("heading", {
        exact: true,
        level: 3,
        name: buttonConfiguration.headingName,
      });
      const cardContainerElement = sectionHeadingElement.locator("xpath=..");
      const targetButtonElement = cardContainerElement.getByRole("button");

      // Verify button visibility and scroll into view
      await expect(targetButtonElement).toBeVisible();
      await targetButtonElement.scrollIntoViewIfNeeded();

      // Verify original button text before interaction
      await expect(targetButtonElement).toHaveText(buttonConfiguration.originalTextPattern);

      // Click button and verify loading placeholder text appears
      await targetButtonElement.click();
      await expect(targetButtonElement).toHaveText(/Loading\.\.\./);

      // Verify button reverts back to original text pattern after 1000ms delay
      await expect(targetButtonElement).toHaveText(buttonConfiguration.originalTextPattern, { timeout: 3000 });
    }
  });
});
