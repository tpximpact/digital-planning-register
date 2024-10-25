import type { Meta, StoryObj } from "@storybook/react";
import { ContextSetter } from "./ContextSetter";
import { de } from "@faker-js/faker";
import { generateDprApplication } from "@mocks/dprApplicationFactory";

const meta = {
  title: "DPR/ContextSetter",
  component: ContextSetter,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    docs: {
      description: {
        component: `Used at the top of many pages to ensure the user knows they are still looking at the corrct application. <br />
          On each page in the comment flow it has an additional line of text about the importance of commenting, which does not appear elsewhere.`,
      },
    },
  },

  args: {
    councilSlug: "public-council-1",
    application: generateDprApplication(),
  },
} satisfies Meta<typeof ContextSetter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const InCommentFlow: Story = {
  args: {
    text: (
      <>
        <p>
          Your feedback helps us improve developments so they meet the needs of
          people in Camden. It&rsquo;s important you let us know what you think.
        </p>
      </>
    ),
  },
};
