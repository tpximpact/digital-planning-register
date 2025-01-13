import type { Meta, StoryObj } from "@storybook/react";
import { ApplicationDataField } from "./ApplicationDataField";
import { InfoIcon } from "../InfoIcon";
import { Tag } from "../Tag";

const meta = {
  title: "DPR components/ApplicationDataField",
  component: ApplicationDataField,
  decorators: [
    (Story, { args }) => {
      // since this is a page we need to add a decorator to add the main element to make it look a bit more like a page
      return (
        <dl>
          <Story />
        </dl>
      );
    },
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    title: "Title",
    value: "Value",
  },
} satisfies Meta<typeof ApplicationDataField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInfoIcon: Story = {
  args: {
    infoIcon: <InfoIcon href="#" title="title" ariaLabel="label" />,
  },
};

export const WithTag: Story = {
  args: {
    value: <Tag label="Example tag" sentiment="positive" id="example-tag" />,
  },
};

export const WithInlineTag: Story = {
  args: {
    value: <Tag label="Example tag" id="example-tag" isInline={true} />,
  },
};

export const FullWidth: Story = {
  args: {
    isFull: true,
  },
};
