import type { Meta, StoryObj } from "@storybook/react";
import { ContentNotFound } from "./ContentNotFound";
import { getAppConfig } from "@/config";

const meta = {
  title: "Content/Not found",
  component: ContentNotFound,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    docs: {
      description: {
        component: "Displayed when a page is not found",
      },
    },
  },
  args: {},
} satisfies Meta<typeof ContentNotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Displays the default message when a page is not found",
      },
    },
  },
};

export const WithinCouncilPages: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Displays a custom message when a page is not found with links to council pages based on council config",
      },
    },
  },

  args: {
    councilConfig: getAppConfig("public-council-1").council,
  },
};
