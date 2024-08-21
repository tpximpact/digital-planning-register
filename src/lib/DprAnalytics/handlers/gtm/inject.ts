import { DprAnalyticsProps } from "../../DprAnalytics";
import { isBrowser } from "../../utils";

export function injectGtm(props: DprAnalyticsProps): void {
  if (!isBrowser()) return;
  console.log("injectGtm");

  const src = "google-analytics.com/gtag/js?id=";

  if (document.head.querySelector(`script[src*="${src}"]`)) return;

  const script = document.createElement("script");
  script.src = src;
  script.defer = true;

  script.onerror = (): void => {
    console.log(`Failed to load script from ${src}.`);
  };

  document.head.appendChild(script);
}
