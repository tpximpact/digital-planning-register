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
  convertToDprApplication,
  getIsConsultationPeriod,
  isDprApplication,
} from "@/lib/planningApplication/converter";
import { generateExampleApplications } from "@mocks/dprNewApplicationFactory";
import { generateDprApplication as generateOldDprApplication } from "@mocks/dprApplicationFactory";
import { DprApplication, DprPlanningApplication } from "@/types";
import type { PriorApprovalAssessment } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/Assessment.ts";

// YYYY-MM-DD
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// YYYY-MM-DDTHH:MM:SS.SSSZ
const utcDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

describe("isDprApplication", () => {
  it("should return true if the given object is a DprApplication", () => {
    const { planningOfficerDetermined } = generateExampleApplications();
    const app = planningOfficerDetermined;
    expect(isDprApplication(app)).toBe(true);
  });

  it("should return false if the given object is a DprPlanningApplication", () => {
    const app = generateOldDprApplication();
    expect(isDprApplication(app)).toBe(false);
  });

  it("should return false if the given object is invalid", () => {
    const invalidObj = {};
    expect(isDprApplication(invalidObj as unknown as DprApplication)).toBe(
      false,
    );
  });
});

describe("getIsConsultationPeriod", () => {
  it("should return true if the current date is within the consultation period", () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1); // Yesterday
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1); // Tomorrow

    const result = getIsConsultationPeriod(startDate, endDate);

    expect(result).toBe(true);
  });

  it("should return true if the current date is the same as the end date", () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1); // Yesterday
    const endDate = new Date();

    const result = getIsConsultationPeriod(startDate, endDate);

    expect(result).toBe(true);
  });

  it("should return false if the current date is before the consultation period", () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1); // Tomorrow
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 2); // Day after tomorrow

    const result = getIsConsultationPeriod(startDate, endDate);

    expect(result).toBe(false);
  });

  it("should return false if the current date is after the consultation period", () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 2); // Day before yesterday
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 1); // Yesterday

    const result = getIsConsultationPeriod(startDate, endDate);

    expect(result).toBe(false);
  });

  it("should return false if the start date is after the end date", () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 2); // Day after tomorrow
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1); // Tomorrow

    const result = getIsConsultationPeriod(startDate, endDate);

    expect(result).toBe(false);
  });
});

/**
 * 01-submission
 * pending
 * not_started
 *
 * 02-validation-01-invalid
 * invalidated
 * returned
 *
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
 * determined
 *
 * 05-appeal-00-appeal-lodged
 * Appeal lodged
 *
 * 05-appeal-01-appeal-validated
 * Appeal valid
 *
 * 05-appeal-02-appeal-started
 * Appeal started
 *
 * 05-appeal-03-appeal-determined
 * 05-appeal-04-appeal-withdrawn
 * Appeal determined
 *
 * Appeal withdrawn
 * Appeal allowed
 * Appeal dismissed
 * Appeal split decision
 *
 * 06-assessment-withdrawn
 * withdrawn
 * closed
 */
