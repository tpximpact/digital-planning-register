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
import { CommentsSummary } from "./CommentsSummary";

const meta = {
  title: "DPR Components/Comments summary",
  component: CommentsSummary,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    params: {
      council: "public-council-1",
      reference: "ABC/123",
    },
    type: "public",
    summary: {
      sentiment: {
        supportive: 10,
        neutral: 5,
        objection: 2,
      },
      totalComments: 17,
    },
  },
} satisfies Meta<typeof CommentsSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Public: Story = {};
export const PublicNoComments: Story = {
  args: {
    summary: {
      sentiment: {
        supportive: 0,
        neutral: 0,
        objection: 0,
      },
      totalComments: 0,
    },
  },
};
export const PublicSingularComments: Story = {
  args: {
    summary: {
      sentiment: {
        supportive: 1,
        neutral: 0,
        objection: 0,
      },
      totalComments: 1,
    },
  },
};
export const Specialist: Story = {
  args: {
    type: "specialist",
    summary: {
      sentiment: {
        approved: 7,
        amendmentsNeeded: 3,
        objected: 4,
      },
      totalConsulted: 16,
      totalComments: 14,
    },
  },
};

export const SpecialistNoComments: Story = {
  args: {
    type: "specialist",
    summary: {
      sentiment: {
        approved: 0,
        amendmentsNeeded: 0,
        objected: 0,
      },
      totalConsulted: 0,
      totalComments: 0,
    },
  },
};
export const SpecialistSingularComments: Story = {
  args: {
    type: "specialist",
    summary: {
      sentiment: {
        approved: 1,
        amendmentsNeeded: 0,
        objected: 0,
      },
      totalConsulted: 1,
      totalComments: 1,
    },
  },
};
