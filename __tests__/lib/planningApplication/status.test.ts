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
  getApplicationDprStatusSummary,
  getApplicationStatusSummary,
  getApplicationStatusSummarySentiment,
} from "@/lib/planningApplication";
import { DprPlanningApplication } from "@/types";
import { PostSubmissionApplication } from "@/types/odp-types/schemas/postSubmissionApplication";
import { formatDateToYmd } from "@/util";
import {
  generateAllPossibleDates,
  generateMetadata,
} from "@mocks/dprNewApplicationFactory";
import { planningPermissionFullHouseholderPrototype } from "@mocks/odp-submission-data/planningPermission/fullHouseholder";
import { format } from "path";

describe("getApplicationStatusSummary", () => {
  describe("Assessment-related statuses", () => {
    const assessmentStatuses: DprPlanningApplication["application"]["status"][] =
      [
        "assessment_in_progress",
        "in_assessment",
        "to_be_reviewed",
        "awaiting_determination",
        "in_committee",
      ];

    it('should return "Consultation in progress" if today is between consultation start and end dates', () => {
      const today = new Date();
      const startDate = formatDateToYmd(new Date(today.getTime() - 86400000));
      const endDate = formatDateToYmd(new Date(today.getTime() + 86400000));
      assessmentStatuses.forEach((status) => {
        expect(getApplicationStatusSummary(status, startDate, endDate)).toBe(
          "Consultation in progress",
        );
      });
    });

    it('should return "Assessment in progress" if consultation period is in the past', () => {
      const today = new Date();
      const startDate = formatDateToYmd(
        new Date(today.getTime() - 5 * 86400000),
      );
      const endDate = formatDateToYmd(new Date(today.getTime() - 86400000));
      assessmentStatuses.forEach((status) => {
        expect(getApplicationStatusSummary(status, startDate, endDate)).toBe(
          "Assessment in progress",
        );
      });
    });

    it('should return "Assessment in progress" status when consultation dates are not provided', () => {
      expect(getApplicationStatusSummary("assessment_in_progress")).toBe(
        "Assessment in progress",
      );
      expect(getApplicationStatusSummary("in_assessment")).toBe(
        "Assessment in progress",
      );
      expect(getApplicationStatusSummary("to_be_reviewed")).toBe(
        "Assessment in progress",
      );
      expect(getApplicationStatusSummary("awaiting_determination")).toBe(
        "Assessment in progress",
      );
      expect(getApplicationStatusSummary("in_committee")).toBe(
        "Assessment in progress",
      );
    });
  });

  describe("Final decision statuses", () => {
    it('should return "Closed" for status "closed"', () => {
      expect(getApplicationStatusSummary("closed")).toBe("Closed");
    });

    it('should return "Determined" for status "determined"', () => {
      expect(getApplicationStatusSummary("determined")).toBe("Determined");
    });

    it('should return "Returned" for status "returned"', () => {
      expect(getApplicationStatusSummary("returned")).toBe("Returned");
    });

    it('should return "Application withdrawn" for status "withdrawn"', () => {
      expect(getApplicationStatusSummary("withdrawn")).toBe(
        "Application withdrawn",
      );
    });
  });

  describe("Appeal statuses returned as is", () => {
    const appealStatusesAsIs: DprPlanningApplication["application"]["status"][] =
      ["Appeal lodged", "Appeal valid", "Appeal started", "Appeal withdrawn"];
    appealStatusesAsIs.forEach((status) => {
      it(`should return "${status}" for status "${status}"`, () => {
        expect(getApplicationStatusSummary(status)).toBe(status);
      });
    });
  });

  describe("Appeal statuses mapped to 'Appeal decided'", () => {
    const appealStatusesDetermined: DprPlanningApplication["application"]["status"][] =
      [
        "Appeal determined",
        "Appeal allowed",
        "Appeal dismissed",
        "Appeal split decision",
      ];
    appealStatusesDetermined.forEach((status) => {
      it(`should return "Appeal decided" for status "${status}"`, () => {
        expect(getApplicationStatusSummary(status)).toBe("Appeal decided");
      });
    });
  });

  describe("Fall-through statuses", () => {
    it("should format unknown statuses by replacing underscores and capitalizing", () => {
      expect(
        getApplicationStatusSummary(
          "pending" as unknown as DprPlanningApplication["application"]["status"],
        ),
      ).toBe("Pending");
      expect(
        getApplicationStatusSummary(
          "not_started" as unknown as DprPlanningApplication["application"]["status"],
        ),
      ).toBe("Not started");
      expect(
        getApplicationStatusSummary(
          "invalid" as unknown as DprPlanningApplication["application"]["status"],
        ),
      ).toBe("Invalid");
    });
  });

  describe("Invalid or null statuses", () => {
    it("should return an empty string for null or undefined statuses", () => {
      expect(
        getApplicationStatusSummary(
          null as unknown as DprPlanningApplication["application"]["status"],
        ),
      ).toBe("");
      expect(
        getApplicationStatusSummary(
          undefined as unknown as DprPlanningApplication["application"]["status"],
        ),
      ).toBe("");
    });

    it("should return the correct final decision status if consultation dates are invalid", () => {
      expect(
        getApplicationStatusSummary(
          "determined",
          "invalid-date",
          "invalid-date",
        ),
      ).toBe("Determined");
    });
  });
});

