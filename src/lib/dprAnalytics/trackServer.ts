"use server";
import { checkCookieConsent, getClientIdFromCookies } from "@/actions";
import { AllowedPropertyValues, isProduction, parseProperties } from ".";

export async function trackServer(
  eventName: string,
  properties?: Record<string, AllowedPropertyValues>,
): Promise<void> {
  if (typeof window !== "undefined") {
    if (!isProduction()) {
      throw new Error(
        `Please use trackServer in a server component. This function is only available in a server environment.`,
      );
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

  // push the event to the analytics endpoint through GA4 server

  if (!isProduction()) {
    console.log("trackServerEvent", eventName, props);
  }

  let clientId;
  try {
    clientId = await getClientIdFromCookies();
  } catch (err) {
    if (!isProduction()) {
      console.error(err);
    }
    return;
  }

  const body = {
    client_id: clientId,
    events: [
      {
        name: eventName,
        params: props,
      },
    ],
  };

  const debug = false;
  const url = `https://www.google-analytics.com/${debug ? "debug/" : ""}mp/collect?measurement_id=${process.env.GA}&api_secret=${process.env.GA_API_SECRET}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error("Failed to send event to GA4:", response.statusText);
  }

  if (debug) {
    const result = await response.json();
    console.log(result);
  }
}
