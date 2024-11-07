import type { Meta, StoryObj } from "@storybook/react";
import { InfoIcon } from "./InfoIcon";
import { ar } from "@faker-js/faker";

const meta = {
  title: "DPR Components/InfoIcon",
  component: InfoIcon,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    href: "/link",
    title: "Understanding application types",
    ariaLabel: "Understanding application types",
  },
} satisfies Meta<typeof InfoIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
