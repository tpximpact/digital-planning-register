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

import { DprApplication, DprPlanningApplication } from "@/types";
import { PostSubmissionMetadata } from "@/types/odp-types/schemas/postSubmissionApplication/Metadata";
import { getApplicationDprDecisionSummary } from "./decision";
import { getApplicationDprStatusSummary } from "./status";
import { ProcessStage } from "@/types/odp-types/schemas/postSubmissionApplication/enums/ProcessStage";
import { ApplicationStatus } from "@/types/odp-types/schemas/postSubmissionApplication/enums/ApplicationStatus";
import { AssessmentDecision } from "@/types/odp-types/schemas/postSubmissionApplication/enums/AssessmentDecision";
import { getPrimaryApplicationTypeKey } from "./type";
import {
  PostSubmissionAssessment,
  PriorApprovalAssessment,
} from "@/types/odp-types/schemas/postSubmissionApplication/data/Assessment";
import { getDescription } from "./application";

/**
 * Checks if the given object is a DprApplication.
 * Run this before convertToDprApplication()
 */
export function isDprApplication(
  app: DprPlanningApplication | DprApplication,
): app is DprApplication {
  // Return `true` only if all required DprApplication fields exist
  return (
    !!app &&
    "data" in app &&
    !!app.data &&
    "application" in app.data &&
    !!app.data.application &&
    "reference" in app.data.application
  );
}

/**
 * Checks to see if we're in the consultation period
 * @param startDate string
 * @param endDate string
 * @returns boolean
 */
export const getIsConsultationPeriod = (
  startDate: Date,
  endDate: Date,
): boolean => {
  const now = new Date();

  return now >= startDate && now <= endDate;
};

export const convertToDprApplication = (
  app: DprPlanningApplication,
): DprApplication => {
  let stage = undefined;
  let status = undefined;
  let withdrawnAt = undefined;
  const withdrawnReason = undefined;
  let consultation = undefined;

  const isConsultationPeriod =
    app.application.consultation.startDate &&
    app.application.consultation.endDate
      ? getIsConsultationPeriod(
          new Date(app.application.consultation.startDate),
          new Date(app.application.consultation.endDate),
        )
      : false;

  switch (app.application.status) {
    /**
     * 01-submission
     * pending
     * not_started
     * 02-validation-01-invalid
     * invalidated
     * returned
     */
    case "pending":
    case "not_started":
    case "invalid":
    case "returned":
      throw new Error("Application should not be published");

    /**
     * 03-consultation
     * in_assessment
     * assessment_in_progress
     *
     * 04-assessment-00-assessment-in-progress
     * in_assessment
     * assessment_in_progress
     * awaiting_determination
     * to_be_reviewed
     *
     * 04-assessment-01-council-determined
     * determined
     *
     * 04-assessment-02-assessment-in-committee
     * in_committee
     *
     * 04-assessment-03-committee-determined
     * determined - can't determine this currently
     *
     */

    case "in_assessment":
    case "assessment_in_progress":
      if (isConsultationPeriod) {
        stage = "consultation";
        status = "undetermined";
      } else {
        stage = "assessment";
        status = "undetermined";
      }
      break;
    case "awaiting_determination":
    case "to_be_reviewed":
    case "in_committee":
      stage = "assessment";
      status = "undetermined";
      break;
    case "determined":
      stage = "assessment";
      status = "determined";
      break;

    /**
     * 05-appeal-00-appeal-lodged
     * Appeal lodged
     */

    case "Appeal lodged":
      stage = "appeal";
      status = "determined";
      break;

    /**
     * 05-appeal-01-appeal-validated
     * Appeal valid
     */

    case "Appeal valid":
      stage = "appeal";
      status = "determined";
      break;

    /**
     * 05-appeal-02-appeal-started
     * Appeal started
     */

    case "Appeal started":
      stage = "appeal";
      status = "determined";
      break;
    /**
     * 05-appeal-03-appeal-determined
     * Appeal determined
     *
     * Appeal withdrawn
     * Appeal allowed
     * Appeal dismissed
     * Appeal split decision
     */

    case "Appeal determined":
    case "Appeal allowed":
    case "Appeal dismissed":
    case "Appeal split decision":
    case "Appeal withdrawn":
      stage = "appeal";
      status = "determined";
      break;

    /**
     * 06-assessment-withdrawn
     * withdrawn
     * closed
     */
    case "withdrawn":
      stage = "assessment";
      status = "withdrawn";
      withdrawnAt =
        app.application.determinedAt ||
        app.application.publishedAt ||
        undefined;
      // withdrawnReason = "Applicant withdrew the application";
      break;
    /**
     * @todo closed is
     *  scope :closed, lambda {
     *   where(status: %w[determined withdrawn returned closed])
     *  }
     */
    case "closed":
      throw new Error("Closed application not enough information to convert");
  }

  // if theres consultation details add those
  if (
    app.application.consultation.startDate !== null &&
    app.application.consultation.endDate !== null
  ) {
    consultation = {
      startDate: app.application.consultation.startDate,
      endDate: app.application.consultation.endDate,
      siteNotice: true,
    };
  }

  const dprApplication = {
    applicationType: app.applicationType,
    data: {
      application: {
        reference: app.application.reference,
        stage: stage as ProcessStage,
        status: status as ApplicationStatus,
        withdrawnAt,
        withdrawnReason,
      },
      localPlanningAuthority: app.data.localPlanningAuthority,
      submission: {
        submittedAt: app.application.receivedAt,
      },
      validation: {
        receivedAt: app.application.receivedAt,
        validatedAt: app.application.validAt ?? undefined,
        isValid: true,
      },
      consultation,
      assessment: {
        expiryDate: app.application.expiryDate ?? new Date().toISOString(),
      },
      appeal: app.data.appeal,
      caseOfficer: {
        name: app.officer?.name ?? "",
      },
    },
    submission: {
      data: {
        applicant: app.applicant,
        property: {
          address: app.property.address,
          boundary: app.property.boundary,
        },
        proposal: {
          description: getDescription(app.proposal),
        },
      },
    },
    comments: {
      public: app.application.consultation.publishedComments ?? undefined,
    },
    metadata: {
      organisation: "BOPS",
      id: app.application.reference,
      publishedAt: app.application.publishedAt,
      submittedAt: app.application.receivedAt,
      schema:
        "https://theopensystemslab.github.io/digital-planning-data-schemas/@next/schemas/postSubmissionApplication.json",
    } as PostSubmissionMetadata,
  };

  // Sort out the assessment section

  if (app.application.decision && app.application.determinedAt) {
    dprApplication.data.assessment = {
      planningOfficerDecision: app.application.decision as AssessmentDecision,
      planningOfficerDecisionDate: app.application.determinedAt,
      decisionNotice: app.application.decision
        ? {
            url: "https://planningregister.org",
          }
        : undefined,
    } as PostSubmissionAssessment;

    if (getPrimaryApplicationTypeKey(app.applicationType) === "pa") {
      let priorApprovalRequired = false;
      if (
        app.application.decision === "granted" ||
        app.application.decision === "refused"
      ) {
        priorApprovalRequired = true;
      }
      dprApplication.data.assessment = {
        ...dprApplication.data.assessment,
        priorApprovalRequired,
      } as PriorApprovalAssessment;
    }
  }

  const applicationDecisionSummary =
    getApplicationDprDecisionSummary(dprApplication);
  const applicationStatusSummary =
    getApplicationDprStatusSummary(dprApplication);
  const application = {
    applicationStatusSummary,
    applicationDecisionSummary,
    ...dprApplication,
  };

  return application;
};
