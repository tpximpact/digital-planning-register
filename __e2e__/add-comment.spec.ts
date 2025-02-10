import { test, expect, Page } from "@playwright/test";

/**
 *
 * This test suite is for testing the comment workflow
 *
 */

/**
 *
 * /[council]/[reference]
 *
 */

const testCommentFlow = async (page: Page) => {
  // 1. Visit the application page
  await page.goto(`/public-council-1/TEST-C0MNT-F10W`);

  await expect(page).toHaveTitle(
    "Application TEST-C0MNT-F10W | Public Council 1 Digital Planning Register",
  );

  await expect(
    page.getByRole("heading", {
      name: "Application reference TEST-C0MNT-F10W",
    }),
  ).toBeVisible();

  await page
    .getByRole("button", { name: "Comment on this application" })
    .click();

  // there is a race condition here
  // when the page first loads it shows a non-js message to say 'enable js pls'
  // playwright is sometimes reading that and failing the test
  // so we wait for the submit comment page content to appear and then test for the title
  // @todo refine the comment flow feature and tests so this is not needed!
  await page.waitForSelector(".submit-comment", { timeout: 400000 });

  // 2. Start the comment flow
  await expect(page).toHaveTitle(
    "What you need to know before you comment | Application TEST-C0MNT-F10W | Public Council 1 Digital Planning Register",
  );

  await expect(
    page.getByRole("heading", {
      name: "What you need to know before you comment",
    }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Start now" }).click();

  // 3. Comment flow - sentiment

  await expect(
    page.getByRole("heading", {
      name: "How do you feel about this development?",
    }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Continue" }).click();
  expect(page.getByText("Please select an option", { exact: true }));
  await page.getByTestId("neutral").check();
  await page.getByRole("button", { name: "Continue" }).click();

  // 4. Comment flow - topics

  await expect(
    page.getByRole("heading", {
      name: "What topics do you want to comment on?",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Continue" }).click();
  expect(page.getByText("Please select at least one topic", { exact: true }));
  await page
    .getByLabel("Design, size or height of new buildings or extensions")
    .check();
  await page.getByLabel("Use and function of the proposed development").check();
  await page.getByLabel("Impacts on natural light").check();
  await page.getByRole("button", { name: "Continue" }).click();

  // 5. Comment flow - comments on Design, size or height of new buildings or extensions

  expect(
    page.getByText(
      "Comment on the design, size or height of new buildings or extensions",
      { exact: true },
    ),
  );
  expect(page.getByText("1 of 3", { exact: true }));
  await page.getByRole("button", { name: "Continue" }).click();
  expect(page.getByText("Your comment is required", { exact: true }));
  await page
    .getByRole("textbox")
    .fill(
      "Commenting on the design, size or height of new buildings or extensions",
    );
  await page.getByRole("button", { name: "Continue" }).click();

  // 6. Comment flow - comments on Use and function of the proposed development
  expect(
    page.getByText(
      "Comment on the use and function of the proposed development",
      { exact: true },
    ),
  );
  expect(page.getByText("1 of 3", { exact: true }));
  await page.getByRole("button", { name: "Continue" }).click();
  expect(page.getByText("Your comment is required", { exact: true }));

  // 6a - go back a step
  await page.getByRole("link", { name: "Back", exact: true }).click();
  expect(
    page.getByText(
      "Comment on the design, size or height of new buildings or extensions",
      { exact: true },
    ),
  );
  expect(page.getByText("1 of 3", { exact: true }));
  await page.getByRole("button", { name: "Continue" }).click();

  // 7. Comment flow -back to comments on Use and function of the proposed development
  expect(
    page.getByText(
      "Comment on the use and function of the proposed development",
      { exact: true },
    ),
  );
  expect(page.getByText("2 of 3", { exact: true }));
  await page
    .getByRole("textbox")
    .fill("Commenting on the use and function of the proposed development");
  await page.getByRole("button", { name: "Continue" }).click();

  // 8. Comment flow - comments on Impacts on natural light
  expect(page.getByText("Impacts on natural light", { exact: true }));
  expect(page.getByText("2 of 3", { exact: true }));
  await page
    .getByRole("textbox")
    .fill("Commenting on the Impacts on natural light");
  await page.getByRole("button", { name: "Continue" }).click();

  // 9. Comment flow - contact details

  await page.getByRole("button", { name: "Continue" }).click();
  expect(page.getByText("Your name is required", { exact: true }));
  expect(page.getByText("Your address is required", { exact: true }));
  expect(page.getByText("A valid postcode is required", { exact: true }));

  await page.getByLabel("Name", { exact: true }).fill("Test Name");
  await page.getByLabel("Address", { exact: true }).fill("Test Address");
  await page.getByLabel("Postcode", { exact: true }).fill("EC1N 8BA");
  await page.getByRole("button", { name: "Continue" }).click();

  // 10. Comment flow - review

  expect(
    page.getByText("Check what you have written before sending your comment", {
      exact: true,
    }),
  );
  expect(
    page.getByText(
      "Commenting on the design, size or height of new buildings or extensions",
      {
        exact: true,
      },
    ),
  );
  expect(
    page.getByText(
      "Commenting on the use and function of the proposed development",
      {
        exact: true,
      },
    ),
  );
  expect(
    page.getByText("Commenting on the Impacts on natural light", {
      exact: true,
    }),
  );

  await page.getByRole("button", { name: "Accept and send" }).click();

  // 11. Comment flow - success
  expect(page.getByText("Comment submitted", { exact: true }));
};

/**
 *
 * Tests
 *
 */

test.describe("Adding comments", () => {
  test.describe("javascript disabled", () => {
    test.use({ javaScriptEnabled: false });
    test.fixme("/public-council-1/TEST-C0MNT-F10W", async ({ page }) => {
      // non-js comment workflow
    });
  });
  test.describe("javascript enabled", () => {
    test("/public-council-1/TEST-C0MNT-F10W", async ({ page }) => {
      await testCommentFlow(page);
    });
  });
});
