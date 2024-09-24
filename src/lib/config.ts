import { Config, Council, SiteConfig } from "@/types";
import config from "../../util/config.json";
import { configValitation } from "./configValidation";

export const siteConfig: SiteConfig = {
  documentsPublicEndpoint: true,
};

type Visibility = "public" | "private" | "unlisted";

export const updateCouncilConfig = (
  council: string,
  councilConfig: Council,
): Council => {
  const councilApiVisibility = council.toUpperCase() + "_VISIBILITY";
  const validation = configValitation(council.toUpperCase());

  let visibility: Visibility = "public";
  if (validation) {
    if (
      process.env[councilApiVisibility] == "public" ||
      process.env[councilApiVisibility] == "private" ||
      process.env[councilApiVisibility] == "unlisted"
    ) {
      visibility = process.env[councilApiVisibility];
    }
  } else {
    visibility = "private";
  }
  return {
    ...councilConfig,
    visibility,
  };
};

/**
 * Helper function to get council config
 * @param council
 * @returns
 */
export const getCouncilConfig = (council: string): Council | undefined => {
  const councilConfig = config as Config;
  return councilConfig[council]
    ? updateCouncilConfig(council, councilConfig[council])
    : undefined;
};

export const getConfig = async (): Promise<Config> => {
  const councilConfig = config as Config;

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
