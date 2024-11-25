import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
import { createAppConfig, createCouncilConfig } from "@mocks/appConfigFactory";

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

export const NoCouncil: Story = {
  args: {
    appConfig,
  },
};

export const CouncilWithLogo: Story = {
  args: {
    appConfig: appConfigCouncilPage,
  },
};

const baseCouncilConfig = createCouncilConfig({ councilName: "Dev Test" });
const baseAppConfig = {
  ...appConfig,
  council: baseCouncilConfig,
};

export const CouncilWithoutLogo: Story = {
  args: {
    appConfig: baseAppConfig,
  },
};

export const CouncilWithCouncilInNameWithoutLogo: Story = {
  args: {
    appConfig: appConfigCouncilNoLogoPage,
  },
};
