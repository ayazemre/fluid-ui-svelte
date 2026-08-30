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

  test("Breadcrumb", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Breadcrumb documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Breadcrumb" }).click();
    await expect(page).toHaveTitle(/Breadcrumb/);

    // Verify breadcrumb item links exist
    const homeNavigationLink = page.getByRole("link", { exact: true, name: "Home" }).first();
    const componentsNavigationLink = page.getByRole("link", { exact: true, name: "Components" }).first();

    await expect(homeNavigationLink).toBeVisible();
    await expect(componentsNavigationLink).toBeVisible();
  });

  test("Carousel", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Carousel documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Carousel" }).click();
    await expect(page).toHaveTitle(/Carousel/);

    // Verify section headings for carousel samples
    await expect(page.getByRole("heading", { name: "Horizontal Examples" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Vertical Examples" })).toBeVisible();
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

  test("DatePicker", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Date Picker documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Date Picker" }).click();
    await expect(page).toHaveTitle(/Date Picker/);

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

  test("NotificationArea", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Notification Area documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Notification Area" }).click();
    await expect(page).toHaveTitle(/Notification Area/);

    // Trigger success notification and verify toast message
    const triggerSuccessButtonElement = page.getByRole("button", { name: "Success" });
    await expect(triggerSuccessButtonElement).toBeVisible();
    await triggerSuccessButtonElement.click();

    const notificationMessageElement = page.getByText("This is a success notification message!");
    await expect(notificationMessageElement).toBeVisible();
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

  test("Popover", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Popover documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Popover" }).click();
    await expect(page).toHaveTitle(/Popover/);

    // Click popover trigger element and verify popover content
    const popoverTriggerElement = page.getByText("Click Me", { exact: true });
    await expect(popoverTriggerElement).toBeVisible();
    await popoverTriggerElement.click();

    const popoverTitleElement = page.getByText("Popover Title", { exact: true });
    await expect(popoverTitleElement).toBeVisible();
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
});
