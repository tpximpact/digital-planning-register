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

import { useEffect, useState } from "react";
import { AppConfig } from "@/config/types";
import { getAppConfigClientSide } from "@/config/getAppConfigClientSide";

/**
 * DEPRECATED
 * Hook for use in client components to get the appConfig without any nextjs drama - ha! 🙄
 * Avoid using this and pass the required data as a prop if you can as it does not respect the rules of council visibility.
 *
 * @param {string} [council] - The council identifier.
 * @returns {AppConfig | undefined} - The application configuration or undefined if not yet loaded.
 * @deprecated
 *
 * @example
 * // Usage example
 * const appConfig = useAppConfig("council1");
 */
const useAppConfig = (council?: string) => {
  const [appConfig, setAppConfig] = useState<AppConfig | undefined>(undefined);

  useEffect(() => {
    const fetchConfig = async () => {
      const appConfig = await getAppConfigClientSide(council);
      setAppConfig(appConfig);
    };

    fetchConfig();
  }, [council]);

  return appConfig;
};

export default useAppConfig;
