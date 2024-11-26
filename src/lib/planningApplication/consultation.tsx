import { DprPlanningApplication } from "@/types";
import { getPrimaryApplicationTypeKey } from "./type";

/**
 * Check if comments are allowed on the application
 * @param applicationType
 * @returns
 */
export const getCommentsAllowed = (
  applicationType: DprPlanningApplication["applicationType"],
) => {
  const primaryApplicationType = getPrimaryApplicationTypeKey(applicationType);
  if (primaryApplicationType === "ldc") {
    return false;
  }
  return true;
};
