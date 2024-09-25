import { Config, Council, SiteConfig, CouncilVisibility } from "@/types";
import config from "../../util/config.json";
import { configValitation } from "./configValidation";

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
  let { visibility: configVisibility } = councilConfig;
  const overrideVisibility = process.env[`${council.toUpperCase()}_VISIBILITY`];
  let visibility = (overrideVisibility || configVisibility) ?? "private";

  if (
    !process.env[`${council.toUpperCase()}_BOPS_API_KEY`] ||
    !process.env[`${council.toUpperCase()}_BOPS_API_URL`]
  ) {
    if (["public", "private", "unlisted"].includes(visibility)) {
      councilConfig.visibility = visibility as CouncilVisibility;
    }
  } else {
    councilConfig.visibility = "private";
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
