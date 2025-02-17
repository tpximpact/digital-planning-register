import type { Meta, StoryObj } from "@storybook/react";
import { SentimentIcon } from "./SentimentIcon";

const meta = {
  title: "DPR Components/SentimentIcon",
  component: SentimentIcon,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    sentiment: "opposed",
  },
} satisfies Meta<typeof SentimentIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Opposed: Story = {
  args: {
    sentiment: "opposed",
  },
};
export const Neutral: Story = {
  args: {
    sentiment: "neutral",
  },
};
export const Support: Story = {
  args: {
    sentiment: "support",
  },
};
