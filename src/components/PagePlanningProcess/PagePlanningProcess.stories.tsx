import type { Meta, StoryObj } from "@storybook/react";
import { PagePlanningProcess } from "./PagePlanningProcess";

const meta = {
  title: "Council pages/Planning process ",
  component: PagePlanningProcess,
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
  args: {},
} satisfies Meta<typeof PagePlanningProcess>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
