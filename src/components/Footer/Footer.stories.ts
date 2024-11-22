import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";
import { createAppConfig } from "@mocks/appConfigFactory";

const appConfig = createAppConfig("public-council-1");
const meta = {
  title: "DPR Components/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    councilConfig: appConfig.council,
  },
};

export const Undefined: Story = {
  args: {
    councilConfig: undefined,
  },
};
