import { DprPlanningApplication } from "@/types";
import {
  BopsApplicationOverview,
  BopsPlanningApplication,
  BopsV2PlanningApplicationDetail,
} from "../types";
import { sortComments } from "@/lib/comments";
import { convertCommentBops } from "./comments";
import { getCommentsAllowed } from "@/lib/planningApplication";
import { convertDateNoTimeToDprDate, convertDateTimeToUtc } from "@/util";

export const convertBopsToDpr = (
  application: BopsPlanningApplication,
): DprPlanningApplication => {
  return {
    applicationType: application.application.type.value,
    application: convertBopsApplicationToDpr(application.application),
    property: createProperty(application),
    proposal: createProposal(application),
    applicant: createApplicant(application),
    officer: createOfficer(application),
  };
};

export const convertBopsApplicationToDpr = (
  application: BopsApplicationOverview,
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

  return {
    reference: application.reference,
    type: {
      description: application.type.description,
    },
    status: application.status,
    consultation: {
      startDate: application.consultation?.startDate,
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
    appeal: application.appeal ?? null,
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
): DprPlanningApplication["applicant"] => {
  if (application?.applicant) {
    return application.applicant;
  } else {
    return null;
  }
};

export const createOfficer = (
  application: BopsPlanningApplication,
): DprPlanningApplication["officer"] => {
  if (!application.officer) {
    return null;
  }
  return { name: application.officer.name };
};
