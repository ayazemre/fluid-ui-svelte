import { test, expect } from "@playwright/test";

test.describe("Base Elements E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the getting started page before each test and expand the Base sidebar section
    await page.goto("http://localhost:4173/documentation/getting-started");
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");
    await desktopSidebarContainer.getByRole("button", { name: "Base" }).click();
    await page.waitForTimeout(500);
  });

  test("Button", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Button documentation sample page via the desktop sidebar link
    await desktopSidebarContainer.getByRole("link", { name: "Button" }).click();
    await expect(page).toHaveTitle(/Button/);

    const buttonSampleConfigurations = [
      { headingName: "Primary", originalTextPattern: /Primary Button/ },
      { headingName: "Secondary", originalTextPattern: /Secondary Button/ },
      { headingName: "Outline", originalTextPattern: /Outline Button/ },
      { headingName: "Transparent", originalTextPattern: /Transparent Button/ },
      { headingName: "With Icon", originalTextPattern: /GitHub/ },
    ];

    for (const buttonConfiguration of buttonSampleConfigurations) {
      // Find the specific card container corresponding to the section heading
      const sectionHeadingElement = page.getByRole("heading", {
        exact: true,
        level: 3,
        name: buttonConfiguration.headingName,
      });
      const cardContainerElement = sectionHeadingElement.locator("xpath=..");
      const targetButtonElement = cardContainerElement.getByRole("button");

      // Verify button visibility and scroll into view
      await expect(targetButtonElement).toBeVisible();
      await targetButtonElement.scrollIntoViewIfNeeded();

      // Verify original button text before interaction
      await expect(targetButtonElement).toHaveText(buttonConfiguration.originalTextPattern);

      // Click button and verify loading placeholder text appears
      await targetButtonElement.click();
      await expect(targetButtonElement).toHaveText(/Loading\.\.\./);

      // Verify button reverts back to original text pattern after 1000ms delay
      await expect(targetButtonElement).toHaveText(buttonConfiguration.originalTextPattern, { timeout: 3000 });
    }
  });

  test("Container", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Container documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Container" }).click();
    await expect(page).toHaveTitle(/Container/);

    // Check for existence of semantic container content samples
    await expect(page.getByText("Header Content", { exact: true })).toBeVisible();
    await expect(page.getByText("Navigation Content", { exact: true })).toBeVisible();
    await expect(page.getByText("Section Content", { exact: true })).toBeVisible();
    await expect(page.getByText("Footer Content", { exact: true })).toBeVisible();
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

  test("Image", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Image documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Image" }).click();
    await expect(page).toHaveTitle(/Image/);

    // Verify standard image sample element is rendered
    const natureSceneImageElement = page.getByAltText("Nature scene");
    await expect(natureSceneImageElement).toBeVisible();
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

  test("Label", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Label documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { exact: true, name: "Label" }).click();
    await expect(page).toHaveTitle(/Label/);

    // Verify label elements are visible
    const standardLabelElement = page.locator("#label-sample-standard-label");
    await expect(standardLabelElement).toBeVisible();

    const requiredLabelElement = page.locator("#label-sample-required-label");
    await expect(requiredLabelElement).toBeVisible();

    const customLabelElement = page.locator("#label-sample-custom-label");
    await expect(customLabelElement).toBeVisible();

    // Verify clicking label focuses associated input field
    await standardLabelElement.click();
    await expect(page.locator("#full-name")).toBeFocused();
  });

  test("Link", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Link documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { exact: true, name: "Link" }).click();
    await expect(page).toHaveTitle(/Link/);

    // Check existence of standard and custom link samples
    const buttonDocumentationPageLink = page.getByRole("link", { name: "Navigate to Button" });
    await expect(buttonDocumentationPageLink).toBeVisible();

    const imageDocumentationPageLink = page.getByRole("link", { name: "Bold Primary Link" });
    await expect(imageDocumentationPageLink).toBeVisible();

    // Perform happy-path click navigation
    await buttonDocumentationPageLink.click();
    await expect(page).toHaveURL(/\/documentation\/base\/button/);
  });

  test("List", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the List documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "List" }).click();
    await expect(page).toHaveTitle(/List/);

    // Verify unordered list sample items
    await expect(page.getByText("Apple").first()).toBeVisible();
    await expect(page.getByText("Banana").first()).toBeVisible();
    await expect(page.getByText("Orange").first()).toBeVisible();

    // Verify ordered list sample items
    await expect(page.getByText("Step 1")).toBeVisible();
    await expect(page.getByText("Step 2")).toBeVisible();
    await expect(page.getByText("Step 3")).toBeVisible();

    // Verify complex object list sample items
    await expect(page.getByText("Create documentation for List component")).toBeVisible();
  });

  test("Table", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Table documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { name: "Table" }).click();
    await expect(page).toHaveTitle(/Table/);

    // Verify table head headers
    await expect(page.getByText("ID").first()).toBeVisible();
    await expect(page.getByText("Name").first()).toBeVisible();
    await expect(page.getByText("Age").first()).toBeVisible();

    // Verify table body row items
    await expect(page.getByText("Alice").first()).toBeVisible();
    await expect(page.getByText("Bob").first()).toBeVisible();
    await expect(page.getByText("Charlie").first()).toBeVisible();

    // Verify table footer summary
    await expect(page.getByText("3 Users")).toBeVisible();
  });

  test("Text", async ({ page }) => {
    const desktopSidebarContainer = page.locator("#documentation-page-sidebar");

    // Navigate to the Text documentation sample page via sidebar
    await desktopSidebarContainer.getByRole("link", { exact: true, name: "Text" }).click();
    await expect(page).toHaveTitle(/Text/);

    // Verify semantic headings
    await expect(page.getByRole("heading", { name: "Heading 1" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Heading 2" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Heading 3" }).first()).toBeVisible();

    // Verify inline emphasis tags
    await expect(page.getByText("bold", { exact: true })).toBeVisible();
    await expect(page.getByText("italic", { exact: true })).toBeVisible();
    await expect(page.getByText("highlighted", { exact: true })).toBeVisible();

    // Verify code block sample text
    await expect(page.getByText("const fluid = 'awesome';", { exact: true })).toBeVisible();
  });
});
