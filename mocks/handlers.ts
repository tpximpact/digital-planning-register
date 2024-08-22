import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("*/public/planning_applications/search*", async ({ request }) => {
    const url = new URL(request.url);
    return HttpResponse.json({
      metadata: {
        page: 1,
        results: 2,
        from: 1,
        to: 1,
        total_pages: 1,
        total_results: 2,
      },
      links: {
        first:
          "https://southwark.bops-staging.services/api/v2/public/planning_applications/search?page=1&maxresults=2",
        last: "https://southwark.bops-staging.services/api/v2/public/planning_applications/search?page=5&maxresults=2",
        prev: "https://southwark.bops-staging.services/api/v2/public/planning_applications/search?page=1&maxresults=2",
        next: "https://southwark.bops-staging.services/api/v2/public/planning_applications/search?page=3&maxresults=2",
      },
      data: [
        {
          application: {
            type: {
              value: "pp.full.householder",
              description: "planning_permission",
            },
            reference: "23-00101-LDCP",
            fullReference: "PlanX-23-00101-LDCP",
            targetDate: "2024-05-15",
            receivedAt: "2024-04-17T00:00:00.000+01:00",
            validAt: "2024-04-12T00:00:00.000+01:00",
            publishedAt: "2024-04-12T00:00:00.000+01:00",
            determinedAt: null,
            decision: null,
            status: "in_assessment",
            consultation: {
              startDate: "2024-04-15",
              endDate: "2024-05-07",
            },
          },
          property: {
            address: {
              latitude: 84.3630530473182,
              longitude: -105.7502386387352,
              title: "511 Test Village",
              singleLine: "511 Test Village, West Rod, 66983",
              uprn: "00565512",
              town: "West Rod",
              postcode: "66983",
            },
            boundary: {
              site: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    geometry: {
                      type: "Polygon",
                      coordinates: [
                        [
                          [-0.07739927369747812, 51.501345554406896],
                          [-0.0778893839394212, 51.501002280754676],
                          [-0.07690508968054104, 51.50102474569704],
                          [-0.07676672973966252, 51.50128963605792],
                          [-0.07739927369747812, 51.501345554406896],
                        ],
                      ],
                    },
                    properties: {
                      color: "#d870fc",
                    },
                  },
                  {
                    type: "Feature",
                    geometry: {
                      type: "Polygon",
                      coordinates: [
                        [
                          [30, 10],
                          [40, 40],
                          [30, 10],
                        ],
                      ],
                    },
                    properties: {},
                  },
                ],
              },
            },
          },
          proposal: {
            description: "householder extension",
          },
        },
        {
          application: {
            type: {
              value: "pp.full.householder",
              description: "planning_permission",
            },
            reference: "24-00106-HAPP",
            fullReference: "PlanX-24-00106-HAPP",
            receivedAt: "2024-04-18T00:00:00.000+01:00",
            validAt: "2024-04-19T00:00:00.000+01:00",
            published_at: "2024-04-19T00:00:00.000+01:00",
            determinedAt: "2024-04-20T00:00:00.000+01:00",
            status: "in_assessment",
            decision: "granted",
            consultation: {
              startDate: "2024-03-12",
              endDate: "2024-04-02",
            },
          },
          property: {
            address: {
              latitude: -37.54605786072338,
              longitude: -149.12320338972793,
              title: "41874 Dare Parks",
              singleLine: "41874 Dare Parks, Rosetteside, 23463-4689",
              uprn: "00595249",
              town: "Rosetteside",
              postcode: "23463-4689",
            },
            boundary: {
              site: {
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: [
                    [
                      [-0.054597, 51.537331],
                      [-0.054588, 51.537287],
                      [-0.054453, 51.537313],
                      [-0.054597, 51.537331],
                    ],
                  ],
                },
                properties: null,
              },
            },
          },
          proposal: {
            description: "Build a roof extension.",
          },
        },
      ],
    });
  }),

  // Handler for public planning application details
  http.get(
    `*public/planning_applications/*`,

    async ({ request }) => {
      return HttpResponse.json({
        application: {
          type: {
            value: "pp.full.householder",
            description: "planning_permission",
          },
          reference: "23-00101-LDCP",
          fullReference: "CMD-23-00101-LDCP",
          targetDate: "2023-09-12",
          receivedAt: "2023-08-08T13:33:41.265+01:00",
          validAt: "2023-08-08T00:00:00.000+01:00",
          publishedAt: "2023-08-08T00:00:00.000+01:00",
          determinedAt: "2024-06-12T17:57:10.534+01:00",
          decision: "granted",
          status: "in_assessment",
          consultation: {
            startDate: "2023-08-09",
            endDate: "2023-08-30",
            publicUrl:
              "https://camden.bops-applicants-staging.services/planning_applications/2032",
            publishedComments: [
              {
                comment: "Test Test Comment",
                receivedAt: "2023-06-11T00:00:00.000+01:00",
                summaryTag: "objection",
              },
            ],
            consulteeComments: [],
          },
        },
        property: {
          address: {
            latitude: "51.4842536",
            longitude: "-0.0764165",
            title: "511 Test Village",
            singleLine: "511 Test Village, London, SE16 3RQ",
            uprn: "100081043511",
            town: "London",
            postcode: "SE16 3RQ",
          },
          boundary: {
            site: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-0.07716178894042969, 51.50094238217541],
                    [-0.07645905017852783, 51.50053497847238],
                    [-0.07615327835083008, 51.50115276135022],
                    [-0.07716178894042969, 51.50094238217541],
                  ],
                ],
              },
            },
          },
        },
        proposal: {
          description: "Add a rear extension",
        },
      });
    },
  ),

  // Handler for private planning application details
  http.get(`*/planning_applications/*`, async ({ request }) => {
    return HttpResponse.json({
      agent_first_name: "Jennifer",
      agent_last_name: "Harper",
      agent_phone: "237878889",
      agent_email: "agent@example.com",
      applicant_first_name: "Johnny",
      applicant_last_name: "Manteras",
      user_role: "agent",
      awaiting_determination_at: "2023-08-17T11:45:24.571+01:00",
      to_be_reviewed_at: null,
      created_at: "2023-08-08T13:33:41.265+01:00",
      description: "Add a rear extension",
      determined_at: "2024-06-12T17:57:10.534+01:00",
      determination_date: "2024-06-12T00:00:00.000+01:00",
      id: 2032,
      invalidated_at: null,
      in_assessment_at: "2023-08-17T11:45:08.643+01:00",
      payment_reference: "PAY1",
      payment_amount: "0.0",
      result_flag: "Planning permission / Permission needed",
      result_heading:
        "It looks like these changes will need planning permission",
      result_description:
        "Based on the information you have provided, we do not think this is eligible for a Lawful Development Certificate",
      result_override: "This was my reason for rejecting the result",
      returned_at: null,
      started_at: null,
      status: "in_assessment",
      target_date: "2023-09-12",
      withdrawn_at: null,
      work_status: "proposed",
      boundary_geojson: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-0.07716178894042969, 51.50094238217541],
              [-0.07645905017852783, 51.50053497847238],
              [-0.07615327835083008, 51.50115276135022],
              [-0.07716178894042969, 51.50094238217541],
            ],
          ],
        },
      },
      application_type: "prior_approval",
      reference: "23-00101-LDCP",
      reference_in_full: "CMD-23-00101-LDCP",
      site: {
        address_1: "511 Test Village",
        address_2: "Southwark",
        county: null,
        town: "London",
        postcode: "SE16 3RQ",
        uprn: "100081043511",
        latitude: "51.4842536",
        longitude: "-0.0764165",
      },
      received_date: "2023-08-08T13:33:41.265+01:00",
      validAt: "2023-08-08T00:00:00.000+01:00",
      publishedAt: "2023-08-08T00:00:00.000+01:00",
      decision: "granted",
      documents: [],
      published_comments: [
        {
          comment: "Test Test Comment",
          received_at: "2023-06-11T00:00:00.000+01:00",
          summary_tag: "objection",
        },
      ],
      consultee_comments: [],
      consultation: {
        end_date: "2023-08-30",
      },
      make_public: true,
    });
  }),

  http.get(
    `*/public/planning_applications/*/documents`,
    async ({ request }) => {
      return HttpResponse.json({
        application: {
          type: {
            value: "pa.part1.classA",
            description: "prior_approval",
          },
          reference: "23-00101-LDCP",
          fullReference: "CMD-23-00101-LDCP",
          targetDate: "2023-09-12",
          receivedAt: "2023-08-08T13:33:41.265+01:00",
          validAt: "2023-08-08T00:00:00.000+01:00",
          publishedAt: "2023-08-08T00:00:00.000+01:00",
          determinedAt: "2024-06-12T17:57:10.534+01:00",
          decision: "granted",
          status: "in_assessment",
          consultation: {
            startDate: "2023-08-09",
            endDate: "2023-08-30",
            publicUrl:
              "https://camden.bops-applicants-staging.services/planning_applications/2032",
            publishedComments: [
              {
                comment: "Test Test Comment",
                receivedAt: "2023-06-11T00:00:00.000+01:00",
                summaryTag: "objection",
              },
            ],
            consulteeComments: [],
          },
        },
        files: [],
        metadata: {
          results: 0,
          totalResults: 0,
        },
        decisionNotice: {
          name: "decision-notice-CMD-23-00101-LDCP.pdf",
          url: "https://camden.bops-staging.services/api/v1/planning_applications/2032/decision_notice.pdf",
        },
      });
    },
  ),

  http.get(`*/planning_applications/*/submission`, async ({ request }) => {
    return HttpResponse.json({
      application: {
        type: {
          value: "pp.full.householder",
          description: "planning_permission",
        },
        reference: "24-00107-HAPP",
        fullReference: "PlanX-24-00107-HAPP",
        targetDate: "2024-05-15",
        receivedAt: "2024-04-17T00:00:00.000+01:00",
        validAt: "2024-04-12T00:00:00.000+01:00",
        publishedAt: null,
        determinedAt: null,
        status: "in_assessment",
        decision: null,
        consultation: {
          startDate: "2024-04-15",
          endDate: "2024-05-07",
        },
      },
      submission: {
        data: {
          application: {
            type: {
              value: "pp.full.householder",
              description: "Planning Permission - Full householder",
            },
            fee: "REDACTED",
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
            email: "REDACTED",
            phone: {
              primary: "REDACTED",
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
              email: "REDACTED",
              phone: {
                primary: "REDACTED",
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
                  description: "Article 4 Direction area",
                  intersects: false,
                },
                {
                  value: "article4.caz",
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
                  description: "Listed Building",
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
                  intersects: false,
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
                  value: "locallyListed",
                  description: "Locally Listed Building",
                  intersects: false,
                },
                {
                  value: "nature.SPA",
                  description: "Special Protection Area (SPA)",
                  intersects: false,
                },
                {
                  value: "designated.WHS",
                  description: "UNESCO World Heritage Site or buffer zone",
                  intersects: false,
                },
                {
                  value: "registeredPark",
                  description: "Historic Park or Garden",
                  intersects: false,
                },
                {
                  value: "designated.AONB",
                  description: "Area of Outstanding Natural Beauty (AONB)",
                  intersects: false,
                },
                {
                  value: "designated.nationalPark",
                  description: "National Park",
                  intersects: false,
                },
                {
                  value: "designated.conservationArea",
                  description: "Conservation Area",
                  intersects: false,
                },
                {
                  value: "designated.nationalPark.broads",
                  description: "National Park - Broads",
                  intersects: false,
                },
                {
                  value: "road.classified",
                  description: "Classified Road",
                  intersects: false,
                },
              ],
            },
            localAuthorityDistrict: ["Lambeth"],
            region: "London",
            type: {
              value: "residential.dwelling.house.terrace",
              description: "Terrace",
            },
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
            projectType: [
              {
                value: "extend.roof.dormer",
                description: "Add a roof dormer",
              },
            ],
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
        preAssessment: [],
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
                value: "REDACTED",
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
        ],
        files: [
          {
            name: "https://api.editor.planx.dev/file/private/tbp4kiba/myPlans.pdf",
            type: [
              {
                value: "roofPlan.existing",
                description: "Roof plan - existing",
              },
              {
                value: "roofPlan.proposed",
                description: "Roof plan - proposed",
              },
            ],
          },
          {
            name: "https://api.editor.planx.dev/file/private/5w5v8s8z/other.pdf",
            type: [
              {
                value: "sitePlan.existing",
                description: "Site plan - existing",
              },
              {
                value: "sitePlan.proposed",
                description: "Site plan - proposed",
              },
            ],
          },
          {
            name: "https://api.editor.planx.dev/file/private/7nrefxnn/elevations.pdf",
            type: [
              {
                value: "elevations.existing",
                description: "Elevations - existing",
              },
              {
                value: "elevations.proposed",
                description: "Elevations - proposed",
              },
            ],
          },
          {
            name: "https://api.editor.planx.dev/file/private/311w2id6/floor_plans.pdf",
            type: [
              {
                value: "floorPlan.existing",
                description: "Floor plan - existing",
              },
              {
                value: "floorPlan.proposed",
                description: "Floor plan - proposed",
              },
            ],
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
                {
                  value: "roofPlan.existing",
                  description: "Roof plan - existing",
                },
                {
                  value: "roofPlan.proposed",
                  description: "Roof plan - proposed",
                },
                {
                  value: "sitePlan.existing",
                  description: "Site plan - existing",
                },
                {
                  value: "sitePlan.proposed",
                  description: "Site plan - proposed",
                },
                {
                  value: "elevations.existing",
                  description: "Elevations - existing",
                },
                {
                  value: "elevations.proposed",
                  description: "Elevations - proposed",
                },
              ],
              recommended: [
                {
                  value: "floorPlan.existing",
                  description: "Floor plan - existing",
                },
                {
                  value: "floorPlan.proposed",
                  description: "Floor plan - proposed",
                },
              ],
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
            "https://theopensystemslab.github.io/digital-planning-data-schemas/v0.7.0/schema.json",
        },
      },
    });
  }),

  http.post(
    `*/planning_applications/*/neighbour_responses`,
    async ({ request }) => {
      return HttpResponse.json({
        id: "23-00101-LDCP",
        message: "Response submitted",
      });
    },
  ),
];
