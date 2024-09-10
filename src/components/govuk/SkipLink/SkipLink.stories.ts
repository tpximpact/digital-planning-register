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
