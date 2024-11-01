import type { Meta, StoryObj } from "@storybook/react";
import { PageApplicationSubmission } from "./PageApplicationSubmission";
import { generateApplicationSubmission } from "@mocks/dprApplicationSubmission";

const meta = {
  title: "Council pages/Application submission",
  component: PageApplicationSubmission,
  decorators: [
    (Story, { args }) => {
      // since this is a page we need to add a decorator to add the main element to make it look a bit more like a page
      return (
        <main className="govuk-width-container" id="main">
          <Story />
        </main>
      );
    },
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    reference: "24-00135-HAPP",
    applicationSubmissionData: generateApplicationSubmission.data,
    submittedAt: "2024-07-02T11:30:37.913Z",
  },
} satisfies Meta<typeof PageApplicationSubmission>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
