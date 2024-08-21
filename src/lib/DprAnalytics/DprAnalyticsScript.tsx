"use client";
import { useEffect } from "react";
import { inject } from "./handlers/inject";
import { pageview } from "./handlers/pageView";
import { DprAnalyticsProps } from "./DprAnalytics";

function DprAnalyticsScript(
  props: DprAnalyticsProps & {
    path?: string | null;
  },
): null {
  // Set the type of analytics based on the council
  const type = "gtm";

  useEffect(() => {
    inject({
      ...props,
      type: type,
    });
  }, []);

  useEffect(() => {
    if (props.route && props.path) {
      pageview({
        route: props.route,
        path: props.path,
        type: type,
      });
    }
  }, [props.route, props.path]);

  return null;
}

export default DprAnalyticsScript;
