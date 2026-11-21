import { expect, test } from "@playwright/test";

import { openDocumentationSidebarSection } from "../actions.ts";

test.describe("Prebuilt Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await openDocumentationSidebarSection(page, "Prebuilt", "Code Editor");
  });

  test("CodeEditor", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Code Editor documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Code Editor" }).click();
    await expect(page).toHaveTitle(/Code Editor/);

    // Verify introductory description
    const introTextElement = page.getByText("Here is an example of the CodeEditor component.");
    await expect(introTextElement).toBeVisible();

    // Verify sample section headings
    await expect(page.getByRole("heading", { exact: true, name: "Single view" })).toBeVisible();
    await expect(page.getByRole("heading", { exact: true, name: "Condensed difference" })).toBeVisible();
    await expect(page.getByRole("heading", { exact: true, name: "Full difference" })).toBeVisible();
    await expect(page.getByRole("heading", { exact: true, name: "Difference review" })).toBeVisible();
    await expect(page.getByRole("heading", { exact: true, name: "Condensed review" })).toBeVisible();
    await expect(page.getByRole("heading", { exact: true, name: "Full file review" })).toBeVisible();

    // Verify condensed difference collapses unchanged sections into gap rows
    const condensedDifferenceContainer = page.locator("#fluid-code-editor-code-editor-sample-difference");
    await expect(condensedDifferenceContainer.getByText(/unchanged lines hidden/).first()).toBeVisible();

    // Verify full difference renders every line without gap rows
    const fullDifferenceContainer = page.locator("#fluid-code-editor-code-editor-sample-full-difference");
    await expect(fullDifferenceContainer.getByText(/unchanged lines hidden/)).toHaveCount(0);

    // Capture initial per line action counts on both shared state review views
    const condensedReviewContainer = page.locator("#fluid-code-editor-code-editor-sample-review-condensed");
    const fullReviewContainer = page.locator("#fluid-code-editor-code-editor-sample-review-full");
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

  test("CodeEditor Marks Changes In A Separate Marker Element", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");
    await desktopSidebarContainer.getByRole("link", { name: "Code Editor" }).click();
    await expect(page).toHaveTitle(/Code Editor/);

    // A fully removed line keeps its - marker in the gutter
    const condensedDifferenceContainer = page.locator("#fluid-code-editor-code-editor-sample-difference");
    const fullyRemovedRowElement = condensedDifferenceContainer.locator(".fluid-code-editor-row", { hasText: "function handleReset" });
    await expect(fullyRemovedRowElement.locator(".fluid-code-editor-marker")).toHaveText("-");
    await expect(fullyRemovedRowElement.locator(".fluid-code-editor-marker")).toHaveClass(/fluid-code-difference-removed-gutter/);

    // A fully added line keeps its + marker in the gutter
    const fullyAddedRowElement = condensedDifferenceContainer.locator(".fluid-code-editor-row", { hasText: "showRecoveryHint = true" });
    await expect(fullyAddedRowElement.locator(".fluid-code-editor-marker")).toHaveText("+");

    // A partially changed line shows no marker and no line number, only the highlighted characters
    const partiallyChangedRowElement = condensedDifferenceContainer.locator(".fluid-code-editor-row", { hasText: "$state('Ada');" });
    await expect(partiallyChangedRowElement.locator(".fluid-code-editor-marker")).toHaveText("");
    await expect(partiallyChangedRowElement.locator(".fluid-code-editor-number")).toHaveText("");
    await expect(partiallyChangedRowElement.locator(".fluid-code-difference-changed-removed-text")).toHaveCount(1);
  });

  test("CodeEditor Highlights Changed Characters Inside Paired Lines", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");
    await desktopSidebarContainer.getByRole("link", { name: "Code Editor" }).click();
    await expect(page).toHaveTitle(/Code Editor/);

    // The sample changes ">= 3" to ">= 5", so only the changed characters are highlighted on each side
    const condensedDifferenceContainer = page.locator("#fluid-code-editor-code-editor-sample-difference");
    await expect(condensedDifferenceContainer.locator(".fluid-code-difference-changed-removed-text", { hasText: "3" })).toHaveCount(1);
    await expect(condensedDifferenceContainer.locator(".fluid-code-difference-changed-added-text", { hasText: "5" })).toHaveCount(1);

    // Unchanged lines are not highlighted
    await expect(condensedDifferenceContainer.locator(".fluid-code-difference-changed-added-text", { hasText: "isLocked" })).toHaveCount(0);
    await expect(condensedDifferenceContainer.locator(".fluid-code-difference-changed-removed-text", { hasText: "isLocked" })).toHaveCount(0);
  });
});
