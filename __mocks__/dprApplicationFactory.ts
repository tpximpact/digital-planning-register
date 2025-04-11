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

import {
  validApplicationTypes,
  getPrimaryApplicationTypeKey,
} from "@/lib/planningApplication";
import {
  DprPlanningApplication,
  DprComment,
  DprDocument,
  DprBoundaryGeojson,
  DprPagination,
} from "@/types";
import { AppealDecision } from "@/types/odp-types/schemas/postSubmissionApplication/enums/AppealDecision";
import { ApplicationType } from "@/types/odp-types/schemas/prototypeApplication/enums/ApplicationType";
import { formatDateToYmd } from "@/util";

import { faker } from "@faker-js/faker";
import {
  generateAgent,
  generateBaseApplicant,
  generateCaseOfficer,
  generateSiteAddress,
} from "./dprNewApplicationFactory";
import {
  Agent,
  BaseApplicant,
} from "@/types/odp-types/schemas/prototypeApplication/data/Applicant";

/**
 * Generates a random reference string in the format `XX-XXXXX-XXXX`.
 *
 * @returns {string} A random reference string.
 */
export const generateReference = (): string => {
  const part1 = faker.number.int({ min: 10, max: 99 }).toString();
  const part2 = faker.number.int({ min: 10000, max: 99999 }).toString();
  const part3 = faker.string.alpha({ length: 4, casing: "upper" });
  return `${part1}-${part2}-${part3}`;
};

/**
 * Generates a random comment object.
 *
 * @returns {object} A random comment object.
 */
export const generateComment = (): DprComment => {
  return {
    id: faker.number.int({ min: 1000000000, max: 9999999999 }),
    comment: faker.lorem.paragraphs(),
    receivedDate: faker.date.anytime().toISOString(),
    sentiment: faker.helpers.arrayElement([
      "objection",
      "neutral",
      "supportive",
    ]),
  };
};

/**
 * Generates a random document object.
 *
 * @returns {object} A random document object.
 */
export const generateDocument = (): DprDocument => {
  return {
    url: faker.image.url(),
    title: faker.lorem.lines(1),
    /**
     * Optional because of the need to insert fake application form document
     */
    createdDate: faker.date.anytime().toISOString(),
    metadata: {
      byteSize: Number(faker.string.numeric(8)),
      contentType: faker.system.mimeType(),
    },
  };
};

/**
 * Generates random pagination data.
 *
 * @returns {object} A random pagination object.
 */
export const generatePagination = (
  currentPage: number,
  totalResults: number,
  resultsPerPage: number = 10,
): DprPagination => {
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  return {
    resultsPerPage,
    currentPage: Number(currentPage),
    totalPages,
    totalItems: totalResults,
  };
};

/**
 * Generates an array of results using a callback function.
 *
 * @param {number} n - The maximum number of results to generate.
 * @param {function} callback - The callback function to generate each result.
 * @param {boolean} [noZero=false] - Whether to ensure at least one result is generated.
 * @returns {T[]} An array of generated results.
 */
export const generateNResults = <T>(n: number, callback: { (): T }): T[] => {
  const results: T[] = [];
  for (let i = 0; i < n; i++) {
    results.push(callback());
  }
  return results;
};

/**
 * Generates a random DPR application object.
 *
 * @returns {DprPlanningApplication} A random DPR application object.
 */
