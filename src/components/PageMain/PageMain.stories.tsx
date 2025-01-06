import type { Meta, StoryObj } from "@storybook/react";
import { PageMain } from "./PageMain";

const meta = {
  title: "Utils/PageMain",
  component: PageMain,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    children: <>Wraps content in main div</>,
  },
} satisfies Meta<typeof PageMain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
