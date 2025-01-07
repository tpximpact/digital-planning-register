import type { Meta, StoryObj } from "@storybook/react";
import { ApplicationProgressInfo } from "./ApplicationProgressInfo";
import { formatDateTimeToDprDate } from "@/util";

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
        date: "2 Jan 2021",
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
        date: "3 Jan 2021",
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
        date: "4 Jan 2021",
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
        date: "5 Jan 2021",
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
        date: (
          <time dateTime={"2025-07-05T06:37:03.217Z"}>
            {formatDateTimeToDprDate("2025-07-05T06:37:03.217Z")}
          </time>
        ),
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
