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
import { PublicCommentCard } from "./PublicCommentCard";
import { generateComment } from "@mocks/dprNewApplicationFactory";

const comment = generateComment();

const oneTopicComment = generateComment(1);
const twoTopicsComment = generateComment(2);
const threeTopicsComment = generateComment(3);
const fourTopicsComment = generateComment(4);
const fiveTopicsComment = generateComment(5);
const sixTopicsComment = generateComment(6);
const sevenTopicsComment = generateComment(7);
const eightTopicsComment = generateComment(8);

const meta = {
  title: "DPR Components/PublicCommentCard",
  component: PublicCommentCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    comment,
  },
} satisfies Meta<typeof PublicCommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoComment: Story = {
  args: {
    comment: undefined,
  },
};
export const OneTopicComment: Story = {
  args: {
    comment: oneTopicComment,
  },
};

export const TwoTopicComment: Story = {
  args: {
    comment: twoTopicsComment,
  },
};
export const ThreeTopicsComment: Story = {
  args: {
    comment: threeTopicsComment,
  },
};

export const FourTopicsComment: Story = {
  args: {
    comment: fourTopicsComment,
  },
};
export const FiveTopicsComment: Story = {
  args: {
    comment: fiveTopicsComment,
  },
};
export const SixTopicsComment: Story = {
  args: {
    comment: sixTopicsComment,
  },
};
export const SevenTopicsComment: Story = {
  args: {
    comment: sevenTopicsComment,
  },
};
export const EightTopicsComment: Story = {
  args: {
    comment: eightTopicsComment,
  },
};
