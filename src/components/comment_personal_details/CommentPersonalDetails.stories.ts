import type { Meta, StoryObj } from "@storybook/react";
import CommentPersonalDetails from ".";
import { createAppConfig } from "@mocks/appConfigFactory";
import { Council } from "@/config/types";

const appConfig = createAppConfig("public-council-1");
const councilConfig = appConfig.council as Council;
const meta = {
  title: "Comments/CommentPersonalDetails",
  component: CommentPersonalDetails,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    councilConfig,
    reference: "12345",
    navigateToPage: () => {},
    updateProgress: () => {},
  },
} satisfies Meta<typeof CommentPersonalDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCouncilData: Story = {
  args: {
    councilConfig: {
      ...councilConfig,
      pageContent: {
        ...councilConfig?.pageContent,
        council_reference_submit_comment_personal_details: {
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
      pageContent: {
        ...councilConfig?.pageContent,
        council_reference_submit_comment_personal_details: undefined,
      },
    },
  },
};
