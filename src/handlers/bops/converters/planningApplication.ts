import { DprPlanningApplication } from "@/types";
import {
  BopsApplicationOverview,
  BopsPlanningApplication,
  BopsV2PlanningApplicationDetail,
} from "../types";
import { sortComments } from "@/lib/comments";
import { convertCommentBops } from "./comments";
import { applicationFormObject } from "@/lib/planningApplication";
import { convertDocumentBopsNonStandard } from "./documents";
import { getCommentsAllowed } from "@/lib/planningApplication";
import { convertDateNoTimeToDprDate, convertDateTimeToUtc } from "@/util";

export const convertBopsToDpr = (
  council: string,
  application: BopsPlanningApplication,
  privateApplication?: BopsV2PlanningApplicationDetail | null,
): DprPlanningApplication => {
  return {
    applicationType: application.application.type.value,
    application: convertBopsApplicationToDpr(
      council,
      application.application,
      privateApplication,
    ),
    property: createProperty(application),
    proposal: createProposal(application),
    applicant: createApplicant(application, privateApplication),
  };
};

export const convertBopsApplicationToDpr = (
  council: string,
  application: BopsApplicationOverview,
  privateApplication?: BopsV2PlanningApplicationDetail | null,
): DprPlanningApplication["applicant"] => {
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
  const applicationFormDocument = applicationFormObject(council, reference);

  return {
    reference: application.reference,
    type: {
      description: application.type.description,
    },
    status: application.status,
    consultation: {
      endDate: application.consultation?.endDate,
      consulteeComments: consultee_comments,
      publishedComments: published_comments,
      allowComments: getCommentsAllowed(application.type.value),
    },
    receivedDate: application.receivedAt
      ? convertDateNoTimeToDprDate(application.receivedAt)
      : null,
    validDate: application.validAt
      ? convertDateNoTimeToDprDate(application.validAt)
      : null,
    publishedDate: application.publishedAt
      ? convertDateNoTimeToDprDate(application.publishedAt)
      : null,
    determinedAt: application.determinedAt
      ? convertDateTimeToUtc(application.determinedAt)
      : null,
    decision: application.decision ?? null,

    // missing fields from public endpoint
    id: privateApplication?.id ?? 0,
    documents: privateApplication?.documents
      ? [
          applicationFormDocument,
          ...privateApplication.documents.map(convertDocumentBopsNonStandard),
        ]
      : null,
  };
};

export const createProperty = (
  application: BopsPlanningApplication,
): DprPlanningApplication["property"] => {
  // glitch in bops where boundary_geojson is coming through as {} not null seems to only affect the search endpoint
  return {
    address: {
      singleLine: application.property.address.singleLine,
    },
    boundary: {
      site:
        application.property.boundary.site &&
        Object.keys(application.property.boundary.site).length > 0
          ? application.property.boundary.site
          : undefined,
    },
  };
};

export const createProposal = (
  application: BopsPlanningApplication,
): DprPlanningApplication["proposal"] => {
  return {
    description: application.proposal.description,
  };
};

export const createApplicant = (
  application: BopsPlanningApplication,
  privateApplication?: BopsV2PlanningApplicationDetail | null,
): DprPlanningApplication["applicant"] => {
  if (application?.applicant) {
    // remove when bops sends back applicant info in the show endpoint
    if (privateApplication) {
      const applicant = {
        name: {
          first:
            application.applicant?.name?.first ||
            privateApplication?.applicant_first_name ||
            undefined,
          last:
            application.applicant?.name?.last ||
            privateApplication?.applicant_last_name ||
            undefined,
        },
        agent: {
          name: {
            first:
              application.applicant?.agent?.name?.first ||
              privateApplication?.agent_first_name ||
              undefined,
            last:
              application.applicant?.agent?.name?.last ||
              privateApplication?.agent_last_name ||
              undefined,
          },
        },
      };
      return {
        ...application.applicant,
        ...applicant,
      };
    } else {
      return application.applicant;
    }
  } else {
    return null;
  }
};
