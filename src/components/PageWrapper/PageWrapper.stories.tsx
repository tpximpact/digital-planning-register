import type { Meta, StoryObj } from "@storybook/react";
import { PageWrapper } from "./PageWrapper";

const meta = {
  title: "Utils/PageWrapper",
  component: PageWrapper,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    children: <>Wrapped in PageWrapper</>,
  },
} satisfies Meta<typeof PageWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
