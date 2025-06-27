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
import { ApplicationConstraints } from "./ApplicationConstraints";

const meta = {
  title: "DPR Components/ApplicationConstraints",
  component: ApplicationConstraints,
  decorators: [
    (Story) => {
      // since this is a page we need to add a decorator to add the main element to make it look a bit more like a page
      return (
        <main className="govuk-width-container" id="main">
          <Story />
        </main>
      );
    },
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    constraints: [
      //  https://www.planning.data.gov.uk/entity/44009642
      // https://www.planning.data.gov.uk/entity/7010002613
      // NonIntersectingPlanningDesignation
      {
        value: "nature.SAC",
        description: "Special Area of Conservation (SAC)",
        intersects: false,
      },
      // IntersectingPlanningDesignation
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
      // NonIntersectingPlanningConstraint
      {
        value: "NonIntersectingPlanningConstraint value",
        description: "NonIntersectingPlanningConstraint description",
        intersects: false,
      },
      // IntersectingPlanningConstraint
      {
        value: "IntersectingPlanningConstraint value",
        description: "IntersectingPlanningConstraint description",
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
        ],
      },
      // example with multiple entities
      {
        value: "multiple entities value",
        description: "multiple entities description",
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
      // lots of entities
      {
        value: "lots of entities value",
        description: "lots of entities description",
        intersects: true,
        entities: [
          {
            name: "Whole District excluding the Town of Chesham - Poultry production.",
            description:
              "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
            source: {
              text: "Planning Data",
              url: "https://www.planning.data.gov.uk/entity/65104983",
            },
          },
          {
            name: "Whole District excluding the Town of Chesham - Poultry production.",
            description:
              "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
            source: {
              text: "Planning Data",
              url: "https://www.planning.data.gov.uk/entity/65230121",
            },
          },
          {
            name: "Whole District excluding the Town of Chesham - Poultry production.",
            description:
              "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
            source: {
              text: "Planning Data",
              url: "https://www.planning.data.gov.uk/entity/31792007",
            },
          },
          {
            name: "Whole District excluding the Town of Chesham - Poultry production.",
            description:
              "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
            source: {
              text: "Planning Data",
              url: "https://www.planning.data.gov.uk/entity/42127185",
            },
          },
          {
            name: "Whole District excluding the Town of Chesham - Poultry production.",
            description:
              "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
            source: {
              text: "Planning Data",
              url: "https://www.planning.data.gov.uk/entity/13909855",
            },
          },
          {
            name: "Whole District excluding the Town of Chesham - Poultry production.",
            description:
              "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
            source: {
              text: "Planning Data",
              url: "https://www.planning.data.gov.uk/entity/44009809",
            },
          },
          {
            name: "Whole District excluding the Town of Chesham - Poultry production.",
            description:
              "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
            source: {
              text: "Planning Data",
              url: "https://www.planning.data.gov.uk/entity/7010002613",
            },
          },
          {
            name: "Whole District excluding the Town of Chesham - Poultry production.",
            description:
              "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
            source: {
              text: "Planning Data",
              url: "https://www.planning.data.gov.uk/entity/31535771",
            },
          },
          {
            name: "Whole District excluding the Town of Chesham - Poultry production.",
            description:
              "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
            source: {
              text: "Planning Data",
              url: "https://www.planning.data.gov.uk/entity/42115931",
            },
          },
          {
            name: "Whole District excluding the Town of Chesham - Poultry production.",
            description:
              "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
            source: {
              text: "Planning Data",
              url: "https://www.planning.data.gov.uk/entity/44009659",
            },
          },
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
            name: "Whole District excluding the Town of Chesham - Poultry production.",
            description:
              "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
            source: {
              text: "Planning Data",
              url: "https://www.planning.data.gov.uk/entity/1000005",
            },
          },
          {
            name: "Whole District excluding the Town of Chesham - Poultry production.",
            description:
              "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
            source: {
              text: "Planning Data",
              url: "https://www.planning.data.gov.uk/entity/44007440",
            },
          },
          {
            name: "Whole District excluding the Town of Chesham - Poultry production.",
            description:
              "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
            source: {
              text: "Planning Data",
              url: "https://www.planning.data.gov.uk/entity/610030",
            },
          },
          {
            name: "Whole District excluding the Town of Chesham - Poultry production.",
            description:
              "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
            source: {
              text: "Planning Data",
              url: "https://www.planning.data.gov.uk/entity/31537921",
            },
          },
          {
            name: "Whole District excluding the Town of Chesham - Poultry production.",
            description:
              "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
            source: {
              text: "Planning Data",
              url: "https://www.planning.data.gov.uk/entity/42103309",
            },
          },
          {
            name: "Whole District excluding the Town of Chesham - Poultry production.",
            description:
              "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
            source: {
              text: "Planning Data",
              url: "https://www.planning.data.gov.uk/entity/44000877",
            },
          },
          {
            name: "Whole District excluding the Town of Chesham - Poultry production.",
            description:
              "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
            source: {
              text: "Planning Data",
              url: "https://www.planning.data.gov.uk/entity/44009654",
            },
          },
        ],
      },
      // additional data from odp repo
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
        ],
      },
      {
        value: "articleFour.caz",
        description: "Central Activities Zone (CAZ)",
        intersects: false,
      },
      {
        value: "tpo",
        description: "Tree Preservation Order (TPO) or zone",
        intersects: false,
      },
      {
        value: "listed",
        description: "Listed building",
        intersects: false,
      },
      {
        value: "monument",
        description: "Site of a Scheduled Monument",
        intersects: false,
      },
      {
        value: "designated",
        description: "Designated land",
        intersects: true,
      },
      {
        value: "nature.SAC",
        description: "Special Area of Conservation (SAC)",
        intersects: false,
      },
      {
        value: "nature.ASNW",
        description: "Ancient Semi-Natural Woodland (ASNW)",
        intersects: false,
      },
      {
        value: "nature.SSSI",
        description: "Site of Special Scientific Interest (SSSI)",
        intersects: false,
      },
      {
        value: "nature.SPA",
        description: "Special Protection Area (SPA)",
        intersects: false,
      },
      {
        value: "designated.WHS",
        description: "UNESCO World Heritage Site (WHS)",
        intersects: false,
      },
      {
        value: "registeredPark",
        description: "Registered parks and gardens",
        intersects: false,
      },
      {
        value: "designated.AONB",
        description: "Area of Outstanding Natural Beauty (AONB)",
        intersects: true,
        entities: [
          {
            name: "Chilterns",
            source: {
              text: "Planning Data",
              url: "https://www.planning.data.gov.uk/entity/1000005",
            },
          },
        ],
      },
      {
        value: "designated.nationalPark",
        description: "National Park",
        intersects: false,
      },
      {
        value: "designated.conservationArea",
        description: "Conservation area",
        intersects: false,
      },
      {
        value: "designated.nationalPark.broads",
        description: "National Park - Broads",
        intersects: false,
      },
      {
        value: "road.classified",
        description: "Classified road",
        intersects: false,
      },
      {
        value: "articleFour",
        description: "Article 5 direction area",
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
        ],
      },
    ],
  },
} satisfies Meta<typeof ApplicationConstraints>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
