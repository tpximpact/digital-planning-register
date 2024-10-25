import type { Meta, StoryObj } from "@storybook/react";
import { PageApplicationDocuments } from "./PageApplicationDocuments";
import { getAppConfig } from "@/config";
import { createItemPagination } from "@/lib/pagination";

const meta = {
  title: "Council Pages/Application documents",
  component: PageApplicationDocuments,
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
    params: {
      council: "public-council-1",
      reference: "12345",
    },
  },
} satisfies Meta<typeof PageApplicationDocuments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
