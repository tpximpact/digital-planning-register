/**
 * MODE
 */

export type Mode = "auto" | "development" | "production";

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function isDevelopment(): boolean {
  return getMode() === "development";
}

export function isProduction(): boolean {
  return getMode() === "production";
}

export function getMode(): Mode {
  const mode = detectEnvironment();
  return mode || "production";
}

export function detectEnvironment(): "development" | "production" {
  try {
    const env = process.env.NODE_ENV;
    if (env === "development" || env === "test") {
      return "development";
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    // do nothing, this is okay
  }
  return "production";
}

/**
 * Parse properties
 */

export type AllowedPropertyValues = string | number | boolean | null;

export function parseProperties(
  properties: Record<string, unknown> | undefined,
  options: {
    strip?: boolean;
  },
): Error | Record<string, AllowedPropertyValues> | undefined {
  if (!properties) return undefined;
  let props = properties;
  const errorProperties: string[] = [];
  for (const [key, value] of Object.entries(properties)) {
    if (typeof value === "object" && value !== null) {
      if (options.strip) {
        props = removeKey(key, props);
      } else {
        errorProperties.push(key);
      }
    }
  }

  if (errorProperties.length > 0 && !options.strip) {
    throw Error(
      `The following properties are not valid: ${errorProperties.join(
        ", ",
      )}. Only strings, numbers, booleans, and null are allowed.`,
    );
  }
  return props as Record<string, AllowedPropertyValues>;
}

/**
 * Remove key from object
 */
export function removeKey(
  key: string,
  { [key]: _, ...rest },
): Record<string, unknown> {
  return rest;
}
