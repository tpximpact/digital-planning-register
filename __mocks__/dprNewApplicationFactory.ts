import { DprApplication, DprDocument } from "@/types";
import { faker, fakerEN_GB } from "@faker-js/faker";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  generateBoundaryGeoJson,
  generateDocument,
  generateNResults,
  generateReference,
} from "./dprApplicationFactory";
import { formatDateToYmd } from "@/util";
import {
  OSAddress,
  ProposedAddress,
  SiteAddress,
} from "@/types/odp-types/shared/Addresses";

const applicationTypes = [
  "Appeal allowed",
  "Appeal dismissed",
  "Appeal split decision",
  "Appeal withdrawn",
  "Appeal lodged",
  "Appeal valid",
  "Appeal started",
  "Appeal determined",
  "pending",
  "not_started",
  "invalid",
  "assessment_in_progress",
  "in_assessment",
  "awaiting_determination",
  "in_committee",
  "to_be_reviewed",
  "determined",
  "returned",
  "withdrawn",
  "closed",
];

const processStages = [
  "submission",
  "validation",
  "consultation",
  "assessment",
  "appeal",
  "highCourtAppeal",
];

const applicationStatus = [
  "returned",
  "withdrawn",
  "determined",
  "undetermined",
];

const generateAllPossibleDates = (start?: string) => {
  if (!start) {
    start = faker.date.anytime().toISOString();
  }

  // application submitted within the last 10 years
  const submittedAt = faker.date.past({ years: 10 });

  // application received by back office system
  const receivedAt = dayjs(submittedAt).add(200, "millisecond");

  // application validated in back office system
  const validatedAt = dayjs(receivedAt).add(1, "day");

  // application is published now
  const publishedAt = dayjs(validatedAt).add(200, "millisecond");

  // consulation starts once its valid and lasts 21 working days
  // startDate - as soon as validated
  const consultationStartAt = validatedAt;
  const consultationEndAt = consultationStartAt.add(21, "day");

  // appeal is lodged within 6 months of consultation end date
  // lodgedDate
  const appealLodgedAt = consultationStartAt.add(1, "month");

  // appeal is validated
  const appealValidatedAt = dayjs(appealLodgedAt).add(1, "day");

  // appeal starts
  const appealStartedAt = dayjs(appealValidatedAt).add(1, "day");

  const dates = {
    submission: {
      submittedAt: submittedAt,
    },
    validation: {
      receivedAt: receivedAt,
      validatedAt: validatedAt,
    },
    publishedAt: publishedAt,
    consultation: {
      startAt: consultationStartAt,
      endAt: consultationEndAt,
    },
    appeal: {
      lodgedAt: appealLodgedAt,
      validatedAt: appealValidatedAt,
      startedAt: appealStartedAt,
    },
  };
  return dates;
};

const proposedAddress: ProposedAddress = {
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  x: 502869.8591151078,
  y: 180333.4537434135,
  title: "House McHouseface Housing",
  source: "Proposed by applicant",
};

const siteAddress: OSAddress = {
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  x: 493822,
  y: 191603,
  title: fakerEN_GB.location.streetAddress(true),
  source: "Ordnance Survey",
  uprn: "100080482163",
  usrn: "35200844",
  pao: "7",
  street: fakerEN_GB.location.street(),
  town: fakerEN_GB.location.city(),
  postcode: fakerEN_GB.location.zipCode(),
  singleLine: fakerEN_GB.location.streetAddress(true),
};

