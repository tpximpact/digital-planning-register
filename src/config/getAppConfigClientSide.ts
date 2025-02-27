/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

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
