import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

const fakeApplication = {
  type: {
    value: "pp.full.householder",
    description: "planning_permission",
  },
  reference: faker.string.alphanumeric(10),
  fullReference: faker.string.alphanumeric(10),
  targetDate: faker.date.future().toISOString(),
  receivedAt: faker.date.past().toISOString(),
  validAt: faker.date.past().toISOString(),
  publishedAt: faker.date.past().toISOString(),
  determinedAt: null,
  decision: null,
  status: "in_assessment",
  consultation: {
    startDate: faker.date.past().toISOString(),
    endDate: faker.date.future().toISOString(),
    publicUrl: faker.internet.url(),
    publishedComments: [
      {
        comment: faker.lorem.sentence(),
        receivedAt: faker.date.past().toISOString(),
        summaryTag: "objection",
      },
    ],
    consulteeComments: [
      {
        comment: faker.lorem.sentence(),
      },
    ],
  },
  property: {
    address: {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      title: faker.location.streetAddress(),
      get town() {
        return faker.location.city();
      },
      get postcode() {
        return faker.location.zipCode();
      },
      get singleLine() {
        return `${this.title}, ${this.town}, ${this.postcode}`;
      },
      uprn: faker.string.numeric(10),
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
    description: faker.lorem.sentence(),
  },
  agent_first_name: faker.person.firstName(),
  agent_last_name: faker.person.lastName(),
  agent_phone: faker.phone.number(),
  agent_email: faker.internet.email(),
  applicant_first_name: faker.person.firstName(),
  applicant_last_name: faker.person.lastName(),
  user_role: "agent",
  awaiting_determination_at: faker.date.future().toISOString(),
  to_be_reviewed_at: null,
  created_at: faker.date.past().toISOString(),
  get description() {
    return this.proposal.description;
  },
  determined_at: null,
  determination_date: faker.date.future().toISOString(),
  id: faker.number.int(),
  invalidated_at: null,
  in_assessment_at: faker.date.past().toISOString(),
  payment_reference: "PAY1",
  payment_amount: "0.0",
  result_flag: "Planning permission / Permission needed",
  result_heading: faker.lorem.sentence(),
  result_description: faker.lorem.sentence(),
  result_override: faker.lorem.sentence(),
  returned_at: null,
  started_at: null,
  target_date: faker.date.future().toISOString(),
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
  documents: [],
  application_type: "prior_approval",
  make_public: true,
};

export const handlers = [
  // Handler for endpoint that retrieves planning applications based on a search criteria
  http.get("*/public/planning_applications/search*", async () => {
    return HttpResponse.json({
      metadata: {
        page: 1,
        results: 2,
        from: 1,
        to: 1,
        total_pages: 1,
        total_results: 2,
      },
      data: [
        {
          application: {
            type: fakeApplication.type,
            reference: fakeApplication.reference,
            fullReference: fakeApplication.fullReference,
            targetDate: fakeApplication.targetDate,
            receivedAt: fakeApplication.receivedAt,
            validAt: fakeApplication.validAt,
            publishedAt: fakeApplication.publishedAt,
            determinedAt: fakeApplication.determinedAt,
            decision: fakeApplication.decision,
            status: fakeApplication.status,
            consultation: {
              startDate: fakeApplication.consultation.startDate,
              endDate: fakeApplication.consultation.endDate,
            },
          },
          property: fakeApplication.property,
          proposal: fakeApplication.proposal,
        },
      ],
    });
  }),

  // Handler for endpoint that retrieves a planning application given a reference
  http.get(
    `*public/planning_applications/*`,

    async () => {
      return HttpResponse.json({
        application: {
          type: fakeApplication.type,
          reference: fakeApplication.reference,
          fullReference: fakeApplication.fullReference,
          targetDate: fakeApplication.targetDate,
          receivedAt: fakeApplication.receivedAt,
          validAt: fakeApplication.validAt,
          publishedAt: fakeApplication.publishedAt,
          determinedAt: fakeApplication.determinedAt,
          decision: fakeApplication.decision,
          status: fakeApplication.status,
          consultation: {
            startDate: fakeApplication.consultation.startDate,
            endDate: fakeApplication.consultation.endDate,
            publicUrl: fakeApplication.consultation.publicUrl,
            publishedComments: fakeApplication.consultation.publishedComments,
            consulteeComments: fakeApplication.consultation.consulteeComments,
          },
        },
        property: fakeApplication.property,
        proposal: fakeApplication.proposal,
      });
    },
  ),

  // Handler for endpoint that retrieves a private planning application given a reference
  http.get(`*/planning_applications/*`, async () => {
    return HttpResponse.json({
      agent_first_name: fakeApplication.agent_first_name,
      agent_last_name: fakeApplication.agent_last_name,
      agent_phone: fakeApplication.agent_phone,
      agent_email: fakeApplication.agent_email,
      applicant_first_name: fakeApplication.applicant_first_name,
      applicant_last_name: fakeApplication.applicant_last_name,
      user_role: fakeApplication.user_role,
      awaiting_determination_at: fakeApplication.awaiting_determination_at,
      to_be_reviewed_at: fakeApplication.to_be_reviewed_at,
      created_at: fakeApplication.created_at,
      description: fakeApplication.description,
      determined_at: fakeApplication.determined_at,
      determination_date: fakeApplication.determination_date,
      id: fakeApplication.id,
      invalidated_at: fakeApplication.invalidated_at,
      in_assessment_at: fakeApplication.in_assessment_at,
      payment_reference: fakeApplication.payment_reference,
      payment_amount: fakeApplication.payment_amount,
      result_flag: fakeApplication.result_flag,
      result_heading: fakeApplication.result_heading,
      result_description: fakeApplication.result_description,
      result_override: fakeApplication.result_override,
      returned_at: fakeApplication.returned_at,
      started_at: fakeApplication.started_at,
      status: fakeApplication.status,
      target_date: fakeApplication.target_date,
      withdrawn_at: fakeApplication.withdrawn_at,
      work_status: fakeApplication.work_status,
      boundary_geojson: fakeApplication.boundary_geojson,
      application_type: fakeApplication.application_type,
      reference: fakeApplication.reference,
      reference_in_full: fakeApplication.fullReference,
      site: {
        address_1: fakeApplication.property.address.title,
        address_2: fakeApplication.property.address.town,
        county: null,
        town: fakeApplication.property.address.town,
        postcode: fakeApplication.property.address.postcode,
        uprn: fakeApplication.property.address.uprn,
        latitude: fakeApplication.property.address.latitude,
        longitude: fakeApplication.property.address.longitude,
      },
      received_date: fakeApplication.receivedAt,
      validAt: fakeApplication.validAt,
      publishedAt: fakeApplication.publishedAt,
      decision: fakeApplication.decision,
      documents: fakeApplication.documents,
      published_comments: fakeApplication.consultation.publishedComments,
      consultee_comments: fakeApplication.consultation.consulteeComments,
      consultation: {
        end_date: fakeApplication.consultation.endDate,
      },
      make_public: fakeApplication.make_public,
    });
  }),

  // Handler for endpoint that retrieves documents for a planning application
  http.get(`*/public/planning_applications/*/documents`, async () => {
    return HttpResponse.json({
      application: {
        type: fakeApplication.type,
        reference: fakeApplication.reference,
        fullReference: fakeApplication.fullReference,
        targetDate: fakeApplication.targetDate,
        receivedAt: fakeApplication.receivedAt,
        validAt: fakeApplication.validAt,
        publishedAt: fakeApplication.publishedAt,
        determinedAt: fakeApplication.determinedAt,
        decision: fakeApplication.decision,
        status: fakeApplication.status,
        consultation: {
          startDate: fakeApplication.consultation.startDate,
          endDate: fakeApplication.consultation.endDate,
          publicUrl: fakeApplication.consultation.publicUrl,
          publishedComments: fakeApplication.consultation.publishedComments,
          consulteeComments: fakeApplication.consultation.consulteeComments,
        },
      },
      files: [],
      metadata: {
        results: 0,
        totalResults: 0,
      },
      decisionNotice: {
        name: `decision-notice-${fakeApplication.reference}.pdf`,
        url: faker.internet.url(),
      },
    });
  }),
  // Handler for endpoint that retrieves the planning application submission given a reference
  http.get(`*/planning_applications/*/submission`, async () => {
    return HttpResponse.json({
      application: {
        type: fakeApplication.type,
        reference: fakeApplication.reference,
        fullReference: fakeApplication.fullReference,
        targetDate: fakeApplication.targetDate,
        receivedAt: fakeApplication.receivedAt,
        validAt: fakeApplication.validAt,
        publishedAt: fakeApplication.publishedAt,
        determinedAt: fakeApplication.determinedAt,
        status: fakeApplication.status,
        decision: fakeApplication.decision,
        consultation: {
          startDate: fakeApplication.consultation.startDate,
          endDate: fakeApplication.consultation.endDate,
        },
      },
      submission: {
        data: {
          application: {
            type: fakeApplication.type,
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

  // Handler for endpoint that creates new neighbour response
  http.post(`*/planning_applications/*/neighbour_responses`, async () => {
    return HttpResponse.json({
      id: fakeApplication.reference,
      message: "Response submitted",
    });
  }),
];
