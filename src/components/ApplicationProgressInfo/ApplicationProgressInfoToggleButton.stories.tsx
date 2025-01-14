import type { Meta, StoryObj } from "@storybook/react";
import { ApplicationProgressInfoToggleButton } from "./ApplicationProgressInfoToggleButton";

const meta = {
  title: "DPR Components/ApplicationProgressInfoToggleButton",
  component: ApplicationProgressInfoToggleButton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    toggleAll: () => {},
    openAll: true,
    showText: "Show",
    hideText: "Hide",
    textContinued: "all sections",
  },
} satisfies Meta<typeof ApplicationProgressInfoToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShowAll: Story = {};
export const HideAll: Story = {
  args: {
    openAll: false,
  },
};
export const Static: Story = {
  args: {
    isStatic: true,
    toggleAll: undefined,
  },
};
