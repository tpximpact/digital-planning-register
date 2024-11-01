import type { Meta, StoryObj } from "@storybook/react";
import { Panel } from "./Panel";

const meta = {
  title: "GOV UK Components/Panel",
  component: Panel,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    titleText: "Application complete",
    text: (
      <>
        Your reference number
        <br />
        <strong>HDJ2123F</strong>
      </>
    ),
  },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
