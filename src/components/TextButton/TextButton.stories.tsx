import type { Meta, StoryObj } from "@storybook/react";
import { TextButton } from "./TextButton";

const meta = {
  title: "DPR Components/TextButton",
  component: TextButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    element: {
      control: { type: "select" },
      options: ["button", "link", "span", "div"],
    },
    variant: { control: { type: "select" }, options: ["default", "plain"] },
    className: { control: "text" },
    ariaLabel: { control: "text" },
  },
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Click Here",
  },
};

export const Plain: Story = {
  args: {
    children: "Change",
    variant: "plain",
    element: "button",
  },
};

export const Link: Story = {
  args: {
    children: "Click Here",
    element: "link",
    href: "/",
  },
};

export const Button: Story = {
  args: {
    children: "Click Here",
    element: "button",
  },
};
