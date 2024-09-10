import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { BaseTemplate } from "./BaseTemplate";

const meta = {
  title: "Templates/Base template",
  component: BaseTemplate,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    children: <div>Content</div>,
  },
} satisfies Meta<typeof BaseTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check if the body has the class 'js-enabled'
    expect(document.body).toHaveClass("js-enabled");

    // Check if the body has the class 'govuk-frontend-supported'
    expect(document.body).toHaveClass("govuk-frontend-supported");
  },
};
