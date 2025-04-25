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
import { FormCommentsSearch } from "./FormCommentsSearch";

const meta: Meta<typeof FormCommentsSearch> = {
  title: "DPR Components/FormCommentsSearch",
  component: FormCommentsSearch,
  tags: ["autodocs"],
  args: {
    council: "example-council",
    reference: "ABC123",
    type: "public",
    // defaultOrderBy: "desc",
    searchParams: {
      query: "example query",
      //   orderBy: "desc",
      resultsPerPage: 10,
      page: 1,
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormCommentsSearch>;

export const Default: Story = {};

export const WithDefaultContent: Story = {
  args: {
    searchParams: {
      query: "This is the default content",
      page: 1,
      resultsPerPage: 10,
    },
  },
};

export const WithDefaultResultsPerPage: Story = {
  args: {
    searchParams: {
      page: 1,
      resultsPerPage: 10,
    },
  },
};
