import type { Meta, StoryObj } from "@storybook/react";
import ApplicationMapMap from "./map";
import { generateBoundaryGeoJson } from "@mocks/dprApplicationFactory";

const meta = {
  title: "DPR Components/ApplicationMap",
  component: ApplicationMapMap,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    reference: "12345",
    mapData: generateBoundaryGeoJson(),
  },
} satisfies Meta<typeof ApplicationMapMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
