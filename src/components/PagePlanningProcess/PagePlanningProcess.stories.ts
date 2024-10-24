import type { Meta, StoryObj } from "@storybook/react";
import { PagePlanningProcess } from "./PagePlanningProcess";

const meta = {
  title: "Pages/Council planning process ",
  component: PagePlanningProcess,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  args: {},
} satisfies Meta<typeof PagePlanningProcess>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
