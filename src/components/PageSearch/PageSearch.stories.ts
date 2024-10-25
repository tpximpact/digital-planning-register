import type { Meta, StoryObj } from "@storybook/react";
import { PageSearch } from "./PageSearch";
import {
  generateDprApplication,
  generateNResults,
  generatePagination,
} from "@mocks/dprApplicationFactory";
import { createAppConfig } from "@mocks/appConfigFactory";

const meta = {
  title: "Council Pages/Search",
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
    appConfig: createAppConfig("public-council-1"),
    applications: generateNResults(10, generateDprApplication),
    pagination: generatePagination(),
  },
} satisfies Meta<typeof PageSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
