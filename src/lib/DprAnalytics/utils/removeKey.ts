export function removeKey(
  key: string,
  { [key]: _, ...rest },
): Record<string, unknown> {
  return rest;
}
