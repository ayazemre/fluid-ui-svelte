import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("button", { name: "Get Started" }).click();
  await expect(page.getByRole("heading", { name: "Getting Started" })).toBeVisible();
});
