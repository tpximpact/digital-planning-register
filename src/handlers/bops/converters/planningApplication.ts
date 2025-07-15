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

import { DprPagination, DprPlanningApplication } from "@/types";
import {
  BopsApplicationOverview,
  BopsPlanningApplication,
  BopsSearchMetadata,
} from "../types";
import { sortComments } from "@/lib/comments";
import { convertCommentBops } from "./comments";
import { convertDateTimeToUtc } from "@/util";
import { getPrimaryApplicationTypeKey } from "@/lib/planningApplication";
import { convertDocumentBopsFile } from "./documents";
import type { Area } from "digital-planning-data-schemas/types/shared/utils.ts";

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
): DprPlanningApplication["application"] => {
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
    status: application.status,
    consultation: {
      startDate: application.consultation?.startDate,
      endDate: application.consultation?.endDate,
      consulteeComments: consultee_comments,
      publishedComments: published_comments,
    },
    receivedAt: application.receivedAt
      ? convertDateTimeToUtc(application.receivedAt)
      : "",
    validAt: application.validAt
      ? convertDateTimeToUtc(application.validAt)
      : null,
    publishedAt: application.publishedAt
      ? convertDateTimeToUtc(application.publishedAt)
      : null,
    determinedAt: application.determinedAt
      ? convertDateTimeToUtc(application.determinedAt)
      : null,
    decision: application.decision ?? null,
  };
};

export const convertBopsToDprPagination = (
  bopsPagination: BopsSearchMetadata,
): DprPagination => {
  return {
    resultsPerPage: bopsPagination.results,
    currentPage: bopsPagination.page,
    totalPages: bopsPagination.total_pages,
    totalResults: bopsPagination.total_results,
    totalAvailableItems: bopsPagination.total_results,
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
  let publicCommentsAcceptedUntilDecision = false;
  const primaryApplicationType = getPrimaryApplicationTypeKey(
    application.application.type.value,
  );

  if (council === "camden" && primaryApplicationType === "ldc") {
    publicCommentsAcceptedUntilDecision = true;
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
      publicCommentsAcceptedUntilDecision,
    },
    appeal,
  };
};

export const createProperty = (
  application: BopsPlanningApplication,
): DprPlanningApplication["property"] => {
  // glitch in bops where boundary_geojson is coming through as {} not null seems to only affect the search endpoint
  let boundary = undefined;
  if (
    application.property.boundary.site &&
    Object.keys(application.property.boundary.site).length > 0
  ) {
    boundary = {
      site: application.property.boundary.site,
      // we don't use this so its ok for now to do this
      area: "" as unknown as Area,
    };
  }
  return {
    // making up the missing required fields for now
    address: {
      singleLine: application.property.address.singleLine,
      title: application.property.address.singleLine,
      x: 0,
      y: 0,
      latitude: application.property.address.latitude,
      longitude: application.property.address.longitude,
      uprn: application.property.address.uprn,
      usrn: "",
      pao: "",
      street: "",
      town: "",
      postcode: "",
      source: "Ordnance Survey",
    },
    boundary,
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
    /**
     * This should never occur in the code but we still need to return a valid BaseApplicant object to prevent errors
     * BOPS usually returns with which even though not valid we account for in the frontend so nothing wonky shows
     *
     * {
     *   type: null,
     *   address: null,
     *   ownership: null,
     *   agent: { address: null }
     * }
     */
    return {
      name: {
        first: null,
        last: null,
      },
      email: "REDACTED",
      phone: {
        primary: "REDACTED",
      },
      address: {
        line1: null,
        town: null,
        postcode: null,
        sameAsSiteAddress: false,
      },
      siteContact: {
        role: "proxy",
      },
    };
  }
};

export const createOfficer = (
  application: BopsPlanningApplication,
): DprPlanningApplication["officer"] => {
  return { name: application.officer ? application.officer.name : "" };
};
