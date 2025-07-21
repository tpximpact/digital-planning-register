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
  generateReference,
  generateComment,
  generateDocument,
  generatePagination,
  generateNResults,
  generateDprApplication,
  generateBoundaryGeoJson,
} from "@mocks/dprApplicationFactory";
import { faker } from "@faker-js/faker";
import { DprPlanningApplication } from "@/types";

// YYYY-MM-DD
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// YYYY-MM-DDTHH:MM:SS.SSSZ
const utcDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

describe("generateReference", () => {
  it("should generate a reference string in the correct format", () => {
    const reference = generateReference();
    const regex = /^\d{2}-\d{5}-[A-Z]{4}$/;
    expect(reference).toMatch(regex);
  });

  it("should generate different reference strings on subsequent calls", () => {
    const reference1 = generateReference();
    const reference2 = generateReference();
    expect(reference1).not.toBe(reference2);
  });

  it("should generate a reference string with the correct parts", () => {
    const reference = generateReference();
    const parts = reference.split("-");
    expect(parts.length).toBe(3);
    expect(parts[0]).toHaveLength(2);
    expect(parts[1]).toHaveLength(5);
    expect(parts[2]).toHaveLength(4);
  });
});

describe("generateComment", () => {
  it("should generate a comment object with the correct structure", () => {
    const comment = generateComment(true);
    expect(comment).toHaveProperty("comment");
    expect(comment).toHaveProperty("receivedDate");
    expect(comment.receivedDate).toMatch(utcDateRegex);
    expect(comment).toHaveProperty("sentiment");
  });

  it("should generate a comment with id", () => {
    const comment = generateComment(true);
    expect(comment).toHaveProperty("id");
  });

  it("should generate a comment not have id", () => {
    const comment = generateComment(false);
    expect(comment).not.toHaveProperty("id");
  });

  it("should generate a comment with a valid sentiment", () => {
    const comment = generateComment(true);
    const validSentiments = ["supportive", "neutral", "objection"];
    expect(validSentiments).toContain(comment.sentiment);
  });

  it("should generate different comments on subsequent calls", () => {
    const comment1 = generateComment(true);
    const comment2 = generateComment(true);
    expect(comment1).not.toEqual(comment2);
  });
});

describe("generateDocument", () => {
  it("should generate a document object with the correct structure", () => {
    const document = generateDocument();
    expect(document).toHaveProperty("title");
    expect(document).toHaveProperty("url");
    expect(document).toHaveProperty("createdDate");
    expect(document.createdDate).toMatch(utcDateRegex);
  });

  it("should generate different documents on subsequent calls", () => {
    const document1 = generateDocument();
    const document2 = generateDocument();
    expect(document1).not.toEqual(document2);
  });
});

describe("generatePagination", () => {
  it("should generate pagination data with the correct structure", () => {
    const pagination = generatePagination(1, 100);
    expect(pagination).toHaveProperty("resultsPerPage");
    expect(pagination).toHaveProperty("currentPage");
    expect(pagination).toHaveProperty("totalPages");
    expect(pagination).toHaveProperty("totalResults");
    expect(pagination).toHaveProperty("totalAvailableItems");
  });

  it("should generate pagination data with the correct values when current page provided", () => {
    const pagination = generatePagination(5, 100);
    expect(pagination.currentPage).toBe(5);
  });

  it("should generate different pagination data on subsequent calls", () => {
    const pagination1 = generatePagination(1, 100);
    const pagination2 = generatePagination(2, 100);
    expect(pagination1).not.toEqual(pagination2);
  });

  it("should generate pagination data with the correct values when totalAvailableItems provided", () => {
    const pagination = generatePagination(1, 100, 200);
    expect(pagination.totalAvailableItems).toBe(200);
  });
});

describe("generateNResults", () => {
  it("should generate an array of results with the correct length", () => {
    const results = generateNResults(5, () => faker.lorem.word());
    expect(results.length).toBeLessThanOrEqual(5);
  });

  it("should generate different results on subsequent calls", () => {
    const results1 = generateNResults(5, () => faker.lorem.word());
    const results2 = generateNResults(5, () => faker.lorem.word());
    expect(results1).not.toEqual(results2);
  });
});

