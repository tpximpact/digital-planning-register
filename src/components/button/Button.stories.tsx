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
      options: [
        "default",
        "start",
        "secondary",
        "blue",
        "green",
        "grey",
        "text-only",
      ],
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

export const StartButton: Story = {
  args: {
    children: "Start now",
    variant: "start",
    onClick: action("Start Button clicked"),
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

export const EmailSignUpButton: Story = {
  args: {
    element: "link",
    href: "#",
    variant: "secondary",
    className: "blue-button email-signup-button",
    ariaLabel: "Sign up for email alerts",
    children: (
      <>
        <svg
          className="button-icon"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          height="18"
          width="18"
          viewBox="0 0 459.334 459.334"
          style={{ marginRight: "8px", verticalAlign: "middle" }}
        >
          <path
            fill="currentColor"
            d="M177.216 404.514c-.001.12-.009.239-.009.359
                  0 30.078 24.383 54.461 54.461 54.461s54.461-24.383
                  54.461-54.461c0-.12-.008-.239-.009-.359H175.216zM403.549
                  336.438l-49.015-72.002v-89.83c0-60.581-43.144-111.079-100.381
                  -122.459V24.485C254.152 10.963 243.19 0 229.667 0s-24.485
                  10.963-24.485 24.485v27.663c-57.237 11.381-100.381
                  61.879-100.381 122.459v89.83l-49.015 72.002a24.76
                  24.76 0 0 0 20.468 38.693H383.08a24.761 24.761
                  0 0 0 20.469-38.694z"
          />
        </svg>
        Sign up for email alerts
      </>
    ),
    onClick: action("Email Sign-Up Button clicked"),
  },
};