export const generateDprApplication = ({
  applicationType,
  applicationStatus,
  decision,
  appeal,
  consultationStartDate,
  consultationEndDate,
}: {
  applicationType?: ApplicationType;
  applicationStatus?: DprPlanningApplication["application"]["status"];
  decision?: string | null;
  appeal?: DprPlanningApplication["data"]["appeal"];
  consultationStartDate?: Date;
  consultationEndDate?: Date;
} = {}): DprPlanningApplication => {
  const applicationTypes = Object.values(validApplicationTypes).flat();
  applicationType =
    applicationType ?? faker.helpers.arrayElement(applicationTypes);

  const primaryApplicationType = getPrimaryApplicationTypeKey(applicationType);

  applicationStatus =
    applicationStatus ??
    faker.helpers.arrayElement([
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
    ]);

  decision =
    decision === null || (decision && decision?.length > 0)
      ? decision
      : faker.helpers.arrayElement(["refused", "granted"]);

  const startDate = consultationStartDate
    ? consultationStartDate
    : faker.date.anytime();
  const endDate = consultationEndDate
    ? consultationEndDate
    : new Date(startDate.getTime() + 21 * 24 * 60 * 60 * 1000); // Add 21 days
  const now = new Date();
  if (now >= startDate && now <= endDate) {
    decision = null;
  }

  const determinedAt =
    decision !== null ? faker.date.anytime().toISOString() : null;

  const appealObject = {
    reason:
      "We don't believe the council took into consideration the environmental impact alleviation approach during their assessment.",
    lodgedDate: formatDateToYmd(faker.date.anytime()),
    validatedDate: formatDateToYmd(faker.date.anytime()),
    startedDate: formatDateToYmd(faker.date.anytime()),
    decisionDate: formatDateToYmd(faker.date.anytime()),
    decision: "allowed",
    files: generateNResults<DprDocument>(2, generateDocument),
  };

  if (
    [
      "Appeal lodged",
      "Appeal valid",
      "Appeal started",
      "Appeal determined",
      "Appeal allowed",
      "Appeal dismissed",
      "Appeal split decision",
      "Appeal withdrawn",
    ].includes(applicationStatus)
  ) {
    appeal = appealObject;

    if (applicationStatus === "Appeal lodged") {
      const {
        validatedDate,
        startedDate,
        decisionDate,
        decision,
        ...appealLodged
      } = appealObject;
      appeal = appealLodged;
    }
    if (applicationStatus === "Appeal valid") {
      const { startedDate, decisionDate, decision, ...appealValid } =
        appealObject;
      appeal = appealValid;
    }
    if (applicationStatus === "Appeal started") {
      const { decisionDate, decision, ...appealStarted } = appealObject;
      appeal = appealStarted;
    }

    if (
      [
        "Appeal determined",
        "Appeal allowed",
        "Appeal dismissed",
        "Appeal split decision",
        "Appeal withdrawn",
      ].includes(applicationStatus)
    ) {
      const statusMap: Record<string, AppealDecision> = {
        "Appeal allowed": "allowed",
        "Appeal dismissed": "dismissed",
        "Appeal split decision": "splitDecision",
        "Appeal withdrawn": "withdrawn",
      };
      appeal.decision = statusMap[applicationStatus] ?? "allowed";
    }
  }

  return {
    applicationType,
    data: {
      localPlanningAuthority: {
        commentsAcceptedUntilDecision:
          primaryApplicationType === "ldc" ? true : false,
      },
      appeal,
    },
    application: {
      reference: generateReference(),
      status: applicationStatus,
      consultation: {
        startDate: formatDateToYmd(startDate),
        endDate: formatDateToYmd(endDate),
        consulteeComments: generateNResults<DprComment>(50, generateComment),
        publishedComments: generateNResults<DprComment>(50, generateComment),
      },
      expiryDate: formatDateToYmd(faker.date.anytime()),
      receivedAt: faker.date.anytime().toISOString(),
      validAt: faker.date.anytime().toISOString(),
      publishedAt: faker.date.anytime().toISOString(),
      determinedAt: determinedAt,
      decision: decision,
    },
    property: {
      address: generateSiteAddress,
      boundary: {
        site: generateBoundaryGeoJson(),
        area: {
          squareMetres: faker.number.int({ min: 1000, max: 10000 }),
        },
      },
    },
    proposal: {
      description: faker.lorem.paragraphs({ min: 1, max: 10 }),
    },
    applicant: faker.helpers.arrayElement<BaseApplicant | Agent>([
      generateBaseApplicant,
      generateAgent,
    ]),
    officer: generateCaseOfficer,
  };
};

/**
 * Returns a random GeoJSON object.
 *
 * @returns {object} A random GeoJSON object.
 */