describe("getApplicationStatusSummarySentiment", () => {
  it('should return "positive" for "Determined"', () => {
    expect(getApplicationStatusSummarySentiment("Determined")).toBe("positive");
  });

  it('should return "neutral" for "Consultation in progress"', () => {
    expect(
      getApplicationStatusSummarySentiment("Consultation in progress"),
    ).toBe("neutral");
  });

  it('should return "neutral" for "Assessment in progress"', () => {
    expect(getApplicationStatusSummarySentiment("Assessment in progress")).toBe(
      "neutral",
    );
  });

  it('should return "negative" for "Withdrawn"', () => {
    expect(getApplicationStatusSummarySentiment("Withdrawn")).toBe("negative");
  });

  it("should return undefined for an unknown status", () => {
    expect(
      getApplicationStatusSummarySentiment("Unknown status"),
    ).toBeUndefined();
  });

  it("should return undefined for null or undefined status", () => {
    expect(getApplicationStatusSummarySentiment(null as any)).toBeUndefined();
    expect(
      getApplicationStatusSummarySentiment(undefined as any),
    ).toBeUndefined();
  });
});

describe("getApplicationDprStatusSummary", () => {
  it("should return Unknown for invalid status", () => {
    const dates = generateAllPossibleDates();
    const application: PostSubmissionApplication = {
      applicationType: "pp.full.householder",
      data: {
        application: {
          reference: "ABC-123-XYZ",
          stage: "consultation",
          status: "determined",
        },
        localPlanningAuthority: {
          commentsAcceptedUntilDecision: false,
        },
        submission: {
          submittedAt: dates.submission.submittedAt.toISOString(),
        },
        caseOfficer: {
          name: "Casey Officer",
        },
      },
      submission: planningPermissionFullHouseholderPrototype,
      metadata: generateMetadata(dates),
    };
    const statusSummary = getApplicationDprStatusSummary(application);
    expect(statusSummary).toBe("Unknown");
  });

  describe("Withdrawn status", () => {
    it("should return Withdrawn if withdrawn date set", () => {
      const dates = generateAllPossibleDates();
      const application: PostSubmissionApplication = {
        applicationType: "pp.full.householder",
        data: {
          application: {
            reference: "ABC-123-XYZ",
            stage: "assessment",
            status: "undetermined",
            withdrawnAt: dates.application.withdrawnAt.toISOString(),
            withdrawnReason: "No longer needed",
          },
          localPlanningAuthority: {
            commentsAcceptedUntilDecision: false,
          },
          submission: {
            submittedAt: dates.submission.submittedAt.toISOString(),
          },
          validation: {
            receivedAt: dates.validation.receivedAt.toISOString(),
            validatedAt: dates.validation.validatedAt.toISOString(),
            isValid: false,
          },
          consultation: {
            startDate: formatDateToYmd(dates.consultation.startAt.toDate()),
            endDate: formatDateToYmd(dates.consultation.endAt.toDate()),
            siteNotice: true,
          },
          caseOfficer: {
            name: "Casey Officer",
          },
        },
        submission: planningPermissionFullHouseholderPrototype,
        metadata: generateMetadata(dates),
      };
      const statusSummary = getApplicationDprStatusSummary(application);
      expect(statusSummary).toBe("Withdrawn");
    });
  });

  describe("Application submitted status", () => {
    it("should return Application submitted", () => {
      const dates = generateAllPossibleDates();
      const application: PostSubmissionApplication = {
        applicationType: "pp.full.householder",
        data: {
          application: {
            reference: "ABC-123-XYZ",
            stage: "submission",
            status: "undetermined",
          },
          localPlanningAuthority: {
            commentsAcceptedUntilDecision: false,
          },
          submission: {
            submittedAt: dates.submission.submittedAt.toISOString(),
          },
          caseOfficer: {
            name: "Casey Officer",
          },
        },
        submission: planningPermissionFullHouseholderPrototype,
        metadata: generateMetadata(dates),
      };
      const statusSummary = getApplicationDprStatusSummary(application);
      expect(statusSummary).toBe("Application submitted");
    });
  });

  describe("Application returned status", () => {
    it("should return Application returned", () => {
      const dates = generateAllPossibleDates();
      const application: PostSubmissionApplication = {
        applicationType: "pp.full.householder",
        data: {
          application: {
            reference: "ABC-123-XYZ",
            stage: "validation",
            status: "returned",
          },
          localPlanningAuthority: {
            commentsAcceptedUntilDecision: false,
          },
          submission: {
            submittedAt: dates.submission.submittedAt.toISOString(),
          },
          validation: {
            receivedAt: dates.validation.receivedAt.toISOString(),
            validatedAt: dates.validation.validatedAt.toISOString(),
            isValid: false,
          },
          caseOfficer: {
            name: "Casey Officer",
          },
        },
        submission: planningPermissionFullHouseholderPrototype,
        metadata: generateMetadata(dates),
      };
      const statusSummary = getApplicationDprStatusSummary(application);
      expect(statusSummary).toBe("Application returned");
    });
  });

  describe("Consultation in progress status", () => {
    it("should return Consultation in progress if the current date is on the consultation start date", () => {
      const dates = generateAllPossibleDates();
      const today = new Date();
      const startDate = formatDateToYmd(today);
      // const startDate = formatDateToYmd(new Date(today.getTime() - 86400000));
      const endDate = formatDateToYmd(new Date(today.getTime() + 86400000));
      const application: PostSubmissionApplication = {
        applicationType: "pp.full.householder",
        data: {
          application: {
            reference: "ABC-123-XYZ",
            stage: "consultation",
            status: "undetermined",
          },
          localPlanningAuthority: {
            commentsAcceptedUntilDecision: false,
          },
          submission: {
            submittedAt: dates.submission.submittedAt.toISOString(),
          },
          validation: {
            receivedAt: dates.validation.receivedAt.toISOString(),
            validatedAt: dates.validation.validatedAt.toISOString(),
            isValid: false,
          },
          consultation: {
            startDate: startDate,
            endDate: endDate,
            siteNotice: true,
          },
          caseOfficer: {
            name: "Casey Officer",
          },
        },
        submission: planningPermissionFullHouseholderPrototype,
        metadata: generateMetadata(dates),
      };
      const statusSummary = getApplicationDprStatusSummary(application);
      expect(statusSummary).toBe("Consultation in progress");
    });

    it("should return Consultation in progress if the current date is between the start date and end date", () => {
      const dates = generateAllPossibleDates();
      const today = new Date();
      const startDate = formatDateToYmd(new Date(today.getTime() - 86400000));
      const endDate = formatDateToYmd(new Date(today.getTime() + 86400000));
      const application: PostSubmissionApplication = {
        applicationType: "pp.full.householder",
        data: {
          application: {
            reference: "ABC-123-XYZ",
            stage: "consultation",
            status: "undetermined",
          },
          localPlanningAuthority: {
            commentsAcceptedUntilDecision: false,
          },
          submission: {
            submittedAt: dates.submission.submittedAt.toISOString(),
          },
          validation: {
            receivedAt: dates.validation.receivedAt.toISOString(),
            validatedAt: dates.validation.validatedAt.toISOString(),
            isValid: false,
          },
          consultation: {
            startDate: startDate,
            endDate: endDate,
            siteNotice: true,
          },
          caseOfficer: {
            name: "Casey Officer",
          },
        },
        submission: planningPermissionFullHouseholderPrototype,
        metadata: generateMetadata(dates),
      };
      const statusSummary = getApplicationDprStatusSummary(application);
      expect(statusSummary).toBe("Consultation in progress");
    });

    it("should return Assessment in progress if the current date is the before the consultation end date", () => {
      const dates = generateAllPossibleDates();
      const today = new Date();
      const startDate = formatDateToYmd(new Date(today.getTime() - 86400000));
      const endDate = formatDateToYmd(today);
      const application: PostSubmissionApplication = {
        applicationType: "pp.full.householder",
        data: {
          application: {
            reference: "ABC-123-XYZ",
            stage: "consultation",
            status: "undetermined",
          },
          localPlanningAuthority: {
            commentsAcceptedUntilDecision: false,
          },
          submission: {
            submittedAt: dates.submission.submittedAt.toISOString(),
          },
          validation: {
            receivedAt: dates.validation.receivedAt.toISOString(),
            validatedAt: dates.validation.validatedAt.toISOString(),
            isValid: false,
          },
          consultation: {
            startDate: startDate,
            endDate: endDate,
            siteNotice: true,
          },
          caseOfficer: {
            name: "Casey Officer",
          },
        },
        submission: planningPermissionFullHouseholderPrototype,
        metadata: generateMetadata(dates),
      };
      const statusSummary = getApplicationDprStatusSummary(application);
      expect(statusSummary).toBe("Assessment in progress");
    });
  });

  describe("Determined & Assessment in progress status", () => {
    it("should return Assessment in progress if no determination has been made yet", () => {
      const dates = generateAllPossibleDates();
      const application: PostSubmissionApplication = {
        applicationType: "pp.full.householder",
        data: {
          application: {
            reference: "ABC-123-XYZ",
            stage: "assessment",
            status: "undetermined",
          },
          localPlanningAuthority: {
            commentsAcceptedUntilDecision: false,
          },
          submission: {
            submittedAt: dates.submission.submittedAt.toISOString(),
          },
          validation: {
            receivedAt: dates.validation.receivedAt.toISOString(),
            validatedAt: dates.validation.validatedAt.toISOString(),
            isValid: false,
          },
          consultation: {
            startDate: formatDateToYmd(dates.consultation.startAt.toDate()),
            endDate: formatDateToYmd(dates.consultation.endAt.toDate()),
            siteNotice: true,
          },
          caseOfficer: {
            name: "Casey Officer",
          },
        },
        submission: planningPermissionFullHouseholderPrototype,
        metadata: generateMetadata(dates),
      };
      const statusSummary = getApplicationDprStatusSummary(application);
      expect(statusSummary).toBe("Assessment in progress");
    });

    it("should return Assessment in progress if application is in committee", () => {
      const dates = generateAllPossibleDates();
      const application: PostSubmissionApplication = {
        applicationType: "pp.full.householder",
        data: {
          application: {
            reference: "ABC-123-XYZ",
            stage: "assessment",
            status: "undetermined",
          },
          localPlanningAuthority: {
            commentsAcceptedUntilDecision: false,
          },
          submission: {
            submittedAt: dates.submission.submittedAt.toISOString(),
          },
          validation: {
            receivedAt: dates.validation.receivedAt.toISOString(),
            validatedAt: dates.validation.validatedAt.toISOString(),
            isValid: false,
          },
          consultation: {
            startDate: formatDateToYmd(dates.consultation.startAt.toDate()),
            endDate: formatDateToYmd(dates.consultation.endAt.toDate()),
            siteNotice: true,
          },
          assessment: {
            planningOfficerRecommendation: "refused",
            committeeSentDate: formatDateToYmd(
              dates.assessment.committeeSentAt.toDate(),
            ),
          },
          caseOfficer: {
            name: "Casey Officer",
          },
        },
        submission: planningPermissionFullHouseholderPrototype,
        metadata: generateMetadata(dates),
      };
      const statusSummary = getApplicationDprStatusSummary(application);
      expect(statusSummary).toBe("Assessment in progress");
    });

    it("should return Determined if application has a council decision", () => {
      const dates = generateAllPossibleDates();
      const application: PostSubmissionApplication = {
        applicationType: "pp.full.householder",
        data: {
          application: {
            reference: "ABC-123-XYZ",
            stage: "assessment",
            status: "determined",
          },
          localPlanningAuthority: {
            commentsAcceptedUntilDecision: false,
          },
          submission: {
            submittedAt: dates.submission.submittedAt.toISOString(),
          },
          validation: {
            receivedAt: dates.validation.receivedAt.toISOString(),
            validatedAt: dates.validation.validatedAt.toISOString(),
            isValid: false,
          },
          consultation: {
            startDate: formatDateToYmd(dates.consultation.startAt.toDate()),
            endDate: formatDateToYmd(dates.consultation.endAt.toDate()),
            siteNotice: true,
          },
          assessment: {
            planningOfficerDecision: "granted",
            planningOfficerDecisionDate: formatDateToYmd(
              dates.assessment.planningOfficerDecisionAt.toDate(),
            ),
            decisionNotice: {
              url: "https://planningregister.org",
            },
          },
          caseOfficer: {
            name: "Casey Officer",
          },
        },
        submission: planningPermissionFullHouseholderPrototype,
        metadata: generateMetadata(dates),
      };
      const statusSummary = getApplicationDprStatusSummary(application);
      expect(statusSummary).toBe("Determined");
    });

    it("should return Determined if application has a committee decision", () => {
      const dates = generateAllPossibleDates();
      const application: PostSubmissionApplication = {
        applicationType: "pp.full.householder",
        data: {
          application: {
            reference: "ABC-123-XYZ",
            stage: "assessment",
            status: "determined",
          },
          localPlanningAuthority: {
            commentsAcceptedUntilDecision: false,
          },
          submission: {
            submittedAt: dates.submission.submittedAt.toISOString(),
          },
          validation: {
            receivedAt: dates.validation.receivedAt.toISOString(),
            validatedAt: dates.validation.validatedAt.toISOString(),
            isValid: false,
          },
          consultation: {
            startDate: formatDateToYmd(dates.consultation.startAt.toDate()),
            endDate: formatDateToYmd(dates.consultation.endAt.toDate()),
            siteNotice: true,
          },
          assessment: {
            planningOfficerRecommendation: "refused",
            committeeSentDate: formatDateToYmd(
              dates.assessment.committeeSentAt.toDate(),
            ),
            committeeDecision: "granted",
            committeeDecisionDate: formatDateToYmd(
              dates.assessment.committeeDecisionAt.toDate(),
            ),
            decisionNotice: {
              url: "https://planningregister.org",
            },
          },
          caseOfficer: {
            name: "Casey Officer",
          },
        },
        submission: planningPermissionFullHouseholderPrototype,
        metadata: generateMetadata(dates),
      };
      const statusSummary = getApplicationDprStatusSummary(application);
      expect(statusSummary).toBe("Determined");
    });

    it("should return Assessment in progress if no council decision", () => {
      const dates = generateAllPossibleDates();
      const application: PostSubmissionApplication = {
        applicationType: "pp.full.householder",
        data: {
          application: {
            reference: "ABC-123-XYZ",
            stage: "assessment",
            status: "determined",
          },
          localPlanningAuthority: {
            commentsAcceptedUntilDecision: false,
          },
          submission: {
            submittedAt: dates.submission.submittedAt.toISOString(),
          },
          validation: {
            receivedAt: dates.validation.receivedAt.toISOString(),
            validatedAt: dates.validation.validatedAt.toISOString(),
            isValid: false,
          },
          consultation: {
            startDate: formatDateToYmd(dates.consultation.startAt.toDate()),
            endDate: formatDateToYmd(dates.consultation.endAt.toDate()),
            siteNotice: true,
          },
          assessment: {
            planningOfficerDecisionDate: formatDateToYmd(
              dates.assessment.planningOfficerDecisionAt.toDate(),
            ),
            decisionNotice: {
              url: "https://planningregister.org",
            },
          },
          caseOfficer: {
            name: "Casey Officer",
          },
        },
        submission: planningPermissionFullHouseholderPrototype,
        metadata: generateMetadata(dates),
      };
      const statusSummary = getApplicationDprStatusSummary(application);
      expect(statusSummary).toBe("Assessment in progress");
    });

    it("should return Assessment in progress if no committee decision", () => {
      const dates = generateAllPossibleDates();
      const application: PostSubmissionApplication = {
        applicationType: "pp.full.householder",
        data: {
          application: {
            reference: "ABC-123-XYZ",
            stage: "assessment",
            status: "determined",
          },
          localPlanningAuthority: {
            commentsAcceptedUntilDecision: false,
          },
          submission: {
            submittedAt: dates.submission.submittedAt.toISOString(),
          },
          validation: {
            receivedAt: dates.validation.receivedAt.toISOString(),
            validatedAt: dates.validation.validatedAt.toISOString(),
            isValid: false,
          },
          consultation: {
            startDate: formatDateToYmd(dates.consultation.startAt.toDate()),
            endDate: formatDateToYmd(dates.consultation.endAt.toDate()),
            siteNotice: true,
          },
          assessment: {
            planningOfficerRecommendation: "refused",
            committeeSentDate: formatDateToYmd(
              dates.assessment.committeeSentAt.toDate(),
            ),
            committeeDecisionDate: formatDateToYmd(
              dates.assessment.committeeDecisionAt.toDate(),
            ),
            decisionNotice: {
              url: "https://planningregister.org",
            },
          },
          caseOfficer: {
            name: "Casey Officer",
          },
        },
        submission: planningPermissionFullHouseholderPrototype,
        metadata: generateMetadata(dates),
      };
      const statusSummary = getApplicationDprStatusSummary(application);
      expect(statusSummary).toBe("Assessment in progress");
    });
  });

  describe("Appeal status", () => {
    it("should return Appeal lodged when appeal has been lodged", () => {
      const dates = generateAllPossibleDates();
      const application: PostSubmissionApplication = {
        applicationType: "pp.full.householder",
        data: {
          application: {
            reference: "ABC-123-XYZ",
            stage: "appeal",
            status: "determined",
          },
          localPlanningAuthority: {
            commentsAcceptedUntilDecision: false,
          },
          submission: {
            submittedAt: dates.submission.submittedAt.toISOString(),
          },
          validation: {
            receivedAt: dates.validation.receivedAt.toISOString(),
            validatedAt: dates.validation.validatedAt.toISOString(),
            isValid: false,
          },
          consultation: {
            startDate: formatDateToYmd(dates.consultation.startAt.toDate()),
            endDate: formatDateToYmd(dates.consultation.endAt.toDate()),
            siteNotice: true,
          },
          assessment: {
            planningOfficerRecommendation: "refused",
            committeeSentDate: formatDateToYmd(
              dates.assessment.committeeSentAt.toDate(),
            ),
            committeeDecisionDate: formatDateToYmd(
              dates.assessment.committeeDecisionAt.toDate(),
            ),
            decisionNotice: {
              url: "https://planningregister.org",
            },
          },
          appeal: {
            lodgedDate: formatDateToYmd(dates.appeal.lodgedAt.toDate()),
            reason: "The council's decision was unfair",
          },
          caseOfficer: {
            name: "Casey Officer",
          },
        },
        submission: planningPermissionFullHouseholderPrototype,
        metadata: generateMetadata(dates),
      };
      const statusSummary = getApplicationDprStatusSummary(application);
      expect(statusSummary).toBe("Appeal lodged");
    });

    it("should return Appeal validated when appeal has been validated", () => {
      const dates = generateAllPossibleDates();
      const application: PostSubmissionApplication = {
        applicationType: "pp.full.householder",
        data: {
          application: {
            reference: "ABC-123-XYZ",
            stage: "appeal",
            status: "determined",
          },
          localPlanningAuthority: {
            commentsAcceptedUntilDecision: false,
          },
          submission: {
            submittedAt: dates.submission.submittedAt.toISOString(),
          },
          validation: {
            receivedAt: dates.validation.receivedAt.toISOString(),
            validatedAt: dates.validation.validatedAt.toISOString(),
            isValid: false,
          },
          consultation: {
            startDate: formatDateToYmd(dates.consultation.startAt.toDate()),
            endDate: formatDateToYmd(dates.consultation.endAt.toDate()),
            siteNotice: true,
          },
          assessment: {
            planningOfficerRecommendation: "refused",
            committeeSentDate: formatDateToYmd(
              dates.assessment.committeeSentAt.toDate(),
            ),
            committeeDecisionDate: formatDateToYmd(
              dates.assessment.committeeDecisionAt.toDate(),
            ),
            decisionNotice: {
              url: "https://planningregister.org",
            },
          },
          appeal: {
            lodgedDate: formatDateToYmd(dates.appeal.lodgedAt.toDate()),
            validatedDate: formatDateToYmd(dates.appeal.validatedAt.toDate()),
            reason: "The council's decision was unfair",
          },
          caseOfficer: {
            name: "Casey Officer",
          },
        },
        submission: planningPermissionFullHouseholderPrototype,
        metadata: generateMetadata(dates),
      };
      const statusSummary = getApplicationDprStatusSummary(application);
      expect(statusSummary).toBe("Appeal validated");
    });

    it("should return Appeal in progress when appeal has started", () => {
      const dates = generateAllPossibleDates();
      const application: PostSubmissionApplication = {
        applicationType: "pp.full.householder",
        data: {
          application: {
            reference: "ABC-123-XYZ",
            stage: "appeal",
            status: "determined",
          },
          localPlanningAuthority: {
            commentsAcceptedUntilDecision: false,
          },
          submission: {
            submittedAt: dates.submission.submittedAt.toISOString(),
          },
          validation: {
            receivedAt: dates.validation.receivedAt.toISOString(),
            validatedAt: dates.validation.validatedAt.toISOString(),
            isValid: false,
          },
          consultation: {
            startDate: formatDateToYmd(dates.consultation.startAt.toDate()),
            endDate: formatDateToYmd(dates.consultation.endAt.toDate()),
            siteNotice: true,
          },
          assessment: {
            planningOfficerRecommendation: "refused",
            committeeSentDate: formatDateToYmd(
              dates.assessment.committeeSentAt.toDate(),
            ),
            committeeDecisionDate: formatDateToYmd(
              dates.assessment.committeeDecisionAt.toDate(),
            ),
            decisionNotice: {
              url: "https://planningregister.org",
            },
          },
          appeal: {
            lodgedDate: formatDateToYmd(dates.appeal.lodgedAt.toDate()),
            validatedDate: formatDateToYmd(dates.appeal.validatedAt.toDate()),
            startedDate: formatDateToYmd(dates.appeal.startedAt.toDate()),
            reason: "The council's decision was unfair",
          },
          caseOfficer: {
            name: "Casey Officer",
          },
        },
        submission: planningPermissionFullHouseholderPrototype,
        metadata: generateMetadata(dates),
      };
      const statusSummary = getApplicationDprStatusSummary(application);
      expect(statusSummary).toBe("Appeal in progress");
    });

    it("should return Appeal decided when appeal has been determined", () => {
      const dates = generateAllPossibleDates();
      const application: PostSubmissionApplication = {
        applicationType: "pp.full.householder",
        data: {
          application: {
            reference: "ABC-123-XYZ",
            stage: "appeal",
            status: "determined",
          },
          localPlanningAuthority: {
            commentsAcceptedUntilDecision: false,
          },
          submission: {
            submittedAt: dates.submission.submittedAt.toISOString(),
          },
          validation: {
            receivedAt: dates.validation.receivedAt.toISOString(),
            validatedAt: dates.validation.validatedAt.toISOString(),
            isValid: false,
          },
          consultation: {
            startDate: formatDateToYmd(dates.consultation.startAt.toDate()),
            endDate: formatDateToYmd(dates.consultation.endAt.toDate()),
            siteNotice: true,
          },
          assessment: {
            planningOfficerRecommendation: "refused",
            committeeSentDate: formatDateToYmd(
              dates.assessment.committeeSentAt.toDate(),
            ),
            committeeDecisionDate: formatDateToYmd(
              dates.assessment.committeeDecisionAt.toDate(),
            ),
            decisionNotice: {
              url: "https://planningregister.org",
            },
          },
          appeal: {
            lodgedDate: formatDateToYmd(dates.appeal.lodgedAt.toDate()),
            validatedDate: formatDateToYmd(dates.appeal.validatedAt.toDate()),
            startedDate: formatDateToYmd(dates.appeal.startedAt.toDate()),
            decisionDate: formatDateToYmd(dates.appeal.decidedAt.toDate()),
            decision: "allowed",
            reason: "The council's decision was unfair",
          },
          caseOfficer: {
            name: "Casey Officer",
          },
        },
        submission: planningPermissionFullHouseholderPrototype,
        metadata: generateMetadata(dates),
      };
      const statusSummary = getApplicationDprStatusSummary(application);
      expect(statusSummary).toBe("Appeal decided");
    });

    it("should return Appeal withdrawn when appeal has been withdrawn", () => {
      const dates = generateAllPossibleDates();
      const application: PostSubmissionApplication = {
        applicationType: "pp.full.householder",
        data: {
          application: {
            reference: "ABC-123-XYZ",
            stage: "appeal",
            status: "determined",
          },
          localPlanningAuthority: {
            commentsAcceptedUntilDecision: false,
          },
          submission: {
            submittedAt: dates.submission.submittedAt.toISOString(),
          },
          validation: {
            receivedAt: dates.validation.receivedAt.toISOString(),
            validatedAt: dates.validation.validatedAt.toISOString(),
            isValid: false,
          },
          consultation: {
            startDate: formatDateToYmd(dates.consultation.startAt.toDate()),
            endDate: formatDateToYmd(dates.consultation.endAt.toDate()),
            siteNotice: true,
          },
          assessment: {
            planningOfficerRecommendation: "refused",
            committeeSentDate: formatDateToYmd(
              dates.assessment.committeeSentAt.toDate(),
            ),
            committeeDecisionDate: formatDateToYmd(
              dates.assessment.committeeDecisionAt.toDate(),
            ),
            decisionNotice: {
              url: "https://planningregister.org",
            },
          },
          appeal: {
            lodgedDate: formatDateToYmd(dates.appeal.lodgedAt.toDate()),
            validatedDate: formatDateToYmd(dates.appeal.validatedAt.toDate()),
            startedDate: formatDateToYmd(dates.appeal.startedAt.toDate()),
            decision: "withdrawn",
            reason: "The council's decision was unfair",
          },
          caseOfficer: {
            name: "Casey Officer",
          },
        },
        submission: planningPermissionFullHouseholderPrototype,
        metadata: generateMetadata(dates),
      };
      const statusSummary = getApplicationDprStatusSummary(application);
      expect(statusSummary).toBe("Appeal withdrawn");
    });
  });
});
