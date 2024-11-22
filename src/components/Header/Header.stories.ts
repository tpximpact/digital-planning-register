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

// base council config for the following stories that require it
const baseCouncilConfig = {
  name: "Dev Test",
  slug: "dev-test",
  visibility: "public" as const,
  dataSource: "local",
  publicComments: true,
  specialistComments: true,
  pageContent: {
    privacy_policy: {
      privacy_policy_link: "dev-test-privacy-policy-link",
    },
  },
};
const baseAppConfig = {
  councils: appConfigCouncilPage.councils,
  defaults: appConfigCouncilPage.defaults,
  navigation: appConfigCouncilPage.navigation,
  council: baseCouncilConfig,
  features: appConfigCouncilPage.features,
};

// This shows the header with no council logo and 'council' appended to the council name
export const NoLogoCouncilPage: Story = {
  args: {
    appConfig: baseAppConfig,
  },
};

// This shows the header with no council logo and 'council' is not appended to the council name because it already has the word 'council' in it
export const CouncilWithNoLogoPage: Story = {
  args: {
    appConfig: appConfigCouncilNoLogoPage,
  },
};
