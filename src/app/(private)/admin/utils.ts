/**
 * Prints out the props for a function
 * @param fn
 * @returns
 */
/* eslint-disable-next-line @typescript-eslint/no-unsafe-function-type */
export const $args = (fn: Function): string[] => {
  const fnStr = fn.toString();
  const paramsMatch = fnStr.match(/\(([^)]*)\)/);
  if (!paramsMatch) return [];
  const params = paramsMatch[1]
    .split(",")
    .map((param) => param.trim())
    .filter((param) => param);
  return params;
};
