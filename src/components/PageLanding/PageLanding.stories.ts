import type { Meta, StoryObj } from "@storybook/react";
import { PageLanding } from "./PageLanding";
import { createAppConfig } from "@mocks/appConfigFactory";

const appConfig = createAppConfig();
const meta = {
  title: "Pages/Landing page",
  component: PageLanding,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    councils: appConfig.councils,
  },
} satisfies Meta<typeof PageLanding>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
