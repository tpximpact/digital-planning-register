import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button } from "./Button";

const meta = {
  title: "DPR Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    element: {
      control: { type: "select" },
      options: ["button", "link", "span", "div"],
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "blue", "green", "grey", "text-only"],
    },
    onClick: { action: "clicked" },
    href: { control: "text" },
    className: { control: "text" },
    ariaLabel: { control: "text" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Click this button",
    onClick: action("Button clicked"),
  },
};

export const PrimaryButton: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    onClick: action("Primary Button clicked"),
  },
};

export const SecondaryButton: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
    onClick: action("Secondary Button clicked"),
  },
};

export const WarningButton: Story = {
  args: {
    children: "Warning Button",
    variant: "warning",
    onClick: action("Warning Button clicked"),
  },
};

export const BlueButton: Story = {
  args: {
    children: "Blue Button",
    variant: "blue",
    onClick: action("Blue Button clicked"),
  },
};

export const ShowAllCommentsButton: Story = {
  args: {
    children: "Show all 5 neighbour comments",
    variant: "blue",
    element: "link",
    href: "#",
  },
};

export const ShowAllDocumentsButton: Story = {
  args: {
    children: "Show all 10 documents",
    variant: "blue",
    element: "link",
    href: "#",
  },
};

export const TextOnlyChangeButton: Story = {
  args: {
    children: "Change",
    variant: "text-only",
    onClick: action("Text Only Button clicked"),
    className: "button-link-change",
  },
};

export const TextOnlyLinkButton: Story = {
  args: {
    element: "link",
    href: "#",
    children: "Link Button",
    variant: "text-only",
    onClick: action("Link Button clicked"),
  },
};
