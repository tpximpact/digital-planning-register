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

import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(utc);
dayjs.extend(isSameOrAfter);

import { DprApplication, DprPlanningApplication } from "@/types";
import { ProcessStage } from "@/types/odp-types/schemas/postSubmissionApplication/enums/ProcessStage";
import { ApplicationStatus } from "@/types/odp-types/schemas/postSubmissionApplication/enums/ApplicationStatus";
// import {
//   getApplicationDprDecisionSummary,
//   getApplicationDprStatusSummary,
// } from "@/lib/planningApplication";
import { AssessmentDecision } from "@/types/odp-types/schemas/postSubmissionApplication/enums/AssessmentDecision";

/**
 * Checks if the given object is a DprApplication.
 */
export function isDprApplication(
  app: DprApplication | DprPlanningApplication,
): boolean {
  if (
    "data" in app &&
    "application" in app.data &&
    "reference" in app.data.application
  ) {
    return true;
  } else if ("application" in app && "reference" in app.application) {
    return false;
  }

  throw new Error("Invalid application object");
}
/**
 * Determines the stage
 */
function determineStage(app: DprPlanningApplication): ProcessStage {
  if (app.data.appeal) {
    return "appeal";
  }
  if (!app.application.validAt) {
    return "submission";
  }
  if (
    app.application.status === "invalid" ||
    app.application.status === "returned"
  ) {
    return "validation";
  }
  if (app.application.consultation && app.application.consultation.endDate) {
    if (
      app.application.consultation.startDate &&
      dayjs(app.application.consultation.startDate).isValid() &&
      dayjs(app.application.consultation.endDate).isValid()
    ) {
      const consultationStartDate: Dayjs = dayjs.utc(
        app.application.consultation.startDate,
      );
      const consultationEndDate: Dayjs = dayjs.utc(
        app.application.consultation.endDate,
      );
      const now: Dayjs = dayjs.utc();
      if (
        now.isSameOrAfter(consultationStartDate, "day") &&
        now.isBefore(consultationEndDate, "day")
      ) {
        return "consultation";
      }
    }
  }
  return "assessment";
}

/**
 * Maps the "application" section.
 * might be best to move this further down I think as the logic for stage/status will be useful in other sections
 */
/**
 * Maps the "application" section.
 * Converts legacy status strings into one of the allowed ApplicationStatus values.
 */
function mapApplicationSection(
  app: DprPlanningApplication,
  stage: ProcessStage,
) {
  const legacyStatus = app.application.status;
  let status: ApplicationStatus;
  if (legacyStatus === "returned" || legacyStatus === "invalid") {
    status = "returned";
  } else if (
    legacyStatus === "withdrawn" ||
    legacyStatus === "Appeal withdrawn"
  ) {
    status = "withdrawn";
  } else if (
    legacyStatus === "Appeal allowed" ||
    legacyStatus === "Appeal dismissed" ||
    legacyStatus === "Appeal split decision" ||
    legacyStatus === "Appeal valid" ||
    legacyStatus === "Appeal started" ||
    legacyStatus === "Appeal determined" ||
    legacyStatus === "closed"
  ) {
    status = "determined";
  } else if (legacyStatus === "pending") {
    status = "undetermined";
  } else {
    status = "undetermined";
  }

  return {
    reference: app.application.reference,
    stage: stage,
    status,
  };
}

/**
 * Maps the "localPlanningAuthority" section.
 */
function mapLocalPlanningAuthoritySection(app: DprPlanningApplication) {
  return {
    commentsAcceptedUntilDecision:
      app.data.localPlanningAuthority.commentsAcceptedUntilDecision || false,
  };
}

/**
 * Maps the common "submission" section.
 */
function mapSubmissionSection(app: DprPlanningApplication) {
  return {
    submittedAt: app.application.receivedAt,
  };
}

/**
 * Maps the "validation" section if a validDate exists.
 */
function mapValidationSection(app: DprPlanningApplication) {
  return {
    receivedAt: app.application.receivedAt,
    validatedAt: app.application.validAt ?? undefined,
    isValid: true,
  };
}

/**
 * Maps the "consultation" section if it exists.
 */
function mapConsultationSection(app: DprPlanningApplication) {
  const consultation = app.application.consultation;
  if (!consultation) return undefined;

  // Only return the consultation object if both dates are non-null.
  if (consultation.startDate == null || consultation.endDate == null) {
    return undefined;
  }

  return {
    startDate: consultation.startDate, // now guaranteed non-null
    endDate: consultation.endDate, // now guaranteed non-null
    // we can't map this yet, default to false for now
    siteNotice: false,
  };
}

