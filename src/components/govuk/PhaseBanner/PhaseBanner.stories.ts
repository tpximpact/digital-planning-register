import type { Meta, StoryObj } from "@storybook/react";
import { PhaseBanner } from "./PhaseBanner";

const meta = {
  title: "GOV UK Components/PhaseBanner",
  component: PhaseBanner,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof PhaseBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
