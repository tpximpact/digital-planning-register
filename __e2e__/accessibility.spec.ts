import { test, expect, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
/**
 *
 * This test suite is for testing specific accessibility features that come up in our travels
 * https://playwright.dev/docs/accessibility-testing
 *
 * NB: /public-council-1/public-council-1/TEST-C0MNT-F10W is the root not-found page
 *
 */

const pages = [
  "/",
  "/public-council-1/public-council-1/TEST-C0MNT-F10W",
  "/cookie-policy",
  "/invalid-council",
  "/public-council-1",
  "/public-council-1?page=2",
  "/public-council-1?query=75-81011-ARSX",
  "/public-council-1?query=noresultsplease",
  "/public-council-1/help",
  "/public-council-1/TEST-C0MNT-F10W",
  "/public-council-1/TEST-C0MNT-F10W/application-form",
  "/public-council-1/TEST-C0MNT-F10W/comments",
  "/public-council-1/TEST-C0MNT-F10W/comments?page=2",
  "/public-council-1/TEST-C0MNT-F10W/documents",
  "/public-council-1/TEST-C0MNT-F10W/documents?page=2",
  // "/public-council-1/TEST-C0MNT-F10W/submit-comment",
  // "/public-council-1/TEST-C0MNT-F10W/submit-comment?page=1",
];

// tags are here: https://www.deque.com/axe/core-documentation/api-documentation/#axe-core-tags
// We are checking against: WCAG 2.0, WCAG 2.1, WCAG 2.2 and best practice's only up to level AA for now
// We have disabled the region rule as it can never pass if you have a skip link!

const currentAccessibility = [
  "best-practice",
  "wcag2a",
  "wcag2aa",
  // "wcag2aaa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
];

const fullAccessibility = [
  "best-practice",
  "wcag2a",
  "wcag2aa",
  "wcag2aaa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
];

const testAccessibility = async (
  page: Page,
  path: string,
  level: "full" | "current",
) => {
  await page.goto(path);

  const accessibilityScanResults = await new AxeBuilder({ page })
    .disableRules("region")
    .withTags(level === "full" ? fullAccessibility : currentAccessibility)
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
};

pages.forEach((currentPage) => {
  test.describe(currentPage, () => {
    test("should not have any automatically detectable accessibility issues", async ({
      page,
    }) => {
      await testAccessibility(page, currentPage, "current");
    });

    test.fail(
      "should not pass AAA standards because we haven't done them yet",
      async ({ page }) => {
        await testAccessibility(page, currentPage, "full");
      },
    );
  });
});
