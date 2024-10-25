import type { Meta, StoryObj } from "@storybook/react";
import { DocumentsList } from "./DocumentsList";
import {
  generateDocument,
  generateDprApplication,
  generateNResults,
} from "@mocks/dprApplicationFactory";
import { generateAppConfig } from "@mocks/appConfigFactory";
import { DprDocument } from "@/types";

const meta = {
  title: "DPR/DocumentsList",
  component: DocumentsList,

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    documents: generateNResults<DprDocument>(10, generateDocument),
  },
} satisfies Meta<typeof DocumentsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoDocuments: Story = {
  args: {
    documents: undefined,
  },
};

export const ShowMoreButton: Story = {
  args: {
    resultsPerPage: 3,
    showMoreButton: true,
  },
};

export const ShowMoreButtonButOnlyThreeDocs: Story = {
  args: {
    documents: generateNResults<DprDocument>(3, generateDocument),
    resultsPerPage: 3,
    showMoreButton: true,
  },
};
