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

import {
  PostSubmissionAssessment,
  PriorApprovalAssessment,
} from "@/types/odp-types/schemas/postSubmissionApplication/data/Assessment";
import {
  generateDprApplication,
  generateExampleApplications,
  generateAllPossibleDates,
  generatePublicComment,
} from "@mocks/dprNewApplicationFactory";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { COMMENT_PUBLIC_TOPIC_OPTIONS } from "@/lib/comments";
import { CommentSentiment } from "@/types/odp-types/schemas/postSubmissionApplication/enums/CommentSentiment";
import { TopicAndComments } from "@/types/odp-types/schemas/postSubmissionApplication/data/Comment";
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

function saveApplicationToJson(application: object, filePath: string): void {
  const jsonData = JSON.stringify(application, null, 2);
  fs.writeFileSync(filePath, jsonData, "utf-8");
}

/**
 * Check the consultation dates are valid Dates
 * Check the consultation start date is before the end date
 * @param startDate string
 * @param endDate string
 */
export const checkConsultationDates = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  expect(start).toBeInstanceOf(Date);
  expect(end).toBeInstanceOf(Date);
  expect(start < end).toBe(true);
};

/**
 * Check the consultation is in progress
 * @param startDate string
 * @param endDate string
 */
export const checkConsultationInProgress = (
  startDate: string,
  endDate: string,
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  expect(now >= start && now <= end).toBe(true);
  // const start = dayjs.utc(startDate);
  // const end = dayjs.utc(endDate);
  // const now = dayjs.utc();
  // expect(now.isBetween(start, end, "day", "[]")).toBe(true);
  // // expect(now >= start && now <= end).toBe(true);
};

