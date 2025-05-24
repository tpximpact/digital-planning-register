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
import { FormApplicationsSort } from "./FormApplicationsSort";

const meta: Meta<typeof FormApplicationsSort> = {
  title: "Forms/Applications Sort",
  component: FormApplicationsSort,
  tags: ["autodocs"],
  args: {
    searchParams: {
      type: "simple",
      resultsPerPage: 10,
      page: 1,
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormApplicationsSort>;

export const Default: Story = {};

export const OldestFirst: Story = {
  args: {
    searchParams: {
      type: "simple",
      sortBy: "receivedAt",
      orderBy: "asc",
      resultsPerPage: 10,
      page: 1,
    },
  },
};

export const WithForm: Story = {
  args: {
    action: "/comments",
    searchParams: {
      type: "simple",
      resultsPerPage: 10,
      page: 1,
    },
  },
};
