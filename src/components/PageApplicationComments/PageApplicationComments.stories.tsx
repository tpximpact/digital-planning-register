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
  generateComment,
  generateNResults,
  generatePagination,
} from "@mocks/dprApplicationFactory";
import { DprComment } from "@/types";
import { createAppConfig } from "@mocks/appConfigFactory";
import { generateDprApplication } from "@mocks/dprNewApplicationFactory";

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
  // tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    reference: "12345",
    application: generateDprApplication(),
    comments: generateNResults<DprComment>(50, generateComment),
    pagination: generatePagination(1),
    appConfig: createAppConfig("public-council-1"),
    type: "public",
  },
} satisfies Meta<typeof PageApplicationComments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Public: Story = {
  args: {
    type: "public",
  },
};
export const Specialist: Story = {
  args: {
    type: "specialist",
  },
};
export const NoComments: Story = {
  args: {
    comments: undefined,
    pagination: undefined,
  },
};
export const FirstPage: Story = {
  args: {
    comments: generateNResults<DprComment>(30, generateComment),
    pagination: generatePagination(1),
  },
};
export const SecondPage: Story = {
  args: {
    comments: generateNResults<DprComment>(30, generateComment),
    pagination: generatePagination(2),
  },
};
export const ThirdPage: Story = {
  args: {
    comments: generateNResults<DprComment>(30, generateComment),
    pagination: generatePagination(3),
  },
};
