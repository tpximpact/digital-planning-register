import type { Meta, StoryObj } from "@storybook/react";
import { MainContentTemplate } from "./MainContentTemplate";

const meta = {
  title: "Templates/Main content template",
  component: MainContentTemplate,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    children: <div>Content</div>,
  },
} satisfies Meta<typeof MainContentTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBackButton: Story = {
  args: {
    backButton: (
      <a href="#" className="govuk-back-link">
        Back
      </a>
    ),
  },
};
