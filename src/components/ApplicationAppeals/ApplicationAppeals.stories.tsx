import type { Meta, StoryObj } from "@storybook/react";
import { ApplicationAppeals } from "./ApplicationAppeals";
import {
  generateDocument,
  generateDprApplication,
  generateNResults,
} from "@mocks/dprApplicationFactory";
import { DprDocument } from "@/types";

const appWithAppeal = generateDprApplication({
  appeal: {
    reason: "This is the reason for the appeal",
    documents: generateNResults<DprDocument>(2, generateDocument),
  },
});

const meta = {
  title: "DPR Components/ApplicationAppeals",
  component: ApplicationAppeals,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    appealReason: appWithAppeal.application.appeal?.reason,
    appealDocuments: appWithAppeal.application.appeal?.documents,
  },
} satisfies Meta<typeof ApplicationAppeals>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoDocuments: Story = {
  args: {
    appealDocuments: undefined,
  },
};

export const NoReason: Story = {
  args: {
    appealReason: undefined,
  },
};
