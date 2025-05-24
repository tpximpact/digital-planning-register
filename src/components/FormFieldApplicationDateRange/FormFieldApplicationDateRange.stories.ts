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
import { FormFieldApplicationDateRange } from "./FormFieldApplicationDateRange";

const meta = {
  title: "Forms/FormFieldApplicationDateRange",
  component: FormFieldApplicationDateRange,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    searchParams: {
      page: 1,
      resultsPerPage: 10,
      type: "simple",
    },
  },
} satisfies Meta<typeof FormFieldApplicationDateRange>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithData: Story = {
  args: {
    searchParams: {
      page: 1,
      resultsPerPage: 10,
      type: "simple",
      dateType: "publishedAt",
      dateRange: "month",
    },
  },
};
export const Fixed: Story = {
  args: {
    searchParams: {
      page: 1,
      resultsPerPage: 10,
      type: "simple",
      dateType: "publishedAt",
      dateRange: "fixed",
      dateRangeFrom: "2023-01-01",
      dateRangeTo: "2023-01-31",
    },
  },
};
