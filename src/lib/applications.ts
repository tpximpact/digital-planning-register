import { isAfter, isBefore, isEqual } from "date-fns";
import { capitaliseWord } from "@/util";
import {
  PageContent,
  contentApplicationTypes,
  contentApplicationStatuses,
} from "@/components/PagePlanningProcess";

/**
 * Formats the application type by replacing underscores with spaces and capitalizing each word.
 *
 * @param {string} applicationType - The application type to be formatted.
 * @returns {string} - The formatted application type.
 */
export function formatApplicationType(applicationType: string) {
  return capitaliseWord(applicationType.replace(/_/g, " "));
}

/**
 * Returns the application info point ID based on the application type.
 * Application type must be one of the included ones in the list
 * This method may end up not being needed, but it's here for now.
 * @param applicationType
 * @returns
 */
export function applicationTypesInfoPointId(applicationType: string) {
  const linkedKeys = getLinkedKeys(contentApplicationTypes);
  return linkedKeys.includes(applicationType)
    ? applicationType
    : "application-types";
}

/**
 * Returns all the valid keys for application status's that can be mapped to an info point ID
 * @param applicationStatus
 * @returns
 */
export function applicationStatusesInfoPointId(applicationStatus: string) {
  const allKeys = flattenPageContent(contentApplicationStatuses);
  return allKeys[applicationStatus] || "application-statuses";
}

/**
 * returns the info point ID for the decision
 * @param decisionDefined
 * @returns
 */
export function applicationDecisionInfoPointId(decisionDefined: string) {
  return decisionDefined.toLowerCase().replace(/ /g, "-");
}

/**
 * Determines the formatted status based on the provided status and end date.
 *
 * @param {string} status - The current status, which may include underscores.
 * @param {string | null} end_date - The end date of the status in ISO format, or null if not applicable.
 * @returns {string} - The formatted status string.
 *
 * If `end_date` is null, the status is returned with underscores replaced by spaces and capitalized.
 * If `end_date` is provided and the status is one of the specified match statuses, the function will
 * return "Consultation in progress" if the end date is today or in the future, or "Assessment in progress"
 * if the end date is in the past. Otherwise, the status is returned with underscores replaced by spaces
 * and capitalized.
 */
export function definedStatus(status: string, end_date: string | null) {
  if (!end_date) return capitaliseWord(status?.replace(/_/g, " "));

  const endDate = new Date(end_date);
  const today = new Date();
  const isMatchStatus = [
    "in_assessment",
    "assessment",
    "in_progress",
    "awaiting_determination",
    "awaiting_correction",
  ].includes(status);

  if (isMatchStatus) {
    if (isAfter(endDate, today) || isEqual(endDate, today)) {
      return "Consultation in progress";
    } else if (isBefore(endDate, today)) {
      return "Assessment in progress";
    }
  }

  return capitaliseWord(status?.replace(/_/g, " "));
}

/**
 * @param {string} status - The status formatted
 * @returns {string} - Class that define the status color
 */
export function definedStatusClass(status: string) {
  const statusDefined: { [key: string]: string } = {
    Determined: "positive",
    "Consultation in progress": "neutral",
    "Assessment in progress": "neutral",
  };

  return statusDefined[status];
}

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
export function definedDecision(decision: string, application_type: string) {
  const prior_approval_decision: { [key: string]: string } = {
    granted: "Prior approval required and approved",
    not_required: "Prior approval not required",
    refused: "Prior approval required and refused",
  };

  return application_type === "prior_approval"
    ? prior_approval_decision[decision]
    : capitaliseWord(decision);
}

/**
 * @param {string} decision - The decision formatted
 * @returns {string} - Class that will define the decision color
 */

export function definedDecisionClass(decision: string) {
  const decisionDefined: { [key: string]: string } = {
    Granted: "positive",
    "Prior approval required and approved": "positive",
    "Prior approval not required": "positive",
    "Prior approval required and refused": "negative",
    Refused: "negative",
  };

  return decisionDefined[decision];
}

/**
 * Helper functions to get all entries that are currently 'linkable' from the contentApplicationTypes
 * This method may end up being removed if we link to all of them in the future
 * @param contentApplicationTypes
 * @returns
 */

export const getLinkedKeys = (
  contentApplicationTypes: PageContent[],
): string[] => {
  return contentApplicationTypes.reduce((acc: string[], item: PageContent) => {
    if (item.linked) {
      acc.push(item.key);
    }
    if (item.children) {
      acc.push(...getLinkedKeys(item.children));
    }
    return acc;
  }, []);
};

export const getAllTitles = (
  contentApplicationTypes: PageContent[],
): string[] => {
  return contentApplicationTypes.reduce((acc: string[], item: PageContent) => {
    acc.push(item.title);
    if (item.children) {
      acc.push(...getAllTitles(item.children));
    }
    return acc;
  }, []);
};

export const flattenPageContent = (
  content: PageContent[],
): { [key: string]: string } => {
  return content.reduce((acc: { [key: string]: string }, item: PageContent) => {
    acc[item.title] = item.key;
    if (item.children) {
      Object.assign(acc, flattenPageContent(item.children));
    }
    return acc;
  }, {});
};
