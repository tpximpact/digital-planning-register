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
import { ImpactMeasures } from "./ImpactMeasures";

const meta = {
  title: "DPR components/Impact Measures",
  component: ImpactMeasures,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    data: {
      housing: {
        dataPoints: [
          { key: "New homes", value: "100" },
          { key: "affordable housing", value: "10%" },
        ],
      },
      "open-spaces": {
        dataPoints: [
          {
            key: "square metres",
            value: "1200",
          },
        ],
      },
      jobs: {
        dataPoints: [
          {
            key: "new roles",
            value: "45-100 ",
          },
        ],
      },
      carbon: {
        dataPoints: [
          {
            key: "less than minimum requirements",
            value: "66%",
          },
        ],
      },
      access: {
        text: "Two access points from Finchley Road to the east. One access point from Blackburn Road to the west.",
      },
      healthcare: null,
    },
  },
} satisfies Meta<typeof ImpactMeasures>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
