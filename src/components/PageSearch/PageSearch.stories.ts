import type { Meta, StoryObj } from "@storybook/react";
import { PageSearch } from "./PageSearch";
import { getAppConfig } from "@/config";
import { defaultPagination } from "@/handlers/lib";

const appConfig = getAppConfig("public-council-1");
const meta = {
  title: "Pages/Council Application search page",
  component: PageSearch,
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
    appConfig,
    applications: undefined,
    pagination: defaultPagination,
  },
} satisfies Meta<typeof PageSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
