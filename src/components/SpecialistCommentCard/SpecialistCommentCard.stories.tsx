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
          comment:
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
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          ...generateSpecialistComment(3).comments[1],
          comment:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          ...generateSpecialistComment(3).comments[2],
          comment:
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

export const ReasonIsConstraintSingleIntersecting: Story = {
  args: {
    specialist: {
      ...generateSpecialistComment(1),
      reason: "Constraint",
      constraints: [
        {
          value: "greenBelt",
          description: "Lorem ipsum dolor sit amet",
          intersects: true,
          entities: [
            {
              name: "Area Viridis I",
              source: {
                text: "Planning Data",
                url: "https://example.com/",
              },
            },
            {
              name: "Sectio Parci Loci",
              source: {
                text: "Planning Data",
                url: "https://example.com/",
              },
            },
          ],
        },
      ],
    },
  },
};

export const ReasonIsConstraintMultipleIntersecting: Story = {
  args: {
    specialist: {
      ...generateSpecialistComment(1),
      reason: "Constraint",
      constraints: [
        {
          value: "listed.gradeOne",
          description: "Consectetur adipiscing elit",
          intersects: true,
          entities: [
            {
              name: "Domus Historica",
              source: {
                text: "Planning Data",
                url: "https://example.com/",
              },
            },
          ],
        },
        {
          value: "tpo",
          description: "Sed do eiusmod tempor",
          intersects: true,
          entities: [
            {
              name: "Quercus Arbor TPO-2023-001",
              source: {
                text: "Planning Data",
                url: "https://example.com/",
              },
            },
          ],
        },
        {
          value: "nature.SSSI",
          description: "Incididunt ut labore",
          intersects: true,
          entities: [
            {
              name: "Area Humida Faunae",
              source: {
                text: "Planning Data",
                url: "https://example.com/",
              },
            },
          ],
        },
      ],
    },
  },
};

export const ReasonIsConstraintNonIntersecting: Story = {
  args: {
    specialist: {
      ...generateSpecialistComment(1),
      reason: "Constraint",
      constraints: [
        {
          value: "flood.zoneThree.a",
          description: "Et dolore magna aliqua",
          intersects: false,
        },
      ],
    },
  },
};

export const ReasonIsConstraintMixed: Story = {
  args: {
    specialist: {
      ...generateSpecialistComment(1),
      reason: "Constraint",
      constraints: [
        {
          value: "designated.conservationArea",
          description: "Ut enim ad minim veniam",
          intersects: true,
          entities: [
            {
              name: "Zona Conservationis Urbanae",
              source: {
                text: "Planning Data",
                url: "https://example.com/",
              },
            },
          ],
        },
        {
          value: "aquifer.principal",
          description: "Quis nostrud exercitation",
          intersects: false,
        },
        {
          value: "road.classified",
          description: "Ullamco laboris nisi",
          intersects: true,
          entities: [
            {
              name: "Via Classificata A40",
              source: {
                text: "Planning Data",
                url: "https://example.com/",
              },
            },
          ],
        },
      ],
    },
  },
  name: "Reason: Constraint (Mixed Intersecting/Non-Intersecting)",
};

export const ReasonIsConstraintNoData: Story = {
  args: {
    specialist: {
      ...generateSpecialistComment(1),
      reason: "Constraint",
      constraints: [],
    },
  },
};

export const ReasonIsOther: Story = {
  args: {
    specialist: {
      ...generateSpecialistComment(1),
      reason:
        "Voluptatum cupiditate perferendis vitae eaque, quia voluptates inventore veritatis voluptas.",
      constraints: [],
    },
  },
};
