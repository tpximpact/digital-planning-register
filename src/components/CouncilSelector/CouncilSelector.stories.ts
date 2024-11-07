import type { Meta, StoryObj } from "@storybook/react";
import { CouncilSelector } from "./CouncilSelector";
import { getAppConfig } from "@/config";

const appConfig = getAppConfig();
const councils = appConfig.councils.map((council) => {
  council.visibility = "public";
  return council;
});

const meta = {
  title: "DPR Components/CouncilSelector",
  component: CouncilSelector,
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
    councils,
  },
} satisfies Meta<typeof CouncilSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = {
  args: {
    selectedCouncil: councils[2],
  },
};
