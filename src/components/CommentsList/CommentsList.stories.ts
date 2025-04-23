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
 */ import type { Meta, StoryObj } from "@storybook/react";
import { CommentsList } from "./CommentsList";
import {
  generateComment,
  generateNResults,
} from "@mocks/dprApplicationFactory";

const meta = {
  title: "DPR Components/CommentsList",
  component: CommentsList,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    councilSlug: "public-council-1",
    reference: "12345",
    comments: generateNResults(30, () => generateComment()),
    resultsPerPage: 10,
    summary: {
      totalComments: 30,
      totalConsulted: 10,
      sentiment: {
        supportive: 10,
        objection: 10,
        neutral: 10,
      },
    },
  },
} satisfies Meta<typeof CommentsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoComments: Story = {
  args: {
    comments: undefined,
  },
};

export const ApplicationCommentCta: Story = {
  args: {
    comments: generateNResults(30, () => generateComment()),
    resultsPerPage: 3,
  },
};

export const ApplicationCommentCtaLessThan3Comments: Story = {
  args: {
    comments: generateNResults(2, () => generateComment()),
  },
};

export const FirstPage: Story = {
  args: {
    comments: generateNResults(30, () => generateComment()),
  },
};
