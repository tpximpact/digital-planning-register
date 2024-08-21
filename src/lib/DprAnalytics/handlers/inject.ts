"use client";
import { DprAnalyticsProps } from "../DprAnalytics";
import { isBrowser } from "../utils";
import { injectGtm } from "./gtm";

export function inject(props: DprAnalyticsProps): void {
  if (!isBrowser()) return;
  const { type } = props;

  switch (type) {
    case "gtm":
      injectGtm(props);
      break;
  }
}
