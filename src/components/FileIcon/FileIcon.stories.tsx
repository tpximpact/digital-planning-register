import type { Meta, StoryObj } from "@storybook/react";
import { FileIcon } from "./FileIcon";

const meta = {
  title: "DPR Components/FileIcon",
  component: FileIcon,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof FileIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Html: Story = {
  args: {
    fileType: "html",
  },
};
export const Jpg: Story = {
  args: {
    fileType: "jpg",
  },
};
export const Png: Story = {
  args: {
    fileType: "png",
  },
};
export const Pdf: Story = {
  args: {
    fileType: "pdf",
  },
};
