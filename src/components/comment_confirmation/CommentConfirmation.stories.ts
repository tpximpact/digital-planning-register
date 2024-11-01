import type { Meta, StoryObj } from "@storybook/react";
import CommentConfirmation from ".";
import { createAppConfig } from "@mocks/appConfigFactory";
import { Council } from "@/config/types";
import { generateBoundaryGeoJson } from "@mocks/dprApplicationFactory";

const appConfig = createAppConfig("public-council-1");
const councilConfig = appConfig.council as Council;
const meta = {
  title: "Comments/CommentConfirmation",
  component: CommentConfirmation,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    reference: "12345",
    council: "public-council-1",

    navigateToPage: () => {},
  },
} satisfies Meta<typeof CommentConfirmation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithData: Story = {
  args: {
    boundary_geojson: generateBoundaryGeoJson(),
    address: "123 Fake Street",
  },
};
