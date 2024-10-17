import type { Meta, StoryObj } from "@storybook/react";
import { CouncilLogo } from "./CouncilLogo";

const meta = {
  title: "DPR/CouncilLogo",
  component: CouncilLogo,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    councilName: "Camden",
    logoFileName: "camdenlogo.svg",
  },
} satisfies Meta<typeof CouncilLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoFile: Story = {
  args: {
    councilName: "Camden",
    logoFileName: "",
  },
};
