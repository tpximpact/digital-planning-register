import type { Meta, StoryObj } from "@storybook/react";
import { CommentCard } from "./CommentCard";
import { generateComment } from "@mocks/dprApplicationFactory";
import { faker } from "@faker-js/faker";

const comment = generateComment();
const meta = {
  title: "DPR Components/CommentCard",
  component: CommentCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    comment,
    commentNumber: 2,
  },
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const LongComment: Story = {
  args: {
    comment: {
      ...comment,
      comment: faker.lorem.paragraphs(20),
    },
  },
};
export const ShortComment: Story = {
  args: {
    comment: {
      ...comment,
      comment: faker.lorem.paragraphs(1),
    },
  },
};
