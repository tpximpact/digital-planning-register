import { turnValueToRegExp } from ".";

export function computeRoute(
  pathname: string | null,
  pathParams: Record<string, string | string[]> | null,
): string | null {
  if (!pathname || !pathParams) {
    return pathname;
  }

  let result = pathname;
  try {
    const entries = Object.entries(pathParams);
    // simple keys must be handled first
    for (const [key, value] of entries) {
      if (!Array.isArray(value)) {
        const matcher = turnValueToRegExp(value);
        if (matcher.test(result)) {
          result = result.replace(matcher, `/[${key}]`);
        }
      }
    }
    // array values next
    for (const [key, value] of entries) {
      if (Array.isArray(value)) {
        const matcher = turnValueToRegExp(value.join("/"));
        if (matcher.test(result)) {
          result = result.replace(matcher, `/[...${key}]`);
        }
      }
    }
    return result;
  } catch (e) {
    return pathname;
  }
}
