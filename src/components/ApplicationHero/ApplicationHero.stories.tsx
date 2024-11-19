import type { Meta, StoryObj } from "@storybook/react";
import { ApplicationHero } from "./ApplicationHero";
import { generateDprApplication } from "@mocks/dprApplicationFactory";

const application = generateDprApplication();
const meta = {
  title: "DPR Components/ApplicationHero",
  component: ApplicationHero,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    councilSlug: "public-council-1",
    application: application,
  },
} satisfies Meta<typeof ApplicationHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CommentsEnabled: Story = {
  args: {
    application: {
      ...application,
      application: {
        ...application.application,
        status: "not_started",
      },
    },
  },
};
export const CommentsDisabled: Story = {
  args: {
    application: {
      ...application,
      application: {
        ...application.application,
        status: "determined",
      },
    },
  },
};
