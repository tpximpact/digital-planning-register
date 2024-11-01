import type { Meta, StoryObj } from "@storybook/react";
import { PageShow } from "./PageShow";
import {
  generateDocument,
  generateDprApplication,
  generateNResults,
  generatePagination,
} from "@mocks/dprApplicationFactory";
import { createAppConfig } from "@mocks/appConfigFactory";

const meta = {
  title: "Council pages/Show",
  component: PageShow,
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
    appConfig: createAppConfig("public-council-1"),
    application: generateDprApplication(),
    documents: generateNResults(10, generateDocument),
    params: {
      council: "public-council-1",
      reference: "123456",
    },
  },
} satisfies Meta<typeof PageShow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoResult: Story = {
  args: {
    application: null,
  },
};
