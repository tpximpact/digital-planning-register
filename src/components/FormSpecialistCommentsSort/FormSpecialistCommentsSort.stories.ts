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
import { FormSpecialistCommentsSort } from "./FormSpecialistCommentsSort";

const meta: Meta<typeof FormSpecialistCommentsSort> = {
  title: "Forms/Specialist Comments Sort",
  component: FormSpecialistCommentsSort,
  tags: ["autodocs"],
  args: {
    searchParams: {
      resultsPerPage: 10,
      page: 1,
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormSpecialistCommentsSort>;

export const Default: Story = {};

export const OldestFirst: Story = {
  args: {
    searchParams: {
      resultsPerPage: 10,
      page: 1,
      sortBy: "publishedAt",
      orderBy: "asc",
    },
  },
};
