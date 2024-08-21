import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("*/public/planning_applications/search*", async ({ request }) => {
    console.log("MSW intercepted request:", request.url);
    const url = new URL(request.url);
    console.log("Search params:", Object.fromEntries(url.searchParams));
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
            reference: "24-00100-HAPP",
            fullReference: "PlanX-24-00100-HAPP",
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
            status: "determined",
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
      console.log("MSW intercepted public planning application details");
      console.log("Full URL:", request.url);
      return HttpResponse.json({
        application: {
          type: {
            value: "pa.part1.classA",
            description: "prior_approval",
          },
          reference: "23-00112-PA1A",
          fullReference: "CMD-23-00112-PA1A",
          targetDate: "2023-09-12",
          receivedAt: "2023-08-08T13:33:41.265+01:00",
          validAt: "2023-08-08T00:00:00.000+01:00",
          publishedAt: "2023-08-08T00:00:00.000+01:00",
          determinedAt: "2024-06-12T17:57:10.534+01:00",
          decision: "granted",
          status: "determined",
          consultation: {
            startDate: "2023-08-09",
            endDate: "2023-08-30",
            publicUrl:
              "https://camden.bops-applicants-staging.services/planning_applications/2032",
            publishedComments: [
              {
                comment: "Test Test ",
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
            title: "11 Abbey Gardens",
            singleLine: "11 Abbey Gardens, London, SE16 3RQ",
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
    console.log("MSW intercepted private planning application details");
    console.log("Full URL:", request.url);
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
      status: "determined",
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
      reference: "23-00112-PA1A",
      reference_in_full: "CMD-23-00112-PA1A",
      site: {
        address_1: "11 Abbey Gardens",
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
          comment: "Test Test ",
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
      console.log("MSW intercepted documents request");
      console.log("Full URL:", request.url);
      return HttpResponse.json({
        application: {
          type: {
            value: "pa.part1.classA",
            description: "prior_approval",
          },
          reference: "23-00112-PA1A",
          fullReference: "CMD-23-00112-PA1A",
          targetDate: "2023-09-12",
          receivedAt: "2023-08-08T13:33:41.265+01:00",
          validAt: "2023-08-08T00:00:00.000+01:00",
          publishedAt: "2023-08-08T00:00:00.000+01:00",
          determinedAt: "2024-06-12T17:57:10.534+01:00",
          decision: "granted",
          status: "determined",
          consultation: {
            startDate: "2023-08-09",
            endDate: "2023-08-30",
            publicUrl:
              "https://camden.bops-applicants-staging.services/planning_applications/2032",
            publishedComments: [
              {
                comment: "Test Test ",
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
          name: "decision-notice-CMD-23-00112-PA1A.pdf",
          url: "https://camden.bops-staging.services/api/v1/planning_applications/2032/decision_notice.pdf",
        },
      });
    },
  ),
];
