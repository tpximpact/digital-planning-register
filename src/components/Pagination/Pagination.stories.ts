import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

const meta = {
  title: "DPR Components/Pagination",
  component: Pagination,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    currentPage: 0,
    totalItems: 50,
    itemsPerPage: 10,
    baseUrl: "/",
    queryParams: {},
    totalPages: 6,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const FirstPage: Story = {
  args: {
    currentPage: 0,
  },
};
export const SecondPage: Story = {
  args: {
    currentPage: 1,
  },
};
export const ThirdPage: Story = {
  args: {
    currentPage: 2,
  },
};
export const LastPage: Story = {
  args: {
    currentPage: 4,
  },
};
