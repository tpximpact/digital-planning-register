import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";
import { getAppConfig } from "@/config";

const meta = {
  title: "GOV UK Components/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    councilConfig: getAppConfig("camden").council,
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