describe("convertToDprApplication", () => {
  const testCommon = (result: DprApplication, from: DprPlanningApplication) => {
    // keeps the same application type
    expect(result.applicationType).toBe(from.applicationType);

    // data object should be the same
    expect(result.data).toEqual(result.data);

    // keeps the same reference in the right places
    expect(result.metadata.id).toEqual(from.application.reference);
    expect(result.data.application.reference).toEqual(
      from.application.reference,
    );
    expect(result.metadata.id).toEqual(result.data.application.reference);

    // metadata
    expect(result.metadata).toBeDefined();
    expect(Object.keys(result.metadata)).toEqual([
      "organisation",
      "id",
      "publishedAt",
      "submittedAt",
      "schema",
    ]);

    expect(result.data.application.publishedAt).toMatch(utcDateRegex);
    expect(result.metadata.submittedAt).toMatch(utcDateRegex);
  };

  const consultationStartDateInPast = new Date(
    new Date().getTime() - 100 * 24 * 60 * 60 * 1000,
  );

  const testConsultationDatesAreInPast = (result: DprApplication) => {
    expect(result.data.consultation?.startDate).not.toBeNull();
    expect(result.data.consultation?.endDate).not.toBeNull();
    const startDate = new Date(result.data.consultation?.startDate as string);
    const endDate = new Date(result.data.consultation?.endDate as string);
    expect(startDate).toBeInstanceOf(Date);
    expect(endDate).toBeInstanceOf(Date);
    expect(startDate < endDate).toBe(true);

    const now = new Date();
    expect(now >= startDate && now >= endDate).toBe(true);
  };

  const testAssessment = (result: DprApplication) => {
    expect(result.applicationStatusSummary).toBe("Assessment in progress");
    expect(result.applicationDecisionSummary).not.toBeDefined();
    expect(result.data.application.stage).toBe("assessment");
    expect(result.data.application.status).toBe("undetermined");
    testConsultationDatesAreInPast(result);
    expect(result.data.assessment?.planningOfficerDecision).toBeUndefined();
    expect(result.data.assessment?.planningOfficerDecisionDate).toBeUndefined();
    expect(result.data.appeal).toBeUndefined();
  };

  const testDetermined = (
    result: DprApplication,
    from: DprPlanningApplication,
  ) => {
    expect(result.data.application.status).toBe("determined");
    testConsultationDatesAreInPast(result);
    expect(result.data.assessment?.planningOfficerDecision).not.toBeNull();
    expect(result.data.assessment?.planningOfficerDecisionDate).toMatch(
      utcDateRegex,
    );
    expect(result.data.assessment?.planningOfficerDecision).toBe(
      from.application.decision,
    );
  };

  describe("03-consultation", () => {
    it("in_assessment", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "in_assessment",
        consultationStartDate: new Date(),
      });
      const result = convertToDprApplication(from);
      testCommon(result, from);
      expect(result.applicationStatusSummary).toBe("Consultation in progress");
      expect(result.applicationDecisionSummary).not.toBeDefined();
      expect(result.data.application.stage).toBe("consultation");
      expect(result.data.application.status).toBe("undetermined");
    });
    it("assessment_in_progress", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "assessment_in_progress",
        consultationStartDate: new Date(),
      });
      const result = convertToDprApplication(from);
      testCommon(result, from);
      expect(result.applicationStatusSummary).toBe("Consultation in progress");
      expect(result.applicationDecisionSummary).not.toBeDefined();
      expect(result.data.application.stage).toBe("consultation");
      expect(result.data.application.status).toBe("undetermined");
    });
  });

  describe("04-assessment-00-assessment-in-progress", () => {
    it("in_assessment", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "in_assessment",
        decision: null,
        consultationStartDate: consultationStartDateInPast,
      });
      const result = convertToDprApplication(from);
      testAssessment(result);
    });
    it("assessment_in_progress", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "assessment_in_progress",
        decision: null,
        consultationStartDate: consultationStartDateInPast,
      });
      const result = convertToDprApplication(from);
      testAssessment(result);
    });
    it("awaiting_determination", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "awaiting_determination",
        decision: null,
        consultationStartDate: consultationStartDateInPast,
      });
      const result = convertToDprApplication(from);
      testAssessment(result);
    });
    it("to_be_reviewed", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "to_be_reviewed",
        decision: null,
        consultationStartDate: consultationStartDateInPast,
      });
      const result = convertToDprApplication(from);
      testAssessment(result);
    });
  });

  describe("04-assessment-01-council-determined", () => {
    it("determined", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "determined",
        decision: "granted",
        consultationStartDate: consultationStartDateInPast,
      });
      const result = convertToDprApplication(from);
      expect(result.data.application.stage).toBe("assessment");
      expect(result.data.appeal).toBeUndefined();
      testDetermined(result, from);
      expect(result.applicationStatusSummary).toBe("Determined");
      expect(result.applicationDecisionSummary).toBe("Granted");

      // Prior approval applications
      const priorApprovalFromGranted = generateOldDprApplication({
        applicationType: "pa.part1.classA",
        applicationStatus: "determined",
        decision: "granted",
        consultationStartDate: consultationStartDateInPast,
      });
      const priorApprovalResultGranted = convertToDprApplication(
        priorApprovalFromGranted,
      );
      const priorApprovalResultGrantedAssessment = priorApprovalResultGranted
        .data.assessment as PriorApprovalAssessment;
      expect(priorApprovalResultGrantedAssessment.priorApprovalRequired).toBe(
        true,
      );

      const priorApprovalFromRefused = generateOldDprApplication({
        applicationType: "pa.part1.classA",
        applicationStatus: "determined",
        decision: "refused",
        consultationStartDate: consultationStartDateInPast,
      });
      const priorApprovalResultRefused = convertToDprApplication(
        priorApprovalFromRefused,
      );
      const priorApprovalResultRefusedAssessment = priorApprovalResultRefused
        .data.assessment as PriorApprovalAssessment;
      expect(priorApprovalResultRefusedAssessment.priorApprovalRequired).toBe(
        true,
      );
      expect(priorApprovalResultRefused.applicationDecisionSummary).toBe(
        "Prior approval required and refused",
      );

      // @TODO can't test Prior approval not required yet because its not in the types
    });
  });

  describe("04-assessment-02-assessment-in-committee", () => {
    it("in_committee", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "in_committee",
        decision: null,
        consultationStartDate: consultationStartDateInPast,
      });
      const result = convertToDprApplication(from);
      testAssessment(result);
    });
  });

  describe("04-assessment-03-committee-determined", () => {
    it("determined", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "determined",
        decision: "granted",
        consultationStartDate: consultationStartDateInPast,
      });
      const result = convertToDprApplication(from);
      expect(result.data.application.stage).toBe("assessment");
      expect(result.data.appeal).toBeUndefined();
      testDetermined(result, from);
      expect(result.applicationStatusSummary).toBe("Determined");
      expect(result.applicationDecisionSummary).toBe("Granted");
    });
  });

  describe("05-appeal-00-appeal-lodged", () => {
    it("Appeal lodged", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "Appeal lodged",
        decision: "refused",
        consultationStartDate: consultationStartDateInPast,
      });
      const result = convertToDprApplication(from);
      expect(result.data.application.stage).toBe("appeal");
      expect(result.applicationStatusSummary).toBe("Appeal lodged");
      expect(result.applicationDecisionSummary).toBe("Refused");
      testDetermined(result, from);
      expect(result.data.appeal).not.toBeUndefined();
      expect(result.data.appeal?.reason).toBeTruthy();
      expect(result.data.appeal?.lodgedDate).toMatch(dateRegex);
      expect(result.data.appeal?.validatedDate).not.toBeDefined();
      expect(result.data.appeal?.startedDate).not.toBeDefined();
      expect(result.data.appeal?.decisionDate).not.toBeDefined();
      expect(result.data.appeal?.decision).not.toBeDefined();
      expect(result.data.appeal?.files?.length).toBeGreaterThan(0);
    });
  });

  describe("05-appeal-01-appeal-validated", () => {
    it("Appeal valid", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "Appeal valid",
        decision: "refused",
        consultationStartDate: consultationStartDateInPast,
      });
      const result = convertToDprApplication(from);
      expect(result.data.application.stage).toBe("appeal");
      expect(result.applicationStatusSummary).toBe("Appeal validated");
      expect(result.applicationDecisionSummary).toBe("Refused");
      testDetermined(result, from);
      expect(result.data.appeal).not.toBeUndefined();
      expect(result.data.appeal?.reason).toBeTruthy();
      expect(result.data.appeal?.lodgedDate).toMatch(dateRegex);
      expect(result.data.appeal?.validatedDate).toMatch(dateRegex);
      expect(result.data.appeal?.startedDate).not.toBeDefined();
      expect(result.data.appeal?.decisionDate).not.toBeDefined();
      expect(result.data.appeal?.decision).not.toBeDefined();
      expect(result.data.appeal?.files?.length).toBeGreaterThan(0);
    });
  });

  describe("05-appeal-02-appeal-started", () => {
    it("Appeal started", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "Appeal started",
        decision: "refused",
        consultationStartDate: consultationStartDateInPast,
      });
      const result = convertToDprApplication(from);
      expect(result.data.application.stage).toBe("appeal");
      expect(result.applicationStatusSummary).toBe("Appeal in progress");
      expect(result.applicationDecisionSummary).toBe("Refused");
      testDetermined(result, from);
      expect(result.data.appeal).not.toBeUndefined();
      expect(result.data.appeal?.reason).toBeTruthy();
      expect(result.data.appeal?.lodgedDate).toMatch(dateRegex);
      expect(result.data.appeal?.validatedDate).toMatch(dateRegex);
      expect(result.data.appeal?.startedDate).toMatch(dateRegex);
      expect(result.data.appeal?.decisionDate).not.toBeDefined();
      expect(result.data.appeal?.decision).not.toBeDefined();
      expect(result.data.appeal?.files?.length).toBeGreaterThan(0);
    });
  });

  describe("05-appeal-03-appeal-determined", () => {
    it("Appeal determined", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "Appeal determined",
        decision: "refused",
        consultationStartDate: consultationStartDateInPast,
      });
      const result = convertToDprApplication(from);
      expect(result.data.application.stage).toBe("appeal");
      expect(result.applicationStatusSummary).toBe("Appeal decided");
      expect(result.applicationDecisionSummary).toBe("Refused");
      testDetermined(result, from);
      expect(result.data.appeal?.decision).toBe("allowed");
      expect(result.data.appeal).not.toBeUndefined();
      expect(result.data.appeal?.reason).toBeTruthy();
      expect(result.data.appeal?.lodgedDate).toMatch(dateRegex);
      expect(result.data.appeal?.validatedDate).toMatch(dateRegex);
      expect(result.data.appeal?.startedDate).toMatch(dateRegex);
      expect(result.data.appeal?.decisionDate).toMatch(dateRegex);
      expect(result.data.appeal?.files?.length).toBeGreaterThan(0);
    });
    it("Appeal withdrawn", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "Appeal withdrawn",
        decision: "refused",
        consultationStartDate: consultationStartDateInPast,
      });
      const result = convertToDprApplication(from);
      expect(result.data.application.stage).toBe("appeal");
      expect(result.applicationStatusSummary).toBe("Appeal decided");
      expect(result.applicationDecisionSummary).toBe("Refused");
      testDetermined(result, from);
      expect(result.data.appeal?.decision).toBe("withdrawn");
      expect(result.data.appeal).not.toBeUndefined();
      expect(result.data.appeal?.reason).toBeTruthy();
      expect(result.data.appeal?.lodgedDate).toMatch(dateRegex);
      expect(result.data.appeal?.validatedDate).toMatch(dateRegex);
      expect(result.data.appeal?.startedDate).toMatch(dateRegex);
      expect(result.data.appeal?.decisionDate).toMatch(dateRegex);
      expect(result.data.appeal?.files?.length).toBeGreaterThan(0);
    });
    it("Appeal allowed", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "Appeal allowed",
        decision: "refused",
        consultationStartDate: consultationStartDateInPast,
      });
      const result = convertToDprApplication(from);
      expect(result.data.application.stage).toBe("appeal");
      expect(result.applicationStatusSummary).toBe("Appeal decided");
      expect(result.applicationDecisionSummary).toBe("Refused");
      testDetermined(result, from);
      expect(result.data.appeal?.decision).toBe("allowed");
      expect(result.data.appeal).not.toBeUndefined();
      expect(result.data.appeal?.reason).toBeTruthy();
      expect(result.data.appeal?.lodgedDate).toMatch(dateRegex);
      expect(result.data.appeal?.validatedDate).toMatch(dateRegex);
      expect(result.data.appeal?.startedDate).toMatch(dateRegex);
      expect(result.data.appeal?.decisionDate).toMatch(dateRegex);
      expect(result.data.appeal?.files?.length).toBeGreaterThan(0);
    });
    it("Appeal dismissed", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "Appeal dismissed",
        decision: "refused",
        consultationStartDate: consultationStartDateInPast,
      });

      const result = convertToDprApplication(from);
      expect(result.data.application.stage).toBe("appeal");
      expect(result.applicationStatusSummary).toBe("Appeal decided");
      expect(result.applicationDecisionSummary).toBe("Refused");
      testDetermined(result, from);
      expect(result.data.appeal?.decision).toBe("dismissed");
      expect(result.data.appeal).not.toBeUndefined();
      expect(result.data.appeal?.reason).toBeTruthy();
      expect(result.data.appeal?.lodgedDate).toMatch(dateRegex);
      expect(result.data.appeal?.validatedDate).toMatch(dateRegex);
      expect(result.data.appeal?.startedDate).toMatch(dateRegex);
      expect(result.data.appeal?.decisionDate).toMatch(dateRegex);
      expect(result.data.appeal?.files?.length).toBeGreaterThan(0);
    });
    it("Appeal split decision", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "Appeal split decision",
        decision: "refused",
        consultationStartDate: consultationStartDateInPast,
      });
      const result = convertToDprApplication(from);
      expect(result.data.application.stage).toBe("appeal");
      expect(result.applicationStatusSummary).toBe("Appeal decided");
      expect(result.applicationDecisionSummary).toBe("Refused");
      testDetermined(result, from);
      expect(result.data.appeal?.decision).toBe("splitDecision");
      expect(result.data.appeal).not.toBeUndefined();
      expect(result.data.appeal?.reason).toBeTruthy();
      expect(result.data.appeal?.lodgedDate).toMatch(dateRegex);
      expect(result.data.appeal?.validatedDate).toMatch(dateRegex);
      expect(result.data.appeal?.startedDate).toMatch(dateRegex);
      expect(result.data.appeal?.decisionDate).toMatch(dateRegex);
      expect(result.data.appeal?.files?.length).toBeGreaterThan(0);
    });
  });

  describe("06-assessment-withdrawn", () => {
    it("withdrawn", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "withdrawn",
        consultationStartDate: consultationStartDateInPast,
        decision: null,
      });
      const result = convertToDprApplication(from);
      expect(result.data.application.stage).toBe("assessment");
      expect(result.applicationStatusSummary).toBe("Withdrawn");
      expect(result.applicationDecisionSummary).not.toBeDefined();
      expect(result.data.application.withdrawnAt).not.toBeUndefined();
      expect(result.data.application.withdrawnAt).toMatch(utcDateRegex);
      testConsultationDatesAreInPast(result);
      expect(result.data.assessment?.planningOfficerDecision).toBeUndefined();
      expect(
        result.data.assessment?.planningOfficerDecisionDate,
      ).toBeUndefined();

      expect(result.data.appeal).toBeUndefined();
    });
    it("closed", () => {
      const applicationType = "pp.full";
      const from = generateOldDprApplication({
        applicationType: applicationType,
        applicationStatus: "closed",
        consultationStartDate: consultationStartDateInPast,
        decision: null,
      });

      expect(() => {
        convertToDprApplication(from);
      }).toThrow(
        new Error("Closed application not enough information to convert"),
      );
    });
  });
});
