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
import { FormDocumentsSearch } from "./FormDocumentsSearch";

const meta: Meta<typeof FormDocumentsSearch> = {
  title: "Forms/Documents Search",
  component: FormDocumentsSearch,
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    searchParams: {
      page: 1,
      resultsPerPage: 10,
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormDocumentsSearch>;

export const Default: Story = {};

export const WithContent: Story = {
  args: {
    searchParams: {
      page: 1,
      resultsPerPage: 25,
      name: "This is the default content",
      type: "usePlan.existing",
      publishedAtFrom: "2023-01-01",
      publishedAtTo: "2023-12-31",
    },
  },
};

export const WithForm: Story = {
  args: {
    action: "/documents",
    searchParams: {
      page: 1,
      resultsPerPage: 25,
    },
  },
};
