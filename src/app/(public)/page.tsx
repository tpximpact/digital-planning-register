import React from "react";
import { getAppConfig } from "@/config";
import { PageLanding } from "@/components/PageLanding";

// since no data fetch on this page force it to be dynamic so it gets correct council config
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "force-dynamic";

const Main = () => {
  const appConfig = getAppConfig();
  return <PageLanding councils={appConfig?.councils} />;
};

export default Main;
