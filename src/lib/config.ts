import { Config, Council, SiteConfig } from "@/types";
import config from "../../util/config.json";

export const siteConfig: SiteConfig = {
  documentsPublicEndpoint: true,
};

export const updateCouncilConfig = (
  council: string,
  councilConfig: Council,
): Council => {
  const councilApiSelectable =
    "NEXT_PUBLIC_" + council.toUpperCase() + "_SELECTABLE";
  const councilApiKey = council.toUpperCase() + "_BOPS_API_KEY";
  const councilApiURL = council.toUpperCase() + "_BOPS_API_URL";

  const isSelectable =
    process.env[councilApiKey] && process.env[councilApiURL]
      ? process.env[councilApiSelectable] == "" ||
        !process.env[councilApiSelectable]
        ? "true"
        : process.env[councilApiSelectable]
      : "false";
  return {
    ...councilConfig,
    isSelectable,
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
