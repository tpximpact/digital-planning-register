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

// import type { PrototypeApplication } from "digital-planning-data-schemas/types/schemas/prototypeApplication/index.ts";

/**
 * examples/prototypeApplication/planningPermission/fullHouseholder.json
 * @todo should be type PrototypeApplication
 */
export const generateApplicationSubmission: any = {
  applicationType: "pp.full.householder",
  data: {
    application: {
      fee: {
        calculated: 258,
        payable: 258,
        category: {
          sixAndSeven: 258,
        },
        exemption: {
          disability: false,
          resubmission: false,
        },
        reduction: {
          sports: false,
          parishCouncil: false,
          alternative: false,
        },
        reference: {
          govPay: "sandbox-ref-456",
        },
      },
      declaration: {
        accurate: true,
        connection: {
          value: "none",
        },
      },
    },
    user: {
      role: "proxy",
    },
    applicant: {
      type: "individual",
      name: {
        first: "David",
        last: "Bowie",
      },
      email: "ziggy@example.com",
      phone: {
        primary: "Not provided by agent",
      },
      address: {
        sameAsSiteAddress: true,
      },
      siteContact: {
        role: "proxy",
      },
      ownership: {
        interest: "owner.sole",
        certificate: "a",
        agriculturalTenants: false,
        declaration: {
          accurate: true,
        },
      },
      agent: {
        name: {
          first: "Ziggy",
          last: "Stardust",
        },
        email: "ziggy@example.com",
        phone: {
          primary: "01100 0110 0011",
        },
        address: {
          line1: "40 Stansfield Road",
          line2: "Brixton",
          town: "London",
          county: "Greater London",
          postcode: "SW9 9RZ",
          country: "UK",
        },
      },
    },
    property: {
      address: {
        latitude: 51.4656522,
        longitude: -0.1185926,
        x: 530787,
        y: 175754,
        title: "40, STANSFIELD ROAD, LONDON",
        singleLine: "40, STANSFIELD ROAD, LONDON, SW9 9RZ",
        source: "Ordnance Survey",
        uprn: "100021892955",
        usrn: "21901294",
        pao: "40",
        street: "STANSFIELD ROAD",
        town: "LONDON",
        postcode: "SW9 9RZ",
      },
      boundary: {
        site: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-0.1186569035053321, 51.465703531871384],
                [-0.1185938715934822, 51.465724418998775],
                [-0.1184195280075143, 51.46552473766957],
                [-0.11848390102387167, 51.4655038504508],
                [-0.1186569035053321, 51.465703531871384],
              ],
            ],
          },
          properties: null,
        },
        area: {
          hectares: 0.012592,
          squareMetres: 125.92,
        },
      },
      planning: {
        sources: [
          "https://api.editor.planx.dev/gis/lambeth?geom=POLYGON+%28%28-0.1186569035053321+51.465703531871384%2C+-0.1185938715934822+51.465724418998775%2C+-0.1184195280075143+51.46552473766957%2C+-0.11848390102387167+51.4655038504508%2C+-0.1186569035053321+51.465703531871384%29%29&analytics=false&sessionId=81bcaa0f-baf5-4573-ba0a-ea868c573faf",
          "https://api.editor.planx.dev/roads?usrn=21901294",
        ],
        designations: [
          {
            value: "article4",
            intersects: false,
          },
          {
            value: "article4.caz",
            intersects: false,
          },
          {
            value: "tpo",
            intersects: false,
          },
          {
            value: "listed",
            intersects: false,
          },
          {
            value: "monument",
            intersects: false,
          },
          {
            value: "designated",
            intersects: false,
          },
          {
            value: "nature.SAC",
            intersects: false,
          },
          {
            value: "nature.ASNW",
            intersects: false,
          },
          {
            value: "nature.SSSI",
            intersects: false,
          },
          {
            value: "locallyListed",
            intersects: false,
          },
          {
            value: "nature.SPA",
            intersects: false,
          },
          {
            value: "designated.WHS",
            intersects: false,
          },
          {
            value: "registeredPark",
            intersects: false,
          },
          {
            value: "designated.AONB",
            intersects: false,
          },
          {
            value: "designated.nationalPark",
            intersects: false,
          },
          {
            value: "designated.conservationArea",
            intersects: false,
          },
          {
            value: "designated.nationalPark.broads",
            intersects: false,
          },
          {
            value: "road.classified",
            intersects: false,
          },
        ],
      },
      localAuthorityDistrict: ["Lambeth"],
      region: "London",
      type: "residential.dwelling.house.terrace",
      titleNumber: {
        known: "No",
      },
      EPC: {
        known: "No",
      },
      parking: {
        cars: {
          count: 1,
        },
        cycles: {
          count: 2,
        },
      },
    },
    proposal: {
      projectType: ["extend.roof.dormer"],
      description:
        "Roof extension to the rear of the property, incorporating starship launchpad.",
      boundary: {
        site: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-0.1186569035053321, 51.465703531871384],
                [-0.1185938715934822, 51.465724418998775],
                [-0.1184195280075143, 51.46552473766957],
                [-0.11848390102387167, 51.4655038504508],
                [-0.1186569035053321, 51.465703531871384],
              ],
            ],
          },
          properties: null,
        },
        area: {
          hectares: 0.012592,
          squareMetres: 125.92,
        },
      },
      date: {
        start: "2024-05-01",
        completion: "2024-05-02",
      },
      extend: {
        area: {
          squareMetres: 45,
        },
      },
      parking: {
        cars: {
          count: 1,
          difference: 0,
        },
        cycles: {
          count: 2,
          difference: 0,
        },
      },
    },
  },
  responses: [
    {
      question: "Is the property in Lambeth?",
      responses: [
        {
          value: "Yes",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "The property",
      },
    },
    {
      question: "What type of property is it?",
      responses: [
        {
          value: "House",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "The property",
      },
    },
    {
      question: "What type of house it is?",
      responses: [
        {
          value: "Terrace",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "The property",
      },
    },
    {
      question: "Is the property in a flood zone?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        sectionName: "The property",
      },
    },
    {
      question: "What type of property is it?",
      responses: [
        {
          value: "House",
          metadata: {
            flags: ["Listed building consent / Not required"],
          },
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About the project",
      },
    },
    {
      question: "List the changes involved in the project",
      responses: [
        {
          value: "Add a roof extension",
          metadata: {
            flags: ["Listed building consent / Not required"],
          },
        },
      ],
      metadata: {
        sectionName: "About the project",
      },
    },
    {
      question: "Have works already started?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        sectionName: "About the project",
      },
    },
    {
      question: "Is the property in a flood zone?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About the project",
      },
    },
    {
      question: "What type of changes does the project involve?",
      responses: [
        {
          value: "Extension",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About the project",
      },
    },
    {
      question: "Is the project to add an outbuilding?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About the project",
      },
    },
    {
      question: "How much new floor area is being added to the house?",
      responses: [
        {
          value: "Less than 100m²",
        },
      ],
      metadata: {
        sectionName: "About the project",
      },
    },
    {
      question:
        "How much exactly is the internal floor area of the property increasing by?",
      responses: [
        {
          value: "45",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "The Town and Country Planning (Development Management Procedure) (England) 2015 (as amended)",
            url: "http://www.legislation.gov.uk/uksi/2015/595/article/7/made",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question:
        "Does the project involve creating any new bedrooms or bathrooms?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "The Town and Country Planning (Development Management Procedure) (England) 2015 (as amended)",
            url: "http://www.legislation.gov.uk/uksi/2015/595/article/7/made",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "Describe the wall materials of the existing house",
      responses: [
        {
          value: "London stock brick",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "The Town and Country Planning (Development Management Procedure) (England) 2015 (as amended)",
            url: "http://www.legislation.gov.uk/uksi/2015/595/article/7/made",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "Describe the wall materials of the new extension",
      responses: [
        {
          value: "Metallic cladding, reflective. Multiple colours.",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "The Town and Country Planning (Development Management Procedure) (England) 2015 (as amended)",
            url: "http://www.legislation.gov.uk/uksi/2015/595/article/7/made",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "Describe the material of the roof of the existing house",
      responses: [
        {
          value: "Grey slate",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "The Town and Country Planning (Development Management Procedure) (England) 2015 (as amended)",
            url: "http://www.legislation.gov.uk/uksi/2015/595/article/7/made",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "Describe the material for the new roof of the extension",
      responses: [
        {
          value: "Zinc panels",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "The Town and Country Planning (Development Management Procedure) (England) 2015 (as amended)",
            url: "http://www.legislation.gov.uk/uksi/2015/595/article/7/made",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "Describe the window materials of the existing house",
      responses: [
        {
          value: "Wooden sash windows, painted white",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "The Town and Country Planning (Development Management Procedure) (England) 2015 (as amended)",
            url: "http://www.legislation.gov.uk/uksi/2015/595/article/7/made",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "Describe the window materials of the extension",
      responses: [
        {
          value: "Brushed steel.",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "The Town and Country Planning (Development Management Procedure) (England) 2015 (as amended)",
            url: "http://www.legislation.gov.uk/uksi/2015/595/article/7/made",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "Describe the door materials of the existing house",
      responses: [
        {
          value: "Wood, painted.",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "The Town and Country Planning (Development Management Procedure) (England) 2015 (as amended)",
            url: "http://www.legislation.gov.uk/uksi/2015/595/article/7/made",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "Describe the door materials of the extension",
      responses: [
        {
          value: "No door present",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "The Town and Country Planning (Development Management Procedure) (England) 2015 (as amended)",
            url: "http://www.legislation.gov.uk/uksi/2015/595/article/7/made",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question:
        "Are there any trees that could fall within the property or the areas affected by the project (the previously drawn outline)?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        sectionName: "About the project",
      },
    },
    {
      question: "Does the project involve any of these?",
      responses: [
        {
          value: "No, none of these",
        },
      ],
      metadata: {
        sectionName: "About the project",
      },
    },
    {
      question: "Is the property in Greater London?",
      responses: [
        {
          value: "Yes",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About the project",
      },
    },
    {
      question: "Does the site include more than one property?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "Greater London Authority Act 1999",
            url: "https://www.legislation.gov.uk/ukpga/1999/29/section/346",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "Do you know the title number of the property?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        sectionName: "About the project",
      },
    },
    {
      question:
        "Does the property have an Energy Performance Certificate (EPC)?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "Greater London Authority Act 1999",
            url: "https://www.legislation.gov.uk/ukpga/1999/29/section/346",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "What type of application is this?",
      responses: [
        {
          value: "Planning permission for a home",
        },
      ],
      metadata: {
        autoAnswered: true,
        policyRefs: [
          {
            text: "Greater London Authority Act 1999",
            url: "https://www.legislation.gov.uk/ukpga/1999/29/section/346",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "When will the works start?",
      responses: [
        {
          value: "2024-05-01",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "Greater London Authority Act 1999",
            url: "https://www.legislation.gov.uk/ukpga/1999/29/section/346",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "When will the works be completed?",
      responses: [
        {
          value: "2024-05-02",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "Greater London Authority Act 1999",
            url: "https://www.legislation.gov.uk/ukpga/1999/29/section/346",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "Does the site include parking spaces for any of these?",
      responses: [
        {
          value: "Cars",
        },
        {
          value: "Bicycles",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "Greater London Authority Act 1999",
            url: "https://www.legislation.gov.uk/ukpga/1999/29/section/346",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "Total number of car parking spaces before",
      responses: [
        {
          value: "1",
        },
      ],
      metadata: {
        sectionName: "About the project",
      },
    },
    {
      question: "Total number of car parking spaces after",
      responses: [
        {
          value: "1",
        },
      ],
      metadata: {
        sectionName: "About the project",
      },
    },
    {
      question: "What types of car parking space are present?",
      responses: [
        {
          value: "Off-street parking for residents only",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "Greater London Authority Act 1999",
            url: "https://www.legislation.gov.uk/ukpga/1999/29/section/346",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "Off-street, residents-only car spaces before",
      responses: [
        {
          value: "1",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "Greater London Authority Act 1999",
            url: "https://www.legislation.gov.uk/ukpga/1999/29/section/346",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "Off-street, residents-only car spaces after",
      responses: [
        {
          value: "1",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "Greater London Authority Act 1999",
            url: "https://www.legislation.gov.uk/ukpga/1999/29/section/346",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "What type of bicycle parking is there?",
      responses: [
        {
          value: "Off-street cycle parking",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "Greater London Authority Act 1999",
            url: "https://www.legislation.gov.uk/ukpga/1999/29/section/346",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "Off-street bicycle spaces before",
      responses: [
        {
          value: "2",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "Greater London Authority Act 1999",
            url: "https://www.legislation.gov.uk/ukpga/1999/29/section/346",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "Off-street bicycle spaces after",
      responses: [
        {
          value: "2",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "Greater London Authority Act 1999",
            url: "https://www.legislation.gov.uk/ukpga/1999/29/section/346",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "Is the property on designated land?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About the project",
      },
    },
    {
      question: "Does the property include any of these?",
      responses: [
        {
          value: "None of these",
        },
      ],
      metadata: {
        autoAnswered: true,
        policyRefs: [
          {
            text: "The Town and Country Planning (Development Management Procedure) (England) 2015 (as amended",
            url: "http://www.legislation.gov.uk/uksi/2015/595/article/7/made",
          },
        ],
        sectionName: "About the project",
      },
    },
    {
      question: "Heritage Statement needed?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About the project",
      },
    },
    {
      question: "Is the property in a flood zone?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About the project",
      },
    },
    {
      question: "What type of application is it?",
      responses: [
        {
          value: "Apply for planning permission",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About you",
      },
    },
    {
      question: "Your contact details",
      responses: [
        {
          value: "Mx Ziggy Stardust 01100 0110 0011 ziggy@example.com",
        },
      ],
      metadata: {
        sectionName: "About you",
      },
    },
    {
      question: "Is this a test?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        sectionName: "About you",
      },
    },
    {
      question: "Are you applying on behalf of someone else?",
      responses: [
        {
          value: "Yes",
        },
      ],
      metadata: {
        sectionName: "About you",
      },
    },
    {
      question: "Which of these best describes you?",
      responses: [
        {
          value: "Friend or relative",
        },
      ],
      metadata: {
        sectionName: "About you",
      },
    },
    {
      question: "Your contact address",
      responses: [
        {
          value:
            "40 Stansfield Road, Brixton, London, Greater London, SW9 9RZ, UK",
        },
      ],
      metadata: {
        sectionName: "About you",
      },
    },
    {
      question: "Which of these best describes the applicant?",
      responses: [
        {
          value: "Private individual",
        },
      ],
      metadata: {
        sectionName: "About you",
      },
    },
    {
      question: "Applicant's title",
      responses: [
        {
          value: "Mr",
        },
      ],
      metadata: {
        sectionName: "About you",
      },
    },
    {
      question: "Do you want to provide an email address for the applicant?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        sectionName: "About you",
      },
    },
    {
      question: "Do you want to provide a telephone number for the applicant?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        sectionName: "About you",
      },
    },
    {
      question:
        "Is the applicant's contact address the same as the property address?",
      responses: [
        {
          value: "Yes",
        },
      ],
      metadata: {
        sectionName: "About you",
      },
    },
    {
      question: "Which of these best describes you?",
      responses: [
        {
          value: "Friend or relative",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About you",
      },
    },
    {
      question:
        "We may need to visit your site to assess your application. If we do, who should we contact to arrange the visit?",
      responses: [
        {
          value: "Me",
        },
      ],
      metadata: {
        sectionName: "About you",
      },
    },
    {
      question: "Which of these best describes you?",
      responses: [
        {
          value: "Friend or relative acting on the applicant's behalf",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About you",
      },
    },
    {
      question:
        "Which of these best describes the applicant's interest in the land?",
      responses: [
        {
          value: "Sole owner",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "The Town and Country Planning (Development Management Procedure) (England) Order 2015",
            url: "https://www.legislation.gov.uk/uksi/2015/595/article/39/made",
          },
        ],
        sectionName: "About you",
      },
    },
    {
      question:
        "Did you get any pre-application advice from the council before making this application?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        sectionName: "About this application",
      },
    },
    {
      question: "What type of planning application are you making?",
      responses: [
        {
          value: "Full planning permission",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About this application",
      },
    },
    {
      question: "Is the property a home?",
      responses: [
        {
          value: "Yes",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About this application",
      },
    },
    {
      question: "What types of changes does the application relate to?",
      responses: [
        {
          value: "Extension",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About this application",
      },
    },
    {
      question: "What type of extension is it?",
      responses: [
        {
          value: "Roof extension",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About this application",
      },
    },
    {
      question: "List the changes involved in the roof extension",
      responses: [
        {
          value: "Add dormer",
        },
      ],
      metadata: {
        sectionName: "About this application",
      },
    },
    {
      question:
        "Is the purpose of the project to support the needs of a disabled resident?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "The Town and Country Planning (Fees for Applications, Deemed Applications, Requests and Site Visits) (England) Regulations 2012, Regulation 14",
            url: "https://www.legislation.gov.uk/uksi/2012/2920/regulation/14",
          },
          {
            text: "UK Statutory Instruments 2012 No. 2920 Regulation 4",
            url: "https://www.legislation.gov.uk/uksi/2012/2920/regulation/4/made",
          },
          {
            text: "Equalities Act 2010, Section 6",
            url: "https://www.legislation.gov.uk/ukpga/2010/15/section/6",
          },
          {
            text: "Children Act 1989, Part 3",
            url: "https://www.legislation.gov.uk/ukpga/1989/41/part/III",
          },
        ],
        sectionName: "About this application",
      },
    },
    {
      question: "Is it a prior approval application?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About this application",
      },
    },
    {
      question: "Is the property a home?",
      responses: [
        {
          value: "Yes",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About this application",
      },
    },
    {
      question: "What works does the project involve?",
      responses: [
        {
          value: "Extension",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About this application",
      },
    },
    {
      question: "Is this application a resubmission?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "The Town and Country Planning (Fees for Applications, Deemed Applications, Requests and Site Visits) (England) Regulations 2012, Regulation 9",
            url: "https://www.legislation.gov.uk/uksi/2012/2920/regulation/9",
          },
        ],
        sectionName: "About this application",
      },
    },
    {
      question: "Does the application qualify for a disability exemption?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About this application",
      },
    },
    {
      question: "Does the application qualify for a resubmission exemption?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About this application",
      },
    },
    {
      question: "Is the site a sports field?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        autoAnswered: true,
        policyRefs: [
          {
            text: "The Town and Country Planning (Fees for Applications, Deemed Applications, Requests and Site Visits) (England) Regulations 2012 Chapter 2, Paragraph 3",
            url: "https://www.legislation.gov.uk/uksi/2012/2920/schedule/1",
          },
        ],
        sectionName: "About this application",
      },
    },
    {
      question:
        "Is the application being made by (or on behalf of) a parish or community council?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        autoAnswered: true,
        policyRefs: [
          {
            text: "The Town and Country Planning (Fees for Applications, Deemed Applications, Requests and Site Visits) (England) Regulations 2012 - Regulation 11",
            url: "https://www.legislation.gov.uk/uksi/2012/2920/regulation/11",
          },
        ],
        sectionName: "About this application",
      },
    },
    {
      question:
        "Are you also submitting another proposal for the same site today?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        policyRefs: [
          {
            text: "The Town and Country Planning (Fees for Applications, Deemed Applications, Requests and Site Visits) (England) Regulations 2012 Chapter 2, Paragraph 10",
            url: "https://www.legislation.gov.uk/uksi/2012/2920/schedule/1",
          },
        ],
        sectionName: "About this application",
      },
    },
    {
      question:
        "Does the application qualify for the sports club fee reduction?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About this application",
      },
    },
    {
      question:
        "Does the application qualify for the parish council reduction?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        autoAnswered: true,
        policyRefs: [
          {
            text: "The Town and Country Planning (Fees for Applications, Deemed Applications, Requests and Site Visits) (England) Regulations 2012 - Regulation 11",
            url: "https://www.legislation.gov.uk/uksi/2012/2920/regulation/11",
          },
        ],
        sectionName: "About this application",
      },
    },
    {
      question:
        "Does the application qualify for the alternative application reduction?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        autoAnswered: true,
        policyRefs: [
          {
            text: "The Town and Country Planning (Fees for Applications, Deemed Applications, Requests and Site Visits) (England) Regulations 2012 Chapter 2, Paragraph 10",
            url: "https://www.legislation.gov.uk/uksi/2012/2920/schedule/1",
          },
        ],
        sectionName: "About this application",
      },
    },
    {
      question: "What type of application is it?",
      responses: [
        {
          value: "Full planning permission",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About this application",
      },
    },
    {
      question: "What does the project involve?",
      responses: [
        {
          value: "Extension",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "About this application",
      },
    },
    {
      question: "How much new floor area is being created?",
      responses: [
        {
          value: "Less than 100m²",
          metadata: {
            flags: ["Community infrastructure levy / Not liable"],
          },
        },
      ],
      metadata: {
        autoAnswered: true,
        policyRefs: [
          {
            text: "The Community Infrastructure Levy Regulations 2010, Regulation 42",
            url: "https://www.legislation.gov.uk/uksi/2010/948/regulation/42",
          },
        ],
        sectionName: "About this application",
      },
    },
    {
      question: "Is this a householder planning application?",
      responses: [
        {
          value: "Yes",
          metadata: {
            flags: ["Community infrastructure levy / Not liable"],
          },
        },
      ],
      metadata: {
        autoAnswered: true,
        policyRefs: [
          {
            text: "The Community Infrastructure Levy Regulations 2010, Regulation 42",
            url: "https://www.legislation.gov.uk/uksi/2010/948/regulation/42",
          },
        ],
        sectionName: "About this application",
      },
    },
    {
      question: "Have the works already started?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "Upload drawings",
      },
    },
    {
      question: "What changes does the project involve?",
      responses: [
        {
          value: "Extension",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "Upload drawings",
      },
    },
    {
      question: "Is the project to add an outbuilding?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "Upload drawings",
      },
    },
    {
      question: "Which Local Planning authority is it?",
      responses: [
        {
          value: "Lambeth",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "Check",
      },
    },
    {
      question: "Connections with London Borough of Lambeth",
      responses: [
        {
          value: "None of the above apply to me",
        },
      ],
      metadata: {
        sectionName: "Check",
      },
    },
    {
      question: "I confirm that:",
      responses: [
        {
          value:
            "The information contained in this application is truthful, accurate and complete, to the best of my knowledge",
        },
      ],
      metadata: {
        sectionName: "Check",
      },
    },
    {
      question: "Does the application qualify for a disability exemption?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "Pay and send",
      },
    },
    {
      question: "Does the application qualify for a resubmission exemption?",
      responses: [
        {
          value: "No",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "Pay and send",
      },
    },
    {
      question: "Which Local Planning authority is it?",
      responses: [
        {
          value: "Lambeth",
        },
      ],
      metadata: {
        autoAnswered: true,
        sectionName: "Pay and send",
      },
    },
  ],
  files: [
    {
      name: "https://api.editor.planx.dev/file/private/tbp4kiba/myPlans.pdf",
      type: ["roofPlan.existing", "roofPlan.proposed"],
    },
    {
      name: "https://api.editor.planx.dev/file/private/5w5v8s8z/other.pdf",
      type: ["sitePlan.existing", "sitePlan.proposed"],
    },
    {
      name: "https://api.editor.planx.dev/file/private/7nrefxnn/elevations.pdf",
      type: ["elevations.existing", "elevations.proposed"],
    },
    {
      name: "https://api.editor.planx.dev/file/private/311w2id6/floor_plans.pdf",
      type: ["floorPlan.existing", "floorPlan.proposed"],
    },
  ],
  metadata: {
    organisation: "LBH",
    id: "81bcaa0f-baf5-4573-ba0a-ea868c573faf",
    source: "PlanX",
    service: {
      flowId: "01e38c5d-e701-4e44-acdc-4d6b5cc3b854",
      url: "https://www.editor.planx.dev/lambeth/apply-for-planning-permission/preview",
      files: {
        required: [
          "roofPlan.existing",
          "roofPlan.proposed",
          "sitePlan.existing",
          "sitePlan.proposed",
          "elevations.existing",
          "elevations.proposed",
        ],
        recommended: ["floorPlan.existing", "floorPlan.proposed"],
        optional: [],
      },
      fee: {
        category: {
          sixAndSeven: [
            {
              description:
                "The fee to apply for planning permission to alter or extend a single home is £258.",
              policyRefs: [
                {
                  text: "UK Statutory Instruments 2023 No. 1197",
                  url: "https://www.legislation.gov.uk/uksi/2023/1197/made",
                },
              ],
            },
          ],
        },
        calculated: [
          {
            description:
              "The fee to apply for planning permission to alter or extend a single home is £258.",
            policyRefs: [
              {
                text: "UK Statutory Instruments 2023 No. 1197",
                url: "https://www.legislation.gov.uk/uksi/2023/1197/made",
              },
            ],
          },
        ],
        payable: [
          {
            description:
              "The fee to apply for planning permission to alter or extend a single home is £258.",
            policyRefs: [
              {
                text: "UK Statutory Instruments 2023 No. 1197",
                url: "https://www.legislation.gov.uk/uksi/2023/1197/made",
              },
            ],
          },
        ],
      },
    },
    submittedAt: "2023-10-02T00:00:00.00Z",
    schema:
      "https://theopensystemslab.github.io/digital-planning-data-schemas/@next/schemas/prototypeApplication.json",
  },
};
