import type { Meta, StoryObj } from "@storybook/react";
import { BackLink } from "./BackLink";

const meta = {
  title: "GOV UK Components/BackLink",
  component: BackLink,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
    // https://storybook.js.org/blog/integrate-nextjs-and-storybook-automatically#nextnavigation
  },
  args: {
    href: "",
  },
} satisfies Meta<typeof BackLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
