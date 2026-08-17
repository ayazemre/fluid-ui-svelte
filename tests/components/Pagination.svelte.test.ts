import { page } from "@vitest/browser/context";
import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import { Pagination } from "#src/lib/components/index.ts";

describe("Pagination", () => {
  test("Default", async () => {
    render(Pagination, {
      componentId: "pagination-default",
      currentPage: 1,
      totalPages: 5,
    });

    const container = page.getByTestId("pagination-default");
    await expect.element(container).toBeInTheDocument();

    // Check if buttons are present
    await expect.element(page.getByRole("button", { name: "Previous" })).toBeInTheDocument();
    await expect.element(page.getByRole("button", { name: "Next" })).toBeInTheDocument();
    await expect.element(page.getByRole("button", { name: "1" })).toBeInTheDocument();
    await expect.element(page.getByRole("button", { name: "5" })).toBeInTheDocument();

    // Current page should be active
    const activeBtn = page.getByRole("button", { name: "1" });
    await expect.element(activeBtn).toHaveClass("fluid-pagination-button-active");
  });

  test("Interaction", async () => {
    let currentPage = 1;
    const onPageChange = vi.fn(async (p) => {
      currentPage = p;
    });

    render(Pagination, {
      componentId: "pagination-interaction",
      get currentPage() {
        return currentPage;
      },
      set currentPage(v) {
        currentPage = v;
      },
      onPageChange,
      totalPages: 5,
    });

    const nextBtn = page.getByRole("button", { name: "Next" });
    await nextBtn.click();

    expect(onPageChange).toHaveBeenCalledWith(2);
    expect(currentPage).toBe(2);

    const page3Btn = page.getByRole("button", { name: "3" });
    await page3Btn.click();

    expect(onPageChange).toHaveBeenCalledWith(3);
    expect(currentPage).toBe(3);
  });

  test("Disabled States", async () => {
    render(Pagination, {
      currentPage: 1,
      totalPages: 1,
    });

    const prevBtn = page.getByRole("button", { name: "Previous" });
    const nextBtn = page.getByRole("button", { name: "Next" });

    await expect.element(prevBtn).toBeDisabled();
    await expect.element(nextBtn).toBeDisabled();
  });
});
