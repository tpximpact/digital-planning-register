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
import { PageApplicationComments } from "./PageApplicationComments";
import {
  generatePagination,
  generateComment,
  generateNResults,
} from "@mocks/dprApplicationFactory";
import { createAppConfig } from "@mocks/appConfigFactory";
import { DprComment } from "@/types";
import { generateDprApplication } from "@mocks/dprNewApplicationFactory";
import { CommentType } from "@/types/odp-types/schemas/postSubmissionApplication/enums/CommentType";
const application = generateDprApplication();

const defaultArgs = {
  params: {
    council: "public-council-1",
    reference: "12345",
  },
  appConfig: createAppConfig("public-council-1"),
  type: "public" as CommentType,
  application: application,
  comments: generateNResults<DprComment>(10, generateComment),
  pagination: generatePagination(1, 50),
  searchParams: {
    page: 1,
    resultsPerPage: 10,
    type: "public" as CommentType,
  },
};

const meta = {
  title: "Council pages/Application comments",
  component: PageApplicationComments,
  decorators: [
    (Story) => {
      // since this is a page we need to add a decorator to add the main element to make it look a bit more like a page
      return (
        <main className="govuk-width-container" id="main">
          <Story />
        </main>
      );
    },
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    ...defaultArgs,
  },
} satisfies Meta<typeof PageApplicationComments>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Public: Story = {
  args: {
    ...defaultArgs,
    type: "public" as CommentType,
    searchParams: {
      ...defaultArgs.searchParams,
      type: "public" as CommentType,
    },
  },
};
export const Specialist: Story = {
  args: {
    ...defaultArgs,
    type: "specialist" as CommentType,
    searchParams: {
      ...defaultArgs.searchParams,
      type: "specialist" as CommentType,
    },
  },
};
export const NoComments: Story = {
  args: {
    ...defaultArgs,
    comments: [],
    pagination: generatePagination(1, 0),
  },
};
