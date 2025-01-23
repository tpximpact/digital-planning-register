import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { PageHelpTopic } from "./PageHelpTopic";

const defaultContent = [
  {
    key: "section-1",
    title: "Section One",
    content: (
      <p className="govuk-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    ),
    children: [
      {
        key: "section-1-1",
        title: "Subsection I",
        content: (
          <p className="govuk-body">
            Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
        ),
      },
    ],
  },
  {
    key: "section-2",
    title: "Section Two",
    content: (
      <p className="govuk-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    ),
  },
  {
    key: "section-3",
    title: "Section Three",
    content: (
      <p className="govuk-body">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat.
      </p>
    ),
    children: [
      {
        key: "section-3-1",
        title: "Subsection I",
        content: (
          <p className="govuk-body">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
        ),
      },
      {
        key: "section-3-2",
        title: "Subsection II",
        content: (
          <p className="govuk-body">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        ),
      },
    ],
  },
];

const longContent = [
  {
    key: "preface",
    title: "Preface",
    content: (
      <p className="govuk-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    ),
    children: [
      {
        key: "preface-detail",
        title: "Preface Details",
        content: (
          <p className="govuk-body">
            Vestibulum ac diam sit amet quam vehicula elementum.
          </p>
        ),
      },
    ],
  },
  {
    key: "introduction",
    title: "Introduction",
    content: (
      <>
        <p className="govuk-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
          diam sit amet quam vehicula elementum sed sit amet dui.
        </p>
        <p className="govuk-body">
          Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla sit
          amet nisl tempus convallis quis ac lectus.
        </p>
      </>
    ),
    children: [
      {
        key: "introduction-detail",
        title: "Introduction Details",
        content: (
          <p className="govuk-body">
            Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui
            posuere blandit.
          </p>
        ),
      },
    ],
  },
  {
    key: "section-1",
    title: "Section One",
    content: (
      <>
        <p className="govuk-body">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
          ullamcorper sit amet ligula.
        </p>
        <h4 className="govuk-heading-s">Subsection</h4>
        <p className="govuk-body">
          Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut
          libero malesuada feugiat.
        </p>
        <ul className="govuk-list govuk-list--bullet">
          <li>Vivamus suscipit tortor eget felis porttitor volutpat.</li>
          <li>
            Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
            dui.
          </li>
          <li>Curabitur aliquet quam id dui posuere blandit.</li>
        </ul>
      </>
    ),
  },
  {
    key: "section-2",
    title: "Section Two",
    content: (
      <>
        <p className="govuk-body">
          Proin eget tortor risus. Vestibulum ac diam sit amet quam vehicula
          elementum sed sit amet dui.
        </p>
        <h4 className="govuk-heading-s">Important Information</h4>
        <div className="govuk-warning-text">
          <span className="govuk-warning-text__icon" aria-hidden="true">
            !
          </span>
          <strong className="govuk-warning-text__text">
            Curabitur aliquet quam id dui posuere blandit.
          </strong>
        </div>
        <p className="govuk-body">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia Curae.
        </p>
      </>
    ),
  },
  {
    key: "section-3",
    title: "Section Three",
    content: (
      <>
        <p className="govuk-body">
          Donec sollicitudin molestie malesuada. Vestibulum ac diam sit amet
          quam vehicula elementum sed sit amet dui.
        </p>
        <h4 className="govuk-heading-s">Final Notes</h4>
        <p className="govuk-body">
          Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
          Nulla quis lorem ut libero malesuada feugiat.
        </p>
      </>
    ),
  },
];

const meta = {
  title: "Council pages/Help page topic",
  component: PageHelpTopic,
  decorators: [
    (Story) => (
      <main className="govuk-width-container" id="main">
        <Story />
      </main>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof PageHelpTopic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Simple Help Topic",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    content: defaultContent,
  },
};

export const NoContent: Story = {
  args: {
    title: "Help Topic Without Content",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};

export const WithNestedContent: Story = {
  args: {
    title: "Help Topic With Nested Content",
    content: [
      {
        key: "parent-1",
        title: "Parent Section One",
        content: (
          <p className="govuk-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur
            aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet
            quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id
            dui posuere blandit. Vestibulum ac diam sit amet quam vehicula
            elementum sed sit amet dui. Curabitur aliquet quam id dui posuere
            blandit. Vestibulum ac diam sit amet quam vehicula elementum sed sit
            amet dui. Curabitur aliquet quam id dui posuere blandit.
          </p>
        ),
        children: [
          {
            key: "child-1",
            title: "Child Section One",
            content: (
              <p className="govuk-body">
                Ut enim ad minim veniam, quis nostrud exercitation.
              </p>
            ),
          },
          {
            key: "child-2",
            title: "Child Section Two",
            content: (
              <p className="govuk-body">
                Duis aute irure dolor in reprehenderit.
              </p>
            ),
          },
        ],
      },
      {
        key: "parent-2",
        title: "Parent Section Two",
        content: (
          <p className="govuk-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur
            aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet
            quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id
            dui posuere blandit. Vestibulum ac diam sit amet quam vehicula
            elementum sed sit amet dui. Curabitur aliquet quam id dui posuere
            blandit. Vestibulum ac diam sit amet quam vehicula elementum sed sit
            amet dui. Curabitur aliquet quam id dui posuere blandit.
          </p>
        ),
        children: [
          {
            key: "child-3",
            title: "Child Section Three",
            content: (
              <p className="govuk-body">
                Sunt in culpa qui officia deserunt mollit.
              </p>
            ),
          },
        ],
      },
    ],
  },
};

export const LongContent: Story = {
  args: {
    title: "Comprehensive Help Guide",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere blandit.",
    content: longContent,
  },
};
