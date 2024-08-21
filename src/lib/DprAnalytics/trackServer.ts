import { AllowedPropertyValues, isProduction, parseProperties } from "./utils";

export async function trackServer(
  eventName: string,
  properties?: Record<string, AllowedPropertyValues>,
): Promise<void> {
  console.log("trackServer");
  console.log(eventName);
  console.log(properties);

  if (typeof window !== "undefined") {
    if (!isProduction()) {
      throw new Error(
        `Please use trackServer in a server component. This function is only available in a server environment.`,
      );
    }

    return;
  }

  const props = parseProperties(properties, {
    strip: isProduction(),
  });

  try {
    // push the event to the analytics endpoint through the server
  } catch (err) {
    console.error(err);
  }
}
