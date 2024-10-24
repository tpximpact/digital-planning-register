"use server";

import { getAppConfig } from ".";

/**
 * DEPRECATED
 * getAppConfigClientSide shim
 * Since our application is 99% server side rendered, this function should be avoided where possible but there are times where we may need it
 * eg comments for now
 * This setup ensures that our non NEXT_PUBLIC_ variables can be used in our config validation.
 * @param {string} [council] - The council identifier.
 * @returns {Promise<AppConfig>} - A promise that resolves to the application configuration.
 *
 * @example
 * // Usage example
 * const config = await getAppConfigClientSide("council1");
 *
 * @deprecated
 */
export const getAppConfigClientSide = async (council?: string | undefined) => {
  return getAppConfig(council);
};
