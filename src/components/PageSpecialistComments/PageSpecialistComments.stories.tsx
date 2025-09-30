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
import { PageSpecialistComments } from "./PageSpecialistComments";
import { generatePagination } from "@mocks/dprApplicationFactory";
import { createAppConfig } from "@mocks/appConfigFactory";
import {
  generateExampleApplications,
  generateSpecialistComment,
} from "@mocks/dprNewApplicationFactory";

const specialist = generateSpecialistComment(1, 25);
const { consultation: application } = generateExampleApplications();
const meta = {
  title: "Council pages/Specialist Comments",
  component: PageSpecialistComments,
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
  // tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    params: {
      council: "public-council-1",
      reference: "12345",
      specialistId: 1,
    },
    appConfig: createAppConfig("public-council-1"),
    specialist,
    searchParams: {
      page: 1,
      resultsPerPage: 10,
    },
    application,
    pagination: generatePagination(
      1,
      specialist.comments.length * 5,
      specialist.comments.length * 5,
      10,
    ),
  },
} satisfies Meta<typeof PageSpecialistComments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoComments: Story = {
  args: {
    specialist: generateSpecialistComment(1, 0),
    pagination: generatePagination(1, 0, 0, 10),
  },
};

export const SingleComments: Story = {
  args: {
    specialist: generateSpecialistComment(1, 1),
    pagination: generatePagination(1, 1, 1, 10),
  },
};
