import { AppConfig, Council } from "@/config/types";

/**
 * Creates a default application configuration object with optional overrides.
 *
 * @param {Partial<AppConfig>} [overrides] - Optional overrides to apply to the default configuration.
 * @returns {AppConfig} - The application configuration object.
 *
 * @example
 * // Create a default configuration
 * const config = createAppConfig();
 *
 * @example
 * // Create a configuration with overrides
 * const config = createAppConfig({ councils: [{ slug: "custom-council", name: "Custom Council", dataSource: "", publicComments: false, specialistComments: false, visibility: "public" }] });
 */
export const createAppConfig = (
  council?: string,
  overrides?: Partial<AppConfig>,
): AppConfig => {
  const defaultCouncils: Council[] = [
    createCouncilConfig("Public Council 1", "public"),
    createCouncilConfig("Public Council 2", "public"),
    createCouncilConfig("Unlisted Council 1", "unlisted"),
    createCouncilConfig("Unlisted Council 2", "unlisted"),
    createCouncilConfig("Private Council 1", "private"),
    createCouncilConfig("Private Council 2", "private"),
  ];

  const getCouncil = (councilSlug: string): Council | undefined => {
    return (
      mergedCouncils.find(
        (councilConfig) => councilConfig.slug === councilSlug,
      ) ?? undefined
    );
  };

  const defaultConfig: AppConfig = {
    councils: defaultCouncils,
    council: council ? getCouncil(council) : undefined,
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
          ? getCouncil(council)?.isShowDSN ?? false
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

  const mergedCouncils =
    overrides?.councils?.map((overrideCouncil, index) => ({
      ...defaultCouncils[index],
      ...overrideCouncil,
    })) || defaultCouncils;

  return {
    ...defaultConfig,
    ...overrides,
    councils: mergedCouncils,
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
export const createCouncilConfig = (
  councilName: string,
  visibility?: Council["visibility"],
  dataSource?: Council["dataSource"],
  publicComments?: Council["publicComments"],
  specialistComments?: Council["specialistComments"],
  pageContent?: Council["pageContent"],
): Council => {
  const slug = councilName.toLowerCase().split(" ").join("-");
  const defaultPageContent = {
    privacy_policy: {
      privacy_policy_link: `${slug}-privacy-policy-link`,
    },
  };
  return {
    name: councilName,
    slug: slug,
    visibility: visibility ?? "public",
    dataSource: dataSource ?? "bops",
    publicComments: publicComments ?? true,
    specialistComments: specialistComments ?? true,
    pageContent: pageContent ?? defaultPageContent,
  };
};
