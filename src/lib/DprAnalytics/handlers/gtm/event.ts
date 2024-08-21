import { AllowedPropertyValues } from "../../utils";

export function eventGtm(
  name: string,
  properties?: Record<string, AllowedPropertyValues>,
): void {
  console.info("gtm event", name, properties);
  // window.gtag?.("pageview", {
  //   route,
  //   path,s
  // });
}
