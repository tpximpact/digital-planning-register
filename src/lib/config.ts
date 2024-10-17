import { Config, Council, SiteConfig, CouncilVisibility } from "@/types";
// import config from "../../util/config.json";
// import { config } from "../config/councils";

export const siteConfig: SiteConfig = {
  documentsPublicEndpoint: true,
};

/**
 * function to update visibility in config json file
 * @param council
 * @param councilConfig
 * @returns
 */

export const updateCouncilConfig = (
  council: string,
  councilConfig: Council,
): Council => {
  console.log(councilConfig);
  let { visibility: configVisibility } = councilConfig;
  const overrideVisibility = process.env[`${council.toUpperCase()}_VISIBILITY`];

  console.log("overrideVisibility", overrideVisibility);
  console.log("configVisibility", configVisibility);
  let visibility = (overrideVisibility || configVisibility) ?? "private";
  console.log("visibility", visibility);
  if (
    !process.env[`${council.toUpperCase()}_BOPS_API_KEY`] ||
    !process.env[`${council.toUpperCase()}_BOPS_API_URL`]
  ) {
    visibility = "private";
  }

  if (["public", "private", "unlisted"].includes(visibility)) {
    councilConfig.visibility = visibility as CouncilVisibility;
  }

  return councilConfig;
};

/**
 * Helper function to get council config
 * @param council
 * @returns
 */
export const getCouncilConfig = (council: string): Council | undefined => {
  const councilConfig: Config = config as Config;
  console.log(config);
  console.log(councilConfig[council]);
  return councilConfig[council]
    ? updateCouncilConfig(council, councilConfig[council])
    : undefined;
};

/**
 * function to get each council in the config file and update visibility
 * @returns
 */
export const getConfig = async (): Promise<Config> => {
  const councilConfig: Config = config as Config;

  Object.keys(config).forEach((council) => {
    councilConfig[council] = updateCouncilConfig(
      council,
      councilConfig[council],
    );
  });
  return config as Config;
};

/**
 * Get the council data source
 * @param council
 * @returns
 */
export const getCouncilDataSource = (council: string): string => {
  const councilConfig = council && getCouncilConfig(council);
  return councilConfig ? councilConfig?.dataSource : "";
};
