import type { Meta, StoryObj } from "@storybook/react";
import { ApplicationProgressInfo } from "./ApplicationProgressInfo";

const meta = {
  title: "DPR Components/ApplicationProgressInfo",
  component: ApplicationProgressInfo,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    applicationHistory: [
      {
        info: "Received on",
        date: "10 Sept 2023",
        details:
          "This is the date that the application is received by the council. It may not be the date it was sent, if there have been delays in the submission process.",
      },
      {
        info: "Valid from",
        date: "10 Sept 2023",
        details:
          "This is the date the application is considered valid and processing officially begins. Usually this will be the same as the received date, but sometimes applications are submitted incorrectly which delays validation.",
      },
      {
        info: "Published on",
        date: "10 Sept 2023",
        details:
          "This is the date the application is registered by the council and published on the digital planning register.",
      },
      {
        info: "Consultation ended on",
        date: "11 Jan 2024",
        details:
          "Consultation was extended from 20 Mar 2024 to 26 Mar 2024 on 18 Mar 2024. Reason given: More time needed to include neighbours input. This is the date that the statutory consultation ends for the application. Once an application has been submitted, there are at least 21 days (excluding bank/public holidays) where the council is not permitted to make a decision. This is the statutory consultation period. It can go on for longer than 21 days, but it cannot be any less. During this time, comments can be submitted for consideration. Some councils allow comments to be submitted until a decision has been made.",
      },
      {
        info: "Decision made on",
        date: "6 Mar 2024",
        details:
          "The date the council made a formal decision to grant or refuse the planning application.",
      },
    ],
  },
} satisfies Meta<typeof ApplicationProgressInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
