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
      getApplicationIdFromPrivateEndpoint: true,
      osMapProxyUrl: process.env.OS_MAP_PROXY_URL ?? undefined,
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
        label: "Help",
        href: "/help",
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
  const { visibility: configVisibility, slug } = councilConfig;

  const overrideVisibility =
    process.env[`${slug.toUpperCase().split("-").join("_")}_VISIBILITY`];
  let visibility = (overrideVisibility || configVisibility) ?? "private";

  if (councilConfig.dataSource === "bops") {
    if (
      !process.env[`${slug.toUpperCase().split("-").join("_")}_BOPS_API_KEY`] ||
      !process.env[`${slug.toUpperCase().split("-").join("_")}_BOPS_API_URL`]
    ) {
      visibility = "private";
    }
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
    contact: "https://www.barnet.gov.uk/your-council/contact-council",
    dataSource: "bops",
    publicComments: true,
    specialistComments: false,
    pageContent: {
      council_reference_submit_comment_personal_details: {
        contact_planning_advice_link:
          "https://www.barnet.gov.uk/your-council/contact-council",
        corporate_privacy_statement_link:
          "https://www.barnet.gov.uk/your-council/contact-council",
        planning_service_privacy_statement_link:
          "https://www.barnet.gov.uk/your-council/policies-plans-and-performance/privacy-notices",
      },
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
    contact: "https://www.buckinghamshire.gov.uk/your-council/contact-us/",
    dataSource: "bops",
    publicComments: true,
    specialistComments: true,
    pageContent: {
      council_reference_submit_comment_personal_details: {
        contact_planning_advice_link:
          "https://www.buckinghamshire.gov.uk/planning-and-building-control/contact-planning/",
        corporate_privacy_statement_link:
          "https://www.buckinghamshire.gov.uk/your-council/privacy/privacy-information-for-specific-services%20/",
        planning_service_privacy_statement_link:
          "https://www.buckinghamshire.gov.uk/your-council/privacy/privacy-information-for--specific-services/privacy--and-planning-policy-and-compliance/",
      },
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
    dataSource: "bops",
    publicComments: true,
    specialistComments: false,
    features: {
      logoInHeader: true,
    },
    currentLiveRegister:
      "https://planningrecords.camden.gov.uk/NECSWS/PlanningExplorer/GeneralSearch.aspx",
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
      email_alerts: {
        sign_up_for_alerts_link:
          "https://accountforms.camden.gov.uk/alert-web/select.xhtml?alertType=PLANNING",
      },
      help: {
        planning_process: {
          council_local_plan_link:
            "https://www.camden.gov.uk/camden-local-plan1",
        },
        concerns: {
          parking_link: "https://www.camden.gov.uk/parking",
          building_control_link: "https://www.camden.gov.uk/building-control",
          housing_repair_link:
            "https://www.camden.gov.uk/report-a-housing-repair",
          street_issues_link: "https://www.camden.gov.uk/report-street-issue",
          abandoned_vehicles_link:
            "https://www.camden.gov.uk/abandoned-vehicles",
          fly_tipping_link:
            "https://www.camden.gov.uk/fly-tipping-street-obstructions",
          noise_link: "https://www.camden.gov.uk/noise",
          licensing_link:
            "https://www.camden.gov.uk/complain-about-licensed-premises",
          apply_for_building_control_regularisation_link:
            "https://www.camden.gov.uk/apply-for-building-control-regularisation",
        },
      },
    },
  },
  {
    name: "Cavyshire Borough",
    slug: "cavyshire-borough",
    visibility: "private",
    contact: "https://planningregister.org/",
    dataSource: "local",
    publicComments: true,
    specialistComments: true,
    features: {
      logoInHeader: true,
    },
    pageContent: {
      privacy_policy: {
        privacy_policy_link: "https://planningregister.org/",
      },
    },
  },
  {
    name: "Gateshead",
    slug: "gateshead",
    visibility: "public",
    contact: "https://www.gateshead.gov.uk/article/18954/Contact-us",
    dataSource: "bops",
    publicComments: false,
    specialistComments: true,
    pageContent: {
      council_reference_submit_comment_pre_submission: {
        what_happens_to_your_comments_link:
          "https://www.gateshead.gov.uk/media/6694/material-planning-considerations/pdf/Material-Planning-Considerations.pdf?m=1521718867907",
      },
      council_reference_submit_comment_personal_details: {
        contact_planning_advice_link:
          "https://www.gateshead.gov.uk/article/19485/Send-an-enquiry-for-planning",
        corporate_privacy_statement_link:
          "https://www.gateshead.gov.uk/dataprotection",
        planning_service_privacy_statement_link:
          "https://www.gateshead.gov.uk/article/24369/Climate-Compliance-Planning-and-Transport-Privacy-Notice",
      },
      council_reference_submit_comment_check_answer: {
        contact_planning_advice_link:
          "https://www.gateshead.gov.uk/article/19485/Send-an-enquiry-for-planning",
        corporate_privacy_statement_link:
          "https://www.gateshead.gov.uk/dataprotection",
        planning_service_privacy_statement_link:
          "https://www.gateshead.gov.uk/article/24369/Climate-Compliance-Planning-and-Transport-Privacy-Notice",
      },
      privacy_policy: {
        privacy_policy_link:
          "https://www.gateshead.gov.uk/article/3711/Corporate-Privacy-Notice",
      },
      help: {
        planning_process: {
          council_local_plan_link:
            "https://www.gateshead.gov.uk/article/3001/Local-Plan",
        },
        concerns: {
          parking_link: "https://www.gateshead.gov.uk/article/4349/Car-parks ",
          building_control_link:
            "https://www.gateshead.gov.uk/article/11436/Tell-us-about-a-dangerous-building-or-structure",
          housing_repair_link: "https://www.gateshead.gov.uk/repairs",
          street_issues_link:
            "https://www.gateshead.gov.uk/article/17140/Report-a-problem-on-a-road-or-footpath",
          abandoned_vehicles_link:
            "https://www.gateshead.gov.uk/article/4508/Abandoned-vehicles",
          fly_tipping_link:
            "https://www.gateshead.gov.uk/article/3505/Fly-tipping",
          noise_link:
            "https://www.gateshead.gov.uk/article/8060/Report-a-noise-complaint",
          licensing_link:
            "https://www.gateshead.gov.uk/article/19395/Make-a-complaint-about-business-and-licensing",
          apply_for_building_control_regularisation_link:
            "https://www.gateshead.gov.uk/article/8474/Apply-for-building-regulations-approval",
        },
      },
    },
  },
  {
    name: "Lambeth",
    slug: "lambeth",
    visibility: "public",
    contact:
      "https://www.lambeth.gov.uk/about-council/contact-us/contact-details",
    dataSource: "bops",
    publicComments: true,
    specialistComments: false,
    pageContent: {
      council_reference_submit_comment_personal_details: {
        contact_planning_advice_link:
          "https://www.lambeth.gov.uk/planning-building-control/contact-planning-building-control-teams",
        corporate_privacy_statement_link:
          "https://www.lambeth.gov.uk/about-council/privacy-data-protection/privacy-notice",
        planning_service_privacy_statement_link:
          "https://www.lambeth.gov.uk/about-council/privacy-data-protection/climate-planning-transport-service-privacy-notice",
      },
      privacy_policy: {
        privacy_policy_link:
          "https://www.lambeth.gov.uk/about-council/privacy-data-protection?utm_source=footer&utm_campaign=privacy",
      },
      help: {
        planning_process: {
          council_local_plan_link:
            "https://www.lambeth.gov.uk/planning-building-control/planning-policy-guidance/lambeth-local-plan-2021",
        },
        concerns: {
          parking_link: "https://www.lambeth.gov.uk/parking",
          building_control_link:
            "https://www.lambeth.gov.uk/planning-building-control/building-control-regulations/report-dangerous-structure",
          housing_repair_link:
            "https://www.lambeth.gov.uk/housing/housing-repairs/tenants-repairs/request-housing-repair",
          street_issues_link:
            "https://www.lambeth.gov.uk/streets-roads-transport/streets-roads/report-highway-issue",
          abandoned_vehicles_link:
            "https://www.lambeth.gov.uk/parking/abandoned-vehicles/reporting-abandoned-vehicle",
          fly_tipping_link:
            "https://www.lambeth.gov.uk/rubbish-recycling/report-fly-tipping",
          noise_link:
            "https://www.lambeth.gov.uk/community-safety-anti-social-behaviour/noise-complaints",
          licensing_link:
            "https://www.lambeth.gov.uk/Business-rates-services-and-licensing/Licensing-and-permits/licensing-comments-and-complaints",
          apply_for_building_control_regularisation_link:
            "https://www.lambeth.gov.uk/planning-building-control/building-control-regulations/building-regulations/unauthorised-work",
        },
      },
    },
  },
  {
    name: "Medway",
    slug: "medway",
    visibility: "public",
    contact: "https://www.medway.gov.uk/contact",
    dataSource: "bops",
    publicComments: false,
    specialistComments: false,
    features: {
      logoInHeader: false,
    },
    pageContent: {
      council_reference_submit_comment_pre_submission: {
        what_happens_to_your_comments_link:
          "https://www.medway.gov.uk/info/200147/applying_for_planning_permission/124/comment_on_a_planning_application",
      },
      council_reference_submit_comment_personal_details: {
        contact_planning_advice_link:
          "https://www.medway.gov.uk/info/200133/planning/714/planning_service_privacy_statement/5",
        corporate_privacy_statement_link:
          "https://www.medway.gov.uk/info/200217/freedom_of_information/347/data_protection/1",
        planning_service_privacy_statement_link:
          "https://www.medway.gov.uk/info/200133/planning/714/planning_service_privacy_statement",
      },
      privacy_policy: {
        privacy_policy_link:
          "https://www.medway.gov.uk/info/200217/freedom_of_information/347/data_protection/1",
      },
      help: {
        planning_process: {
          council_local_plan_link:
            "https://www.medway.gov.uk/info/200149/planning_policy/146/current_planning_policies/3",
        },
        concerns: {
          parking_link:
            "https://www.medway.gov.uk/info/200136/parking_roads_travel",
          building_control_link:
            "https://www.medway.gov.uk/info/200148/reporting_planning_issues/132/building_control",
          housing_repair_link:
            "https://www.medway.gov.uk/info/200152/council_tenants/107/repairs_to_your_home#:~:text=You%20can%20request%20a%20repair,or%20freephone%200800%20073%200073",
          street_issues_link:
            "https://www.medway.gov.uk/info/200160/roads_and_pavements",
          abandoned_vehicles_link: "https://www.medway.gov.uk/NuisanceVehicle",
          fly_tipping_link:
            "https://www.medway.gov.uk/info/200176/report_a_problem/394/report_fly-tipping",
          noise_link:
            "https://www.medway.gov.uk/info/200176/report_a_problem/392/report_a_problem_with_noise",
          licensing_link:
            "https://www.medway.gov.uk/info/200193/licensed_premises/201/licensing_complaints",
          apply_for_building_control_regularisation_link:
            "https://www.stgbc.org.uk/services/building-control/#:~:text=of%20a%20sewer.-,Regularisation,-If%20works%20were",
        },
      },
    },
  },
  {
    name: "Southwark",
    slug: "southwark",
    visibility: "public",
    dataSource: "bops",
    publicComments: true,
    specialistComments: false,
    features: {
      logoInHeader: false,
    },
    pageContent: {
      privacy_policy: {
        privacy_policy_link:
          "https://www.southwark.gov.uk/terms-and-disclaimer/corporate-data-privacy-notice",
      },
    },
  },
];
