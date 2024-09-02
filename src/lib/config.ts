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
    isSelectable:
      process.env[councilApi] == "" || !process.env[councilApi]
        ? "true"
        : process.env[councilApi],
    ...councilConfig,
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
