import { test, expect } from "@playwright/test";

test.describe("ContentSidebar", () => {
  test("expect the Skip to main content link to be focused", async ({
    page,
  }) => {
    await page.goto("/");

    const viewCookies = await page.getByRole("link", {
      name: "View cookies",
    });
    await viewCookies.focus();

    await page.keyboard.press("Tab");

    const skipLink = await page.getByRole("link", {
      name: "Skip to main content",
    });

    await expect(skipLink).toBeFocused();
  });

  test("expect the tab order to be correct on content pages", async ({
    page,
  }) => {
    await page.goto("/public-council-1/help/application-statuses");

    // Focus on the first navigation item
    const firstNavItem = await page.getByRole("link", {
      name: "Council process",
    });
    await firstNavItem.focus();

    // Verify that the first navigation item is focused
    await expect(firstNavItem).toBeFocused();

    // tab to next item and hit enter
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    // hit tab again
    await page.keyboard.press("Tab");

    // and expect the next item to be tabbed to be in the content area
    const decisionLink = await page.getByRole("link", {
      name: "decision",
      exact: true,
    });
    await expect(decisionLink).toBeVisible();
    await expect(decisionLink).toBeEnabled();
    await expect(decisionLink).toBeFocused();
  });
});
