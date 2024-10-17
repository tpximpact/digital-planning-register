import { useEffect, useState } from "react";
import { getAppConfig } from "@/config";
import { AppConfig } from "@/types";

/**
 * Hook for use in client components to get the appConfig without any nextjs drama - ha! 🙄
 * @param council
 * @returns AppConfig
 */
const useAppConfig = (council: string | undefined) => {
  const [appConfig, setAppConfig] = useState<AppConfig | undefined>(undefined);

  useEffect(() => {
    const fetchConfig = async () => {
      const appConfig = await getAppConfig(council);
      console.log("🔥", appConfig);
      setAppConfig(appConfig);
    };

    fetchConfig();
  }, [council]);

  return appConfig;
};

export default useAppConfig;
