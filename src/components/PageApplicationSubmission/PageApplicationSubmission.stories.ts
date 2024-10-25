import type { Meta, StoryObj } from "@storybook/react";
import { PageApplicationSubmission } from "./PageApplicationSubmission";
import { generateAppConfig } from "@mocks/appConfigFactory";

const appConfig = generateAppConfig();
const meta = {
  title: "Pages/Council application submission",
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
    reference: "24-00135-HAPP",
  },
} satisfies Meta<typeof PageApplicationSubmission>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
