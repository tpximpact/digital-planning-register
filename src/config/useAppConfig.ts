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
