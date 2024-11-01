import type { Meta, StoryObj } from "@storybook/react";
import { PageApplicationDocuments } from "./PageApplicationDocuments";
import { getAppConfig } from "@/config";
import { createItemPagination } from "@/lib/pagination";
import {
  generateDocument,
  generateDprApplication,
  generateNResults,
  generatePagination,
} from "@mocks/dprApplicationFactory";
import { DprDocument } from "@/types";
import { createAppConfig } from "@mocks/appConfigFactory";

const meta = {
  title: "Council pages/Application documents",
  component: PageApplicationDocuments,
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
    reference: "12345",
    application: generateDprApplication(),
    documents: generateNResults<DprDocument>(50, generateDocument),
    pagination: generatePagination(1),
    appConfig: createAppConfig("public-council-1"),
  },
} satisfies Meta<typeof PageApplicationDocuments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoDocuments: Story = {
  args: {
    documents: undefined,
    pagination: undefined,
  },
};
export const FirstPage: Story = {
  args: {
    documents: generateNResults<DprDocument>(50, generateDocument),
    pagination: generatePagination(1),
  },
};
export const SecondPage: Story = {
  args: {
    documents: generateNResults<DprDocument>(50, generateDocument),
    pagination: generatePagination(2),
  },
};
export const ThirdPage: Story = {
  args: {
    documents: generateNResults<DprDocument>(50, generateDocument),
    pagination: generatePagination(3),
  },
};
