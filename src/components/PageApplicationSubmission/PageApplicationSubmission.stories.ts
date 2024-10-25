import type { Meta, StoryObj } from "@storybook/react";
import { PageApplicationSubmission } from "./PageApplicationSubmission";
import { generateDprApplication } from "@mocks/dprApplicationFactory";
import { generateApplicationSubmission } from "@mocks/odpApplicationSubmission";

const meta = {
  title: "Council Pages/Application submission",
  component: PageApplicationSubmission,
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
    application: generateDprApplication().application,
    submission: generateApplicationSubmission,
  },
} satisfies Meta<typeof PageApplicationSubmission>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoResults: Story = {
  args: {
    submission: null,
  },
};
