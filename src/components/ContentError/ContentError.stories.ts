import type { Meta, StoryObj } from "@storybook/react";
import { ContentError } from "./ContentError";

const meta = {
  title: "Content/Error",
  component: ContentError,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    docs: {
      description: {
        component: "Displayed when a page is not found",
      },
    },
  },
  args: {},
} satisfies Meta<typeof ContentError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
