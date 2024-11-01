import type { Meta, StoryObj } from "@storybook/react";
import { CookieBanner } from "./CookieBanner";

const meta = {
  title: "DPR Components/CookieBanner",
  component: CookieBanner,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    // https://storybook.js.org/blog/integrate-nextjs-and-storybook-automatically#nextnavigation
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    councilName: "camden",
  },
} satisfies Meta<typeof CookieBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

// @todo: implement stories for diferent states of the banner
export const Default: Story = {};
