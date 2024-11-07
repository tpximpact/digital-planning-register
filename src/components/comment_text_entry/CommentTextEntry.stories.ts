import type { Meta, StoryObj } from "@storybook/react";
import CommentTextEntry from "./";

const meta = {
  title: "Comments/CommentTextEntry",
  component: CommentTextEntry,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    reference: "12345",
    currentTopic: "use",
    onContinue: () => {},
    updateProgress: () => {},
    currentTopicIndex: 0,
    totalTopics: 2,
  },
} satisfies Meta<typeof CommentTextEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
