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
import { Pagination } from "./Pagination";

const meta = {
  title: "GOV UK Components/Pagination",
  component: Pagination,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    pagination: {
      page: 50,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    },
    baseUrl: "search",
    searchParams: {
      resultsPerPage: 10,
      page: 1,
      query: "value",
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// show page numbers for:

// the current page
// at least one page immediately before and after the current page
// first and last pages
// Use ellipses (…) to replace any skipped pages. For example:

// [1] 2 … 100
// 1 [2] 3 … 100
// 1 2 [3] 4 … 100
// 1 2 3 [4] 5 … 100
// 1 … 4 [5] 6 … 100
// 1 … 97 [98] 99 100
// 1 … 98 [99] 100
// 1 … 99 [100]

export const FirstPage: Story = {
  args: {
    pagination: {
      page: 1,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    },
  },
};

export const SecondPage: Story = {
  args: {
    pagination: {
      page: 2,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    },
  },
};

export const ThirdPage: Story = {
  args: {
    pagination: {
      page: 3,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    },
  },
};

export const FourthPage: Story = {
  args: {
    pagination: {
      page: 4,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    },
  },
};

export const FifthPage: Story = {
  args: {
    pagination: {
      page: 5,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    },
  },
};

export const NinetyEighthPage: Story = {
  args: {
    pagination: {
      page: 98,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    },
  },
};

export const NinetyNinthPage: Story = {
  args: {
    pagination: {
      page: 99,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    },
  },
};

export const LastPage: Story = {
  args: {
    pagination: {
      page: 100,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    },
  },
};

export const HigherThanPossiblePage: Story = {
  args: {
    pagination: {
      page: 101,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    },
  },
};

export const LowerThanPossiblePage: Story = {
  args: {
    pagination: {
      page: 0,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    },
  },
};

export const EvenLowerThanPossiblePage: Story = {
  args: {
    pagination: {
      page: -1,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    },
  },
};

export const MoreItemsThanPages: Story = {
  args: {
    pagination: {
      page: 101,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    },
  },
};

export const BlockPage: Story = {
  args: {
    pagination: undefined,
    prev: {
      href: "prev-page",
    },
    next: { href: "next-page" },
  },
};

export const BlockWithDescriptionPage: Story = {
  args: {
    pagination: undefined,
    prev: {
      labelText: "Applying for a provisional lorry or bus licence",
      href: "prev-page",
      page: 1,
    },
    next: {
      labelText: "Driver CPC part 1 test: theory",
      href: "next-page",
      page: 2,
    },
  },
};
