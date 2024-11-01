import type { Meta, StoryObj } from "@storybook/react";
import CommentSentiment from ".";

const meta = {
  title: "Comments/CommentSentiment",
  component: CommentSentiment,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    reference: "12345",
    navigateToPage: () => {},
    updateProgress: () => {},
  },
} satisfies Meta<typeof CommentSentiment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
