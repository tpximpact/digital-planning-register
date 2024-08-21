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
  } catch (e) {
    // do nothing, this is okay
  }
  return "production";
}
