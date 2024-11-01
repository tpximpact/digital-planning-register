import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./Menu";
import { createAppConfig } from "@mocks/appConfigFactory";

const appConfig = createAppConfig("public-council-1");
const appConfigCouncilPage = createAppConfig("public-council-1");
const meta = {
  title: "DPR components/Menu",
  component: Menu,
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
    currentPath: "/hello",
    navigation: appConfig.navigation,
    councils: appConfig.councils,
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const PublicPage: Story = {
  args: {
    currentPath: "/",
    navigation: appConfig.navigation,
    councils: appConfig.councils,
  },
};
export const CouncilPage: Story = {
  args: {
    currentPath: "/public-council-1",
    navigation: appConfigCouncilPage.navigation,
    councils: appConfigCouncilPage.councils,
    selectedCouncil: appConfigCouncilPage.council,
  },
};
