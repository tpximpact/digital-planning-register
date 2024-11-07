import type { Meta, StoryObj } from "@storybook/react";
import { SummaryCard } from "./SummaryCard";
import { SummaryList } from "../SummaryList";

const meta = {
  title: "GOV UK Components/SummaryCard",
  component: SummaryCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    title: {
      text: "Lead tenant",
    },
    children: (
      <SummaryList
        rows={[
          {
            key: {
              text: "Age",
            },
            value: {
              text: "38",
            },
            actions: {
              items: [
                {
                  href: "#",
                  text: "Change",
                  visuallyHiddenText: "age",
                },
              ],
            },
          },
          {
            key: {
              text: "Nationality",
            },
            value: {
              text: "UK national resident in UK",
            },
            actions: {
              items: [
                {
                  href: "#",
                  text: "Change",
                  visuallyHiddenText: "nationality",
                },
              ],
            },
          },
          {
            key: {
              text: "Working situation",
            },
            value: {
              text: "Part time - less than 30 hours a week",
            },
            actions: {
              items: [
                {
                  href: "#",
                  text: "Change",
                  visuallyHiddenText: "working situation",
                },
              ],
            },
          },
        ]}
      />
    ),
  },
} satisfies Meta<typeof SummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    title: {
      text: "University of Gloucestershire",
    },
    actions: {
      items: [
        {
          href: "#",
          text: "Delete choice",
          visuallyHiddenText: "of University of Gloucestershire",
        },
        {
          href: "#",
          text: "Withdraw",
          visuallyHiddenText: "from University of Gloucestershire",
        },
      ],
    },
    children: (
      <SummaryList
        cardTitle={{
          text: "University of Gloucestershire",
        }}
        rows={[
          {
            key: {
              text: "Course",
            },
            value: {
              text: (
                <>
                  English (3DMD)
                  <br />
                  PGCE with QTS full time
                </>
              ),
            },
          },
          {
            key: {
              text: "Location",
            },
            value: {
              text: (
                <>
                  School name
                  <br />
                  Road, City, SW1 1AA
                </>
              ),
            },
          },
        ]}
      />
    ),
  },
};
