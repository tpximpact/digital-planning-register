import type { Meta, StoryObj } from "@storybook/react";
import { DescriptionCard } from "./DescriptionCard";

const meta = {
  title: "DPR Components/DescriptionCard",
  component: DescriptionCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    description: "This is a description",
  },
} satisfies Meta<typeof DescriptionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
