import { checkCookieConsent } from "@/actions";
import {
  AllowedPropertyValues,
  isBrowser,
  isDevelopment,
  isProduction,
  parseProperties,
} from ".";
import { sendGTMEvent } from "@next/third-parties/google";

/**
 * Call this to track an event on the client-side.
 * @param eventName
 * @param properties
 * @returns
 */
export async function trackClient(
  eventName: string,
  properties?: Record<string, AllowedPropertyValues>,
): Promise<void> {
  if (!isBrowser()) {
    const msg =
      "Please use trackServer in server-side code. This function is only available in the browser.";

    if (isProduction()) {
      // eslint-disable-next-line no-console -- Show warning in production
      console.warn(msg);
    } else {
      throw new Error(msg);
    }

    return;
  }

  const acceptAnalytics = await checkCookieConsent();
  if (!acceptAnalytics) {
    return;
  }

  const props = parseProperties(properties, {
    strip: isProduction(),
  });

  if (props instanceof Error) {
    throw props;
  }

  if (isDevelopment()) {
    console.log("trackClientEvent", eventName, props);
  }

  // send event to gtm
  sendGTMEvent({ event: eventName, ...props });
}
