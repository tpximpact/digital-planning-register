import { Config, Council, SiteConfig } from "@/types";
import config from "../../util/config.json";

export const siteConfig: SiteConfig = {
  documentsPublicEndpoint: true,
};

/**
 * Helper function to get config
 * @returns
 */
export const getConfig = (): Config => {
  return config;
};

/**
 * Helper function to get council config
 * @param council
 * @returns
 */
export const getCouncilConfig = (council: string): Council | undefined => {
  const councilConfig: Config = config;

  return councilConfig[council] ? councilConfig[council] : undefined;
};
