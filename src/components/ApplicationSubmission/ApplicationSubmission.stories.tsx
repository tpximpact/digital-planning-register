import type { Meta, StoryObj } from "@storybook/react";
import { ApplicationSubmission } from "./ApplicationSubmission";
import { generateApplicationSubmission } from "@mocks/odpApplicationSubmission";

const meta = {
  title: "DPR/Application submission",
  component: ApplicationSubmission,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    submission: generateApplicationSubmission,
  },
} satisfies Meta<typeof ApplicationSubmission>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoResults: Story = {
  args: {
    submission: undefined,
  },
};
