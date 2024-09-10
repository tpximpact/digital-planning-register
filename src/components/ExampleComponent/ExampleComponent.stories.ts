import type { Meta, StoryObj } from "@storybook/react";
import { ExampleComponent } from "./ExampleComponent";

const meta = {
  title: "DPR/ExampleComponent",
  component: ExampleComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    councilName: "camden",
  },
} satisfies Meta<typeof ExampleComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
