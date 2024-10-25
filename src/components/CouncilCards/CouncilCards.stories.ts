import type { Meta, StoryObj } from "@storybook/react";
import { CouncilCards } from "./CouncilCards";

const meta = {
  title: "Council selection/CouncilCards",
  component: CouncilCards,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    docs: {
      description: {
        component: "TODO",
      },
    },
  },

  args: {},
} satisfies Meta<typeof CouncilCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
