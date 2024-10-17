"use server";

import { AppConfig, Council, CouncilVisibility } from "@/types";

/**
 * Return app config
 * @param council
 * @returns AppConfig
 */
export const getAppConfig = async (council?: string): Promise<AppConfig> => {
  const councilConfigs = getAllCouncilConfigs();
  const councilConfig = council
    ? getCouncilConfig(council, councilConfigs)
    : null;
  const validCouncils = getCouncilList(councilConfigs);
  if (council && !validCouncils.includes(council)) {
    council = undefined;
  }

  return {
    council: councilConfig,
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
        showCondition: councilConfig?.isShowDSN ?? false,
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

/**
 * Return all council configs
 * @returns Council[]
 */
const getAllCouncilConfigs = (): Council[] => {
  return councils.map((council) => {
    const councilVisibility = determineCouncilVisibility(council);
    return { ...councilVisibility, council };
  });
};

/**
 * Returns the config for the given council
 * @param council
 * @param councilConfigs
 * @returns Council | null
 */
const getCouncilConfig = (
  council: string,
  councilConfigs: Council[],
): Council | null => {
  const validCouncils = getCouncilList(councilConfigs);
  if (council && !validCouncils.includes(council)) {
    return null;
  }

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
  const overrideVisibility = process.env[`${slug.toUpperCase()}_VISIBILITY`];
  let visibility = (overrideVisibility || configVisibility) ?? "private";
  if (
    !process.env[`${slug.toUpperCase()}_BOPS_API_KEY`] ||
    !process.env[`${slug.toUpperCase()}_BOPS_API_URL`]
  ) {
    visibility = "private";
  }

  if (["public", "private", "unlisted"].includes(visibility)) {
    councilConfig.visibility = visibility as CouncilVisibility;
  }
  return councilConfig;
};

/**
 * Returns an array with all the council names in lowercase
 * @param councilConfigs
 * @returns string[]
 */
const getCouncilList = (councilConfigs: Council[]) => {
  return councilConfigs.map((council) => council.name.toLowerCase());
};

/**
 * Return council configs
 */
const councils: Council[] = [
  {
    name: "Barnet",
    slug: "barnet",
    logo: "barnetlogo.svg",
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    isShowDSN: false,
    visibility: "public",
    pageContent: {
      privacy_policy: {
        privacy_policy_link:
          "https://www.barnet.gov.uk/your-council/policies-plans-and-performance/privacy-notices",
      },
    },
  },
  {
    name: "Buckinghamshire",
    slug: "uckinghamshire",
    logo: "buckinghamshirelogo.svg",
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    isShowDSN: false,
    visibility: "public",
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
    contact: "https://www.camden.gov.uk/contact-camden",
    logo: "camdenlogo.svg",
    logowhite: "camdenlogowhite.svg",
    dataSource: "bops",
    publicComments: true,
    specialistComments: false,
    isShowDSN: false,
    visibility: "public",
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
    logo: "gatesheadlogo.svg",
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    visibility: "public",
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
    logo: "lambethlogo.svg",
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    visibility: "public",
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
    logo: "southwarklogo.svg",
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    isShowDSN: false,
    visibility: "public",
    pageContent: {
      privacy_policy: {
        privacy_policy_link:
          "https://www.southwark.gov.uk/terms-and-disclaimer/corporate-data-privacy-notice",
      },
    },
  },
];
