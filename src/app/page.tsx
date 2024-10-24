import React from "react";
import { getAppConfig } from "@/config";
import { PageLanding } from "@/components/PageLanding";

const Main = async () => {
  const appConfig = getAppConfig();
  return <PageLanding councils={appConfig.councils} />;
};

export default Main;
