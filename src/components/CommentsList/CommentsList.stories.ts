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
import { CommentsList } from "./CommentsList";
import {
  generateComment,
  generateNResults,
  generatePagination,
} from "@mocks/dprApplicationFactory";
import { DprComment } from "@/types";

const meta = {
  title: "DPR Components/CommentsList",
  component: CommentsList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    councilSlug: "public-council-1",
    reference: "12345",
    comments: generateNResults<DprComment>(30, () => generateComment(true)),
    pagination: generatePagination(1),
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
    comments: generateNResults<DprComment>(30, () => generateComment(true)),
    pagination: {
      results: 3,
      page: 1,
    },
    showMoreButton: true,
  },
};
export const ApplicationCommentCtaLessThan3Comments: Story = {
  args: {
    comments: generateNResults<DprComment>(2, () => generateComment(true)),
    pagination: {
      results: 3,
      page: 1,
    },
    showMoreButton: true,
  },
};
export const FirstPage: Story = {
  args: {
    comments: generateNResults<DprComment>(30, () => generateComment(true)),
    pagination: generatePagination(1),
  },
};
export const SecondPage: Story = {
  args: {
    comments: generateNResults<DprComment>(30, () => generateComment(true)),
    pagination: generatePagination(2),
  },
};
export const ThirdPage: Story = {
  args: {
    comments: generateNResults<DprComment>(30, () => generateComment(true)),
    pagination: generatePagination(3),
  },
};
