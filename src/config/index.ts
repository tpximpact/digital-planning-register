import "server-only";
import { createAppConfig } from "@mocks/appConfigFactory";
import { AppConfig, Council, CouncilVisibility } from "./types";

/**
 * Retrieves the application configuration for a given council.
 *
 * @param {string} [council] - The council identifier.
 * @returns {Promise<AppConfig>} - A promise that resolves to the application configuration.
 *
 * @example
 * // Usage example server side
 * const config = getAppConfig("council1");
 *
 *
 * @example
 * // Usage example client side
 * const config = await getAppConfig("council1");
 */
export const getAppConfig = (council?: string): AppConfig => {
  const councilConfigs = getAllCouncilConfigs();
  const validCouncils = getCouncilList(getValidCouncils(councilConfigs));
  if (council && !validCouncils.includes(council)) {
    council = undefined;
  }

  const getCouncil = (councilSlug: string): Council | undefined => {
    return (
      councilConfigs.find(
        (councilConfig) => councilConfig.slug === councilSlug,
      ) ?? undefined
    );
  };

  return {
    council: council ? getCouncil(council) : undefined,
    councils: councilConfigs,
    features: {
      documentsPublicEndpoint: true,
    },
    defaults: {
      resultsPerPage: 10,
      revalidate: 3600, // 1 hour
    },
    navigation: [
      {
        label: "Application search",
        href: "",
        councilBase: true,
        showCondition: true,
      },
      {
        id: "dsn",
        showCondition: false,
        label: "Digital site notice",
        href: "/digital-site-notice",
        councilBase: true,
      },
      {
        label: "Help",
        href: "/planning-process",
        councilBase: true,
        showCondition: true,
      },
    ],
  };
};

/**
 * Return all council configs - applies any filtering based on environment variables
 * @returns Council[]
 */
const getAllCouncilConfigs = (): Council[] => {
  let workingCouncils;
  if (process.env.TEST_COUNCILS) {
    workingCouncils = createAppConfig().councils;
  } else {
    workingCouncils = councils;
  }

  return workingCouncils.map((council) => {
    const councilVisibility = determineCouncilVisibility(council);
    return { ...councilVisibility, council };
  });
};

/**
 * Helper method to return the config for the given council - typically used to get the council config for the current council
 * @param council
 * @param councilConfigs
 * @returns Council | null
 */
export const getCouncilConfig = (
  council: string,
  councilConfigs: Council[],
): Council | undefined => {
  if (!council || !councilConfigs) return undefined;
  const councilConfig = councilConfigs.find(
    (councilConfig) => councilConfig.slug === council,
  );
  return councilConfig || undefined;
};

/**
 * There are various rules around determining visibility of councils this method determines the visibility of the council
 * @param councilConfig
 * @returns
 */
const determineCouncilVisibility = (councilConfig: Council) => {
  let { visibility: configVisibility, slug } = councilConfig;

  const overrideVisibility =
    process.env[`${slug.toUpperCase().split("-").join("_")}_VISIBILITY`];
  let visibility = (overrideVisibility || configVisibility) ?? "private";

  if (
    !process.env[`${slug.toUpperCase().split("-").join("_")}_BOPS_API_KEY`] ||
    !process.env[`${slug.toUpperCase().split("-").join("_")}_BOPS_API_URL`]
  ) {
    visibility = "private";
  }

  // console.log([
  //   [
  //     `${slug.toUpperCase().split("-").join("_")}_BOPS_API_KEY`,
  //     process.env[`${slug.toUpperCase().split("-").join("_")}_BOPS_API_KEY`],
  //   ],
  //   [
  //     `${slug.toUpperCase().split("-").join("_")}_BOPS_API_URL`,
  //     process.env[`${slug.toUpperCase().split("-").join("_")}_BOPS_API_URL`],
  //   ],
  //   [
  //     `${slug.toUpperCase().split("-").join("_")}_VISIBILITY`,
  //     process.env[`${slug.toUpperCase().split("-").join("_")}_VISIBILITY`],
  //   ],
  //   ["configVisibility", configVisibility],
  //   ["overrideVisibility", overrideVisibility],
  //   ["visibility", visibility],
  // ]);

  if (["public", "private", "unlisted"].includes(visibility)) {
    councilConfig.visibility = visibility as CouncilVisibility;
  }

  return councilConfig;
};

/**
 * Returns an array with all the council slugs.
 *
 * @param {Council[]} councilConfigs - An array of council configurations.
 * @returns {string[]} - An array of council slugs.
 *
 * @example
 * // Usage example
 * const councilSlugs = getCouncilList([
 *   { slug: "council1", name: "Council 1", dataSource: "", publicComments: false, specialistComments: false, visibility: "public" },
 *   { slug: "council2", name: "Council 2", dataSource: "", publicComments: false, specialistComments: false, visibility: "private" },
 * ]);
 * // Returns ["council1", "council2"]
 */
