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
