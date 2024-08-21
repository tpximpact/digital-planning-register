import { DprAnalyticsTypes } from "../DprAnalytics";
import { pageviewGtm } from "./gtm";

export function pageview({
  route,
  path,
  type,
}: {
  route?: string;
  path?: string;
  type: DprAnalyticsTypes;
}): void {
  switch (type) {
    case "gtm":
      pageviewGtm({ route, path });
      break;
  }
}
