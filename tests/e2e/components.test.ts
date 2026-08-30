import { test, expect } from "@playwright/test";

test.describe("Components Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the getting started page before each test and expand the Components sidebar section
    await page.goto("http://localhost:4173/documentation/getting-started");
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");
    await desktopSidebarContainer.getByRole("button", { name: "Components" }).click();
    await page.waitForTimeout(500);
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

  test("Carousel", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Carousel documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Carousel" }).click();
    await expect(page).toHaveTitle(/Carousel/);

    // Verify section headings for carousel samples
    await expect(page.getByRole("heading", { name: "Horizontal Examples" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Vertical Examples" })).toBeVisible();

    // Verify Autoplay controls
    const autoplayToggleButton = page.getByRole("button", { name: "Pause Autoplay" });
    await expect(autoplayToggleButton).toBeVisible();
    await autoplayToggleButton.click();
    await expect(page.getByRole("button", { name: "Start Autoplay" })).toBeVisible();

    // Verify navigation control buttons
    const nextNavigationButton = page.getByRole("button", { name: "Next" }).first();
    const previousNavigationButton = page.getByRole("button", { name: "Prev" }).first();
    await expect(nextNavigationButton).toBeVisible();
    await expect(previousNavigationButton).toBeVisible();
  });

  test("CodeBlock", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Code Block documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Code Block" }).click();
    await expect(page).toHaveTitle(/Code Block/);

    // Verify introductory description
    const introTextElement = page.getByText("Here is an example of the CodeBlock component.");
    await expect(introTextElement).toBeVisible();
  });

  test("CalendarGrid", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Calendar Grid documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Calendar Grid" }).click();
    await expect(page).toHaveTitle(/Calendar Grid/);

    // Verify single month calendar section heading and weekday headers
    await expect(page.getByRole("heading", { name: "1. Single Month with External Navigation" })).toBeVisible();
    await expect(page.getByText("Mon").first()).toBeVisible();
  });

  test("Draggable", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Draggable documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Draggable" }).click();
    await expect(page).toHaveTitle(/Draggable/);

    // Verify draggable sample target container text
    const draggableTargetTextElement = page.getByText("Drag Me", { exact: true });
    await expect(draggableTargetTextElement).toBeVisible();
  });

  test("Drawer", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Drawer documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Drawer" }).click();
    await expect(page).toHaveTitle(/Drawer/);

    // Open drawer and verify overlay drawer content visibility
    const openDrawerButtonElement = page.getByRole("button", { name: "Open Drawer" });
    await expect(openDrawerButtonElement).toBeVisible();
    await openDrawerButtonElement.click();

    const drawerHeadingElement = page.getByRole("heading", { name: "Navigation" });
    await expect(drawerHeadingElement).toBeVisible();

    // Close drawer
    const closeDrawerButtonElement = page.getByRole("button", { name: "Close" }).first();
    await closeDrawerButtonElement.click();
  });

  test("Dropzone", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Dropzone documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Dropzone" }).click();
    await expect(page).toHaveTitle(/Dropzone/);

    // Verify file dropzone placeholder text
    const dropzonePlaceholderTextElement = page.getByText("Drag & Drop Files Here", { exact: true });
    await expect(dropzonePlaceholderTextElement).toBeVisible();
  });

  test("Modal", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Modal documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Modal" }).click();
    await expect(page).toHaveTitle(/Modal/);

    // Open modal dialog and check title visibility
    const openModalButtonElement = page.getByRole("button", { name: "Open Modal" });
    await expect(openModalButtonElement).toBeVisible();
    await openModalButtonElement.click();

    const modalTitleElement = page.getByRole("heading", { name: "Modal Title" });
    await expect(modalTitleElement).toBeVisible();

    // Close modal dialog
    const cancelModalButtonElement = page.getByRole("button", { name: "Cancel" });
    await cancelModalButtonElement.click();
  });

  test("Page", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Page documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Page" }).click();
    await expect(page).toHaveTitle(/Page/);

    // Verify social preview simulator heading
    await expect(page.getByRole("heading", { name: "Social Preview Simulator" })).toBeVisible();
  });

  test("Pagination", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Pagination documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Pagination" }).click();
    await expect(page).toHaveTitle(/Pagination/);

    // Verify page state indicator text
    const currentPageIndicatorElement = page.getByText("Current Page: 1");
    await expect(currentPageIndicatorElement).toBeVisible();
  });

  test("AnchoredOverlay", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Anchored Overlay documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Anchored Overlay" }).click();
    await expect(page).toHaveTitle(/Anchored Overlay/);

    // Click anchor trigger element and verify overlay content
    const anchorTriggerElement = page.getByRole("button", { name: "Options Menu" });
    await expect(anchorTriggerElement).toBeVisible();
    await anchorTriggerElement.click();

    const overlayItemElement = page.getByRole("button", { name: "Profile Settings" });
    await expect(overlayItemElement).toBeVisible();
  });

  test("Switch", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Switch documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Switch" }).click();
    await expect(page).toHaveTitle(/Switch/);

    // Check initial status text
    const initialStatusTextElement = page.getByText("Status: Disabled");
    await expect(initialStatusTextElement).toBeVisible();

    // Toggle switch element and verify status changes to Enabled
    const targetSwitchElement = page.getByRole("switch").first();
    await targetSwitchElement.click();

    const enabledStatusTextElement = page.getByText("Status: Enabled");
    await expect(enabledStatusTextElement).toBeVisible();
  });

  test("TimePicker", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Time Picker documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Time Picker" }).click();
    await expect(page).toHaveTitle(/Time Picker/);

    // Verify initial time display and select new hour
    await expect(page.getByText("Selected Time: 14:30").first()).toBeVisible();

    const hour16Button = page.locator("#time-picker-demo-minute").getByRole("button", { exact: true, name: "16" });
    await expect(hour16Button).toBeVisible();
    await hour16Button.click();

    await expect(page.getByText("Selected Time: 16:30").first()).toBeVisible();
  });
});
