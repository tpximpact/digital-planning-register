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

import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { SkipLink } from "./SkipLink";

const meta = {
  title: "GOV UK Components/SkipLink",
  component: SkipLink,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    href: "#main",
  },
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const skipLink = canvas.getByRole("link", {
      name: /skip to main content/i,
    });

    // Check if the SkipLink has no background
    expect(skipLink).toHaveStyle("background-color: rgb(0, 0, 0, 0)");

    // Simulate tab key press to focus on the SkipLink
    await userEvent.tab();

    // Check if the SkipLink has focus
    expect(skipLink).toHaveFocus();

    // Check if the SkipLink has a yellow background
    expect(skipLink).toHaveStyle("background-color: rgb(255, 221, 0)");
  },
};
