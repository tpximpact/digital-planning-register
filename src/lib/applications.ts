import { isAfter, isBefore, isEqual } from "date-fns";
import {
  DprPlanningApplication,
  DprPlanningApplicationOverview,
} from "@/types";
import { capitaliseWord } from "../../util/capitaliseWord";
import { contentApplicationTypes } from "@/app/[council]/planning-process/content-application-types";
import { contentApplicationStatuses } from "@/app/[council]/planning-process/content-application-statuses";
import { PageContent } from "@/app/[council]/planning-process/page";
import { convertCommentBops, sortComments } from "./comments";
import {
  BopsPlanningApplication,
  BopsApplicationOverview,
  BopsV2PlanningApplicationDetail,
} from "@/types/api/bops";
import { ApplicationFormObject } from "@/components/application_form";
import { convertDocumentBopsNonStandard } from "./documents";

/**
 * Converts BOPS application(s) into our standard format
 * @param comment
 * @returns
 */
export const convertPlanningApplicationBops = (
  council: string,
  application: BopsPlanningApplication,
  privateApplication?: BopsV2PlanningApplicationDetail | null,
): DprPlanningApplication => {
  return {
    application: convertPlanningApplicationOverviewBops(
      council,
      application.application,
      privateApplication,
    ),
    property: {
      address: {
        singleLine: application.property.address.singleLine,
      },
      boundary: {
        site: application.property.boundary.site,
      },
    },
    proposal: {
      description: application.proposal.description,
    },
  };
};

/**
 * Converts BOPS application overview into our standard format
 * @param comment
 * @returns
 */
export const convertPlanningApplicationOverviewBops = (
  council: string,
  application: BopsApplicationOverview,
  privateApplication?: BopsV2PlanningApplicationDetail | null,
): DprPlanningApplicationOverview => {
  const { consulteeComments = [], publishedComments = [] } =
    application.consultation || {};

  const consultee_comments =
    consulteeComments && consulteeComments.length > 0
      ? sortComments(consulteeComments?.map(convertCommentBops))
      : null;

  const published_comments =
    publishedComments && publishedComments.length > 0
      ? sortComments(publishedComments?.map(convertCommentBops))
      : null;

  const reference = application.reference;

  // add fake application form document
  const applicationFormDocument = ApplicationFormObject(council, reference);

  return {
    reference: application.reference,
    type: {
      description: application.type.description,
    },
    status: application.status,
    consultation: {
      endDate: application.consultation?.endDate ?? null,
      consulteeComments: consultee_comments,
      publishedComments: published_comments,
    },
    receivedAt: application.receivedAt,
    validAt: application.validAt ?? null,
    publishedAt: application.publishedAt ?? null,
    determinedAt: application.determinedAt ?? null,
    decision: application.decision ?? null,

    // missing fields from public endpoint
    id: privateApplication?.id ?? 0,
    applicant_first_name: privateApplication?.applicant_first_name ?? "",
    applicant_last_name: privateApplication?.applicant_last_name ?? "",
    agent_first_name: privateApplication?.agent_first_name ?? "",
    agent_last_name: privateApplication?.agent_last_name ?? "",
    documents: privateApplication?.documents
      ? [
          applicationFormDocument,
          ...privateApplication.documents.map(convertDocumentBopsNonStandard),
        ]
      : null,
  };
};

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
  if (!end_date) return capitaliseWord(status.replace(/_/g, " "));

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

  return capitaliseWord(status.replace(/_/g, " "));
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
