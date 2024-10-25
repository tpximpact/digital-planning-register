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
      currentPage: 50,
      totalPages: 100,
      itemsPerPage: 10,
      totalItems: 1000,
    },
    currentUrl: "/search?urlParam=1",
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
      currentPage: 1,
      totalPages: 100,
      itemsPerPage: 10,
      totalItems: 1000,
    },
  },
};

export const SecondPage: Story = {
  args: {
    pagination: {
      currentPage: 2,
      totalPages: 100,
      itemsPerPage: 10,
      totalItems: 1000,
    },
  },
};

export const ThirdPage: Story = {
  args: {
    pagination: {
      currentPage: 3,
      totalPages: 100,
      itemsPerPage: 10,
      totalItems: 1000,
    },
  },
};

export const FourthPage: Story = {
  args: {
    pagination: {
      currentPage: 4,
      totalPages: 100,
      itemsPerPage: 10,
      totalItems: 1000,
    },
  },
};

export const FifthPage: Story = {
  args: {
    pagination: {
      currentPage: 5,
      totalPages: 100,
      itemsPerPage: 10,
      totalItems: 1000,
    },
  },
};

export const NinetyEighthPage: Story = {
  args: {
    pagination: {
      currentPage: 98,
      totalPages: 100,
      itemsPerPage: 10,
      totalItems: 1000,
    },
  },
};

export const NinetyNinthPage: Story = {
  args: {
    pagination: {
      currentPage: 99,
      totalPages: 100,
      itemsPerPage: 10,
      totalItems: 1000,
    },
  },
};

export const LastPage: Story = {
  args: {
    pagination: {
      currentPage: 100,
      totalPages: 100,
      itemsPerPage: 10,
      totalItems: 1000,
    },
  },
};

export const HigherThanPossiblePage: Story = {
  args: {
    pagination: {
      currentPage: 101,
      totalPages: 100,
      itemsPerPage: 10,
      totalItems: 1000,
    },
  },
};

export const LowerThanPossiblePage: Story = {
  args: {
    pagination: {
      currentPage: 0,
      totalPages: 100,
      itemsPerPage: 10,
      totalItems: 1000,
    },
  },
};

export const EvenLowerThanPossiblePage: Story = {
  args: {
    pagination: {
      currentPage: -1,
      totalPages: 100,
      itemsPerPage: 10,
      totalItems: 1000,
    },
  },
};

export const BlockPage: Story = {
  args: {
    pagination: undefined,
    prev: {
      href: "?prev=1",
    },
    next: { href: "?next=1" },
  },
};

export const BlockWithDescriptionPage: Story = {
  args: {
    pagination: undefined,
    prev: {
      labelText: "Applying for a provisional lorry or bus licence",
      href: "?prev=1",
    },
    next: { labelText: "Driver CPC part 1 test: theory", href: "?next=1" },
  },
};
