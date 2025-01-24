import type { Meta, StoryObj } from "@storybook/react";
import { ContentSignposting } from "./ContentSignposting";

const meta = {
  title: "DPR Components/ContentSignposting",
  component: ContentSignposting,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    council: "test-council",
    pages: [
      {
        key: "planning-process",
        title: "Planning Process Overview",
        content: (
          <p className="govuk-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation.
          </p>
        ),
        linked: true,
      },
      {
        key: "before-you-apply",
        title: "Pre-Application Guidelines",
        content: (
          <p className="govuk-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur
            aliquet quam id dui posuere blandit.
          </p>
        ),
        linked: true,
      },
      {
        key: "submitting-application",
        title: "Application Submission Process",
        content: (
          <p className="govuk-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis
            lorem ut libero malesuada feugiat. Nulla quis lorem ut libero
            malesuada feugiat.
          </p>
        ),
        linked: false,
      },
    ],
  },
} satisfies Meta<typeof ContentSignposting>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SinglePage: Story = {
  args: {
    pages: [
      {
        key: "planning-process",
        title: "Planning Process Overview",
        content: (
          <p className="govuk-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet
            quam vehicula elementum sed sit amet dui.
          </p>
        ),
        linked: true,
      },
    ],
  },
};

export const MultiplePages: Story = {
  args: {
    pages: [
      {
        key: "planning-process",
        title: "Planning Process Overview",
        content: (
          <p className="govuk-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            aliquet quam id dui
          </p>
        ),
        linked: true,
      },
      {
        key: "before-you-apply",
        title: "Pre-Application Guidelines",
        content: (
          <p className="govuk-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            aliquet quam id dui
          </p>
        ),
        linked: true,
      },
      {
        key: "submitting-application",
        title: "Application Submission Process",
        content: (
          <p className="govuk-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            aliquet quam id dui
          </p>
        ),
        linked: false,
      },
    ],
  },
};

export const WithoutContent: Story = {
  args: {
    pages: [
      {
        key: "planning-process",
        title: "Planning Process Overview",
        linked: true,
      },
      {
        key: "before-you-apply",
        title: "Pre-Application Guidelines",
        linked: true,
      },
    ],
  },
};

export const WithSummaryContent: Story = {
  args: {
    pages: [
      {
        key: "planning-process",
        title: "Planning Process Overview",
        content: (
          <p className="govuk-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            ac diam sit amet quam vehicula elementum.
          </p>
        ),
        linked: true,
        children: [
          {
            key: "sub-section",
            title: "Detailed Requirements",
            content: (
              <p className="govuk-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur aliquet quam id dui posuere blandit.
              </p>
            ),
          },
        ],
      },
    ],
  },
};
