import type { Meta, StoryObj } from "@storybook/react";
import { StartButton } from "./StartButton";

const meta = {
  title: "DPR Components/StartButton",
  component: StartButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
    },
    className: { control: "text" },
    ariaLabel: { control: "text" },
  },
} satisfies Meta<typeof StartButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "submit",
  },
};
