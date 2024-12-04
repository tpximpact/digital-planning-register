import type { Meta, StoryObj } from "@storybook/react";
import { EmailSignUpButton } from "./EmailSignUpButton";

const meta = {
  title: "DPR Components/EmailSignUpButton",
  component: EmailSignUpButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    href: { control: "text" },
  },
} satisfies Meta<typeof EmailSignUpButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "#",
  },
};
