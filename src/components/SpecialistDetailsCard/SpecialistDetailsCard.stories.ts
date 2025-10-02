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
import { SpecialistDetailsCard } from "./SpecialistDetailsCard";
import { generateSpecialistComment } from "@mocks/dprNewApplicationFactory";

const meta = {
  title: "DPR Components/SpecialistDetailsCard",
  component: SpecialistDetailsCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    specialist: generateSpecialistComment(),
  },
} satisfies Meta<typeof SpecialistDetailsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithConstraints: Story = {
  args: {
    specialist: {
      ...generateSpecialistComment(),
      reason: "constraint",
      constraints: [
        {
          value: "articleFour",
          description: "Article 4 direction area",
          intersects: true,
          entities: [
            {
              name: "Whole District excluding the Town of Chesham - Poultry production.",
              description:
                "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
              source: {
                text: "Planning Data",
                url: "https://www.planning.data.gov.uk/entity/7010002192",
              },
            },
            {
              name: "Stock Lane - Classified Unnumbered",
              source: {
                text: "Ordnance Survey MasterMap Highways",
              },
            },
          ],
        },
      ],
    },
  },
};
