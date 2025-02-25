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
import { ContentPage } from "./ContentPage";

const meta = {
  title: "DPR Components/ContentPage",
  component: ContentPage,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    content: [
      {
        key: "title-1",
        title: "Title 1",
        content: (
          <p className="govuk-body">Maecenas faucibus mollis interdum.</p>
        ),
        children: [
          {
            key: "sub-title-1",
            title: "Sub Title 1",
            content: (
              <p className="govuk-body">Maecenas faucibus mollis interdum.</p>
            ),
          },
          {
            key: "sub-title-2",
            title: "Sub Title 2",
            content: (
              <p className="govuk-body">Maecenas faucibus mollis interdum.</p>
            ),
            children: [
              {
                key: "sub-sub-title-1",
                title: "Sub Sub Title 1",
                content: (
                  <p className="govuk-body">
                    Maecenas faucibus mollis interdum.
                  </p>
                ),
              },
              {
                key: "sub-sub-title-2",
                title: "Sub Sub Title 2",
                content: (
                  <p className="govuk-body">
                    Maecenas faucibus mollis interdum.
                  </p>
                ),
              },
            ],
          },
        ],
      },
      {
        key: "title-1",
        title: "Title 2",
        content: (
          <p className="govuk-body">Maecenas faucibus mollis interdum.</p>
        ),
      },
    ],
  },
} satisfies Meta<typeof ContentPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
