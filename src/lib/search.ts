import { UnknownSearchParams } from "@/types";

export const getValueFromUnknownSearchParams = (
  searchParams: UnknownSearchParams,
  key: string,
): string | undefined => {
  if (!searchParams || !key) {
    return undefined; // Return undefined if searchParams or key is not provided
  }
  // Check if the key exists in the searchParams
  const value = searchParams[key];

  if (Array.isArray(value)) {
    return value[0]; // Use the first element if it's an array
  }

  return value; // Use the value directly if it's a string or undefined
};
