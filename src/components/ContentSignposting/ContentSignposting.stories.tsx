/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

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
