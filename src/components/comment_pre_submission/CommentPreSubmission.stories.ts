import type { Meta, StoryObj } from "@storybook/react";
import PreSubmission from ".";
import { createAppConfig } from "@mocks/appConfigFactory";

const meta = {
  title: "Comments/CommentPreSubmission",
  component: PreSubmission,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    councilConfig: createAppConfig("public-council-1").council,
    reference: "12345",
    navigateToPage: () => {},
    updateProgress: () => {},
  },
} satisfies Meta<typeof PreSubmission>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
