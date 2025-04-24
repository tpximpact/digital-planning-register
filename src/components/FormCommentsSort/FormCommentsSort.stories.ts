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

import { Meta, StoryObj } from "@storybook/react";
import { FormCommentsSort } from "./FormCommentsSort";

const meta: Meta<typeof FormCommentsSort> = {
  title: "DPR Components/FormCommentsSort",
  component: FormCommentsSort,
  tags: ["autodocs"],
  args: {
    council: "example-council",
    reference: "ABC123",
    type: "public",
    defaultOrderBy: "desc",
  },
};

export default meta;

type Story = StoryObj<typeof FormCommentsSort>;

export const Default: Story = {};

export const OldestFirst: Story = {
  args: {
    defaultOrderBy: "asc",
  },
};

export const SupportiveSentiment: Story = {
  args: {
    defaultSentiment: "supportive",
  },
};

export const ObjectionSentimentWithDateRange: Story = {
  args: {
    defaultSentiment: "objection",
    defaultPublishedAtFrom: "2023-01-01",
    defaultPublishedAtTo: "2023-12-31",
  },
};

export const NeutralSentimentSortedAsc: Story = {
  args: {
    defaultSentiment: "neutral",
    defaultOrderBy: "asc",
  },
};
