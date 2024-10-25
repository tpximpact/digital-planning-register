import type { Meta, StoryObj } from "@storybook/react";
import {
  ApplicationMap,
  ApplicationMapLoader,
  ApplicationMapLoading,
  ApplicationMapLoaderDelay,
  ApplicationMapUnavailable,
} from ".";
import {
  generateBoundaryGeoJson,
  generateDprApplication,
} from "@mocks/dprApplicationFactory";

const meta = {
  title: "DPR/ApplicationMap",
  component: ApplicationMap,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },

  args: {
    reference: "12345",
    mapData: generateBoundaryGeoJson(),
    description:
      "This is an aria description for this map to give more context",
  },
} satisfies Meta<typeof ApplicationMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ForceStatic: Story = {
  args: {
    isStatic: true,
  },
};

export const LoadingMap: Story = {
  render: () => <ApplicationMapLoading {...meta.args} />,
};

export const UnavailableMap: Story = {
  render: () => <ApplicationMapUnavailable {...meta.args} />,
};

export const DelayedLoader: Story = {
  render: () => <ApplicationMapLoaderDelay {...meta.args} />,
};

export const ContextSetter: Story = {
  args: {
    mapType: "context-setter",
  },
};

export const ApplicationSearch: Story = {
  args: {
    mapType: "application-search",
  },
};

export const ApplicationShow: Story = {
  args: {
    mapType: "application-show",
  },
};
