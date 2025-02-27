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
import ApplicationForm from ".";
import { generateBoundaryGeoJson } from "@mocks/dprApplicationFactory";

const meta = {
  title: "DPR Components/ApplicationForm",
  component: ApplicationForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    submissionData: [
      {
        subtopic: "Property",
        value: [
          {
            description:
              "Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
            value:
              "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
          },
          {
            description:
              "Nullam id dolor id nibh ultricies vehicula ut id elit.",
            value: null,
          },
          {
            description:
              "Nullam id dolor id nibh ultricies vehicula ut id elit.",
            value: null,
            map: generateBoundaryGeoJson(),
          },
          {
            description:
              "Nullam id dolor id nibh ultricies vehicula ut id elit.",
            value: <>hello</>,
          },
          {
            description:
              "Nullam id dolor id nibh ultricies vehicula ut id elit.",
            value: [
              {
                description:
                  "Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
                value:
                  "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
              },
              {
                description:
                  "Nullam id dolor id nibh ultricies vehicula ut id elit.",
                value: null,
              },
              {
                description:
                  "Nullam id dolor id nibh ultricies vehicula ut id elit.",
                value: <>hello</>,
              },
            ],
          },
        ],
      },
    ],
  },
} satisfies Meta<typeof ApplicationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
