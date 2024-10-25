import type { Meta, StoryObj } from "@storybook/react";
import { ApplicationDetails } from "./ApplicationDetails";
import {
  generateDocument,
  generateDprApplication,
  generateNResults,
} from "@mocks/dprApplicationFactory";
import { generateAppConfig } from "@mocks/appConfigFactory";

const meta = {
  title: "DPR/ApplicationDetails",
  component: ApplicationDetails,

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    reference: "123",
    appConfig: generateAppConfig("public-council-1"),
    application: generateDprApplication(),
    documents: generateNResults(10, generateDocument),
  },
} satisfies Meta<typeof ApplicationDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutDocuments: Story = {
  args: {
    documents: undefined,
  },
};

export const WithOneDocument: Story = {
  args: {
    documents: generateNResults(1, generateDocument),
  },
};

export const WithMultipleDocuments: Story = {
  args: {
    documents: generateNResults(10, generateDocument),
  },
};
