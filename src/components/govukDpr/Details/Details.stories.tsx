import type { Meta, StoryObj } from "@storybook/react";
import { Details } from "./Details";

const meta = {
  title: "GOV UK DPR Components/Details",
  component: Details,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    summaryText: "Help with commenting",
    text: (
      <>
        Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a
        ante venenatis dapibus posuere velit aliquet.
      </>
    ),
  },
} satisfies Meta<typeof Details>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const White: Story = {
  args: {
    isInverted: true,
  },
};
