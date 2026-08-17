import { page } from "@vitest/browser/context";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-svelte";

import { NotificationArea } from "#src/lib/components/index.ts";

describe("Notification Area", () => {
  test("Default", async () => {
    const items = [
      { id: 1, message: "Message 1", type: "success" as const },
      { id: 2, message: "Message 2", type: "error" as const },
    ];

    render(NotificationArea, {
      items,
    });

    await expect.element(page.getByText("Message 1")).toBeInTheDocument();
    await expect.element(page.getByText("Message 2")).toBeInTheDocument();
  });
});
