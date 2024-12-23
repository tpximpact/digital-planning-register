import { AppConfig, Council } from "@/config/types";
import { slugify } from "@/util";

/**
 * Test councils
 * Use these alongside these env vars to test different council visibility
 *
 * PUBLIC_OVERWRITTEN_BOPS_API_KEY=BLAH
 * PUBLIC_OVERWRITTEN_BOPS_API_URL=BLAH
 * PUBLIC_OVERWRITTEN_VISIBILITY=private
 *
 * # keep commented out - leaving here for reference
 * #PUBLIC_NO_ENV_VARS_BOPS_API_KEY=BLAH
 * #PUBLIC_NO_ENV_VARS_BOPS_API_URL=BLAH
 *
 * PUBLIC_COUNCIL_1_BOPS_API_KEY=blah
 * PUBLIC_COUNCIL_1_BOPS_API_URL=blah
 *
 * PUBLIC_COUNCIL_2_BOPS_API_KEY=blah
 * PUBLIC_COUNCIL_2_BOPS_API_URL=blah
 *
 * UNLISTED_COUNCIL_1_BOPS_API_KEY=blah
 * UNLISTED_COUNCIL_1_BOPS_API_URL=blah
 *
 * UNLISTED_COUNCIL_2_BOPS_API_KEY=blah
 * UNLISTED_COUNCIL_2_BOPS_API_URL=blah
 *
 * PRIVATE_COUNCIL_1_BOPS_API_KEY=blah
 * PRIVATE_COUNCIL_1_BOPS_API_URL=blah
 *
 * PRIVATE_COUNCIL_2_BOPS_API_KEY=blah
 * PRIVATE_COUNCIL_2_BOPS_API_URL=blah
 *
 * This will give you a public, private and unlisted council
 * It will also give you a public council with visibility overwritten (public overwritten)
 * It will also give you a public council with no env vars (public no env vars) that is set to public in the config but which should then default to private
 *
 */

/**
 * Creates a default application configuration object
 *
 * @returns {AppConfig} - The application configuration object.
 *
 * @example
 * // Create a default configuration
 * const config = createAppConfig();
 *
 */
export const createAppConfig = (council?: string): AppConfig => {
  const councilConfigs = getDefaultCouncilConfigs();
  const validCouncils = councilConfigs
    .map(
      (council) =>
        council.slug ?? council.name.toLowerCase().split(" ").join("-"),
    )
    .filter(Boolean);
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
      getApplicantDetailsFromPrivateEndpoint: true,
      getApplicationIdFromPrivateEndpoint: true,
    },
    defaults: {
      resultsPerPage: 10,
      revalidate: 3600,
    },
    navigation: [
      {
        label: "Application search",
        href: "",
        showCondition: true,
        councilBase: true,
      },
      {
        id: "dsn",
        label: "Digital site notice",
        href: "/digital-site-notice",
        showCondition: false,
        councilBase: true,
      },
      {
        label: "Help",
        href: "/planning-process",
        showCondition: true,
        councilBase: true,
      },
    ],
  };
};

/**
 * Creates a council configuration object.
 *
 * @param {string} councilName - The name of the council.
 * @param {Council["visibility"]} [visibility] - The visibility of the council (public or private).
 * @param {Council["dataSource"]} [dataSource] - The data source for the council.
 * @param {Council["publicComments"]} [publicComments] - Whether public comments are allowed.
 * @param {Council["specialistComments"]} [specialistComments] - Whether specialist comments are allowed.
 * @param {Council["pageContent"]} [pageContent] - The page content for the council.
 * @returns {Council} - The council configuration object.
 *
 * @example
 * // Create a council configuration with default values
 * const councilConfig = createCouncilConfig("Council 1");
 *
 * @example
 * // Create a council configuration with custom values
 * const councilConfig = createCouncilConfig("Council 1", "private", "customSource", false, false, { privacy_policy: { privacy_policy_link: "custom-link" } });
 */
export const createCouncilConfig = ({
  councilName,
  visibility = "public",
  dataSource = "local",
  publicComments = true,
  specialistComments = true,
  pageContent,
  features,
}: {
  councilName: string;
  visibility?: Council["visibility"];
  dataSource?: Council["dataSource"];
  publicComments?: Council["publicComments"];
  specialistComments?: Council["specialistComments"];
  pageContent?: Council["pageContent"];
  features?: Council["features"];
}): Council => {
  const slug = slugify(councilName);
  const defaultPageContent = {
    privacy_policy: {
      privacy_policy_link: `${slug}-privacy-policy-link`,
    },
  };
  return {
    name: councilName,
    slug: slug,
    visibility,
    dataSource,
    publicComments,
    specialistComments,
    pageContent: pageContent ?? defaultPageContent,
    features,
  };
};

/**
 * Return all council configs - applies any filtering based on environment variables
 * @returns Council[]
 */
const getDefaultCouncilConfigs = (): Council[] => {
  return defaultCouncils;
};

const defaultCouncils: Council[] = [
  createCouncilConfig({
    councilName: "Public Council 1",
    visibility: "public",
    features: {
      dsn: true,
    },
  }),
  createCouncilConfig({
    councilName: "Public Council 2",
    visibility: "public",
    features: {
      logoInHeader: false,
    },
  }),
  createCouncilConfig({
    councilName: "Unlisted Council 1",
    visibility: "unlisted",
  }),
  createCouncilConfig({
    councilName: "Unlisted Council 2",
    visibility: "unlisted",
  }),
  createCouncilConfig({
    councilName: "Private Council 1",
    visibility: "private",
  }),
  createCouncilConfig({
    councilName: "Private Council 2",
    visibility: "private",
  }),
  createCouncilConfig({
    councilName: "Public overwritten",
    visibility: "public",
  }),
  createCouncilConfig({
    councilName: "Public no env vars",
    visibility: "public",
  }),
];
