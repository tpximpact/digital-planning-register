import type { Meta, StoryObj } from "@storybook/react";
import { ApplicationDecisionLabel } from "./ApplicationDecisionLabel";

const meta = {
  title: "DPR Components/ApplicationDecisionLabel",
  component: ApplicationDecisionLabel,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    label: "Not started",
  },
} satisfies Meta<typeof ApplicationDecisionLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// definedStatusClass;
// Determined: "positive",
// "Consultation in progress": "neutral",
// "Assessment in progress": "neutral",
// definedDecisionClass
// Granted: "positive",
// "Prior approval required and approved": "positive",
// "Prior approval not required": "positive",
// "Prior approval required and refused": "negative",
// Refused: "negative",
export const Positive: Story = {
  args: {
    label: "Prior approval required and approved",
    decision: "positive",
  },
};
export const Negative: Story = {
  args: {
    label: "Prior approval required and refused",
    decision: "negative",
  },
};
export const Neutral: Story = {
  args: {
    label: "Assessment in progress",
    decision: "neutral",
  },
};
export const NoDecision: Story = {
  args: {
    label: "Not Started",
    decision: undefined,
  },
};

export const InlinePositive: Story = {
  args: {
    label: "Prior approval required and approved",
    decision: "positive",
    isInline: true,
  },
};
export const InlineNegative: Story = {
  args: {
    label: "Prior approval required and refused",
    decision: "negative",
    isInline: true,
  },
};
export const InlineNeutral: Story = {
  args: {
    label: "Assessment in progress",
    decision: "neutral",
    isInline: true,
  },
};
export const InlineNoDecision: Story = {
  args: {
    label: "Not Started",
    decision: undefined,
    isInline: true,
  },
};
