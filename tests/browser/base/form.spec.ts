import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Base Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Base", "Form");
  });

  test("Form", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Form documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Form" }).click();
    await expect(page).toHaveTitle(/Form/);

    // Fill in the username input field and verify value binding
    const usernameInputField = page.getByPlaceholder("Enter username");
    await expect(usernameInputField).toBeVisible();
    await usernameInputField.fill("testuser");
    await expect(usernameInputField).toHaveValue("testuser");

    // Click form submit button
    const submitButtonElement = page.getByRole("button", { name: /Submit/i });
    await expect(submitButtonElement).toBeVisible();
    await submitButtonElement.click();
  });
});
