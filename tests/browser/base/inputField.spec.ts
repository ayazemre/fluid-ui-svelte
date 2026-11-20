import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Base Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Base", "Input Field");
  });

  test("InputField", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the InputField documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Input Field" }).click();
    await expect(page).toHaveTitle(/Input Field/);

    // Test text input entry and reactive value display
    const nameInputFieldElement = page.getByPlaceholder("Enter your name");
    await expect(nameInputFieldElement).toBeVisible();
    await nameInputFieldElement.fill("Jane Doe");
    await expect(page.getByText("Value: Jane Doe")).toBeVisible();

    // Test password input entry and reactive value display
    const passwordInputFieldElement = page.getByPlaceholder("Enter password");
    await expect(passwordInputFieldElement).toBeVisible();
    await passwordInputFieldElement.fill("secretPassword123");
    await expect(page.getByText("Value: secretPassword123")).toBeVisible();

    // Test textarea input entry and reactive value display
    const messageInputFieldElement = page.getByPlaceholder("Enter your message...");
    await expect(messageInputFieldElement).toBeVisible();
    await messageInputFieldElement.fill("This is a multiline message.");
    await expect(page.getByText("Value: This is a multiline message.")).toBeVisible();

    // Test character filtered numeric input entry
    const numericInputFieldElement = page.getByPlaceholder("Numbers only...");
    await expect(numericInputFieldElement).toBeVisible();
    await numericInputFieldElement.fill("12345");
    await expect(page.getByText("Value: 12345")).toBeVisible();
  });
});
