"use server";
import { ApiResponse, DprComment, DprDocument } from "@/types";
import { PrototypeApplication } from "@/types/odp-types/schemas/prototypeApplication";
import {
  generateBoundaryGeoJson,
  generateComment,
  generateDocument,
  generateNResults,
  generateReference,
} from "@mocks/dprApplicationFactory";
import { faker, fakerEN_GB } from "@faker-js/faker";
import {
  LandDrainageConsentApplicationType,
  LDCApplicationType,
  ListedApplicationType,
  PAApplicationType,
  PPApplicationType,
} from "@/types/odp-types/schemas/prototypeApplication/enums/ApplicationType";

const responseQuery = async (
  council: string,
  reference: string,
): Promise<ApiResponse<PrototypeApplication | null>> => {
  const application = await generateOdpPlanningApplication(council, reference);
  console.log(application);
  return {
    data: application,
    status: {
      code: 200,
      message: "",
    },
  };
};

export const dprOdpPrototypeApplication = (
  council: string,
  reference: string,
): Promise<ApiResponse<PrototypeApplication | null>> => {
  return Promise.resolve(responseQuery(council, reference));
};

/**
 * Generates a random ODP application object using the fields only relevant to the DPR.
 *
 * @returns {Application} A random ODP application object.
 */
export const generateOdpPlanningApplication = (
  council: string,
  reference: string,
): PrototypeApplication => {
  /**
   * we've only developed support for LDCApplicationType, PPApplicationType, PAApplicationType so far
   * @returns
   */
  const getRandomApplicationType = ():
    | LandDrainageConsentApplicationType
    | LDCApplicationType
    | ListedApplicationType
    | PAApplicationType
    | PPApplicationType => {
    const types = ["LDC", "PA", "PP", "Listed", "LandDrainageConsent"];
    const typeOptions = {
      LDC: [
        "ldc",
        "ldc.breachOfCondition",
        "ldc.existing",
        "ldc.listedBuildingWorks",
        "ldc.proposed",
      ],
      PA: [
        "pa",
        "pa.part1.classA",
        "pa.part1.classAA",
        "pa.part3.classG",
        "pa.part3.classM",
        "pa.part3.classMA",
        "pa.part3.classN",
        "pa.part3.classQ",
        "pa.part3.classR",
        "pa.part3.classS",
        "pa.part3.classT",
        "pa.part3.classV",
        "pa.part4.classBB",
        "pa.part4.classBC",
        "pa.part4.classCA",
        "pa.part4.classE",
        "pa.part6",
        "pa.part6.classA",
        "pa.part6.classB",
        "pa.part6.classE",
        "pa.part7.classC",
        "pa.part7.classM",
        "pa.part9.classD",
        "pa.part11.classB",
        "pa.part14.classA",
        "pa.part14.classB",
        "pa.part14.classJ",
        "pa.part14.classK",
        "pa.part14.classOA",
        "pa.part16.classA",
        "pa.part17",
        "pa.part17.classB",
        "pa.part17.classC",
        "pa.part17.classG",
        "pa.part18.classA",
        "pa.part19.classTA",
        "pa.part20.classA",
        "pa.part20.classAA",
        "pa.part20.classAB",
        "pa.part20.classAC",
        "pa.part20.classAD",
        "pa.part20.classZA",
      ],
      PP: [
        "pp",
        "pp.full",
        "pp.full.advertConsent",
        "pp.full.demolition",
        "pp.full.fastTrack.affordable",
        "pp.full.householder",
        "pp.full.householder.listed",
        "pp.full.householder.retro",
        "pp.full.major",
        "pp.full.major.technicalDetails",
        "pp.full.major.technicalDetails.waste",
        "pp.full.major.waste",
        "pp.full.minor",
        "pp.full.minor.listed",
        "pp.full.minor.technicalDetails",
        "pp.mineralExtraction",
        "pp.outline",
        "pp.outline.all",
        "pp.outline.some",
        "pp.outline.minor",
        "pp.outline.minor.all",
        "pp.outline.minor.some",
        "pp.outline.major",
        "pp.outline.major.all",
        "pp.outline.major.all.waste",
        "pp.outline.major.some",
        "pp.outline.major.some.waste",
        "pp.pip",
      ],
      Listed: ["listed"],
      LandDrainageConsent: ["landDrainageConsent"],
    };

    const randomType = types[Math.floor(Math.random() * types.length)];
    const option =
      typeOptions[randomType][
        Math.floor(Math.random() * typeOptions[randomType].length)
      ];

    return option;
  };

  const application: PrototypeApplication = {
    applicationType: getRandomApplicationType(),
    data: {
      application: {
        // reference: generateReference(),
      },
      applicant: {
        type: "individual",
        name: {
          first: faker.person.firstName(),
          last: faker.person.lastName(),
        },
        email: "",
        phone: {
          primary: "",
        },
        address: {
          sameAsSiteAddress: true,
        },
        siteContact: {
          role: "proxy",
        },
        agent: {
          name: {
            first: faker.person.firstName(),
            last: faker.person.lastName(),
          },
          email: "",
          phone: {
            primary: "",
          },
          address: {
            line1: "",
            town: "London",
            postcode: "",
          },
        },
      },
      property: {
        address: {
          latitude: 0,
          longitude: -0,
          x: 0,
          y: 0,
          title: "",
          singleLine: fakerEN_GB.location.streetAddress(true),
          source: "Ordnance Survey",
          uprn: "",
          usrn: "",
          pao: "",
          street: "",
          town: "",
          postcode: "",
        },
        boundary: {
          site: generateBoundaryGeoJson(),
          area: {
            squareMetres: 0,
          },
        },
        localAuthorityDistrict: ["Lambeth"],
        region: "London",
        type: "residential.dwelling.house.terrace",
      },
      proposal: {
        projectType: ["extend.roof.dormer"],
        description: faker.lorem.paragraphs(),
      },
    },
    responses: [],
    files: [
      {
        url: "/camden/24-00135-HAPP/application-form",
        title: "Application form",
        metadata: {
          contentType: "text/html",
        },
      },
      ...generateNResults<DprDocument>(20, generateDocument),
    ],
    missing: {
      status: faker.helpers.arrayElement([
        "not_started",
        "determined",
        "in_assessment",
      ]),
      consultation: {
        endDate: faker.date.anytime().toISOString(),
        consulteeComments: generateNResults<DprComment>(50, generateComment),
        publishedComments: generateNResults<DprComment>(50, generateComment),
      },
      receivedAt: faker.date.anytime().toISOString(),
      validAt: faker.date.anytime().toISOString(),
      publishedAt: faker.date.anytime().toISOString(),
      determinedAt: faker.date.anytime().toISOString(),
      decision: faker.helpers.arrayElement(["refused", "granted", null]),
      id: Number(faker.string.numeric(4)),
    },
  };

  return application;
};
