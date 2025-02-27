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
  AssessmentBase,
  PriorApprovalAssessment,
} from "@/types/odp-types/schemas/postSubmissionApplication/data/Assessment";
import { generateDprApplication } from "@mocks/dprNewApplicationFactory";
import fs from "fs";
import path from "path";

function saveApplicationToJson(application: object, filePath: string): void {
  const jsonData = JSON.stringify(application, null, 2);
  fs.writeFileSync(filePath, jsonData, "utf-8");
}

describe("generateDprApplication", () => {
  // 01 the application is submitted via planX into BOPS
  it("Generates the correct structure for a post-submission application just after submission", () => {
    const planningPermissionFullHouseholderSubmission = generateDprApplication({
      applicationType: "pp.full.householder",
      applicationStage: "submission",
    });

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

  // 02.01 The application is validated in BOPS - uhoh it fails so its now returned
  it("Generates the correct structure for a post-submission application that has failed validation", () => {
    const planningPermissionFullHouseholderValidationFail =
      generateDprApplication({
        applicationType: "pp.full.householder",
        applicationStage: "validation",
        applicationStatus: "returned",
      });

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

  // 03 Applications move immediately into consultation from validation except for those that don't have consultation stage (ldc) which go to assessment
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

    const planningPermissionFullHouseholderConsultation =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "consultationInProgress",
      });

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

    // assessment data checks
    expect(
      planningPermissionFullHouseholderConsultation.data.assessment,
    ).toBeUndefined();

    // appeal data checks
    expect(
      planningPermissionFullHouseholderConsultation.data.appeal,
    ).toBeUndefined();
  });

  // 04 Applications now moves to assessment and comments are no longer allowed unless the council allows it until a decision is made (ldc)
  it("Generates the correct structure for a valid post-submission that is in assessment", () => {
    const planningPermissionFullHouseholderAssessmentInProgress =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "assessmentInProgress",
      });

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

    // assessment data checks
    expect(
      planningPermissionFullHouseholderAssessmentInProgress.data.assessment,
    ).toBeUndefined();

    // appeal data checks
    expect(
      planningPermissionFullHouseholderAssessmentInProgress.data.appeal,
    ).toBeUndefined();
  });

  // 04 01 council makes a decision on the application (comments are no longer allowed for those exempted per council)
  it("Generates the correct structure for a valid post-submission that is council determined", () => {
    const planningPermissionFullHouseholderAssessmentCouncilDetermined =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "assessmentCouncilDetermined",
      });

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

    // assessment data checks
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .assessment?.councilDecision,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .assessment?.councilDecisionDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .assessment?.decisionNotice?.url,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .assessment?.councilRecommendation,
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
    const ppAssessment =
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data
        .assessment as any;
    expect(ppAssessment.priorApprovalRequired).not.toBeDefined();

    // appeal data checks
    expect(
      planningPermissionFullHouseholderAssessmentCouncilDetermined.data.appeal,
    ).toBeUndefined();

    const PriorApprovalLargerExtensionAssessmentCouncilDetermined =
      generateDprApplication({
        applicationType: "pa.part1.classA",
        customStatus: "assessmentCouncilDetermined",
      });
    const paAssessment = PriorApprovalLargerExtensionAssessmentCouncilDetermined
      .data.assessment as PriorApprovalAssessment;
    expect(paAssessment.priorApprovalRequired).toBeDefined();
  });

  // 04 02 Alternatively application goes to committee for a decision
  it("Generates the correct structure for a valid post-submission that is being assessed by committee", () => {
    const planningPermissionFullHouseholderAssessmentInCommittee =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "assessmentInCommittee",
      });

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

    // assessment data checks
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.assessment
        ?.councilDecision,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.assessment
        ?.councilDecisionDate,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.assessment
        ?.decisionNotice?.url,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentInCommittee.data.assessment
        ?.councilRecommendation,
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

  // 04 03 The committee then makes a decision
  it("Generates the correct structure for a valid post-submission that is commitee determined", () => {
    const planningPermissionFullHouseholderAssessmentCommitteeDetermined =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "assessmentCommitteeDetermined",
      });

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

    // assessment data checks
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .assessment?.councilDecision,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .assessment?.councilDecisionDate,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .assessment?.decisionNotice?.url,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined.data
        .assessment?.councilRecommendation,
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

  // 05 Things can end before this but within 6 months of the decision a decision can be appealed
  it("Generates the correct structure for a valid post-submission that has an appeal lodged", () => {
    const planningPermissionFullHouseholderAppealLodged =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "appealLodged",
      });
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

    // assessment data checks
    expect(
      planningPermissionFullHouseholderAppealLodged.data.assessment
        ?.councilDecision,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.assessment
        ?.councilDecisionDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.assessment
        ?.decisionNotice?.url,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealLodged.data.assessment
        ?.councilRecommendation,
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

  // 05 01 After the appeal starts its validated
  it("Generates the correct structure for a valid post-submission that has a validated appeal lodged", () => {
    const planningPermissionFullHouseholderAppealValidated =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "appealValidated",
      });
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

    // assessment data checks
    expect(
      planningPermissionFullHouseholderAppealValidated.data.assessment
        ?.councilDecision,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.assessment
        ?.councilDecisionDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.assessment
        ?.decisionNotice?.url,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealValidated.data.assessment
        ?.councilRecommendation,
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

  // 05 02 Then it starts
  it("Generates the correct structure for a valid post-submission that has a validated appeal in progress", () => {
    const planningPermissionFullHouseholderAppealStarted =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "appealStarted",
      });
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

    // assessment data checks
    expect(
      planningPermissionFullHouseholderAppealStarted.data.assessment
        ?.councilDecision,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.assessment
        ?.councilDecisionDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.assessment
        ?.decisionNotice?.url,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealStarted.data.assessment
        ?.councilRecommendation,
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

  // 05 03 and a decision is made by the appeal
  it("Generates the correct structure for a valid post-submission that has a validated appeal decision", () => {
    const planningPermissionFullHouseholderAppealDetermined =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "appealDetermined",
      });
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

    // assessment data checks
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.assessment
        ?.councilDecision,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.assessment
        ?.councilDecisionDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.assessment
        ?.decisionNotice?.url,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealDetermined.data.assessment
        ?.councilRecommendation,
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
  });

  // 05 04 appeal is withdrawn
  it("Generates the correct structure for a valid post-submission that has a withdrawn appeal decision", () => {
    const planningPermissionFullHouseholderAppealWithdrawn =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "appealWithdrawn",
      });
    // basic checks
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.applicationType,
    ).toEqual("pp.full.householder");
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.metadata.publishedAt,
    ).toBeDefined();
    expect(
      Object.values(planningPermissionFullHouseholderAppealWithdrawn.submission)
        .length,
    ).toBeGreaterThan(0);

    // application section checks
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.application
        .reference,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.application.stage,
    ).toEqual("appeal");
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.application.status,
    ).toEqual("determined");

    // submission data checks
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.submission
        .submittedAt,
    ).toBeDefined();

    // validation data checks
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.validation
        ?.receivedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.validation
        ?.validatedAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.validation?.isValid,
    ).toBe(true);

    // consultation data checks
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.consultation
        ?.startDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.consultation
        ?.endDate,
    ).toBeDefined();

    // assessment data checks
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.assessment
        ?.councilDecision,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.assessment
        ?.councilDecisionDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.assessment
        ?.decisionNotice?.url,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.assessment
        ?.councilRecommendation,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.assessment
        ?.committeeSentDate,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.assessment
        ?.committeeDecision,
    ).not.toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.assessment
        ?.committeeDecisionDate,
    ).not.toBeDefined();

    // appeal data checks
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.appeal?.lodgedDate,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.appeal?.reason,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.appeal?.withdrawnAt,
    ).toBeDefined();
    expect(
      planningPermissionFullHouseholderAppealWithdrawn.data.appeal
        ?.withdrawnReason,
    ).toBeDefined();
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
    // 01 the application is submitted via planX into BOPS

    const planningPermissionFullHouseholderSubmission = generateDprApplication({
      applicationType: "pp.full.householder",
      applicationStage: "submission",
    });
    saveApplicationToJson(
      planningPermissionFullHouseholderSubmission,
      path.join(__dirname, "fullHouseholder-01-submission.json"),
    );

    const PriorApprovalLargerExtensionSubmission = generateDprApplication({
      applicationType: "pa.part1.classA",
      applicationStage: "submission",
    });
    saveApplicationToJson(
      PriorApprovalLargerExtensionSubmission,
      path.join(__dirname, "largerExtension-01-submission.json"),
    );

    const lawfulDevelopmentCertificateProposedSubmission =
      generateDprApplication({
        applicationType: "ldc.proposed",
        applicationStage: "submission",
      });
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposedSubmission,
      path.join(__dirname, "proposed-01-submission.json"),
    );

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

    const PriorApprovalLargerExtensionValidationFail = generateDprApplication({
      applicationType: "pa.part1.classA",
      applicationStage: "validation",
      applicationStatus: "returned",
    });
    saveApplicationToJson(
      PriorApprovalLargerExtensionValidationFail,
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

    // 03 Applications move immediately into consultation from validation except for those that don't have consultation stage (ldc) which go to assessment

    const planningPermissionFullHouseholderConsultation =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "consultationInProgress",
      });
    saveApplicationToJson(
      planningPermissionFullHouseholderConsultation,
      path.join(__dirname, "fullHouseholder-03-consultation.json"),
    );

    const PriorApprovalLargerExtensionConsultation = generateDprApplication({
      applicationType: "pa.part1.classA",
      customStatus: "consultationInProgress",
    });
    saveApplicationToJson(
      PriorApprovalLargerExtensionConsultation,
      path.join(__dirname, "largerExtension-03-consultation.json"),
    );

    // 04 Applications now moves to assessment and comments are no longer allowed unless the council allows it until a decision is made (ldc)

    const planningPermissionFullHouseholderAssessmentInProgress =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "assessmentInProgress",
      });
    saveApplicationToJson(
      planningPermissionFullHouseholderAssessmentInProgress,
      path.join(
        __dirname,
        "fullHouseholder-04-assessment-00-assessment-in-progress.json",
      ),
    );

    const PriorApprovalLargerExtensionAssessmentInProgress =
      generateDprApplication({
        applicationType: "pa.part1.classA",
        customStatus: "assessmentInProgress",
      });
    saveApplicationToJson(
      PriorApprovalLargerExtensionAssessmentInProgress,
      path.join(
        __dirname,
        "largerExtension-04-assessment-00-assessment-in-progress.json",
      ),
    );

    const lawfulDevelopmentCertificateProposedAssessmentInProgress =
      generateDprApplication({
        applicationType: "ldc.proposed",
        customStatus: "assessmentInProgress",
      });
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposedAssessmentInProgress,
      path.join(
        __dirname,
        "proposed-04-assessment-00-assessment-in-progress.json",
      ),
    );

    // 04 01 council makes a decision on the application (comments are no longer allowed for those exempted per council)

    const planningPermissionFullHouseholderAssessmentCouncilDetermined =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "assessmentCouncilDetermined",
      });
    saveApplicationToJson(
      planningPermissionFullHouseholderAssessmentCouncilDetermined,
      path.join(
        __dirname,
        "fullHouseholder-04-assessment-01-council-determined.json",
      ),
    );

    const PriorApprovalLargerExtensionAssessmentCouncilDetermined =
      generateDprApplication({
        applicationType: "pa.part1.classA",
        customStatus: "assessmentCouncilDetermined",
      });
    saveApplicationToJson(
      PriorApprovalLargerExtensionAssessmentCouncilDetermined,
      path.join(
        __dirname,
        "largerExtension-04-assessment-01-council-determined.json",
      ),
    );

    const lawfulDevelopmentCertificateProposedAssessmentCouncilDetermined =
      generateDprApplication({
        applicationType: "ldc.proposed",
        customStatus: "assessmentCouncilDetermined",
      });
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposedAssessmentCouncilDetermined,
      path.join(__dirname, "proposed-04-assessment-01-council-determined.json"),
    );

    // 04 02 Alternatively application goes to committee for a decision

    const planningPermissionFullHouseholderAssessmentInCommittee =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "assessmentInCommittee",
      });
    saveApplicationToJson(
      planningPermissionFullHouseholderAssessmentInCommittee,
      path.join(
        __dirname,
        "fullHouseholder-04-assessment-02-assessment-in-committee.json",
      ),
    );

    const PriorApprovalLargerExtensionAssessmentInCommittee =
      generateDprApplication({
        applicationType: "pa.part1.classA",
        customStatus: "assessmentInCommittee",
      });
    saveApplicationToJson(
      PriorApprovalLargerExtensionAssessmentInCommittee,
      path.join(
        __dirname,
        "largerExtension-04-assessment-02-assessment-in-committee.json",
      ),
    );

    const lawfulDevelopmentCertificateProposedAssessmentInCommittee =
      generateDprApplication({
        applicationType: "ldc.proposed",
        customStatus: "assessmentInCommittee",
      });
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposedAssessmentInCommittee,
      path.join(
        __dirname,
        "proposed-04-assessment-02-assessment-in-committee.json",
      ),
    );

    // 04 03 The committee then makes a decision
    const planningPermissionFullHouseholderAssessmentCommitteeDetermined =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "assessmentCommitteeDetermined",
      });
    saveApplicationToJson(
      planningPermissionFullHouseholderAssessmentCommitteeDetermined,
      path.join(
        __dirname,
        "fullHouseholder-04-assessment-03-committee-determined.json",
      ),
    );

    const PriorApprovalLargerExtensionAssessmentCommitteeDetermined =
      generateDprApplication({
        applicationType: "pa.part1.classA",
        customStatus: "assessmentCommitteeDetermined",
      });
    saveApplicationToJson(
      PriorApprovalLargerExtensionAssessmentCommitteeDetermined,
      path.join(
        __dirname,
        "largerExtension-04-assessment-03-committee-determined.json",
      ),
    );

    const lawfulDevelopmentCertificateProposedAssessmentCommitteeDetermined =
      generateDprApplication({
        applicationType: "ldc.proposed",
        customStatus: "assessmentCommitteeDetermined",
      });
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposedAssessmentCommitteeDetermined,
      path.join(
        __dirname,
        "proposed-04-assessment-03-committee-determined.json",
      ),
    );

    // 05 Things can end before this but within 6 months of the decision a decision can be appealed

    const planningPermissionFullHouseholderAppealLodged =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "appealLodged",
      });
    saveApplicationToJson(
      planningPermissionFullHouseholderAppealLodged,
      path.join(__dirname, "fullHouseholder-05-appeal-00-appeal-lodged.json"),
    );

    const PriorApprovalLargerExtensionAppealLodged = generateDprApplication({
      applicationType: "pa.part1.classA",
      customStatus: "appealLodged",
    });
    saveApplicationToJson(
      PriorApprovalLargerExtensionAppealLodged,
      path.join(__dirname, "largerExtension-05-appeal-00-appeal-lodged.json"),
    );

    const lawfulDevelopmentCertificateProposedAppealLodged =
      generateDprApplication({
        applicationType: "ldc.proposed",
        customStatus: "appealLodged",
      });
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposedAppealLodged,
      path.join(__dirname, "proposed-05-appeal-00-appeal-lodged.json"),
    );

    // 05 01 After the appeal starts its validated

    const planningPermissionFullHouseholderAppealValidated =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "appealValidated",
      });
    saveApplicationToJson(
      planningPermissionFullHouseholderAppealValidated,
      path.join(
        __dirname,
        "fullHouseholder-05-appeal-01-appeal-validated.json",
      ),
    );

    const PriorApprovalLargerExtensionAppealValidated = generateDprApplication({
      applicationType: "pa.part1.classA",
      customStatus: "appealValidated",
    });
    saveApplicationToJson(
      PriorApprovalLargerExtensionAppealValidated,
      path.join(
        __dirname,
        "largerExtension-05-appeal-01-appeal-validated.json",
      ),
    );

    const lawfulDevelopmentCertificateProposedAppealValidated =
      generateDprApplication({
        applicationType: "ldc.proposed",
        customStatus: "appealValidated",
      });
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposedAppealValidated,
      path.join(__dirname, "proposed-05-appeal-01-appeal-validated.json"),
    );

    // 05 02 Then it starts

    const planningPermissionFullHouseholderAppealStarted =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "appealStarted",
      });
    saveApplicationToJson(
      planningPermissionFullHouseholderAppealStarted,
      path.join(__dirname, "fullHouseholder-05-appeal-02-appeal-started.json"),
    );

    const PriorApprovalLargerExtensionAppealStarted = generateDprApplication({
      applicationType: "pa.part1.classA",
      customStatus: "appealStarted",
    });
    saveApplicationToJson(
      PriorApprovalLargerExtensionAppealStarted,
      path.join(__dirname, "largerExtension-05-appeal-02-appeal-started.json"),
    );

    const lawfulDevelopmentCertificateProposedAppealStarted =
      generateDprApplication({
        applicationType: "ldc.proposed",
        customStatus: "appealStarted",
      });
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposedAppealStarted,
      path.join(__dirname, "proposed-05-appeal-02-appeal-started.json"),
    );

    // 05 03 and a decision is made by the appeal

    const planningPermissionFullHouseholderAppealDetermined =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "appealDetermined",
      });
    saveApplicationToJson(
      planningPermissionFullHouseholderAppealDetermined,
      path.join(
        __dirname,
        "fullHouseholder-05-appeal-03-appeal-determined.json",
      ),
    );

    const PriorApprovalLargerExtensionAppealDetermined = generateDprApplication(
      {
        applicationType: "pa.part1.classA",
        customStatus: "appealDetermined",
      },
    );
    saveApplicationToJson(
      PriorApprovalLargerExtensionAppealDetermined,
      path.join(
        __dirname,
        "largerExtension-05-appeal-03-appeal-determined.json",
      ),
    );

    const lawfulDevelopmentCertificateProposedAppealDetermined =
      generateDprApplication({
        applicationType: "ldc.proposed",
        customStatus: "appealDetermined",
      });
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposedAppealDetermined,
      path.join(__dirname, "proposed-05-appeal-03-appeal-determined.json"),
    );

    // 05 04 appeal is withdrawn

    const planningPermissionFullHouseholderAppealWithdrawn =
      generateDprApplication({
        applicationType: "pp.full.householder",
        customStatus: "appealWithdrawn",
      });
    saveApplicationToJson(
      planningPermissionFullHouseholderAppealWithdrawn,
      path.join(
        __dirname,
        "fullHouseholder-05-appeal-04-appeal-withdrawn.json",
      ),
    );

    const PriorApprovalLargerExtensionAppealWithdrawn = generateDprApplication({
      applicationType: "pa.part1.classA",
      customStatus: "appealWithdrawn",
    });
    saveApplicationToJson(
      PriorApprovalLargerExtensionAppealWithdrawn,
      path.join(
        __dirname,
        "largerExtension-05-appeal-04-appeal-withdrawn.json",
      ),
    );

    const lawfulDevelopmentCertificateProposedAppealWithdrawn =
      generateDprApplication({
        applicationType: "ldc.proposed",
        customStatus: "appealWithdrawn",
      });
    saveApplicationToJson(
      lawfulDevelopmentCertificateProposedAppealWithdrawn,
      path.join(__dirname, "proposed-05-appeal-04-appeal-withdrawn.json"),
    );
  });
});
