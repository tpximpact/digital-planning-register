import type { Meta, StoryObj } from "@storybook/react";
import CommentCheckAnswer from ".";
import { createAppConfig } from "@mocks/appConfigFactory";
import { Council } from "@/config/types";

const appConfig = createAppConfig("public-council-1");
const councilConfig = appConfig.council as Council;
const meta = {
  title: "Comments/CommentCheckAnswer",
  component: CommentCheckAnswer,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    councilConfig: councilConfig,
    reference: "12345",
    applicationId: 1,
    navigateToPage: () => {},
    updateProgress: () => {},
  },
} satisfies Meta<typeof CommentCheckAnswer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCouncilData: Story = {
  args: {
    councilConfig: {
      ...councilConfig,
      contact: "https://www.gov.uk/",
      pageContent: {
        ...councilConfig?.pageContent,
        council_reference_submit_comment_check_answer: {
          contact_planning_advice_link: "https://www.example.com",
          corporate_privacy_statement_link: "https://www.example.com",
          planning_service_privacy_statement_link: "https://www.example.com",
        },
      },
    },
  },
};
export const WithOutCouncilData: Story = {
  args: {
    councilConfig: {
      ...councilConfig,
      contact: undefined,
      pageContent: {
        ...councilConfig?.pageContent,
        council_reference_submit_comment_check_answer: undefined,
      },
    },
  },
};
