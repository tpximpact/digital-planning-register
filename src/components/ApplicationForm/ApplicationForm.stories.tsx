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
import { ApplicationForm } from "./";
import { generateApplicationSubmission } from "@mocks/dprApplicationSubmission";

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
    submissionData: generateApplicationSubmission,
  },
} satisfies Meta<typeof ApplicationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoSubmissionData: Story = {
  args: {
    submissionData: null,
  },
};

export const InvalidData: Story = {
  args: {
    submissionData: {
      data: {
        application: {
          type: {
            value: "pp.full.householder",
            description: "Planning Permission - Full householder",
          },
          declaration: { accurate: true, connection: { value: "none" } },
        },
        applicant: {
          name: { last: "2", first: "1" },
          type: "individual",
          address: { sameAsSiteAddress: true },
        },
        property: {
          address: {
            x: 528954,
            y: 184856,
            pao: "231",
            town: "LONDON",
            uprn: "000005049018",
            usrn: "20400363",
            title: "231, KENTISH TOWN ROAD, LONDON",
            source: "Ordnance Survey",
            street: "KENTISH TOWN ROAD",
            latitude: 51.547872,
            postcode: "NW5 2JT",
            longitude: -0.1416145,
            singleLine: "231, KENTISH TOWN ROAD, LONDON, CAMDEN, NW5 2JT",
          },
          boundary: {
            area: { hectares: 0.018411, squareMetres: 184.11 },
            site: {
              type: "Feature",
              geometry: {
                type: "MultiPolygon",
                coordinates: [
                  [
                    [
                      [-0.142008, 51.547851],
                      [-0.141982, 51.547822],
                      [-0.14196, 51.547825],
                      [-0.141956, 51.547819],
                      [-0.141737, 51.547843],
                      [-0.141734, 51.547829],
                      [-0.141704, 51.547841],
                      [-0.141618, 51.547853],
                      [-0.14162, 51.547846],
                      [-0.141462, 51.547828],
                      [-0.141461, 51.547835],
                      [-0.141527, 51.547843],
                      [-0.141511, 51.547894],
                      [-0.14164, 51.547906],
                      [-0.142008, 51.547851],
                    ],
                  ],
                ],
              },
              properties: {
                name: "",
                entity: 12000501011,
                prefix: "title-boundary",
                dataset: "title-boundary",
                "end-date": "",
                typology: "geography",
                reference: "54041575",
                "entry-date": "2024-05-06",
                "start-date": "2012-04-25",
                "organisation-entity": "13",
              },
            },
          },
          planning: {
            sources: [
              "https://api.editor.planx.dev/gis/camden?geom=MULTIPOLYGON+%28%28%28-0.142008+51.547851%2C+-0.141982+51.547822%2C+-0.14196+51.547825%2C+-0.141956+51.547819%2C+-0.141737+51.547843%2C+-0.141734+51.547829%2C+-0.141704+51.547841%2C+-0.141618+51.547853%2C+-0.14162+51.547846%2C+-0.141462+51.547828%2C+-0.141461+51.547835%2C+-0.141527+51.547843%2C+-0.141511+51.547894%2C+-0.14164+51.547906%2C+-0.142008+51.547851%29%29%29&vals=archaeologicalPriorityArea%2CarticleFour%2CarticleFour.caz%2CbrownfieldSite%2Cdesignated.AONB%2Cdesignated.conservationArea%2CgreenBelt%2Cdesignated.nationalPark%2Cdesignated.nationalPark.broads%2Cdesignated.WHS%2Cflood%2Clisted%2Cmonument%2Cnature.ASNW%2Cnature.ramsarSite%2Cnature.SAC%2Cnature.SPA%2Cnature.SSSI%2CregisteredPark%2Croad.classified%2Ctpo&analytics=false&sessionId=3886d511-bfbf-401f-8963-b71a98f5e2e5",
              "https://api.editor.planx.dev/roads?usrn=20400363",
            ],
            designations: [
              {
                value: "tpo",
                intersects: false,
                description: "Tree Preservation Order (TPO) or zone",
              },
              {
                value: "flood",
                intersects: false,
                description: "Flood risk",
              },
              {
                value: "listed",
                intersects: false,
                description: "Listed building",
              },
              {
                value: "monument",
                intersects: false,
                description: "Site of a Scheduled Monument",
              },
              {
                value: "greenBelt",
                intersects: false,
                description: "Green belt",
              },
              {
                value: "designated",
                intersects: false,
                description: "Designated land",
              },
              {
                value: "nature.SAC",
                intersects: false,
                description: "Special Area of Conservation (SAC)",
              },
              {
                value: "nature.SPA",
                intersects: false,
                description: "Special Protection Area (SPA)",
              },
              {
                value: "articleFour",
                entities: [
                  {
                    name: "Commercial, Business, and Service (Use Class E) to residential (Use Class C3) (outside CAZ)",
                    source: {
                      url: "https://www.planning.data.gov.uk/entity/7010002612",
                      text: "Planning Data",
                    },
                  },
                  {
                    name: "Basements",
                    source: {
                      url: "https://www.planning.data.gov.uk/entity/7010002613",
                      text: "Planning Data",
                    },
                  },
                ],
                intersects: true,
                description: "Article 4 direction area",
              },
              {
                value: "nature.ASNW",
                intersects: false,
                description: "Ancient Semi-Natural Woodland (ASNW)",
              },
              {
                value: "nature.SSSI",
                intersects: false,
                description: "Site of Special Scientific Interest (SSSI)",
              },
              {
                value: "brownfieldSite",
                entities: [
                  {
                    name: "Raglan House 1 Raglan Street London NW5 3DB",
                    source: {
                      url: "https://www.planning.data.gov.uk/entity/1800699",
                      text: "Planning Data",
                    },
                  },
                ],
                intersects: true,
                description: "Brownfield site",
              },
              {
                value: "designated.WHS",
                intersects: false,
                description: "UNESCO World Heritage Site (WHS)",
              },
              {
                value: "registeredPark",
                intersects: false,
                description: "Registered parks and gardens",
              },
              {
                value: "designated.AONB",
                intersects: false,
                description: "Area of Outstanding Natural Beauty (AONB)",
              },
              {
                value: "road.classified",
                intersects: false,
                description: "Classified road",
              },
              {
                value: "nature.ramsarSite",
                intersects: false,
                description: "Ramsar site",
              },
              {
                value: "designated.nationalPark",
                intersects: false,
                description: "National Park",
              },
              {
                value: "archaeologicalPriorityArea",
                entities: [
                  {
                    name: "Summary and Definition The Archaeological Priority Area covers the historic rural medieval settlement of Kentish Town which was originally part of the parish of St Pancras till 1965. The hamlet was first recorded in 1208 and sat immediately north of Cam",
                    source: {
                      url: "https://www.planning.data.gov.uk/entity/40341",
                      text: "Planning Data",
                    },
                  },
                ],
                intersects: true,
                description: "Archaeological Priority Area",
              },
              {
                value: "designated.conservationArea",
                intersects: false,
                description: "Conservation area",
              },
              {
                value: "designated.nationalPark.broads",
                intersects: false,
                description: "National Park - Broads",
              },
              {
                value: "road.classified",
                entities: [
                  {
                    name: "Kentish Town Road - A Road",
                    source: { text: "Ordnance Survey MasterMap Highways" },
                  },
                ],
                intersects: true,
                description: "Classified road",
              },
            ],
          },
          localAuthorityDistrict: ["Camden"],
          region: "London",
          type: { value: "military", description: "Military" },
          parking: {
            cars: { count: 0 },
            vans: { count: 0 },
            buses: { count: 0 },
            other: { count: 0 },
            cycles: { count: 0 },
            carClub: { count: 0 },
            disabled: { count: 0 },
            offStreet: { residential: { count: 0 } },
            motorcycles: { count: 0 },
          },
          titleNumber: { known: "No" },
          EPC: { known: "The property does not have one" },
        },
        proposal: {
          boundary: {
            area: { squareMetres: 184.11 },
            site: {
              type: "Feature",
              geometry: {
                type: "MultiPolygon",
                coordinates: [
                  [
                    [
                      [-0.142008, 51.547851],
                      [-0.141982, 51.547822],
                      [-0.14196, 51.547825],
                      [-0.141956, 51.547819],
                      [-0.141737, 51.547843],
                      [-0.141734, 51.547829],
                      [-0.141704, 51.547841],
                      [-0.141618, 51.547853],
                      [-0.14162, 51.547846],
                      [-0.141462, 51.547828],
                      [-0.141461, 51.547835],
                      [-0.141527, 51.547843],
                      [-0.141511, 51.547894],
                      [-0.14164, 51.547906],
                      [-0.142008, 51.547851],
                    ],
                  ],
                ],
              },
              properties: {
                name: "",
                entity: 12000501011,
                prefix: "title-boundary",
                dataset: "title-boundary",
                "end-date": "",
                typology: "geography",
                reference: "54041575",
                "entry-date": "2024-05-06",
                "start-date": "2012-04-25",
                planx_user_action: "Accepted the title boundary",
                "organisation-entity": "13",
              },
            },
          },
          date: { start: "2222-01-01", completion: "2222-01-01" },
          description: "d",
          parking: {
            cars: { count: 0, difference: 0 },
            vans: { count: 0, difference: 0 },
            buses: { count: 0, difference: 0 },
            other: { count: 0, difference: 0 },
            cycles: { count: 0, difference: 0 },
            carClub: { count: 0, difference: 0 },
            disabled: { count: 0, difference: 0 },
            offStreet: { residential: { count: 0, difference: 0 } },
            motorcycles: { count: 0, difference: 0 },
          },
          projectType: [{ value: "alter", description: "Alter a building" }],
        },
        user: { role: "applicant" },
      },
      files: [{ name: "Unpublished document - sensitive" }],
      // files: [],
    },
  },
};
