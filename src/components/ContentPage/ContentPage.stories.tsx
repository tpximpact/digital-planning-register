import type { Meta, StoryObj } from "@storybook/react";
import { ContentPage } from "./ContentPage";

const meta = {
  title: "DPR Components/ContentPage",
  component: ContentPage,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    content: [
      {
        key: "title-1",
        title: "Title 1",
        content: (
          <p className="govuk-body">Maecenas faucibus mollis interdum.</p>
        ),
        children: [
          {
            key: "sub-title-1",
            title: "Sub Title 1",
            content: (
              <p className="govuk-body">Maecenas faucibus mollis interdum.</p>
            ),
          },
          {
            key: "sub-title-2",
            title: "Sub Title 2",
            content: (
              <p className="govuk-body">Maecenas faucibus mollis interdum.</p>
            ),
            children: [
              {
                key: "sub-sub-title-1",
                title: "Sub Sub Title 1",
                content: (
                  <p className="govuk-body">
                    Maecenas faucibus mollis interdum.
                  </p>
                ),
              },
              {
                key: "sub-sub-title-2",
                title: "Sub Sub Title 2",
                content: (
                  <p className="govuk-body">
                    Maecenas faucibus mollis interdum.
                  </p>
                ),
              },
            ],
          },
        ],
      },
      {
        key: "title-1",
        title: "Title 2",
        content: (
          <p className="govuk-body">Maecenas faucibus mollis interdum.</p>
        ),
      },
    ],
  },
} satisfies Meta<typeof ContentPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
