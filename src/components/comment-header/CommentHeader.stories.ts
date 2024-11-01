import type { Meta, StoryObj } from "@storybook/react";
import CommentHeader from "./";
import { generateBoundaryGeoJson } from "@mocks/dprApplicationFactory";

const meta = {
  title: "Comments/CommentHeader",
  component: CommentHeader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    reference: "12345",
    council: "public-council-1",
  },
} satisfies Meta<typeof CommentHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithData: Story = {
  args: {
    boundary_geojson: generateBoundaryGeoJson(),
    address: "123 Fake Street",
  },
};
