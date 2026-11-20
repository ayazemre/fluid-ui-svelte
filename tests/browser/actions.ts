import { expect, type Page } from "@playwright/test";

export async function openDocumentationSidebarSection(page: Page, sectionName: string, firstLinkName: string): Promise<void> {
  // Navigate to the getting started page and expand the given sidebar section
  await page.goto("/documentation/getting-started");
  const desktopSidebarContainer = page.locator("#documentation-page-sidebar");
  await desktopSidebarContainer.getByRole("button", { name: sectionName }).click();
  await expect(desktopSidebarContainer.getByRole("link", { name: firstLinkName })).toBeVisible();
}