export const generateBoundaryGeoJson = (): DprBoundaryGeojson => {
  const options: DprBoundaryGeojson[] = [
    {
      type: "Feature",
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [-0.124237, 51.531031],
              [-0.124254, 51.531035],
              [-0.124244, 51.531054],
              [-0.124446, 51.531106],
              [-0.124565, 51.531158],
              [-0.124635, 51.531202],
              [-0.124683, 51.531244],
              [-0.124781, 51.531343],
              [-0.124775, 51.531349],
              [-0.124788, 51.531355],
              [-0.124811, 51.531338],
              [-0.124865, 51.531429],
              [-0.124896, 51.531543],
              [-0.124894, 51.531634],
              [-0.124865, 51.531732],
              [-0.124797, 51.531839],
              [-0.124719, 51.531917],
              [-0.124597, 51.532002],
              [-0.124457, 51.532068],
              [-0.124494, 51.532107],
              [-0.124021, 51.533144],
              [-0.123962, 51.533228],
              [-0.123996, 51.533234],
              [-0.123958, 51.533346],
              [-0.123866, 51.533559],
              [-0.123878, 51.533561],
              [-0.123849, 51.533633],
              [-0.123838, 51.533632],
              [-0.123828, 51.533649],
              [-0.123735, 51.533896],
              [-0.123719, 51.533893],
              [-0.123666, 51.534007],
              [-0.12365, 51.534004],
              [-0.123635, 51.534034],
              [-0.123653, 51.534037],
              [-0.123623, 51.534095],
              [-0.123677, 51.534106],
              [-0.12365, 51.534157],
              [-0.123606, 51.534148],
              [-0.123544, 51.534275],
              [-0.123536, 51.534487],
              [-0.123522, 51.534486],
              [-0.123523, 51.534572],
              [-0.123534, 51.534572],
              [-0.123532, 51.534621],
              [-0.123521, 51.534621],
              [-0.123519, 51.534682],
              [-0.12353, 51.534682],
              [-0.123519, 51.534716],
              [-0.123512, 51.534873],
              [-0.123502, 51.534921],
              [-0.123345, 51.534946],
              [-0.123217, 51.534951],
              [-0.122522, 51.534949],
              [-0.122467, 51.534927],
              [-0.122456, 51.535373],
              [-0.122512, 51.535374],
              [-0.122503, 51.535356],
              [-0.123415, 51.535075],
              [-0.123556, 51.535053],
              [-0.123697, 51.53502],
              [-0.123726, 51.535072],
              [-0.123757, 51.535088],
              [-0.124405, 51.534933],
              [-0.124354, 51.534893],
              [-0.12429, 51.534875],
              [-0.124601, 51.534799],
              [-0.124647, 51.534873],
              [-0.125119, 51.534758],
              [-0.125126, 51.534769],
              [-0.125187, 51.534768],
              [-0.125556, 51.53468],
              [-0.125578, 51.534673],
              [-0.125576, 51.534646],
              [-0.126013, 51.534597],
              [-0.126301, 51.534589],
              [-0.126319, 51.534535],
              [-0.126391, 51.534543],
              [-0.126433, 51.534408],
              [-0.126391, 51.534522],
              [-0.126374, 51.534534],
              [-0.126286, 51.534533],
              [-0.126256, 51.534537],
              [-0.126092, 51.53458],
              [-0.125958, 51.534573],
              [-0.125882, 51.534589],
              [-0.125801, 51.534591],
              [-0.125686, 51.534621],
              [-0.125665, 51.534615],
              [-0.125617, 51.534548],
              [-0.126337, 51.534324],
              [-0.126352, 51.534341],
              [-0.126372, 51.534347],
              [-0.126432, 51.534332],
              [-0.126457, 51.534337],
              [-0.126478, 51.534283],
              [-0.126907, 51.534163],
              [-0.12697, 51.534171],
              [-0.126952, 51.534152],
              [-0.12723, 51.53408],
              [-0.127205, 51.534017],
              [-0.127103, 51.53388],
              [-0.125965, 51.532396],
              [-0.125932, 51.532382],
              [-0.125823, 51.532275],
              [-0.125679, 51.532172],
              [-0.125621, 51.532109],
              [-0.125598, 51.532059],
              [-0.125587, 51.532],
              [-0.125588, 51.531947],
              [-0.125612, 51.531845],
              [-0.125597, 51.531743],
              [-0.125689, 51.531714],
              [-0.12546, 51.531421],
              [-0.125364, 51.531449],
              [-0.125368, 51.531538],
              [-0.12535, 51.531652],
              [-0.124988, 51.531217],
              [-0.124875, 51.53111],
              [-0.124496, 51.53071],
              [-0.124406, 51.530741],
              [-0.124346, 51.530779],
              [-0.124335, 51.530811],
              [-0.12437, 51.530825],
              [-0.124351, 51.530855],
              [-0.124238, 51.530876],
              [-0.12421, 51.530891],
              [-0.124206, 51.531005],
              [-0.12421, 51.531024],
              [-0.124237, 51.531031],
            ],
            [
              [-0.125691, 51.532473],
              [-0.125971, 51.532593],
              [-0.126069, 51.532646],
              [-0.125906, 51.532761],
              [-0.125738, 51.53269],
              [-0.125729, 51.532666],
              [-0.125516, 51.532594],
              [-0.125691, 51.532473],
            ],
            [
              [-0.12646, 51.533391],
              [-0.126251, 51.53349],
              [-0.125836, 51.53315],
              [-0.125897, 51.533136],
              [-0.126001, 51.533088],
              [-0.126063, 51.533086],
              [-0.126253, 51.53321],
              [-0.126371, 51.533305],
              [-0.12646, 51.533391],
            ],
            [
              [-0.12464, 51.534639],
              [-0.124109, 51.53477],
              [-0.124218, 51.534156],
              [-0.124171, 51.534152],
              [-0.124177, 51.534117],
              [-0.124224, 51.53412],
              [-0.124287, 51.533759],
              [-0.124362, 51.533597],
              [-0.124431, 51.533573],
              [-0.124432, 51.533566],
              [-0.124669, 51.533493],
              [-0.124746, 51.533597],
              [-0.124698, 51.533603],
              [-0.124765, 51.533819],
              [-0.124815, 51.533813],
              [-0.124814, 51.533827],
              [-0.124861, 51.533829],
              [-0.124795, 51.534221],
              [-0.124868, 51.534227],
              [-0.125021, 51.534214],
              [-0.125114, 51.534522],
              [-0.12464, 51.534639],
            ],
          ],
        ],
      },
      properties: {
        name: "",
        entity: 12000514271,
        prefix: "title-boundary",
        dataset: "title-boundary",
        "end-date": "",
        typology: "geography",
        reference: "54173614",
        "entry-date": "2024-05-06",
        "start-date": "2012-05-29",
        planx_user_action: "Accepted the title boundary",
        "organisation-entity": "13",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [-0.124237, 51.531031],
              [-0.124254, 51.531035],
              [-0.124244, 51.531054],
              [-0.124446, 51.531106],
              [-0.124565, 51.531158],
              [-0.124635, 51.531202],
              [-0.124683, 51.531244],
              [-0.124781, 51.531343],
              [-0.124775, 51.531349],
              [-0.124788, 51.531355],
              [-0.124811, 51.531338],
              [-0.124865, 51.531429],
              [-0.124896, 51.531543],
              [-0.124894, 51.531634],
              [-0.124865, 51.531732],
              [-0.124797, 51.531839],
              [-0.124719, 51.531917],
              [-0.124597, 51.532002],
              [-0.124457, 51.532068],
              [-0.124494, 51.532107],
              [-0.124021, 51.533144],
              [-0.123962, 51.533228],
              [-0.123996, 51.533234],
              [-0.123958, 51.533346],
              [-0.123866, 51.533559],
              [-0.123878, 51.533561],
              [-0.123849, 51.533633],
              [-0.123838, 51.533632],
              [-0.123828, 51.533649],
              [-0.123735, 51.533896],
              [-0.123719, 51.533893],
              [-0.123666, 51.534007],
              [-0.12365, 51.534004],
              [-0.123635, 51.534034],
              [-0.123653, 51.534037],
              [-0.123623, 51.534095],
              [-0.123677, 51.534106],
              [-0.12365, 51.534157],
              [-0.123606, 51.534148],
              [-0.123544, 51.534275],
              [-0.123536, 51.534487],
              [-0.123522, 51.534486],
              [-0.123523, 51.534572],
              [-0.123534, 51.534572],
              [-0.123532, 51.534621],
              [-0.123521, 51.534621],
              [-0.123519, 51.534682],
              [-0.12353, 51.534682],
              [-0.123519, 51.534716],
              [-0.123512, 51.534873],
              [-0.123502, 51.534921],
              [-0.123345, 51.534946],
              [-0.123217, 51.534951],
              [-0.122522, 51.534949],
              [-0.122467, 51.534927],
              [-0.122456, 51.535373],
              [-0.122512, 51.535374],
              [-0.122503, 51.535356],
              [-0.123415, 51.535075],
              [-0.123556, 51.535053],
              [-0.123697, 51.53502],
              [-0.123726, 51.535072],
              [-0.123757, 51.535088],
              [-0.124405, 51.534933],
              [-0.124354, 51.534893],
              [-0.12429, 51.534875],
              [-0.124601, 51.534799],
              [-0.124647, 51.534873],
              [-0.125119, 51.534758],
              [-0.125126, 51.534769],
              [-0.125187, 51.534768],
              [-0.125556, 51.53468],
              [-0.125578, 51.534673],
              [-0.125576, 51.534646],
              [-0.126013, 51.534597],
              [-0.126301, 51.534589],
              [-0.126319, 51.534535],
              [-0.126391, 51.534543],
              [-0.126433, 51.534408],
              [-0.126391, 51.534522],
              [-0.126374, 51.534534],
              [-0.126286, 51.534533],
              [-0.126256, 51.534537],
              [-0.126092, 51.53458],
              [-0.125958, 51.534573],
              [-0.125882, 51.534589],
              [-0.125801, 51.534591],
              [-0.125686, 51.534621],
              [-0.125665, 51.534615],
              [-0.125617, 51.534548],
              [-0.126337, 51.534324],
              [-0.126352, 51.534341],
              [-0.126372, 51.534347],
              [-0.126432, 51.534332],
              [-0.126457, 51.534337],
              [-0.126478, 51.534283],
              [-0.126907, 51.534163],
              [-0.12697, 51.534171],
              [-0.126952, 51.534152],
              [-0.12723, 51.53408],
              [-0.127205, 51.534017],
              [-0.127103, 51.53388],
              [-0.125965, 51.532396],
              [-0.125932, 51.532382],
              [-0.125823, 51.532275],
              [-0.125679, 51.532172],
              [-0.125621, 51.532109],
              [-0.125598, 51.532059],
              [-0.125587, 51.532],
              [-0.125588, 51.531947],
              [-0.125612, 51.531845],
              [-0.125597, 51.531743],
              [-0.125689, 51.531714],
              [-0.12546, 51.531421],
              [-0.125364, 51.531449],
              [-0.125368, 51.531538],
              [-0.12535, 51.531652],
              [-0.124988, 51.531217],
              [-0.124875, 51.53111],
              [-0.124496, 51.53071],
              [-0.124406, 51.530741],
              [-0.124346, 51.530779],
              [-0.124335, 51.530811],
              [-0.12437, 51.530825],
              [-0.124351, 51.530855],
              [-0.124238, 51.530876],
              [-0.12421, 51.530891],
              [-0.124206, 51.531005],
              [-0.12421, 51.531024],
              [-0.124237, 51.531031],
            ],
            [
              [-0.125691, 51.532473],
              [-0.125971, 51.532593],
              [-0.126069, 51.532646],
              [-0.125906, 51.532761],
              [-0.125738, 51.53269],
              [-0.125729, 51.532666],
              [-0.125516, 51.532594],
              [-0.125691, 51.532473],
            ],
            [
              [-0.12646, 51.533391],
              [-0.126251, 51.53349],
              [-0.125836, 51.53315],
              [-0.125897, 51.533136],
              [-0.126001, 51.533088],
              [-0.126063, 51.533086],
              [-0.126253, 51.53321],
              [-0.126371, 51.533305],
              [-0.12646, 51.533391],
            ],
            [
              [-0.12464, 51.534639],
              [-0.124109, 51.53477],
              [-0.124218, 51.534156],
              [-0.124171, 51.534152],
              [-0.124177, 51.534117],
              [-0.124224, 51.53412],
              [-0.124287, 51.533759],
              [-0.124362, 51.533597],
              [-0.124431, 51.533573],
              [-0.124432, 51.533566],
              [-0.124669, 51.533493],
              [-0.124746, 51.533597],
              [-0.124698, 51.533603],
              [-0.124765, 51.533819],
              [-0.124815, 51.533813],
              [-0.124814, 51.533827],
              [-0.124861, 51.533829],
              [-0.124795, 51.534221],
              [-0.124868, 51.534227],
              [-0.125021, 51.534214],
              [-0.125114, 51.534522],
              [-0.12464, 51.534639],
            ],
          ],
        ],
      },
      properties: {
        name: "",
        entity: 12000514271,
        prefix: "title-boundary",
        dataset: "title-boundary",
        "end-date": "",
        typology: "geography",
        reference: "54173614",
        "entry-date": "2024-05-06",
        "start-date": "2012-05-29",
        planx_user_action: "Accepted the title boundary",
        "organisation-entity": "13",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [-0.159706, 51.545376],
              [-0.159223, 51.545115],
              [-0.15913, 51.54518],
              [-0.159612, 51.545443],
              [-0.159706, 51.545376],
            ],
          ],
        ],
      },
      properties: {
        name: "",
        entity: 12000509759,
        prefix: "title-boundary",
        dataset: "title-boundary",
        "end-date": "",
        typology: "geography",
        reference: "49074380",
        "entry-date": "2023-12-12",
        "start-date": "2010-12-08",
        planx_user_action: "Accepted the title boundary",
        "organisation-entity": "13",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [-0.082375, 51.451423],
              [-0.082071, 51.451786],
              [-0.082162, 51.451815],
              [-0.082465, 51.451452],
              [-0.082375, 51.451423],
            ],
          ],
        ],
      },
      properties: {
        name: "",
        entity: 12000596619,
        prefix: "title-boundary",
        dataset: "title-boundary",
        enddate: "",
        typology: "geography",
        entrydate: "2024-05-06",
        reference: "37641594",
        startdate: "2001-11-24",
        planx_user_action: "Accepted the title boundary",
        organisationentity: 13,
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [-1.0206931342729486, 53.50213165258532],
              [-1.020646, 53.502065000000016],
              [-1.020719, 53.502047000000005],
              [-1.0206422209739665, 53.50198572771234],
              [-1.020557, 53.501923000000005],
              [-1.020433, 53.50195500000001],
              [-1.0205027461051923, 53.50206709121434],
              [-1.020549684762953, 53.50215722902928],
              [-1.0206931342729486, 53.50213165258532],
            ],
          ],
        ],
      },
      properties: {
        name: "",
        label: "1",
        entity: 12000365388,
        prefix: "title-boundary",
        dataset: "title-boundary",
        "end-date": "",
        typology: "geography",
        reference: "30240506",
        "entry-date": "2024-05-06",
        "start-date": "2009-12-10",
        "area.hectares": 0.026773,
        "area.squareMetres": 267.73,
        planx_user_action: "Amended the title boundary",
        "organisation-entity": "13",
      },
    },
  ];

  const randomIndex = faker.number.int({ min: 0, max: options.length - 1 });
  return options[randomIndex];
};

