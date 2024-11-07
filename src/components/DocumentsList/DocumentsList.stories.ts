import type { Meta, StoryObj } from "@storybook/react";
import { DocumentsList } from "./DocumentsList";
import {
  generateDocument,
  generateNResults,
} from "@mocks/dprApplicationFactory";
import { DprDocument } from "@/types";

const meta = {
  title: "DPR Components/DocumentsList",
  component: DocumentsList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    councilSlug: "public-council-1",
    reference: "12345",
    documents: generateNResults<DprDocument>(9, generateDocument),
    totalDocuments: 100,
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
export const ApplicationDocumentCta: Story = {
  args: {
    documents: generateNResults<DprDocument>(3, generateDocument),
    showMoreButton: true,
  },
};