describe("generateDprApplication", () => {
  // 01-submission the application is submitted via planX into BOPS
  it("Generates the correct structure for a post-submission application just after submission", () => {
    const { submission } = generateExampleApplications();
    const planningPermissionFullHouseholderSubmission = submission;

    // basic checks
    expect(planningPermissionFullHouseholderSubmission.applicationType).toEqual(
      "pp.full.householder",
    );
    expect(
      planningPermissionFullHouseholderSubmission.metadata.publishedAt,
    ).toBeDefined();
    expect(
      Object.values(planningPermissionFullHouseholderSubmission.submission)
        .length,
    ).toBeGreaterThan(0);

    // application section checks
    expect(
      planningPermissionFullHouseholderSubmission.data.application.reference,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderSubmission.data.application.stage,
    ).toEqual("submission");
    expect(
      planningPermissionFullHouseholderSubmission.data.application.status,
    ).toEqual("undetermined");

    // submission data checks
    expect(
      planningPermissionFullHouseholderSubmission.data.submission.submittedAt,
    ).toBeDefined();

    // validation data checks
    expect(
      planningPermissionFullHouseholderSubmission.data.validation,
    ).toBeUndefined();

    // consultation data checks
    expect(
      planningPermissionFullHouseholderSubmission.data.consultation,
    ).toBeUndefined();

    // assessment data checks
    expect(
      planningPermissionFullHouseholderSubmission.data.assessment,
    ).toBeUndefined();

    // appeal data checks
    expect(
      planningPermissionFullHouseholderSubmission.data.appeal,
    ).toBeUndefined();
  });

  // 02 The application is validated in BOPS - it passes - so it goes straight to consultation/assessment depending on application type
  it("Generates an error if we request a valid application still in the validation stage", () => {
    expect(() => {
      generateDprApplication({
        applicationType: "pp.full.householder",
        applicationStage: "validation",
        applicationStatus: "undetermined",
      });
    }).toThrow(
      "Invalid application stage (validation) and status (undetermined) - validated applications go straight to consultation or assessment",
    );
  });

  // 02-validation-01-invalid The application is validated in BOPS - uhoh it fails so its now returned
  it("Generates the correct structure for a post-submission application that has failed validation", () => {
    const { returned } = generateExampleApplications();
    const planningPermissionFullHouseholderValidationFail = returned;

    // basic checks
    expect(
      planningPermissionFullHouseholderValidationFail.applicationType,
    ).toEqual("pp.full.householder");
    expect(
      planningPermissionFullHouseholderValidationFail.metadata.publishedAt,
    ).toBeDefined();
    expect(
      Object.values(planningPermissionFullHouseholderValidationFail.submission)
        .length,
    ).toBeGreaterThan(0);

    // application section checks
    expect(
      planningPermissionFullHouseholderValidationFail.data.application
        .reference,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderValidationFail.data.application.stage,
    ).toEqual("validation");
    expect(
      planningPermissionFullHouseholderValidationFail.data.application.status,
    ).toEqual("returned");

    // submission data checks
    expect(
      planningPermissionFullHouseholderValidationFail.data.submission
        .submittedAt,
    ).toBeDefined();

    // validation data checks
    expect(
      planningPermissionFullHouseholderValidationFail.data.validation
        ?.receivedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderValidationFail.data.validation
        ?.validatedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderValidationFail.data.validation?.isValid,
    ).toBe(false);

    // consultation data checks
    expect(
      planningPermissionFullHouseholderValidationFail.data.consultation,
    ).toBeUndefined();

    // assessment data checks
    expect(
      planningPermissionFullHouseholderValidationFail.data.assessment,
    ).toBeUndefined();

    // appeal data checks
    expect(
      planningPermissionFullHouseholderValidationFail.data.appeal,
    ).toBeUndefined();
  });

  // 03-consultation Applications move immediately into consultation from validation except for those that don't have consultation stage (ldc) which go to assessment
  it("Generates the correct structure for a valid post-submission that is in consultation", () => {
    // throws an error for the wrong application type
    expect(() => {
      generateDprApplication({
        applicationType: "ldc.proposed",
        customStatus: "consultationInProgress",
      });
    }).toThrow(
      "Invalid application stage (consultation) for application type ldc - this application type does not have a consultation stage",
    );

    const { consultation } = generateExampleApplications();
    const planningPermissionFullHouseholderConsultation = consultation;

    // basic checks
    expect(
      planningPermissionFullHouseholderConsultation.applicationType,
    ).toEqual("pp.full.householder");
    expect(
      planningPermissionFullHouseholderConsultation.metadata.publishedAt,
    ).toBeDefined();
    expect(
      Object.values(planningPermissionFullHouseholderConsultation.submission)
        .length,
    ).toBeGreaterThan(0);

    // application section checks
    expect(
      planningPermissionFullHouseholderConsultation.data.application.reference,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderConsultation.data.application.stage,
    ).toEqual("consultation");
    expect(
      planningPermissionFullHouseholderConsultation.data.application.status,
    ).toEqual("undetermined");

    // submission data checks
    expect(
      planningPermissionFullHouseholderConsultation.data.submission.submittedAt,
    ).toBeDefined();

    // validation data checks
    expect(
      planningPermissionFullHouseholderConsultation.data.validation?.receivedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderConsultation.data.validation
        ?.validatedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderConsultation.data.validation?.isValid,
    ).toBe(true);

    // consultation data checks
    expect(
      planningPermissionFullHouseholderConsultation.data.consultation
        ?.startDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderConsultation.data.consultation?.endDate,
    ).toBeDefined();
    const startDate =
      planningPermissionFullHouseholderConsultation.data.consultation
        ?.startDate ?? "";
    const endDate =
      planningPermissionFullHouseholderConsultation.data.consultation
        ?.endDate ?? "";
    checkConsultationDates(startDate, endDate);
    checkConsultationInProgress(startDate, endDate);

    // assessment data checks
    expect(
      planningPermissionFullHouseholderConsultation.data.assessment,
    ).toBeUndefined();

    // appeal data checks
    expect(
      planningPermissionFullHouseholderConsultation.data.appeal,
    ).toBeUndefined();
  });

  // 04-assessment-00-assessment-in-progress Applications now moves to assessment and comments are no longer allowed unless the council allows it until a decision is made (ldc)
  it("Generates the correct structure for a valid post-submission that is in assessment", () => {
    const { assessmentInProgress } = generateExampleApplications();
    const planningPermissionFullHouseholderAssessmentInProgress =
      assessmentInProgress;

    // basic checks
    expect(
      planningPermissionFullHouseholderAssessmentInProgress.applicationType,
    ).toEqual("pp.full.householder");
    expect(
      planningPermissionFullHouseholderAssessmentInProgress.metadata
        .publishedAt,
    ).toBeDefined();
    expect(
      Object.values(
        planningPermissionFullHouseholderAssessmentInProgress.submission,
      ).length,
    ).toBeGreaterThan(0);

    // application section checks
    expect(
      planningPermissionFullHouseholderAssessmentInProgress.data.application
        .reference,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentInProgress.data.application
        .stage,
    ).toEqual("assessment");
    expect(
      planningPermissionFullHouseholderAssessmentInProgress.data.application
        .status,
    ).toEqual("undetermined");

    // submission data checks
    expect(
      planningPermissionFullHouseholderAssessmentInProgress.data.submission
        .submittedAt,
    ).toBeDefined();

    // validation data checks
    expect(
      planningPermissionFullHouseholderAssessmentInProgress.data.validation
        ?.receivedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentInProgress.data.validation
        ?.validatedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentInProgress.data.validation
        ?.isValid,
    ).toBe(true);

    // consultation data checks
    expect(
      planningPermissionFullHouseholderAssessmentInProgress.data.consultation
        ?.startDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentInProgress.data.consultation
        ?.endDate,
    ).toBeDefined();
    const startDate =
      planningPermissionFullHouseholderAssessmentInProgress.data.consultation
        ?.startDate ?? "";
    const endDate =
      planningPermissionFullHouseholderAssessmentInProgress.data.consultation
        ?.endDate ?? "";
    checkConsultationDates(startDate, endDate);

    // assessment data checks
    expect(
      planningPermissionFullHouseholderAssessmentInProgress.data.assessment
        ?.expiryDate,
    ).toBeDefined();
    expect(
      Object.keys(
        planningPermissionFullHouseholderAssessmentInProgress.data
          .assessment as PostSubmissionAssessment,
      ),
    ).toHaveLength(1);

    // appeal data checks
    expect(
      planningPermissionFullHouseholderAssessmentInProgress.data.appeal,
    ).toBeUndefined();

    const {
      assessmentInProgress:
        PriorApprovalLargerExtensionAssessmentAssessmentInProgress,
    } = generateExampleApplications("pa.part1.classA");
    const paAssessment =
      PriorApprovalLargerExtensionAssessmentAssessmentInProgress.data
        .assessment as PriorApprovalAssessment;

    expect(paAssessment.expiryDate).toBeDefined();
    expect(Object.values(paAssessment)).toHaveLength(1);
  });

  // 04-assessment-01-council-determined council makes a decision on the application (comments are no longer allowed for those exempted per council)
  it("Generates the correct structure for a valid post-submission that is council determined", () => {
    const { planningOfficerDetermined } = generateExampleApplications();
    const planningPermissionFullHouseholderAssessmentCouncilDetermined =
      planningOfficerDetermined;

    // basic checks
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.applicationType,
    ).toEqual("pp.full.householder");
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.metadata
        .publishedAt,
    ).toBeDefined();
    expect(
      Object.values(
        planningPermissionFullHouseholderAssessmentCouncilDetermined.submission,
      ).length,
    ).toBeGreaterThan(0);

    // application section checks
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .application.reference,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .application.stage,
    ).toEqual("assessment");
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .application.status,
    ).toEqual("determined");

    // submission data checks
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .submission.submittedAt,
    ).toBeDefined();

    // validation data checks
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .validation?.receivedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .validation?.validatedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .validation?.isValid,
    ).toBe(true);

    // consultation data checks
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .consultation?.startDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .consultation?.endDate,
    ).toBeDefined();
    const startDate =
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .consultation?.startDate ?? "";
    const endDate =
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .consultation?.endDate ?? "";
    checkConsultationDates(startDate, endDate);
    // assessment data checks
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .assessment?.expiryDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .assessment?.planningOfficerDecision,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .assessment?.planningOfficerDecisionDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .assessment?.decisionNotice?.url,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .assessment?.planningOfficerRecommendation,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .assessment?.committeeSentDate,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .assessment?.committeeDecision,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .assessment?.committeeDecisionDate,
    ).not.toBeDefined();
    // pretend its PA type to get tests to not error
    const ppAssessment =
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .assessment as unknown as PriorApprovalAssessment;
    expect(ppAssessment.priorApprovalRequired).not.toBeDefined();

    // appeal data checks
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data.appeal,
    ).toBeUndefined();

    const {
      planningOfficerDetermined:
        PriorApprovalLargerExtensionAssessmentCouncilDetermined,
    } = generateExampleApplications("pa.part1.classA");
    const paAssessment = PriorApprovalLargerExtensionAssessmentCouncilDetermined
      .data.assessment as PriorApprovalAssessment;
    expect(paAssessment.priorApprovalRequired).toBeDefined();
    expect(paAssessment.expiryDate).toBeDefined();
  });

  // 04-assessment-02-assessment-in-committee Alternatively application goes to committee for a decision
  it("Generates the correct structure for a valid post-submission that is being assessed by committee", () => {
    const { assessmentInCommittee } = generateExampleApplications();
    const planningPermissionFullHouseholderAssessmentInCommittee =
      assessmentInCommittee;

    // basic checks
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.applicationType,
    ).toEqual("pp.full.householder");
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.metadata
        .publishedAt,
    ).toBeDefined();
    expect(
      Object.values(
        planningPermissionFullHouseholderAssessmentInCommittee.submission,
      ).length,
    ).toBeGreaterThan(0);

    // application section checks
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.application
        .reference,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.application
        .stage,
    ).toEqual("assessment");
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.application
        .status,
    ).toEqual("undetermined");

    // submission data checks
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.submission
        .submittedAt,
    ).toBeDefined();

    // validation data checks
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.validation
        ?.receivedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.validation
        ?.validatedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.validation
        ?.isValid,
    ).toBe(true);

    // consultation data checks
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.consultation
        ?.startDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.consultation
        ?.endDate,
    ).toBeDefined();
    const startDate =
      planningPermissionFullHouseholderAssessmentInCommittee.data.consultation
        ?.startDate ?? "";
    const endDate =
      planningPermissionFullHouseholderAssessmentInCommittee.data.consultation
        ?.endDate ?? "";
    checkConsultationDates(startDate, endDate);
    // assessment data checks
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.assessment
        ?.expiryDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.assessment
        ?.planningOfficerDecision,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.assessment
        ?.planningOfficerDecisionDate,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.assessment
        ?.decisionNotice?.url,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.assessment
        ?.planningOfficerRecommendation,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.assessment
        ?.committeeSentDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.assessment
        ?.committeeDecision,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.assessment
        ?.committeeDecisionDate,
    ).not.toBeDefined();

    // appeal data checks
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.appeal,
    ).toBeUndefined();
  });

  // 04-assessment-03-committee-determined The committee then makes a decision
  it("Generates the correct structure for a valid post-submission that is commitee determined", () => {
    const { committeeDetermined } = generateExampleApplications();
    const planningPermissionFullHouseholderAssessmentCommitteeDetermined =
      committeeDetermined;

    // basic checks
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.applicationType,
    ).toEqual("pp.full.householder");
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.metadata
        .publishedAt,
    ).toBeDefined();
    expect(
      Object.values(
        planningPermissionFullHouseholderAssessmentCommitteeDetermined.submission,
      ).length,
    ).toBeGreaterThan(0);

    // application section checks
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .application.reference,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .application.stage,
    ).toEqual("assessment");
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .application.status,
    ).toEqual("determined");

    // submission data checks
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .submission.submittedAt,
    ).toBeDefined();

    // validation data checks
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .validation?.receivedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .validation?.validatedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .validation?.isValid,
    ).toBe(true);

    // consultation data checks
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .consultation?.startDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .consultation?.endDate,
    ).toBeDefined();
    const startDate =
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .consultation?.startDate ?? "";
    const endDate =
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .consultation?.endDate ?? "";
    checkConsultationDates(startDate, endDate);

    // assessment data checks
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .assessment?.expiryDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .assessment?.planningOfficerDecision,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .assessment?.planningOfficerDecisionDate,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .assessment?.decisionNotice?.url,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .assessment?.planningOfficerRecommendation,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .assessment?.committeeSentDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .assessment?.committeeDecision,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .assessment?.committeeDecisionDate,
    ).toBeDefined();

    // appeal data checks
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .appeal,
    ).toBeUndefined();
  });

  // 05-appeal-00-appeal-lodged Things can end before this but within 6 months of the decision a decision can be appealed
  it("Generates the correct structure for a valid post-submission that has an appeal lodged", () => {
    const { appealLodged } = generateExampleApplications();
    const planningPermissionFullHouseholderAppealLodged = appealLodged;
    // basic checks
    expect(
      planningPermissionFullHouseholderAppealLodged.applicationType,
    ).toEqual("pp.full.householder");
    expect(
      planningPermissionFullHouseholderAppealLodged.metadata.publishedAt,
    ).toBeDefined();
    expect(
      Object.values(planningPermissionFullHouseholderAppealLodged.submission)
        .length,
    ).toBeGreaterThan(0);

    // application section checks
    expect(
      planningPermissionFullHouseholderAppealLodged.data.application.reference,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.application.stage,
    ).toEqual("appeal");
    expect(
      planningPermissionFullHouseholderAppealLodged.data.application.status,
    ).toEqual("determined");

    // submission data checks
    expect(
      planningPermissionFullHouseholderAppealLodged.data.submission.submittedAt,
    ).toBeDefined();

    // validation data checks
    expect(
      planningPermissionFullHouseholderAppealLodged.data.validation?.receivedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.validation
        ?.validatedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.validation?.isValid,
    ).toBe(true);

    // consultation data checks
    expect(
      planningPermissionFullHouseholderAppealLodged.data.consultation
        ?.startDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.consultation?.endDate,
    ).toBeDefined();
    const startDate =
      planningPermissionFullHouseholderAppealLodged.data.consultation
        ?.startDate ?? "";
    const endDate =
      planningPermissionFullHouseholderAppealLodged.data.consultation
        ?.endDate ?? "";
    checkConsultationDates(startDate, endDate);

    // assessment data checks
    expect(
      planningPermissionFullHouseholderAppealLodged.data.assessment?.expiryDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.assessment
        ?.planningOfficerDecision,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.assessment
        ?.planningOfficerDecisionDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.assessment
        ?.decisionNotice?.url,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.assessment
        ?.planningOfficerRecommendation,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.assessment
        ?.committeeSentDate,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.assessment
        ?.committeeDecision,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.assessment
        ?.committeeDecisionDate,
    ).not.toBeDefined();

    // appeal data checks
    expect(
      planningPermissionFullHouseholderAppealLodged.data.appeal?.lodgedDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.appeal?.reason,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.appeal?.validatedDate,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.appeal?.startedDate,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.appeal?.decisionDate,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.appeal?.decision,
    ).not.toBeDefined();
  });

  // 05-appeal-01-appeal-validated After the appeal starts its validated
  it("Generates the correct structure for a valid post-submission that has a validated appeal lodged", () => {
    const { appealValid } = generateExampleApplications();
    const planningPermissionFullHouseholderAppealValidated = appealValid;
    // basic checks
    expect(
      planningPermissionFullHouseholderAppealValidated.applicationType,
    ).toEqual("pp.full.householder");
    expect(
      planningPermissionFullHouseholderAppealValidated.metadata.publishedAt,
    ).toBeDefined();
    expect(
      Object.values(planningPermissionFullHouseholderAppealValidated.submission)
        .length,
    ).toBeGreaterThan(0);

    // application section checks
    expect(
      planningPermissionFullHouseholderAppealValidated.data.application
        .reference,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.application.stage,
    ).toEqual("appeal");
    expect(
      planningPermissionFullHouseholderAppealValidated.data.application.status,
    ).toEqual("determined");

    // submission data checks
    expect(
      planningPermissionFullHouseholderAppealValidated.data.submission
        .submittedAt,
    ).toBeDefined();

    // validation data checks
    expect(
      planningPermissionFullHouseholderAppealValidated.data.validation
        ?.receivedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.validation
        ?.validatedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.validation?.isValid,
    ).toBe(true);

    // consultation data checks
    expect(
      planningPermissionFullHouseholderAppealValidated.data.consultation
        ?.startDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.consultation
        ?.endDate,
    ).toBeDefined();
    const startDate =
      planningPermissionFullHouseholderAppealValidated.data.consultation
        ?.startDate ?? "";
    const endDate =
      planningPermissionFullHouseholderAppealValidated.data.consultation
        ?.endDate ?? "";
    checkConsultationDates(startDate, endDate);

    // assessment data checks
    expect(
      planningPermissionFullHouseholderAppealValidated.data.assessment
        ?.expiryDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.assessment
        ?.planningOfficerDecision,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.assessment
        ?.planningOfficerDecisionDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.assessment
        ?.decisionNotice?.url,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.assessment
        ?.planningOfficerRecommendation,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.assessment
        ?.committeeSentDate,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.assessment
        ?.committeeDecision,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.assessment
        ?.committeeDecisionDate,
    ).not.toBeDefined();

    // appeal data checks
    expect(
      planningPermissionFullHouseholderAppealValidated.data.appeal?.lodgedDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.appeal?.reason,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.appeal
        ?.validatedDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.appeal?.startedDate,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.appeal
        ?.decisionDate,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.appeal?.decision,
    ).not.toBeDefined();
  });

  // 05-appeal-02-appeal-started Then it starts
  it("Generates the correct structure for a valid post-submission that has a validated appeal in progress", () => {
    const { appealStarted } = generateExampleApplications();
    const planningPermissionFullHouseholderAppealStarted = appealStarted;
    // basic checks
    expect(
      planningPermissionFullHouseholderAppealStarted.applicationType,
    ).toEqual("pp.full.householder");
    expect(
      planningPermissionFullHouseholderAppealStarted.metadata.publishedAt,
    ).toBeDefined();
    expect(
      Object.values(planningPermissionFullHouseholderAppealStarted.submission)
        .length,
    ).toBeGreaterThan(0);

    // application section checks
    expect(
      planningPermissionFullHouseholderAppealStarted.data.application.reference,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.application.stage,
    ).toEqual("appeal");
    expect(
      planningPermissionFullHouseholderAppealStarted.data.application.status,
    ).toEqual("determined");

    // submission data checks
    expect(
      planningPermissionFullHouseholderAppealStarted.data.submission
        .submittedAt,
    ).toBeDefined();

    // validation data checks
    expect(
      planningPermissionFullHouseholderAppealStarted.data.validation
        ?.receivedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.validation
        ?.validatedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.validation?.isValid,
    ).toBe(true);

    // consultation data checks
    expect(
      planningPermissionFullHouseholderAppealStarted.data.consultation
        ?.startDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.consultation?.endDate,
    ).toBeDefined();
    const startDate =
      planningPermissionFullHouseholderAppealStarted.data.consultation
        ?.startDate ?? "";
    const endDate =
      planningPermissionFullHouseholderAppealStarted.data.consultation
        ?.endDate ?? "";
    checkConsultationDates(startDate, endDate);

    // assessment data checks
    expect(
      planningPermissionFullHouseholderAppealStarted.data.assessment
        ?.expiryDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.assessment
        ?.planningOfficerDecision,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.assessment
        ?.planningOfficerDecisionDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.assessment
        ?.decisionNotice?.url,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.assessment
        ?.planningOfficerRecommendation,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.assessment
        ?.committeeSentDate,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.assessment
        ?.committeeDecision,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.assessment
        ?.committeeDecisionDate,
    ).not.toBeDefined();

    // appeal data checks
    expect(
      planningPermissionFullHouseholderAppealStarted.data.appeal?.lodgedDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.appeal?.reason,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.appeal?.validatedDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.appeal?.startedDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.appeal?.decisionDate,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.appeal?.decision,
    ).not.toBeDefined();
  });

  // 05-appeal-03-appeal-determined and a decision is made by the appeal
  it("Generates the correct structure for a valid post-submission that has a validated appeal decision", () => {
    const {
      appealDetermined,
      appealDeterminedWithdrawn,
      appealDeterminedAllowed,
      appealDeterminedDismissed,
      appealDeterminedSplitDecision,
    } = generateExampleApplications();
    const planningPermissionFullHouseholderAppealDetermined = appealDetermined;
    // basic checks
    expect(
      planningPermissionFullHouseholderAppealDetermined.applicationType,
    ).toEqual("pp.full.householder");
    expect(
      planningPermissionFullHouseholderAppealDetermined.metadata.publishedAt,
    ).toBeDefined();
    expect(
      Object.values(
        planningPermissionFullHouseholderAppealDetermined.submission,
      ).length,
    ).toBeGreaterThan(0);

    // application section checks
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.application
        .reference,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.application.stage,
    ).toEqual("appeal");
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.application.status,
    ).toEqual("determined");

    // submission data checks
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.submission
        .submittedAt,
    ).toBeDefined();

    // validation data checks
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.validation
        ?.receivedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.validation
        ?.validatedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.validation
        ?.isValid,
    ).toBe(true);

    // consultation data checks
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.consultation
        ?.startDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.consultation
        ?.endDate,
    ).toBeDefined();
    const startDate =
      planningPermissionFullHouseholderAppealDetermined.data.consultation
        ?.startDate ?? "";
    const endDate =
      planningPermissionFullHouseholderAppealDetermined.data.consultation
        ?.endDate ?? "";
    checkConsultationDates(startDate, endDate);

    // assessment data checks
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.assessment
        ?.expiryDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.assessment
        ?.planningOfficerDecision,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.assessment
        ?.planningOfficerDecisionDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.assessment
        ?.decisionNotice?.url,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.assessment
        ?.planningOfficerRecommendation,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.assessment
        ?.committeeSentDate,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.assessment
        ?.committeeDecision,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.assessment
        ?.committeeDecisionDate,
    ).not.toBeDefined();

    // appeal data checks
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.appeal?.lodgedDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.appeal?.reason,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.appeal
        ?.validatedDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.appeal
        ?.startedDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.appeal
        ?.decisionDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.appeal?.decision,
    ).toBeDefined();

    // 05-appeal-03-appeal-determined--withdrawn
    const planningPermissionFullHouseholderAppealDeterminedWithdrawn =
      appealDeterminedWithdrawn;
    expect(
      planningPermissionFullHouseholderAppealDeterminedWithdrawn.data.appeal
        ?.decision,
    ).toBe("withdrawn");

    // 05-appeal-03-appeal-determined--allowed
    const planningPermissionFullHouseholderAppealDeterminedAllowed =
      appealDeterminedAllowed;
    expect(
      planningPermissionFullHouseholderAppealDeterminedAllowed.data.appeal
        ?.decision,
    ).toBe("allowed");

    // 05-appeal-03-appeal-determined--dismissed
    const planningPermissionFullHouseholderAppealDeterminedDismissed =
      appealDeterminedDismissed;
    expect(
      planningPermissionFullHouseholderAppealDeterminedDismissed.data.appeal
        ?.decision,
    ).toBe("dismissed");

    // 05-appeal-03-appeal-determined--split-decision
    const planningPermissionFullHouseholderAppealDeterminedSplitDecision =
      appealDeterminedSplitDecision;
    expect(
      planningPermissionFullHouseholderAppealDeterminedSplitDecision.data.appeal
        ?.decision,
    ).toBe("splitDecision");
  });

  // 06-assessment-withdrawn
  it("Generates the correct structure for a valid post-submission that has been withdrawn ", () => {
    const { withdrawn } = generateExampleApplications();
    const planningPermissionFullHouseholderWithdrawn = withdrawn;

    // basic checks
    expect(planningPermissionFullHouseholderWithdrawn.applicationType).toEqual(
      "pp.full.householder",
    );
    expect(
      planningPermissionFullHouseholderWithdrawn.metadata.publishedAt,
    ).toBeDefined();
    expect(
      Object.values(planningPermissionFullHouseholderWithdrawn.submission)
        .length,
    ).toBeGreaterThan(0);

    // application section checks
    expect(
      planningPermissionFullHouseholderWithdrawn.data.application.reference,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderWithdrawn.data.application.stage,
    ).toEqual("assessment");
    expect(
      planningPermissionFullHouseholderWithdrawn.data.application.status,
    ).toEqual("withdrawn");
    expect(
      planningPermissionFullHouseholderWithdrawn.data.application.withdrawnAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderWithdrawn.data.application
        .withdrawnReason,
    ).toBeDefined();

    // submission data checks
    expect(
      planningPermissionFullHouseholderWithdrawn.data.submission.submittedAt,
    ).toBeDefined();

    // validation data checks
    expect(
      planningPermissionFullHouseholderWithdrawn.data.validation?.receivedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderWithdrawn.data.validation?.validatedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderWithdrawn.data.validation?.isValid,
    ).toBe(true);

    // consultation data checks
    expect(
      planningPermissionFullHouseholderWithdrawn.data.consultation?.startDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderWithdrawn.data.consultation?.endDate,
    ).toBeDefined();
    const startDate =
      planningPermissionFullHouseholderWithdrawn.data.consultation?.startDate ??
      "";
    const endDate =
      planningPermissionFullHouseholderWithdrawn.data.consultation?.endDate ??
      "";
    checkConsultationDates(startDate, endDate);

    // assessment data checks
    expect(
      planningPermissionFullHouseholderWithdrawn.data.assessment?.expiryDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderWithdrawn.data.assessment
        ?.planningOfficerDecision,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderWithdrawn.data.assessment
        ?.planningOfficerDecisionDate,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderWithdrawn.data.assessment?.decisionNotice
        ?.url,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderWithdrawn.data.assessment
        ?.planningOfficerRecommendation,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderWithdrawn.data.assessment
        ?.committeeSentDate,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderWithdrawn.data.assessment
        ?.committeeDecision,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderWithdrawn.data.assessment
        ?.committeeDecisionDate,
    ).not.toBeDefined();

    // appeal data checks
    expect(
      planningPermissionFullHouseholderWithdrawn.data.appeal,
    ).toBeUndefined();
  });

  it("Certain application types don't have consultation phases", () => {
    const lawfulDevelopmentCertificateProposedAssessmentCouncilDetermined =
      generateDprApplication({
        applicationType: "ldc.proposed",
        customStatus: "assessmentCouncilDetermined",
      });
    expect(
      lawfulDevelopmentCertificateProposedAssessmentCouncilDetermined.data
        .consultation,
    ).toBeUndefined();
  });

  it("Certain local authorities allow comments until the decision is made", () => {
    const planningPermissionFullHouseholderAssessmentInProgress =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "assessmentInProgress",
      });
    expect(
      planningPermissionFullHouseholderAssessmentInProgress.data
        .localPlanningAuthority.commentsAcceptedUntilDecision,
    ).toBe(false);

    const lawfulDevelopmentCertificateProposedAssessmentInProgress =
      generateDprApplication({
        applicationType: "ldc.proposed",
        customStatus: "assessmentInProgress",
      });

    expect(
      lawfulDevelopmentCertificateProposedAssessmentInProgress.data
        .localPlanningAuthority.commentsAcceptedUntilDecision,
    ).toBe(true);
  });

  it.skip("Generates valid JSON files", () => {
    const planningPermissionFullHouseholder = generateExampleApplications(
      "pp.full.householder",
    );

    const priorApprovalLargerExtension =
      generateExampleApplications("pa.part1.classA");

    const lawfulDevelopmentCertificateProposed =
      generateExampleApplications("ldc.proposed");

    // 01-submission
    // 01 the application is submitted via planX into BOPS
    saveApplicationToJson(
      planningPermissionFullHouseholder.submission,
      path.join(__dirname, "fullHouseholder-01-submission.json"),
    );
    saveApplicationToJson(
      priorApprovalLargerExtension.submission,
      path.join(__dirname, "largerExtension-01-submission.json"),
    );
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposed.submission,
      path.join(__dirname, "proposed-01-submission.json"),
    );

    // 02-validation-01-invalid
    // 02 The application is validated in BOPS - it passes - so it goes straight to consultation/assessment depending on application type
    // 02.01 The application is validated in BOPS - uhoh it fails so its now returned

    const planningPermissionFullHouseholderValidationFail =
      generateDprApplication({
        applicationType: "pp.full.householder",
        applicationStage: "validation",
        applicationStatus: "returned",
      });
    saveApplicationToJson(
      planningPermissionFullHouseholderValidationFail,
      path.join(__dirname, "fullHouseholder-02-validation-01-invalid.json"),
    );

    const priorApprovalLargerExtensionValidationFail = generateDprApplication({
      applicationType: "pa.part1.classA",
      applicationStage: "validation",
      applicationStatus: "returned",
    });
    saveApplicationToJson(
      priorApprovalLargerExtensionValidationFail,
      path.join(__dirname, "largerExtension-02-validation-01-invalid.json"),
    );

    const lawfulDevelopmentCertificateProposedValidationFail =
      generateDprApplication({
        applicationType: "ldc.proposed",
        applicationStage: "validation",
        applicationStatus: "returned",
      });
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposedValidationFail,
      path.join(__dirname, "proposed-02-validation-01-invalid.json"),
    );

    // 03-consultation
    // 03 Applications move immediately into consultation from validation except for those that don't have consultation stage (ldc) which go to assessment
    saveApplicationToJson(
      planningPermissionFullHouseholder.consultation,
      path.join(__dirname, "fullHouseholder-03-consultation.json"),
    );
    saveApplicationToJson(
      priorApprovalLargerExtension.consultation,
      path.join(__dirname, "largerExtension-03-consultation.json"),
    );

    // 04-assessment-00-assessment-in-progress
    // 04 Applications now moves to assessment and comments are no longer allowed unless the council allows it until a decision is made (ldc)

    saveApplicationToJson(
      planningPermissionFullHouseholder.assessmentInProgress,
      path.join(
        __dirname,
        "fullHouseholder-04-assessment-00-assessment-in-progress.json",
      ),
    );
    saveApplicationToJson(
      priorApprovalLargerExtension.assessmentInProgress,
      path.join(
        __dirname,
        "largerExtension-04-assessment-00-assessment-in-progress.json",
      ),
    );
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposed.assessmentInProgress,
      path.join(
        __dirname,
        "proposed-04-assessment-00-assessment-in-progress.json",
      ),
    );

    // 04-assessment-01-council-determined
    // 04 01 council makes a decision on the application (comments are no longer allowed for those exempted per council)
    saveApplicationToJson(
      planningPermissionFullHouseholder.planningOfficerDetermined,
      path.join(
        __dirname,
        "fullHouseholder-04-assessment-01-council-determined.json",
      ),
    );
    saveApplicationToJson(
      priorApprovalLargerExtension.planningOfficerDetermined,
      path.join(
        __dirname,
        "largerExtension-04-assessment-01-council-determined.json",
      ),
    );
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposed.planningOfficerDetermined,
      path.join(__dirname, "proposed-04-assessment-01-council-determined.json"),
    );

    // 04-assessment-02-assessment-in-committee
    // 04 02 Alternatively application goes to committee for a decision

    saveApplicationToJson(
      planningPermissionFullHouseholder.assessmentInCommittee,
      path.join(
        __dirname,
        "fullHouseholder-04-assessment-02-assessment-in-committee.json",
      ),
    );
    saveApplicationToJson(
      priorApprovalLargerExtension.assessmentInCommittee,
      path.join(
        __dirname,
        "largerExtension-04-assessment-02-assessment-in-committee.json",
      ),
    );
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposed.assessmentInCommittee,
      path.join(
        __dirname,
        "proposed-04-assessment-02-assessment-in-committee.json",
      ),
    );

    // 04-assessment-03-committee-determined
    // 04 03 The committee then makes a decision

    saveApplicationToJson(
      planningPermissionFullHouseholder.committeeDetermined,
      path.join(
        __dirname,
        "fullHouseholder-04-assessment-03-committee-determined.json",
      ),
    );
    saveApplicationToJson(
      priorApprovalLargerExtension.committeeDetermined,
      path.join(
        __dirname,
        "largerExtension-04-assessment-03-committee-determined.json",
      ),
    );
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposed.committeeDetermined,
      path.join(
        __dirname,
        "proposed-04-assessment-03-committee-determined.json",
      ),
    );

    // 05-appeal-00-appeal-lodged
    // 05 Things can end before this but within 6 months of the decision a decision can be appealed
    saveApplicationToJson(
      planningPermissionFullHouseholder.appealLodged,
      path.join(__dirname, "fullHouseholder-05-appeal-00-appeal-lodged.json"),
    );
    saveApplicationToJson(
      priorApprovalLargerExtension.appealLodged,
      path.join(__dirname, "largerExtension-05-appeal-00-appeal-lodged.json"),
    );
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposed.appealLodged,
      path.join(__dirname, "proposed-05-appeal-00-appeal-lodged.json"),
    );

    // 05-appeal-01-appeal-validated
    // 05 01 After the appeal starts its validated

    saveApplicationToJson(
      planningPermissionFullHouseholder.appealValid,
      path.join(
        __dirname,
        "fullHouseholder-05-appeal-01-appeal-validated.json",
      ),
    );
    saveApplicationToJson(
      priorApprovalLargerExtension.appealValid,
      path.join(
        __dirname,
        "largerExtension-05-appeal-01-appeal-validated.json",
      ),
    );
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposed.appealValid,
      path.join(__dirname, "proposed-05-appeal-01-appeal-validated.json"),
    );

    // 05-appeal-02-appeal-started
    // 05 02 Then it starts

    saveApplicationToJson(
      planningPermissionFullHouseholder.appealStarted,
      path.join(__dirname, "fullHouseholder-05-appeal-02-appeal-started.json"),
    );
    saveApplicationToJson(
      priorApprovalLargerExtension.appealStarted,
      path.join(__dirname, "largerExtension-05-appeal-02-appeal-started.json"),
    );
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposed.appealStarted,
      path.join(__dirname, "proposed-05-appeal-02-appeal-started.json"),
    );

    // 05-appeal-03-appeal-determined
    // 05 03 and a decision is made by the appeal

    saveApplicationToJson(
      planningPermissionFullHouseholder.appealDetermined,
      path.join(
        __dirname,
        "fullHouseholder-05-appeal-03-appeal-determined.json",
      ),
    );
    saveApplicationToJson(
      priorApprovalLargerExtension.appealDetermined,
      path.join(
        __dirname,
        "largerExtension-05-appeal-03-appeal-determined.json",
      ),
    );
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposed.appealDetermined,
      path.join(__dirname, "proposed-05-appeal-03-appeal-determined.json"),
    );

    // 06-assessment-withdrawn

    saveApplicationToJson(
      planningPermissionFullHouseholder.withdrawn,
      path.join(__dirname, "fullHouseholder-06-assessment-withdrawn.json"),
    );

    saveApplicationToJson(
      priorApprovalLargerExtension.withdrawn,
      path.join(__dirname, "largerExtension-06-assessment-withdrawn.json"),
    );

    saveApplicationToJson(
      lawfulDevelopmentCertificateProposed.withdrawn,
      path.join(__dirname, "proposed-06-assessment-withdrawn.json"),
    );
  });
});

