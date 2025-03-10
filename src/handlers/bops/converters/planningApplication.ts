/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

import { DprPlanningApplication } from "@/types";
import { BopsApplicationOverview, BopsPlanningApplication } from "../types";
import { sortComments } from "@/lib/comments";
import { convertCommentBops } from "./comments";
import { convertDateNoTimeToDprDate, convertDateTimeToUtc } from "@/util";
import { getPrimaryApplicationTypeKey } from "@/lib/planningApplication";
import { convertDocumentBopsFile } from "./documents";

export const convertBopsToDpr = (
  application: BopsPlanningApplication,
  council: string,
): DprPlanningApplication => {
  return {
    applicationType: application.application.type.value,
    data: createData(application, council),
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
  };
};

/**
 *
 * Temporary until this logic is added into BOPS
 * if camden and ldc then comments accepted until decision
 * @param application
 * @param council
 * @returns DprPlanningApplication["data"]
 */
const createData = (
  application: BopsPlanningApplication,
  council: string,
): DprPlanningApplication["data"] => {
  const primaryApplicationType = getPrimaryApplicationTypeKey(
    application.application.type.value,
  );

  if (council === "camden" && primaryApplicationType === "ldc") {
    return {
      localPlanningAuthority: {
        commentsAcceptedUntilDecision: true,
      },
    };
  }

  let appeal = application.data?.appeal ?? undefined;
  if (application.data?.appeal?.files) {
    const appealFiles = application.data.appeal.files.map(
      convertDocumentBopsFile,
    );
    appeal = {
      ...application.data.appeal,
      files: appealFiles,
    };
  }

  return {
    localPlanningAuthority: {
      commentsAcceptedUntilDecision: false,
    },
    appeal,
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
