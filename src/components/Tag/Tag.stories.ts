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
import { Tag } from "./Tag";

const meta = {
  title: "DPR Components/Tag",
  component: Tag,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    label: "Not started",
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// definedStatusClass;
// Determined: "positive",
// "Consultation in progress": "neutral",
// "Assessment in progress": "neutral",
// definedDecisionClass
// Granted: "positive",
// "Prior approval required and approved": "positive",
// "Prior approval not required": "positive",
// "Prior approval required and refused": "negative",
// Refused: "negative",
export const Positive: Story = {
  args: {
    label: "Prior approval required and approved",
    sentiment: "positive",
  },
};
export const Negative: Story = {
  args: {
    label: "Prior approval required and refused",
    sentiment: "negative",
  },
};
export const Neutral: Story = {
  args: {
    label: "Assessment in progress",
    sentiment: "neutral",
  },
};
export const NoDecision: Story = {
  args: {
    label: "Not Started",
    sentiment: undefined,
  },
};

export const InlinePositive: Story = {
  args: {
    label: "Prior approval required and approved",
    sentiment: "positive",
    isInline: true,
  },
};
export const InlineNegative: Story = {
  args: {
    label: "Prior approval required and refused",
    sentiment: "negative",
    isInline: true,
  },
};
export const InlineNeutral: Story = {
  args: {
    label: "Assessment in progress",
    sentiment: "neutral",
    isInline: true,
  },
};
export const InlineNoDecision: Story = {
  args: {
    label: "Not Started",
    sentiment: undefined,
    isInline: true,
  },
};
