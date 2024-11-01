import type { Meta, StoryObj } from "@storybook/react";
import ApplicationHeader from ".";
import { generateBoundaryGeoJson } from "@mocks/dprApplicationFactory";

const meta = {
  title: "DPR Components/ApplicationHeader",
  component: ApplicationHeader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    reference: "12345",
    address: "123 Fake Street",
  },
} satisfies Meta<typeof ApplicationHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