describe("generateAllPossibleDates", () => {
  it("generates dates with consultationInProgress set to false", () => {
    const dates = generateAllPossibleDates(false);

    // Validate submission dates
    expect(dates.submission.submittedAt.isValid()).toBe(true);

    // Validate validation dates
    expect(
      dates.validation.receivedAt.isAfter(dates.submission.submittedAt),
    ).toBe(true);
    expect(
      dates.validation.validatedAt.isAfter(dates.validation.receivedAt),
    ).toBe(true);

    // Validate publishedAt
    expect(dates.publishedAt.isAfter(dates.validation.validatedAt)).toBe(true);

    // Validate consultation dates
    expect(
      dates.consultation.startAt.isSame(dates.validation.validatedAt),
    ).toBe(true);
    expect(dates.consultation.endAt.isAfter(dates.consultation.startAt)).toBe(
      true,
    );

    // Validate assessment dates
    expect(dates.assessment.expiryAt.isAfter(dates.consultation.endAt)).toBe(
      true,
    );
    expect(
      dates.assessment.planningOfficerDecisionAt.isAfter(
        dates.consultation.endAt,
      ),
    ).toBe(true);
    expect(
      dates.assessment.committeeSentAt.isAfter(
        dates.assessment.planningOfficerDecisionAt,
      ),
    ).toBe(true);
    expect(
      dates.assessment.committeeDecisionAt.isAfter(
        dates.assessment.committeeSentAt,
      ),
    ).toBe(true);

    // Validate appeal dates
    expect(
      dates.appeal.lodgedAt.isAfter(dates.assessment.committeeDecisionAt),
    ).toBe(true);
    expect(dates.appeal.validatedAt.isAfter(dates.appeal.lodgedAt)).toBe(true);
    expect(dates.appeal.startedAt.isAfter(dates.appeal.validatedAt)).toBe(true);
    expect(dates.appeal.decidedAt.isAfter(dates.appeal.startedAt)).toBe(true);
    expect(dates.appeal.withdrawnAt.isAfter(dates.appeal.lodgedAt)).toBe(true);

    // Validate application withdrawal date
    expect(
      dates.application.withdrawnAt.isAfter(dates.consultation.startAt),
    ).toBe(true);
    expect(
      dates.application.withdrawnAt.isBefore(
        dates.assessment.planningOfficerDecisionAt,
      ),
    ).toBe(true);
  });

  it("generates dates with consultationInProgress set to true", () => {
    const dates = generateAllPossibleDates(true);

    // Validate consultation start date is close to now
    const now = dayjs();
    expect(dates.consultation.startAt.isSameOrBefore(now)).toBe(true);
    expect(dates.consultation.startAt.isAfter(now.subtract(2, "day"))).toBe(
      true,
    );

    // Validate consultation end date
    expect(dates.consultation.endAt.isAfter(dates.consultation.startAt)).toBe(
      true,
    );

    // Validate other dates follow the same logic as when consultationInProgress is false
    expect(dates.assessment.expiryAt.isAfter(dates.consultation.endAt)).toBe(
      true,
    );
    expect(
      dates.assessment.planningOfficerDecisionAt.isAfter(
        dates.consultation.endAt,
      ),
    ).toBe(true);
    expect(
      dates.assessment.committeeSentAt.isAfter(
        dates.assessment.planningOfficerDecisionAt,
      ),
    ).toBe(true);
    expect(
      dates.assessment.committeeDecisionAt.isAfter(
        dates.assessment.committeeSentAt,
      ),
    ).toBe(true);
  });

  it("ensures appeal dates are sequential", () => {
    const dates = generateAllPossibleDates();

    expect(
      dates.appeal.lodgedAt.isAfter(dates.assessment.committeeDecisionAt),
    ).toBe(true);
    expect(dates.appeal.validatedAt.isAfter(dates.appeal.lodgedAt)).toBe(true);
    expect(dates.appeal.startedAt.isAfter(dates.appeal.validatedAt)).toBe(true);
    expect(dates.appeal.decidedAt.isAfter(dates.appeal.startedAt)).toBe(true);
    expect(dates.appeal.withdrawnAt.isAfter(dates.appeal.lodgedAt)).toBe(true);
  });

  it("ensures application withdrawal date is valid", () => {
    const dates = generateAllPossibleDates();

    expect(
      dates.application.withdrawnAt.isAfter(dates.consultation.startAt),
    ).toBe(true);
    expect(
      dates.application.withdrawnAt.isBefore(
        dates.assessment.planningOfficerDecisionAt,
      ),
    ).toBe(true);
  });
});

