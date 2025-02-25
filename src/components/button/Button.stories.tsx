/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

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
      options: ["default", "secondary", "warning", "information", "text-only"],
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

export const BlueInformationButton: Story = {
  args: {
    children: "Blue Button",
    variant: "information",
    onClick: action("Blue Button clicked"),
  },
};

export const ShowAllCommentsButton: Story = {
  args: {
    children: "Show all 5 neighbour comments",
    variant: "information",
    element: "link",
    href: "#",
  },
};

export const ShowAllDocumentsButton: Story = {
  args: {
    children: "Show all 10 documents",
    variant: "information",
    element: "link",
    href: "#",
  },
};
