import {
  AllowedPropertyValues,
  isBrowser,
  isDevelopment,
  isProduction,
  parseProperties,
} from "./utils";
import { event } from "./handlers/event";

/**
 * Call this to track an event on the client-side.
 * @param name
 * @param properties
 * @returns
 */
export function trackClient(
  name: string,
  properties?: Record<string, AllowedPropertyValues>,
): void {
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

  try {
    const props = parseProperties(properties, {
      strip: isProduction(),
    });

    if (props instanceof Error) {
      throw props;
    }

    event(name, props);
  } catch (err) {
    if (err instanceof Error && isDevelopment()) {
      // eslint-disable-next-line no-console -- Logging to console is intentional
      console.error(err);
    }
  }
}