describe("generateDprApplication", () => {
  it("should generate a DPR application object with the correct structure", () => {
    const application = generateDprApplication();
    expect(application).toHaveProperty("application");
    expect(application.application).toHaveProperty("reference");
    expect(application).toHaveProperty("applicationType");
    expect(application.application).toHaveProperty("status");
    expect(application.application).toHaveProperty("consultation");
  });

  it("should generate different DPR application objects on subsequent calls", () => {
    const application1 = generateDprApplication();
    const application2 = generateDprApplication();
    expect(application1).not.toEqual(application2);
  });

  it("should create the application type we request", () => {
    const application = generateDprApplication({ applicationType: "pp.full" });
    expect(application.applicationType).toEqual("pp.full");
    expect(
      application.data.localPlanningAuthority
        .publicCommentsAcceptedUntilDecision,
    ).toBe(false);
  });

  it("should temporarily disable comments for ldc applications until we get the field from BOPs", () => {
    const application = generateDprApplication({ applicationType: "ldc" });
    expect(application.applicationType).toEqual("ldc");
    expect(
      application.data.localPlanningAuthority
        .publicCommentsAcceptedUntilDecision,
    ).toBe(true);
  });

  it("should generate dates in the formats we expect", () => {
    const application = generateDprApplication({
      applicationType: "pp.full",
      applicationStatus: "in_assessment",
      consultationStartDate: new Date(
        new Date().getTime() - 100 * 24 * 60 * 60 * 1000,
      ),
      decision: "granted",
    });
    expect(application.application.consultation.startDate).toMatch(dateRegex);
    expect(application.application.consultation.endDate).toMatch(dateRegex);
    expect(application.application.receivedAt).toMatch(utcDateRegex);
    expect(application.application.validAt).toMatch(utcDateRegex);
    expect(application.application.publishedAt).toMatch(utcDateRegex);
    expect(application.application.determinedAt).toMatch(utcDateRegex);
  });

  it("should set publicCommentsAcceptedUntilDecision to true for ldc's", () => {
    const ldc = generateDprApplication({ applicationType: "ldc" });
    expect(
      ldc.data.localPlanningAuthority.publicCommentsAcceptedUntilDecision,
    ).toBe(true);

    const pp = generateDprApplication({ applicationType: "pp.full" });
    expect(
      pp.data.localPlanningAuthority.publicCommentsAcceptedUntilDecision,
    ).toBe(false);
  });

  it("should generate sensible consultation dates", () => {
    const applicationType = "pp.full";
    const result = generateDprApplication({
      applicationType: applicationType,
      applicationStatus: "in_assessment",
      consultationStartDate: new Date(),
    });

    expect(result.application.consultation.startDate).not.toBeNull();
    expect(result.application.consultation.endDate).not.toBeNull();

    const startDate = new Date(
      result.application.consultation.startDate as string,
    );
    const endDate = new Date(result.application.consultation.endDate as string);
    expect(startDate).toBeInstanceOf(Date);
    expect(endDate).toBeInstanceOf(Date);
    expect(startDate < endDate).toBe(true);
    const now = new Date();
    expect(now >= startDate && now <= endDate).toBe(true);
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
  describe("by status", () => {
    const testConsultationDatesAreInPast = (result: DprPlanningApplication) => {
      expect(result.application.consultation.startDate).not.toBeNull();
      expect(result.application.consultation.endDate).not.toBeNull();
      const startDate = new Date(
        result.application.consultation.startDate as string,
      );
      const endDate = new Date(
        result.application.consultation.endDate as string,
      );
      expect(startDate).toBeInstanceOf(Date);
      expect(endDate).toBeInstanceOf(Date);
      expect(startDate < endDate).toBe(true);

      const now = new Date();
      expect(now >= startDate && now >= endDate).toBe(true);
    };

    const testAppealDetermined = (result: DprPlanningApplication) => {
      expect(result.application.determinedAt).not.toBeNull();
      expect(result.application.determinedAt).toMatch(utcDateRegex);
      expect(result.application.decision).toBe("refused");
      expect(result.data.appeal).not.toBeUndefined();
      expect(result.data.appeal.reason).toBeTruthy();
      expect(result.data.appeal.lodgedDate).toMatch(dateRegex);
      expect(result.data.appeal.validatedDate).toMatch(dateRegex);
      expect(result.data.appeal.startedDate).toMatch(dateRegex);
      expect(result.data.appeal.decisionDate).toMatch(dateRegex);
      expect(result.data.appeal.files.length).toBeGreaterThan(0);
    };

    const consultationStartDateInPast = new Date(
      new Date().getTime() - 100 * 24 * 60 * 60 * 1000,
    );

    describe("03-consultation", () => {
      const testConsultation = (result: DprPlanningApplication) => {
        expect(result.application.consultation.startDate).not.toBeNull();
        expect(result.application.consultation.endDate).not.toBeNull();
        const startDate = new Date(
          result.application.consultation.startDate as string,
        );
        const endDate = new Date(
          result.application.consultation.endDate as string,
        );
        expect(startDate).toBeInstanceOf(Date);
        expect(endDate).toBeInstanceOf(Date);
        expect(startDate < endDate).toBe(true);
        const now = new Date();
        expect(now >= startDate && now <= endDate).toBe(true);

        expect(result.application.determinedAt).toBeNull();
        expect(result.application.decision).toBeNull();
        expect(result.data.appeal).toBeUndefined();
      };
      it("in_assessment", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "in_assessment",
          consultationStartDate: new Date(),
        });
        expect(result.application.status).toBe("in_assessment");
        testConsultation(result);
      });
      it("assessment_in_progress", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "assessment_in_progress",
          consultationStartDate: new Date(),
        });
        expect(result.application.status).toBe("assessment_in_progress");
        testConsultation(result);
      });
    });

    describe("04-assessment-00-assessment-in-progress", () => {
      const testAssessment = (result: DprPlanningApplication) => {
        testConsultationDatesAreInPast(result);
        expect(result.application.determinedAt).toBeNull();
        expect(result.application.decision).toBeNull();
        expect(result.data.appeal).toBeUndefined();
      };
      it("in_assessment", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "in_assessment",
          decision: null,
          consultationStartDate: consultationStartDateInPast,
        });
        expect(result.application.status).toBe("in_assessment");
        testAssessment(result);
      });
      it("assessment_in_progress", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "assessment_in_progress",
          decision: null,
          consultationStartDate: consultationStartDateInPast,
        });
        expect(result.application.status).toBe("assessment_in_progress");
        testAssessment(result);
      });
      it("awaiting_determination", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "awaiting_determination",
          decision: null,
          consultationStartDate: consultationStartDateInPast,
        });
        expect(result.application.status).toBe("awaiting_determination");
        testAssessment(result);
      });
      it("to_be_reviewed", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "to_be_reviewed",
          decision: null,
          consultationStartDate: consultationStartDateInPast,
        });
        expect(result.application.status).toBe("to_be_reviewed");
        testAssessment(result);
      });
    });

    describe("04-assessment-01-council-determined", () => {
      it("determined", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "determined",
          decision: "granted",
          consultationStartDate: consultationStartDateInPast,
        });
        expect(result.application.status).toBe("determined");
        testConsultationDatesAreInPast(result);
        expect(result.application.determinedAt).not.toBeNull();
        expect(result.application.determinedAt).toMatch(utcDateRegex);
        expect(result.application.decision).toBe("granted");
        expect(result.data.appeal).toBeUndefined();
      });
    });

    describe("04-assessment-02-assessment-in-committee", () => {
      it("in_committee", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "in_committee",
          decision: null,
          consultationStartDate: consultationStartDateInPast,
        });
        expect(result.application.status).toBe("in_committee");
        testConsultationDatesAreInPast(result);
        expect(result.application.determinedAt).toBeNull();
        expect(result.application.decision).toBeNull();
        expect(result.data.appeal).toBeUndefined();
      });
    });

    describe("04-assessment-03-committee-determined", () => {
      it("determined", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "determined",
          decision: "granted",
          consultationStartDate: consultationStartDateInPast,
        });
        expect(result.application.status).toBe("determined");
        testConsultationDatesAreInPast(result);
        expect(result.application.determinedAt).not.toBeNull();
        expect(result.application.determinedAt).toMatch(utcDateRegex);
        expect(result.application.decision).toBe("granted");
        expect(result.data.appeal).toBeUndefined();
      });
    });

    describe("05-appeal-00-appeal-lodged", () => {
      it("Appeal lodged", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "Appeal lodged",
          decision: "refused",
          consultationStartDate: consultationStartDateInPast,
        });
        expect(result.application.status).toBe("Appeal lodged");
        testConsultationDatesAreInPast(result);
        expect(result.application.determinedAt).not.toBeNull();
        expect(result.application.determinedAt).toMatch(utcDateRegex);
        expect(result.application.decision).toBe("refused");
        expect(result.data.appeal).not.toBeUndefined();
        expect(result.data.appeal.reason).toBeTruthy();
        expect(result.data.appeal.lodgedDate).toMatch(dateRegex);
        expect(result.data.appeal.validatedDate).not.toBeDefined();
        expect(result.data.appeal.startedDate).not.toBeDefined();
        expect(result.data.appeal.decisionDate).not.toBeDefined();
        expect(result.data.appeal.decision).not.toBeDefined();
        expect(result.data.appeal.files.length).toBeGreaterThan(0);
      });
    });

    describe("05-appeal-01-appeal-validated", () => {
      it("Appeal valid", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "Appeal valid",
          decision: "refused",
          consultationStartDate: consultationStartDateInPast,
        });
        expect(result.application.status).toBe("Appeal valid");
        testConsultationDatesAreInPast(result);
        expect(result.application.determinedAt).not.toBeNull();
        expect(result.application.determinedAt).toMatch(utcDateRegex);
        expect(result.application.decision).toBe("refused");
        expect(result.data.appeal).not.toBeUndefined();
        expect(result.data.appeal.reason).toBeTruthy();
        expect(result.data.appeal.lodgedDate).toMatch(dateRegex);
        expect(result.data.appeal.validatedDate).toMatch(dateRegex);
        expect(result.data.appeal.startedDate).not.toBeDefined();
        expect(result.data.appeal.decisionDate).not.toBeDefined();
        expect(result.data.appeal.decision).not.toBeDefined();
        expect(result.data.appeal.files.length).toBeGreaterThan(0);
      });
    });

    describe("05-appeal-02-appeal-started", () => {
      it("Appeal started", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "Appeal started",
          decision: "refused",
          consultationStartDate: consultationStartDateInPast,
        });
        expect(result.application.status).toBe("Appeal started");
        testConsultationDatesAreInPast(result);
        expect(result.application.determinedAt).not.toBeNull();
        expect(result.application.determinedAt).toMatch(utcDateRegex);
        expect(result.application.decision).toBe("refused");
        expect(result.data.appeal).not.toBeUndefined();
        expect(result.data.appeal.reason).toBeTruthy();
        expect(result.data.appeal.lodgedDate).toMatch(dateRegex);
        expect(result.data.appeal.validatedDate).toMatch(dateRegex);
        expect(result.data.appeal.startedDate).toMatch(dateRegex);
        expect(result.data.appeal.decisionDate).not.toBeDefined();
        expect(result.data.appeal.decision).not.toBeDefined();
        expect(result.data.appeal.files.length).toBeGreaterThan(0);
      });
    });

    describe("05-appeal-03-appeal-determined", () => {
      it("Appeal determined", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "Appeal determined",
          decision: "refused",
          consultationStartDate: consultationStartDateInPast,
        });
        expect(result.application.status).toBe("Appeal determined");
        testConsultationDatesAreInPast(result);
        testAppealDetermined(result);
        expect(result.data.appeal.decision).toBe("allowed");
      });
      it("Appeal withdrawn", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "Appeal withdrawn",
          decision: "refused",
          consultationStartDate: consultationStartDateInPast,
        });
        expect(result.application.status).toBe("Appeal withdrawn");
        testConsultationDatesAreInPast(result);
        testAppealDetermined(result);
        expect(result.data.appeal.decision).toBe("withdrawn");
      });
      it("Appeal allowed", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "Appeal allowed",
          decision: "refused",
          consultationStartDate: consultationStartDateInPast,
        });
        expect(result.application.status).toBe("Appeal allowed");
        testConsultationDatesAreInPast(result);
        testAppealDetermined(result);
        expect(result.data.appeal.decision).toBe("allowed");
      });
      it("Appeal dismissed", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "Appeal dismissed",
          decision: "refused",
          consultationStartDate: consultationStartDateInPast,
        });
        expect(result.application.status).toBe("Appeal dismissed");
        testConsultationDatesAreInPast(result);
        testAppealDetermined(result);
        expect(result.data.appeal.decision).toBe("dismissed");
      });
      it("Appeal split decision", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "Appeal split decision",
          decision: "refused",
          consultationStartDate: consultationStartDateInPast,
        });
        expect(result.application.status).toBe("Appeal split decision");
        testConsultationDatesAreInPast(result);
        testAppealDetermined(result);
        expect(result.data.appeal.decision).toBe("splitDecision");
      });
    });

    describe("05-appeal-04-appeal-withdrawn", () => {
      it("Appeal withdrawn", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "Appeal withdrawn",
          decision: "refused",
          consultationStartDate: consultationStartDateInPast,
        });
        expect(result.application.status).toBe("Appeal withdrawn");
        testConsultationDatesAreInPast(result);
        testAppealDetermined(result);
        expect(result.data.appeal.decision).toBe("withdrawn");
      });
    });

    describe("06-assessment-withdrawn", () => {
      it("withdrawn", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "withdrawn",
          consultationStartDate: consultationStartDateInPast,
          decision: null,
        });
        expect(result.application.status).toBe("withdrawn");
        testConsultationDatesAreInPast(result);
        expect(result.application.determinedAt).toBeNull();
        expect(result.application.decision).toBeNull();
        expect(result.data.appeal).toBeUndefined();
      });
      it("closed", () => {
        const applicationType = "pp.full";
        const result = generateDprApplication({
          applicationType: applicationType,
          applicationStatus: "closed",
          consultationStartDate: consultationStartDateInPast,
          decision: null,
        });
        expect(result.application.status).toBe("closed");
        testConsultationDatesAreInPast(result);
        expect(result.application.determinedAt).toBeNull();
        expect(result.application.decision).toBeNull();
        expect(result.data.appeal).toBeUndefined();
      });
    });
  });
});

describe("generateBoundaryGeoJson", () => {
  it("should generate a GeoJSON object with the correct structure", () => {
    const geoJson = generateBoundaryGeoJson();
    expect(geoJson).toHaveProperty("type", "Feature");
    expect(geoJson).toHaveProperty("geometry");
  });
});