/**
 * Maps the "assessment" section if the stage is assessment or appeal.
 */
function mapAssessmentSection(app: DprPlanningApplication) {
  const rawDecision = app.application.decision;
  let planningOfficerDecision: AssessmentDecision | undefined;
  if (rawDecision === "granted" || rawDecision === "refused") {
    planningOfficerDecision = rawDecision;
  } else {
    planningOfficerDecision = undefined;
  }
  const planningOfficerDecisionDate = app.application.determinedAt ?? undefined;
  return {
    planningOfficerDecision,
    planningOfficerDecisionDate,
    decisionNotice: {
      url: "https://planningregister.org",
    },
    expiryDate: "",
    // committeeSentDate: app.application.committeeSentDate,
    // committeeDecision: app.applicationcommitteeDecision,
    // committeeDecisionDate: app.applicationcommitteeDecisionDate,
  };
}

/**
 * Maps the "appeal" section if the stage is appeal.
 */
function mapAppealSection(app: DprPlanningApplication) {
  if (!app.data.appeal) {
    return undefined;
  }
  return {
    lodgedDate: app.data.appeal.lodgedDate,
    reason: app.data.appeal.reason,
    validatedDate: app.data.appeal.validatedDate,
    startedDate: app.data.appeal.startedDate,
    decisionDate: app.data.appeal.decisionDate,
    decision: app.data.appeal.decision,
    // withdrawnAt: app.data.appeal.withdrawnAt || null,
    // withdrawnReason: app.data.appeal.withdrawnReason || "",
  };
}

/**
 * Main conversion function.
 */
export function convertToDprApplication(
  app: DprPlanningApplication,
): DprApplication {
  const planningApp = app as DprPlanningApplication;
  const stage = determineStage(planningApp);

  const mappedApplication = mapApplicationSection(planningApp, stage);
  const mappedLocalPlanningAuthority =
    mapLocalPlanningAuthoritySection(planningApp);
  const mappedSubmission = mapSubmissionSection(planningApp);
  const mappedValidation = mapValidationSection(planningApp);
  const mappedConsultation = mapConsultationSection(planningApp);
  const mappedAssessment = mapAssessmentSection(planningApp);
  const mappedAppeal = mapAppealSection(planningApp);

  const baseData = {
    application: mappedApplication,
    localPlanningAuthority: mappedLocalPlanningAuthority,
    submission: mappedSubmission,
    validation: mappedValidation,
    consultation: mappedConsultation,
    assessment: mappedAssessment,
    appeal: mappedAppeal,
    caseOfficer: { name: planningApp.officer?.name || "" },
  };

  const finalData = {
    ...baseData,

    ...(stage !== "consultation" && stage !== "assessment" && stage !== "appeal"
      ? { consultation: undefined }
      : {}),

    ...(stage !== "assessment" && stage !== "appeal"
      ? { assessment: undefined }
      : {}),

    ...(stage !== "appeal" ? { appeal: undefined } : {}),
  };

  const baseApplication = {
    applicationType: planningApp.applicationType,
    data: finalData,
    // submission,
    // comments! soon they will come from their own endpoint so add them as is here
    // may give an error because of the format so we can just Omit<PostSubmissionApplication,"submission" | "comments"> for now
    // comments: {
    //   public: {
    //     comments: planningApp.consultation.publishedComments,
    //   },
    //   specialist: {
    //     comments: planningApp.consultation.consulteeComments,
    //   },
    // },
    metadata: {
      organisation: "BOPS",
      id: planningApp.application.reference,
      publishedAt: planningApp?.application?.publishedAt,
      submittedAt: planningApp.application.receivedAt,
      schema:
        "https://theopensystemslab.github.io/digital-planning-data-schemas/@next/schemas/postSubmissionApplication.json",
    },
  };

  // const statusSummary = getApplicationDprStatusSummary(baseApplication);
  // const decisionSummary = getApplicationDprDecisionSummary(baseApplication);

  // disabled to enable build to pass for the other changes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const converted: any = {
    ...baseApplication,
    // applicationStatusSummary: statusSummary,
    // applicationDecisionSummary: decisionSummary,
  };

  return converted;
}