export const generateDprApplication = (): DprApplication => {
  const dates = generateAllPossibleDates();

  return {
    applicationType: "pp.full.major",
    data: {
      application: {
        reference: generateReference(),
        stage: "appeal",
        status: "determined",
      },
      localPlanningAuthority: {
        commentsAcceptedUntilDecision: true,
      },
      submission: {
        submittedAt: dates.submission.submittedAt.toISOString(),
      },
      validation: {
        receivedAt: dates.validation.receivedAt.toISOString(),
        validatedAt: dates.validation.validatedAt.toISOString(),
        isValid: true,
      },
      consultation: {
        startDate: dates.consultation.startAt.format("YYYY-MM-DD"),
        endDate: dates.consultation.endAt.format("YYYY-MM-DD"),
        siteNotice: true,
      },
      assessment: {
        councilDecision: "refused",
      },
      appeal: {
        lodgedDate: dates.appeal.lodgedAt.format("YYYY-MM-DD"),
        reason:
          "We don't believe the council took into consideration the environmental impact alleviation approach during their assessment.",
        validatedDate: dates.appeal.validatedAt.format("YYYY-MM-DD"),
        startedDate: dates.appeal.startedAt.format("YYYY-MM-DD"),
      },
      caseOfficer: {
        name: "Casey Officer",
      },
    },
    submission: {
      data: {
        applicant: {
          type: faker.helpers.arrayElement([
            "individual",
            "company",
            "charity",
            "public",
            "parishCouncil",
          ]),
          name: {
            first: faker.person.firstName(),
            last: faker.person.lastName(),
          },
          address: {
            sameAsSiteAddress: true,
          },
          agent: {
            name: {
              first: faker.person.firstName(),
              last: faker.person.lastName(),
            },
            address: {
              line1: fakerEN_GB.location.street(),
              line2: "",
              town: fakerEN_GB.location.city(),
              county: "",
              postcode: fakerEN_GB.location.zipCode(),
              country: "",
            },
          },
        },
        property: {
          address: faker.helpers.arrayElement([proposedAddress, siteAddress]),
          boundary: {
            site: {
              type: "Feature",
              geometry: {
                type: "MultiPolygon",
                coordinates: [
                  [
                    [
                      [-0.525061, 51.514352],
                      [-0.525278, 51.513929],
                      [-0.525415, 51.513695],
                      [-0.525716, 51.513284],
                      [-0.52582, 51.513149],
                      [-0.526395, 51.512578],
                      [-0.526474, 51.512515],
                      [-0.526452, 51.512518],
                      [-0.526483, 51.512486],
                      [-0.526068, 51.512397],
                      [-0.523001, 51.511595],
                      [-0.520218, 51.510925],
                      [-0.517193, 51.51149],
                      [-0.51608, 51.511659],
                      [-0.512427, 51.512263],
                      [-0.51294, 51.514283],
                      [-0.51624, 51.514275],
                      [-0.516107, 51.514586],
                      [-0.515866, 51.514961],
                      [-0.515496, 51.515608],
                      [-0.515375, 51.515791],
                      [-0.515233, 51.516085],
                      [-0.515087, 51.516427],
                      [-0.515002, 51.516564],
                      [-0.51593, 51.51681],
                      [-0.51572, 51.517065],
                      [-0.515697, 51.517105],
                      [-0.515076, 51.517944],
                      [-0.517128, 51.518561],
                      [-0.517376, 51.518606],
                      [-0.517472, 51.518631],
                      [-0.518067, 51.518889],
                      [-0.518535, 51.519053],
                      [-0.519212, 51.519268],
                      [-0.519295, 51.519132],
                      [-0.519332, 51.519087],
                      [-0.519402, 51.519063],
                      [-0.519778, 51.519074],
                      [-0.519836, 51.51911],
                      [-0.519794, 51.519233],
                      [-0.519782, 51.519305],
                      [-0.519782, 51.51938],
                      [-0.519791, 51.519392],
                      [-0.519814, 51.519401],
                      [-0.520024, 51.519401],
                      [-0.520946, 51.519346],
                      [-0.521302, 51.519305],
                      [-0.521431, 51.519302],
                      [-0.521839, 51.519245],
                      [-0.521818, 51.519184],
                      [-0.521806, 51.519184],
                      [-0.5218, 51.519164],
                      [-0.521768, 51.519168],
                      [-0.521645, 51.518838],
                      [-0.52135, 51.518888],
                      [-0.521321, 51.518816],
                      [-0.521348, 51.518812],
                      [-0.521338, 51.518785],
                      [-0.522282, 51.518658],
                      [-0.522348, 51.519178],
                      [-0.522998, 51.519094],
                      [-0.522932, 51.518675],
                      [-0.523307, 51.518771],
                      [-0.523838, 51.518729],
                      [-0.523878, 51.518918],
                      [-0.52392, 51.518914],
                      [-0.523943, 51.519022],
                      [-0.524932, 51.51886],
                      [-0.52487, 51.518642],
                      [-0.524794, 51.518432],
                      [-0.524769, 51.518321],
                      [-0.52465, 51.518036],
                      [-0.524606, 51.517876],
                      [-0.52459, 51.517846],
                      [-0.524504, 51.517529],
                      [-0.52444, 51.51722],
                      [-0.524403, 51.517082],
                      [-0.524459, 51.516655],
                      [-0.524776, 51.515182],
                      [-0.524921, 51.514691],
                      [-0.524995, 51.514496],
                      [-0.525061, 51.514352],
                    ],
                  ],
                ],
              },
              properties: {
                name: "",
                entity: 12000001973,
                prefix: "title-boundary",
                dataset: "title-boundary",
                "end-date": "",
                typology: "geography",
                reference: "49708846",
                "entry-date": "2024-05-06",
                "start-date": "2011-01-11",
                "organisation-entity": "13",
              },
            },
            area: {
              hectares: 59.48202,
              squareMetres: 594820.2,
            },
          },
        },
        proposal: {
          description: faker.lorem.paragraphs(),
        },
      },
      files: generateNResults<DprDocument>(50, generateDocument),
    },
    metadata: {
      publishedAt: dates.publishedAt.toISOString(),
      id: "180da003-279d-40dc-b538-a616c8c2a700",
      organisation: "BKM",
      submittedAt: dates.submission.submittedAt.toISOString(),
      source: "PlanX",
      service: {
        flowId: "28e258a7-812f-4390-b520-7c00e7f5cd77",
        url: "https://editor.planx.dev/buckinghamshire/apply-for-planning-permission/published",
        files: {
          required: ["necessaryInformation"],
          recommended: ["relevantInformation"],
          optional: [],
        },
        fee: {
          calculated: [],
          payable: [],
        },
      },
      schema:
        "https://theopensystemslab.github.io/digital-planning-data-schemas/@next/schemas/postSubmissionApplication.json",
    },
  };
};
