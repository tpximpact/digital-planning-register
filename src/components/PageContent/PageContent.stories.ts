import { Meta, StoryObj } from "@storybook/react";
import { PageContent } from "./PageContent";

const meta = {
  title: "Utils/Page Content",
  component: PageContent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    title: "Test",
    content: "TestContent",
    children: "Test Children",
  },
} satisfies Meta<typeof PageContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
