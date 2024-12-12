import type { Meta, StoryObj } from "@storybook/react";
import { BackButton } from "@/components/BackButton";

const meta = {
  title: "DPR Components/BackButton",
  component: BackButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    baseUrl: { control: "text" },
    searchParams: { control: "object" },
    className: { control: "text" },
  },
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BackButtonLink: Story = {
  args: {
    baseUrl: "/",
    searchParams: { test: "test" },
  },
};
