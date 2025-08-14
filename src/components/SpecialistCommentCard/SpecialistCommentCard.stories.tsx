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
import { SpecialistCommentCard } from "./SpecialistCommentCard";
import { generateSpecialistComment } from "@mocks/dprNewApplicationFactory";

const meta = {
  title: "DPR Components/SpecialistCommentCard",
  component: SpecialistCommentCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    specialist: {
      ...generateSpecialistComment(1),
      comments: [
        {
          ...generateSpecialistComment(1).comments[0],
          commentRedacted:
            "Asperiores inventore, consectetur adipisicing elit. Eligendi rem sapiente dolor, inventore veritatis optio.",
        },
      ],
    },
  },
} satisfies Meta<typeof SpecialistCommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoComment: Story = {
  args: {
    specialist: undefined,
  },
};

export const ShortSpecialistComment: Story = {
  args: {
    specialist: {
      ...generateSpecialistComment(1),
      comments: [
        {
          ...generateSpecialistComment(1).comments[0],
        },
      ],
    },
  },
};

export const LongSpecialistComment: Story = {
  args: {
    specialist: {
      ...generateSpecialistComment(100),
    },
  },
};

export const MultipleComments: Story = {
  args: {
    specialist: {
      ...generateSpecialistComment(3),
      comments: [
        {
          ...generateSpecialistComment(3).comments[0],
          commentRedacted:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          ...generateSpecialistComment(3).comments[1],
          commentRedacted:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          ...generateSpecialistComment(3).comments[2],
          commentRedacted:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        },
      ],
    },
  },
};

export const NoAttachedFiles: Story = {
  args: {
    specialist: {
      ...generateSpecialistComment(1),
      comments: [
        {
          ...generateSpecialistComment(1).comments[0],
          files: [],
        },
      ],
    },
  },
};

export const ObjectedSentiment: Story = {
  args: {
    specialist: {
      ...generateSpecialistComment(1),
      comments: [
        {
          ...generateSpecialistComment(1).comments[0],
          sentiment: "objected",
        },
      ],
    },
  },
};

export const AmendmentsNeededSentiment: Story = {
  args: {
    specialist: {
      ...generateSpecialistComment(1),
      comments: [
        {
          ...generateSpecialistComment(1).comments[0],
          sentiment: "amendmentsNeeded",
        },
      ],
    },
  },
};

export const ApprovedSentiment: Story = {
  args: {
    specialist: {
      ...generateSpecialistComment(1),
      comments: [
        {
          ...generateSpecialistComment(1).comments[0],
          sentiment: "approved",
        },
      ],
    },
  },
};

export const Constraint: Story = {
  args: {
    specialist: {
      ...generateSpecialistComment(1),
      reason: "Constraint",
      constraints: [
        {
          value: "articleFour",
          description: "Article 4 direction area",
          intersects: true,
          entities: [
            {
              name: "Whole District excluding the Town of Chesham - Poultry production.",
              description:
                "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
              source: {
                text: "Planning Data",
                url: "https://www.planning.data.gov.uk/entity/7010002192",
              },
            },
            {
              name: "Stock Lane - Classified Unnumbered",
              source: {
                text: "Ordnance Survey MasterMap Highways",
              },
            },
          ],
        },
      ],
    },
  },
};
