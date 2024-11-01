import type { Meta, StoryObj } from "@storybook/react";
import { FormCookiePreferences } from "./FormCookiePreferences";

const meta = {
  title: "Forms/Cookie preferences",
  component: FormCookiePreferences,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    handleSubmit: () => {},
    setAnalyticsConsent: () => {},
    analyticsConsent: null,
  },
} satisfies Meta<typeof FormCookiePreferences>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Accepted: Story = {
  args: {
    analyticsConsent: true,
  },
};
export const Rejected: Story = {
  args: {
    analyticsConsent: false,
  },
};
