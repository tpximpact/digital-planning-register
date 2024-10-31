import type { Meta, StoryObj } from "@storybook/react";
import { SummaryList } from "./SummaryList";

const meta = {
  title: "GOV UK Components/SummaryList",
  component: SummaryList,
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
    rows: [
      {
        key: {
          text: "Name",
        },
        value: {
          text: "Sarah Philips",
        },
        // actions: {
        //   items: [
        //     {
        //       href: "#",
        //       text: "Change",
        //       visuallyHiddenText: "name",
        //     },
        //   ],
        // },
      },
      {
        key: {
          text: "Date of birth",
        },
        value: {
          text: "5 January 1978",
        },
        actions: {
          items: [
            {
              href: "#",
              text: "Change",
              visuallyHiddenText: "date of birth",
            },
          ],
        },
      },
      {
        key: {
          text: "Address",
        },
        value: {
          text: (
            <>
              72 Guild Street
              <br />
              London
              <br />
              SE23 6FH
            </>
          ),
        },
        actions: {
          items: [
            {
              href: "#",
              text: "Change",
              visuallyHiddenText: "address",
            },
          ],
        },
      },
      {
        key: {
          text: "Contact details",
        },
        value: {
          text: (
            <>
              <p className="govuk-body">07700 900457</p>
              <p className="govuk-body">sarah.phillips@example.com</p>
            </>
          ),
        },
        actions: {
          items: [
            {
              href: "#",
              text: "Add",
              visuallyHiddenText: "contact details",
            },
            {
              href: "#",
              text: "Change",
              visuallyHiddenText: "contact details",
            },
          ],
        },
      },
      {
        key: {
          text: "Contact information",
        },
        value: {
          text: (
            <>
              <a href="#" className="govuk-link">
                Enter contact information
              </a>
            </>
          ),
        },
      },
      {
        key: {
          text: "Contact details",
        },
        value: {
          text: (
            <>
              <a href="#" className="govuk-link">
                Enter contact details
              </a>
            </>
          ),
        },
      },
    ],
  },
} satisfies Meta<typeof SummaryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutBorders: Story = {
  args: {
    noBorder: true,
  },
};

export const Simple: Story = {
  args: {
    rows: [
      {
        key: {
          text: "Name",
        },
        value: {
          text: "Sarah Philips",
        },
      },
      {
        key: {
          text: "Date of birth",
        },
        value: {
          text: "5 January 1978",
        },
      },
      {
        key: {
          text: "Address",
        },
        value: {
          text: (
            <>
              72 Guild Street
              <br />
              London
              <br />
              SE23 6FH
            </>
          ),
        },
      },
      {
        key: {
          text: "Contact details",
        },
        value: {
          text: (
            <>
              <p className="govuk-body">07700 900457</p>
              <p className="govuk-body">sarah.phillips@example.com</p>
            </>
          ),
        },
      },
    ],
  },
};
