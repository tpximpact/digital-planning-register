import type { Meta, StoryObj } from "@storybook/react";
import { PageItem } from "./PageItem";

import "./Pagination.scss";

const meta = {
  title: "GOV UK Components/Pagination/PageItem",
  component: PageItem,
  decorators: [
    (Story, { args }) => {
      // since this isn't an external component we can add a decorator here
      return (
        <div
          className={`govuk-pagination ${args.blockLevel ? "govuk-pagination--block" : ""}`}
        >
          <Story />
        </div>
      );
    },
  ],

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {},
} satisfies Meta<typeof PageItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    page: {
      number: 1,
      current: false,
    },
    link: "#",
  },
};

export const Current: Story = {
  args: {
    page: {
      number: 1,
      current: true,
    },
    link: "#",
  },
};

export const Ellipses: Story = {
  args: {
    page: {
      number: -1,
      current: false,
    },
    link: "#",
  },
};
