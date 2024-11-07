import type { Meta, StoryObj } from "@storybook/react";
import { ApplicationPeople } from "./ApplicationPeople";

const meta = {
  title: "DPR Components/ApplicationPeople",
  component: ApplicationPeople,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    applicant_first_name: "John",
    applicant_last_name: "Smith",
    agent_first_name: "Jane",
    agent_last_name: "Smith",
  },
} satisfies Meta<typeof ApplicationPeople>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