/**
 * Set of examples of standard applications using the  generateDprApplication method
 * @returns
 */
export const generateExampleApplications = (): Record<
  string,
  DprPlanningApplication
> => {
  const applicationType = "pp.full";
  const consultationStartDateInPast = new Date(
    new Date().getTime() - 100 * 24 * 60 * 60 * 1000,
  );

  // 01-submission
  // 02-validation-01-invalid

  // 03-consultation
  const consultation = generateDprApplication({
    applicationType: applicationType,
    applicationStatus: "in_assessment",
    consultationStartDate: new Date(),
  });

  // 04-assessment-00-assessment-in-progress
  const assessmentInProgress = generateDprApplication({
    applicationType: applicationType,
    applicationStatus: "in_assessment",
    decision: null,
    consultationStartDate: consultationStartDateInPast,
  });

  // 04-assessment-01-council-determined
  const planningOfficerDetermined = generateDprApplication({
    applicationType: applicationType,
    applicationStatus: "determined",
    decision: "granted",
    consultationStartDate: consultationStartDateInPast,
  });

  // 04-assessment-02-assessment-in-committee
  const assessmentInCommittee = generateDprApplication({
    applicationType: applicationType,
    applicationStatus: "in_committee",
    decision: null,
    consultationStartDate: consultationStartDateInPast,
  });

  // 04-assessment-03-committee-determined
  const committeeDetermined = generateDprApplication({
    applicationType: applicationType,
    applicationStatus: "determined",
    decision: "granted",
    consultationStartDate: consultationStartDateInPast,
  });

  // 05-appeal-00-appeal-lodged
  const appealLodged = generateDprApplication({
    applicationType: applicationType,
    applicationStatus: "Appeal lodged",
    decision: "refused",
    consultationStartDate: consultationStartDateInPast,
  });

  // 05-appeal-01-appeal-validated
  const appealValid = generateDprApplication({
    applicationType: applicationType,
    applicationStatus: "Appeal valid",
    decision: "refused",
    consultationStartDate: consultationStartDateInPast,
  });

  // 05-appeal-02-appeal-started
  const appealStarted = generateDprApplication({
    applicationType: applicationType,
    applicationStatus: "Appeal started",
    decision: "refused",
    consultationStartDate: consultationStartDateInPast,
  });

  // 05-appeal-03-appeal-determined
  const appealDetermined = generateDprApplication({
    applicationType: applicationType,
    applicationStatus: "Appeal determined",
    decision: "refused",
    consultationStartDate: consultationStartDateInPast,
  });
  const appealDeterminedWithdrawn = generateDprApplication({
    applicationType: applicationType,
    applicationStatus: "Appeal withdrawn",
    decision: "refused",
    consultationStartDate: consultationStartDateInPast,
  });
  const appealDeterminedAllowed = generateDprApplication({
    applicationType: applicationType,
    applicationStatus: "Appeal allowed",
    decision: "refused",
    consultationStartDate: consultationStartDateInPast,
  });
  const appealDeterminedDismissed = generateDprApplication({
    applicationType: applicationType,
    applicationStatus: "Appeal dismissed",
    decision: "refused",
    consultationStartDate: consultationStartDateInPast,
  });
  const appealDeterminedSplitDecision = generateDprApplication({
    applicationType: applicationType,
    applicationStatus: "Appeal split decision",
    decision: "refused",
    consultationStartDate: consultationStartDateInPast,
  });

  // 06-assessment-withdrawn
  const withdrawn = generateDprApplication({
    applicationType: applicationType,
    applicationStatus: "withdrawn",
    consultationStartDate: consultationStartDateInPast,
    decision: null,
  });

  // This wont exist in the new ODP schema
  // const closed = generateDprApplication({
  //   applicationType: applicationType,
  //   applicationStatus: "closed",
  //   consultationStartDate: consultationStartDateInPast,
  //   decision: null,
  // });

  return {
    consultation,
    assessmentInProgress,
    planningOfficerDetermined,
    assessmentInCommittee,
    committeeDetermined,
    appealLodged,
    appealValid,
    appealStarted,
    appealDetermined,
    appealDeterminedWithdrawn,
    appealDeterminedAllowed,
    appealDeterminedDismissed,
    appealDeterminedSplitDecision,
    withdrawn,
    // closed,
  };
};
