import { DprContentPage, DprPlanningApplication } from "@/types";
import { capitalizeFirstLetter, slugify } from "@/util";
import { getPrimaryApplicationTypeKey } from "./type";

/**
 * Returns a formatted decision string based on the application type.
 *
 * For "prior_approval" application types, it returns a specific message
 * based on the decision. For other application types, it capitalizes the decision.
 *
 * @param {string} decision - The decision string to be formatted.
 * @param {string} application_type - The type of the application.
 * @returns {string} - The formatted decision string.
 */
export const getApplicationDecisionSummary = (
  applicationType: DprPlanningApplication["applicationType"],
  decision?: string,
): string | undefined => {
  if (!decision) {
    return undefined;
  }

  const applicationPrimaryTypeKey =
    getPrimaryApplicationTypeKey(applicationType);

  if (applicationPrimaryTypeKey === "pa") {
    const priorApprovalMap: Record<string, string> = {
      granted: "Prior approval required and approved",
      not_required: "Prior approval not required",
      refused: "Prior approval required and refused",
    };
    return priorApprovalMap[decision] || capitalizeFirstLetter(decision);
  } else {
    return capitalizeFirstLetter(decision);
  }
};

/**
 *  Returns positive, neutral or negative based on the decision provided.
 *
 * @param {string} status - The status formatted
 * @returns {string} - Class that define the status color
 */
export function getApplicationDecisionSummarySentiment(status: string) {
  const decisionDefined: Record<string, string> = {
    Granted: "positive",
    "Prior approval required and approved": "positive",
    "Prior approval not required": "positive",
    "Prior approval required and refused": "negative",
    Refused: "negative",
  };

  return decisionDefined[status] || undefined;
}
