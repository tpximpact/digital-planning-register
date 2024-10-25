import type { Meta, StoryObj } from "@storybook/react";
import { PageTemplate } from "./PageTemplate";
import { generateAppConfig } from "@mocks/appConfigFactory";

const meta = {
  title: "DPR/Pages/Template",
  component: PageTemplate,
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
    children: <>PageTemplate</>,
    appConfig: generateAppConfig(),
  },
} satisfies Meta<typeof PageTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCouncil: Story = {
  args: {
    children: <>PageTemplate</>,
    appConfig: generateAppConfig("public-council-1"),
  },
};
