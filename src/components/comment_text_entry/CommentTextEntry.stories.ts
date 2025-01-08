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
    topicLabels: {
      design:
        "Comment on the design, size or height of new buildings or extensions",
      use: "Comment on the use and function of the proposed development",
      light: "Comment on impacts on natural light",
      privacy: "Comment on impacts to the privacy of neighbours",
      access: "Comment on impacts on disabled persons' access",
      noise: "Comment on any noise from new uses",
      traffic: "Comment on impacts to traffic, parking or road safety",
      other: "Comment on other things",
    },
  },
} satisfies Meta<typeof CommentTextEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
