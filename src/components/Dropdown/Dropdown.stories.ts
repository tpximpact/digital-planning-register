import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";

const meta = {
  title: "DPR Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    id: { control: "text" },
    options: { control: "object" },
    setSelectedOption: { action: "selectedOption" },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Sort by",
    id: "sortOrder",
    options: [
      { title: "Most recent to oldest", value: "desc" },
      { title: "Oldest to most recent", value: "asc" },
    ],
    setSelectedOption: (value) => {
      console.log("Selected option:", value);
    },
  },
};
