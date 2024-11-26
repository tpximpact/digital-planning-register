import type { Meta, StoryObj } from "@storybook/react";
import { DocumentCard } from "./DocumentCard";
import { generateDocument } from "@mocks/dprApplicationFactory";
import { ApplicationFormObject } from "../application_form";

const meta = {
  title: "DPR Components/DocumentCard",
  component: DocumentCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  args: {
    document: generateDocument(),
  },
} satisfies Meta<typeof DocumentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ApplicationFormDocument: Story = {
  args: {
    document: ApplicationFormObject("public-council-1", "12345"),
  },
};
