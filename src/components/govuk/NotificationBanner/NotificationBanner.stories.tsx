import type { Meta, StoryObj } from "@storybook/react";
import { NotificationBanner } from "./NotificationBanner";

const meta = {
  title: "GOV UK Components/NotificationBanner",
  component: NotificationBanner,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof NotificationBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: <>Bibendum Mattis Tristique</>,
    heading: <>Aenean lacinia bibendum nulla sed consectetur.</>,
    content: <>Cras mattis consectetur purus sit amet fermentum.</>,
  },
};

export const Success: Story = {
  args: {
    type: "success",
    content: (
      <>
        You've set your cookie preferences.{" "}
        <a href="#" className="govuk-notification-banner__link">
          Go back to the page you were looking at
        </a>
        .
      </>
    ),
  },
};
