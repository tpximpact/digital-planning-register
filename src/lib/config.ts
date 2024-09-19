import { Config, Council, SiteConfig } from "@/types";
import config from "../../util/config.json";

export const siteConfig: SiteConfig = {
  documentsPublicEndpoint: true,
};

export const updateCouncilConfig = (
  council: string,
  councilConfig: Council,
): Council => {
  const councilApi = "NEXT_PUBLIC_" + council.toUpperCase() + "_SELECTABLE";
  return {
    ...councilConfig,
    isSelectable:
      process.env[councilApi] == "" || !process.env[councilApi]
        ? "true"
        : process.env[councilApi],
  };
};

/**
 * Helper function to get council config
 * @param council
 * @returns
 */
export const getCouncilConfig = (council: string): Council | undefined => {
  const councilConfig: Config = config;
  return councilConfig[council]
    ? updateCouncilConfig(council, councilConfig[council])
    : undefined;
};

export const getConfig = async (): Promise<Config> => {
  const councilConfig: Config = config;

  Object.keys(config).forEach((council) => {
    councilConfig[council] = updateCouncilConfig(
      council,
      councilConfig[council],
    );
  });
  return config;
};
