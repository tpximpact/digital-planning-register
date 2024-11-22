import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
import { createAppConfig } from "@mocks/appConfigFactory";

const appConfig = createAppConfig();
const appConfigCouncilPage = createAppConfig("public-council-1");
const appConfigCouncilNoLogoPage = createAppConfig("public-council-2");
const meta = {
  title: "DPR Components/Header",
  component: Header,
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
    appConfig,
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const PublicPage: Story = {
  args: {
    appConfig,
  },
};
export const CouncilPage: Story = {
  args: {
    appConfig: appConfigCouncilPage,
  },
};
export const CouncilWithNoLogoPage: Story = {
  args: {
    appConfig: appConfigCouncilNoLogoPage,
  },
};
