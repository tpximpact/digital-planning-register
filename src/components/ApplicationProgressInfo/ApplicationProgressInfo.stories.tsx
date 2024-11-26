import type { Meta, StoryObj } from "@storybook/react";
import { ApplicationProgressInfo } from "./ApplicationProgressInfo";

const meta = {
  title: "DPR Components/ApplicationProgressInfo",
  component: ApplicationProgressInfo,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    withReadMore: true,
    sections: [
      {
        title: "Recieved",
        date: "2025-01-02",
        content: (
          <p>
            Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus
            mollis interdum. Nulla vitae elit libero, a pharetra augue.
          </p>
        ),
      },
      {
        title: "Valid from",
        date: "2025-01-03",
        content: (
          <p>
            Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus
            mollis interdum. Nulla vitae elit libero, a pharetra augue.
          </p>
        ),
      },
      {
        title: "Published",
        date: "2025-01-04",
        content: (
          <p>
            Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus
            mollis interdum. Nulla vitae elit libero, a pharetra augue.
          </p>
        ),
      },
      {
        title: "Consultation ended",
        date: "2025-01-05",
        content: (
          <p>
            Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus
            mollis interdum. Nulla vitae elit libero, a pharetra augue.
          </p>
        ),
      },
      {
        title: "Council decision made",
        date: "2025-01-06",
        content: (
          <p>
            Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus
            mollis interdum. Nulla vitae elit libero, a pharetra augue.
          </p>
        ),
      },
    ],
    councilSlug: "public-council-1",
    reference: "ABC123",
  },
} satisfies Meta<typeof ApplicationProgressInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const One: Story = {
  args: {
    sections: [
      {
        title: "Recieved",
        date: "2025-01-02",
        content: (
          <p>
            Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus
            mollis interdum. Nulla vitae elit libero, a pharetra augue.
          </p>
        ),
      },
    ],
  },
};