export const getCouncilList = (councilConfigs: Council[]) => {
  return councilConfigs
    .map(
      (council) =>
        council.slug ?? council.name.toLowerCase().split(" ").join("-"),
    )
    .filter(Boolean);
};

/**
 * Filters out councils with "private" visibility.
 *
 * @param {Council[]} councilConfigs - Array of council configurations.
 * @returns {Council[]} Array of councils with "public" visibility.
 */
const getValidCouncils = (councilConfigs: Council[]) => {
  return councilConfigs.filter((council) => council.visibility !== "private");
};

/**
 * Return council configs
 */
const councils: Council[] = [
  {
    name: "Barnet",
    slug: "barnet",
    visibility: "public",
    showLogoHeader: true,
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    pageContent: {
      privacy_policy: {
        privacy_policy_link:
          "https://www.barnet.gov.uk/your-council/policies-plans-and-performance/privacy-notices",
      },
    },
  },
  {
    name: "Buckinghamshire",
    slug: "buckinghamshire",
    visibility: "public",
    showLogoHeader: true,
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    pageContent: {
      privacy_policy: {
        privacy_policy_link:
          "https://www.buckinghamshire.gov.uk/your-council/privacy/privacy-policy/",
      },
    },
  },
  {
    name: "Camden",
    slug: "camden",
    visibility: "public",
    showLogoHeader: true,
    contact: "https://www.camden.gov.uk/contact-camden",
    dataSource: "bops",
    publicComments: true,
    specialistComments: false,
    features: {
      dsn: false,
    },
    pageContent: {
      council_reference_submit_comment_pre_submission: {
        what_happens_to_your_comments_link:
          "https://www.camden.gov.uk/commenting-planning-application",
      },
      council_reference_submit_comment_personal_details: {
        contact_planning_advice_link:
          "https://www.camden.gov.uk/contact-planning-advice-and-information-service",
        corporate_privacy_statement_link:
          "https://www.camden.gov.uk/data-protection-privacy-and-cookies",
        planning_service_privacy_statement_link:
          "https://www.camden.gov.uk/documents/20142/2247044/Privacy+Notice_regenerationandplanning+-+updated+May19.pdf/23506373-1b95-2cc5-55b2-55897cfe4b42",
      },
      council_reference_submit_comment_check_answer: {
        contact_planning_advice_link:
          "https://www.camden.gov.uk/contact-planning-advice-and-information-service",
        corporate_privacy_statement_link:
          "https://www.camden.gov.uk/data-protection-privacy-and-cookies",
        planning_service_privacy_statement_link:
          "https://www.camden.gov.uk/documents/20142/2247044/Privacy+Notice_regenerationandplanning+-+updated+May19.pdf/23506373-1b95-2cc5-55b2-55897cfe4b42",
      },
      privacy_policy: {
        privacy_policy_link:
          "https://www.camden.gov.uk/data-protection-privacy-and-cookies",
      },
      digital_site_notice: {
        sign_up_for_alerts_link:
          "https://accountforms.camden.gov.uk/alert-web/select.xhtml?alertType=PLANNING",
      },
    },
  },
  {
    name: "Gateshead",
    slug: "gateshead",
    visibility: "public",
    showLogoHeader: true,
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    pageContent: {
      privacy_policy: {
        privacy_policy_link:
          "https://www.gateshead.gov.uk/article/3711/Corporate-Privacy-Notice",
      },
    },
  },
  {
    name: "Lambeth",
    slug: "lambeth",
    visibility: "public",
    showLogoHeader: true,
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    pageContent: {
      privacy_policy: {
        privacy_policy_link:
          "https://www.lambeth.gov.uk/about-council/privacy-data-protection?utm_source=footer&utm_campaign=privacy",
      },
    },
  },
  {
    name: "Medway",
    slug: "medway",
    visibility: "public",
    showLogoHeader: false,
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    pageContent: {
      privacy_policy: {
        privacy_policy_link:
          "https://www.medway.gov.uk/info/200217/freedom_of_information/347/data_protection/1",
      },
    },
  },
  {
    name: "Southwark",
    slug: "southwark",
    visibility: "public",
    showLogoHeader: true,
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    pageContent: {
      privacy_policy: {
        privacy_policy_link:
          "https://www.southwark.gov.uk/terms-and-disclaimer/corporate-data-privacy-notice",
      },
    },
  },
];
