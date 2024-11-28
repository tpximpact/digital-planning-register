import {
  validApplicationTypes,
  getCommentsAllowed,
} from "@/lib/planningApplication";
import {
  DprPlanningApplication,
  DprComment,
  DprDocument,
  DprBoundaryGeojson,
  DprPagination,
} from "@/types";
import { ApplicationType } from "@/types/odp-types/schemas/prototypeApplication/enums/ApplicationType";
import { formatDateToYmd } from "@/util";

import { faker, fakerEN_GB } from "@faker-js/faker";

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
  currentPage?: number,
  totalResults?: number,
): DprPagination => {
  totalResults = totalResults ?? faker.number.int({ min: 10, max: 500 });
  const resultsPerPage = 10;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  currentPage =
    currentPage && (currentPage >= totalPages || currentPage <= totalPages)
      ? currentPage
      : faker.number.int({ min: 1, max: totalPages || 1 });

  const from = (currentPage - 1) * resultsPerPage + 1;
  const to = Math.min(currentPage * resultsPerPage, totalResults);
  const results = to - from + 1;

  return {
    // @todo something simpler
    // currentPage: Number(currentPage),
    // totalPages: totalPages,
    // itemsPerPage: resultsPerPage,
    // totalItems: totalResults,

    page: Number(currentPage),
    results: results,
    from: from,
    to: to,
    total_pages: totalPages,
    total_results: totalResults,
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
export const generateNResults = <T>(n: number, callback: { (): any }): T[] => {
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
}: {
  applicationType?: ApplicationType;
  applicationStatus?: string;
  decision?: string | null;
} = {}): DprPlanningApplication => {
  const applicationTypes = Object.values(validApplicationTypes).flat();
  applicationType =
    applicationType ?? faker.helpers.arrayElement(applicationTypes);

  applicationStatus =
    applicationStatus ??
    faker.helpers.arrayElement(["not_started", "determined", "in_assessment"]);

  decision =
    decision ?? faker.helpers.arrayElement(["refused", "granted", null]);

  const determinedAt =
    decision !== null ? faker.date.anytime().toISOString() : null;

  return {
    applicationType: applicationType,
    application: {
      reference: generateReference(),
      status: applicationStatus,
      consultation: {
        endDate: formatDateToYmd(faker.date.anytime()),
        consulteeComments: generateNResults<DprComment>(50, generateComment),
        publishedComments: generateNResults<DprComment>(50, generateComment),
        allowComments: getCommentsAllowed(applicationType),
      },
      receivedDate: formatDateToYmd(faker.date.anytime()),
      validDate: formatDateToYmd(faker.date.anytime()),
      publishedDate: formatDateToYmd(faker.date.anytime()),
      determinedAt: determinedAt,
      decision: decision,
      documents: [
        {
          url: "/camden/24-00135-HAPP/application-form",
          title: "Application form",
          metadata: {
            contentType: "text/html",
          },
        },
        ...generateNResults<DprDocument>(20, generateDocument),
      ],
    },
    property: {
      address: {
        singleLine: fakerEN_GB.location.streetAddress(true),
      },
      boundary: {
        site: generateBoundaryGeoJson(),
      },
    },
    proposal: {
      description: faker.lorem.paragraphs(),
    },
    applicant: {
      type: "company",
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
        type: "Polygon",
        coordinates: [
          [
            [-0.12685909867286713, 51.53386742058888],
            [-0.12680545449256933, 51.5338832710824],
            [-0.12684836983680758, 51.53393749641327],
            [-0.1265640556812292, 51.534023422574506],
            [-0.1264607906341559, 51.53387659719107],
            [-0.12671694159507793, 51.53376814631963],
            [-0.12676924467086834, 51.53375229578603],
            [-0.12685909867286713, 51.53386742058888],
          ],
        ],
      },
      properties: null,
    },
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
  ];

  const randomIndex = faker.number.int({ min: 0, max: options.length - 1 });
  return options[randomIndex];
};
