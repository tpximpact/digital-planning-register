/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

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
