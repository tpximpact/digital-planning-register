import type { Meta, StoryObj } from "@storybook/react";
import { PageCenter } from "./PageCenter";

const meta = {
  title: "Utils/PageCenter",
  component: PageCenter,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    children: <>Centers content</>,
  },
} satisfies Meta<typeof PageCenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
