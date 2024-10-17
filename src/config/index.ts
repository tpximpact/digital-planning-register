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
  const validCouncils = getCouncilList(councilConfigs);
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
    },
    navigation: [
      {
        label: "Application search",
        href: "",
        showCondition: true,
        councilBase: true,
      },
      {
        label: "Digital site notice",
        href: "/digital-site-notice",
        showCondition: council
          ? (getCouncil(council)?.isShowDSN ?? false)
          : false,
        councilBase: true,
      },
      {
        label: "Understanding planning",
        href: "/planning-process",
        showCondition: true,
        councilBase: true,
      },
    ],
  };
};

export const testAppConfig = (appConfig: AppConfig) => {
  let testArr: string[] = [];
  appConfig.councils.map((council) => {
    testArr.push(`${council.name}, ${council.slug}, ${council.visibility}`);
  });
  console.log("testAppConfig");
  // console.log(testArr);
  return testArr;
};

/**
 * Return all council configs - applies any filtering based on environment variables
 * @returns Council[]
 */
const getAllCouncilConfigs = (): Council[] => {
  return councils.map((council) => {
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
): Council | null => {
  if (!council) return null;
  const councilConfig = councilConfigs.find(
    (councilConfig) => councilConfig.name.toLowerCase() === council,
  );
  return councilConfig || null;
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
 * Return council configs
 */
const councils: Council[] = [
  {
    name: "Public overwritten",
    slug: "public-overwritten",
    visibility: "public",
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    isShowDSN: false,
    pageContent: {
      privacy_policy: {
        privacy_policy_link:
          "https://www.barnet.gov.uk/your-council/policies-plans-and-performance/privacy-notices",
      },
    },
  },
  {
    name: "Public no env vars",
    slug: "public-no-env-vars",
    visibility: "public",
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    isShowDSN: false,
    pageContent: {
      privacy_policy: {
        privacy_policy_link:
          "https://www.barnet.gov.uk/your-council/policies-plans-and-performance/privacy-notices",
      },
    },
  },
  {
    name: "Public",
    slug: "public",
    visibility: "public",
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    isShowDSN: false,
    pageContent: {
      privacy_policy: {
        privacy_policy_link:
          "https://www.barnet.gov.uk/your-council/policies-plans-and-performance/privacy-notices",
      },
    },
  },
  {
    name: "Unlisted",
    slug: "unlisted",
    visibility: "unlisted",
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    isShowDSN: false,
    pageContent: {
      privacy_policy: {
        privacy_policy_link:
          "https://www.barnet.gov.uk/your-council/policies-plans-and-performance/privacy-notices",
      },
    },
  },
  {
    name: "Private",
    slug: "private",
    visibility: "private",
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    isShowDSN: false,
    pageContent: {
      privacy_policy: {
        privacy_policy_link:
          "https://www.barnet.gov.uk/your-council/policies-plans-and-performance/privacy-notices",
      },
    },
  },
  {
    name: "Barnet",
    slug: "barnet",
    visibility: "public",
    logo: "barnetlogo.svg",
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    isShowDSN: false,
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
    logo: "buckinghamshirelogo.svg",
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    isShowDSN: false,
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
    contact: "https://www.camden.gov.uk/contact-camden",
    logo: "camdenlogo.svg",
    logowhite: "camdenlogowhite.svg",
    dataSource: "bops",
    publicComments: true,
    specialistComments: false,
    isShowDSN: true,
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
    logo: "gatesheadlogo.svg",
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
    logo: "lambethlogo.svg",
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
    name: "Southwark",
    slug: "southwark",
    visibility: "public",
    logo: "southwarklogo.svg",
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    isShowDSN: false,
    pageContent: {
      privacy_policy: {
        privacy_policy_link:
          "https://www.southwark.gov.uk/terms-and-disclaimer/corporate-data-privacy-notice",
      },
    },
  },
];
