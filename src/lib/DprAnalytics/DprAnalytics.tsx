"use client";
import React, { Suspense } from "react";
import { useRoute } from "./utils";
import DprAnalyticsScript from "./DprAnalyticsScript";

export type DprAnalyticsTypes = "gtm";

export interface DprAnalyticsProps {
  route?: string | null;
  type?: DprAnalyticsTypes;
}

type Props = Omit<DprAnalyticsProps, "route">;

function DprAnalyticsComponent(props: Props): React.ReactElement {
  const { route, path } = useRoute();
  return <DprAnalyticsScript path={path} route={route} {...props} />;
}

export function DprAnalytics(props: Props): React.ReactElement {
  return (
    <Suspense fallback={null}>
      <DprAnalyticsComponent {...props} />
    </Suspense>
  );
}

export default DprAnalytics;