describe("generatePublicComment", () => {
  const sentimentValues: CommentSentiment[] = [
    "objection",
    "neutral",
    "supportive",
  ];

  it("returns a PublicComment with exactly 1 topic by default", () => {
    const comment = generatePublicComment();
    expect(typeof comment.id).toBe("number");

    expect(Array.isArray(comment.comment)).toBe(true);
    if (!Array.isArray(comment.comment)) {
      throw new Error("Expected comment.comment to be an array");
    }

    expect(comment.comment).toHaveLength(1);
  });

  it("respects the numberOfTopics parameter", () => {
    const n = 5;
    const comment = generatePublicComment(n);

    expect(Array.isArray(comment.comment)).toBe(true);
    if (!Array.isArray(comment.comment)) throw new Error("Expected array");
    expect(comment.comment).toHaveLength(n);
  });

  it("assigns a valid sentiment", () => {
    const comment = generatePublicComment(3);
    expect(comment.sentiment).toBeDefined();
    expect(sentimentValues).toContain(comment.sentiment as CommentSentiment);
  });

  it("uses only known topics", () => {
    const allowedTopics = COMMENT_PUBLIC_TOPIC_OPTIONS.map((o) => o.value);
    if (!Array.isArray(generatePublicComment(4).comment)) {
      throw new Error("Expected array");
    }
    const comment = generatePublicComment(4);
    const topics = comment.comment as TopicAndComments[];

    topics.forEach((tc: TopicAndComments) => {
      expect(allowedTopics).toContain(tc.topic);
      expect(typeof tc.question).toBe("string");
      expect(typeof tc.comment).toBe("string");
      expect(tc.comment.length).toBeGreaterThan(0);
    });
  });

  it("adds an author name", () => {
    const comment = generatePublicComment();
    expect(comment.author).toBeDefined();
    expect(typeof comment.author.name.singleLine).toBe("string");
    expect(comment.author.name.singleLine.length).toBeGreaterThan(0);
  });
});
