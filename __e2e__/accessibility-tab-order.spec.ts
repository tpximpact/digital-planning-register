import { test, expect } from "@playwright/test";

test.describe("ContentSidebar", () => {
  test("expect the Skip to main content link to be focused", async ({
    page,
  }) => {
    await page.goto("/");

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    const skipLink = await page.getByRole("link", {
      name: "Skip to main content",
    });
    await expect(skipLink).toBeFocused();
  });

  test("expect the tab order to be correct on content pages", async ({
    page,
  }) => {
    await page.goto("/public-council-1/TEST-C0MNT-F10W");

    await page.getByRole("link", { name: "Description" }).focus();
    await page.keyboard.press("Tab");
    expect(await page.getByRole("link", { name: "Documents" })).toBeFocused();
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");

    expect(
      await page.getByRole("link", { name: "Application form" }),
    ).toBeFocused();
  });
});
