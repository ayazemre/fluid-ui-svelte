import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Components Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Components", "Code Block");
  });

  test("CodeBlock", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Code Block documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Code Block" }).click();
    await expect(page).toHaveTitle(/Code Block/);

    // Verify introductory description
    const introTextElement = page.getByText("Here is an example of the CodeBlock component.");
    await expect(introTextElement).toBeVisible();

    // Verify sample section headings
    await expect(page.getByRole("heading", { exact: true, name: "Single view" })).toBeVisible();
    await expect(page.getByRole("heading", { exact: true, name: "Condensed diff" })).toBeVisible();
    await expect(page.getByRole("heading", { exact: true, name: "Full diff" })).toBeVisible();
    await expect(page.getByRole("heading", { exact: true, name: "Diff review" })).toBeVisible();
    await expect(page.getByRole("heading", { exact: true, name: "Condensed review" })).toBeVisible();
    await expect(page.getByRole("heading", { exact: true, name: "Full file review" })).toBeVisible();

    // Verify condensed diff collapses unchanged sections into gap rows
    const condensedDiffContainer = page.locator("#fluid-code-block-code-block-sample-diff");
    await expect(condensedDiffContainer.getByText(/unchanged lines hidden/).first()).toBeVisible();

    // Verify full diff renders every line without gap rows
    const fullDiffContainer = page.locator("#fluid-code-block-code-block-sample-full-diff");
    await expect(fullDiffContainer.getByText(/unchanged lines hidden/)).toHaveCount(0);

    // Capture initial per line action counts on both shared state review views
    const condensedReviewContainer = page.locator("#fluid-code-block-code-block-sample-review-condensed");
    const fullReviewContainer = page.locator("#fluid-code-block-code-block-sample-review-full");
    const initialCondensedAcceptCount = await condensedReviewContainer.getByRole("button", { name: "Accept change" }).count();
    const initialFullRejectCount = await fullReviewContainer.getByRole("button", { name: "Reject change" }).count();
    expect(initialCondensedAcceptCount).toBeGreaterThan(0);
    expect(initialFullRejectCount).toBeGreaterThan(0);

    // Accept the first condensed change block and verify one decision resolves
    await condensedReviewContainer.getByRole("button", { name: "Accept change" }).first().click();
    await expect(condensedReviewContainer.getByRole("button", { name: "Accept change" })).toHaveCount(initialCondensedAcceptCount - 1);

    // Capture the shared full file count after the accept above removed one block there too
    const sharedFullRejectCount = await fullReviewContainer.getByRole("button", { name: "Reject change" }).count();

    // Reject the first full file change block and verify one decision resolves
    await fullReviewContainer.getByRole("button", { name: "Reject change" }).first().click();
    await expect(fullReviewContainer.getByRole("button", { name: "Reject change" })).toHaveCount(sharedFullRejectCount - 1);

    // Reset the shared review state and verify both views restore
    await page.getByRole("button", { name: "Reset review" }).click();
    await expect(condensedReviewContainer.getByRole("button", { name: "Accept change" })).toHaveCount(initialCondensedAcceptCount);
    await expect(fullReviewContainer.getByRole("button", { name: "Reject change" })).toHaveCount(initialFullRejectCount);
  });
});
