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
import { convertToDprApplication } from "@/util/convertToDprApplication";
import { generateDprApplication as generateNewDprApplication } from "@mocks/dprNewApplicationFactory";
import { generateDprApplication as generateOldDprApplication } from "@mocks/dprApplicationFactory";
import dayjs from "dayjs";

describe("when input is a DprApplication", () => {
  it("should return the same DprApplication if already in the correct structure", () => {
    const newApp: DprApplication = generateNewDprApplication();
    const result = convertToDprApplication(newApp);
    expect(result).toBe(newApp);
  });
});

describe("when input is a DprPlanningApplication", () => {
  it("should convert an old DprPlanningApplication into a new DprApplication", () => {
    const oldApp: DprPlanningApplication = generateOldDprApplication();
    const result = convertToDprApplication(oldApp);
    expect(result).toHaveProperty("applicationType");
    expect(result).toHaveProperty("data.application.reference");
  });

  it("should throw an error if it does not match either shape (edge case)", () => {
    const invalidObj = {} as DprPlanningApplication;
    expect(() => convertToDprApplication(invalidObj)).toThrow(
      "Invalid application object",
    );
  });

  it("should handle an application with no validDate => stage is 'submission'", () => {
    const oldApp = generateOldDprApplication();
    oldApp.application.validDate = null;

    const converted = convertToDprApplication(oldApp);
    expect(converted.data.application.stage).toBe("submission");

    expect(converted.data.submission).toBeDefined();
    expect(converted.data.validation?.validatedAt).toBeUndefined();
  });

  it("should handle an 'invalid' status => stage is 'validation'", () => {
    const oldApp = generateOldDprApplication({
      applicationStatus: "invalid",
    });
    const converted = convertToDprApplication(oldApp);
    expect(converted.data.application.stage).toBe("validation");
    expect(converted.data.validation).toBeDefined();
  });

  it("should handle an 'returned' status => stage is 'validation'", () => {
    const oldApp = generateOldDprApplication({
      applicationStatus: "returned",
    });
    const converted = convertToDprApplication(oldApp);
    expect(converted.data.application.stage).toBe("validation");
    expect(converted.data.validation).toBeDefined();
  });

  it("should handle a consultation scenario => stage is 'consultation'", () => {
    const today = dayjs.utc();
    const startDate = today.subtract(1, "day").format("YYYY-MM-DD");
    const endDate = today.add(5, "day").format("YYYY-MM-DD");

    const oldApp = generateOldDprApplication({
      applicationStatus: "pending",
    });

    oldApp.application.consultation = {
      startDate,
      endDate,
      consulteeComments: [],
      publishedComments: [],
    };

    const converted = convertToDprApplication(oldApp);
    expect(converted.data.application.stage).toBe("consultation");
    expect(converted.data.consultation).toBeDefined();
    expect(converted.data.consultation?.startDate).toBe(startDate);
    expect(converted.data.consultation?.endDate).toBe(endDate);
  });

  it("should handle an application with no consultation or not currently in window => stage is 'assessment'", () => {
    const oldApp = generateOldDprApplication({
      applicationStatus: "pending",
    });

    const startDate = dayjs.utc().subtract(30, "days").format("YYYY-MM-DD");
    const endDate = dayjs.utc().subtract(20, "days").format("YYYY-MM-DD");
    oldApp.application.consultation = {
      startDate,
      endDate,
      consulteeComments: [],
      publishedComments: [],
    };

    const converted = convertToDprApplication(oldApp);
    expect(converted.data.application.stage).toBe("assessment");

    expect(converted.data.assessment).toBeDefined();
  });

  it("should handle an application with appeal => stage is 'appeal'", () => {
    const oldApp = generateOldDprApplication({
      appeal: {
        reason: "some reason",
      },
    });

    const converted = convertToDprApplication(oldApp);
    expect(converted.data.application.stage).toBe("appeal");
    expect(converted.data.appeal).toBeDefined();
    expect(converted.data.appeal?.reason).toBe("some reason");
  });

  it("should map application status to new system statuses correctly", () => {
    const oldApp = generateOldDprApplication({
      applicationStatus: "Appeal allowed",
    });
    const converted = convertToDprApplication(oldApp);
    expect(converted.data.application.status).toBe("determined");

    // "withdrawn" => "withdrawn"
    const withdrawnApp = generateOldDprApplication({
      applicationStatus: "withdrawn",
    });
    const convertedWithdrawn = convertToDprApplication(withdrawnApp);
    expect(convertedWithdrawn.data.application.status).toBe("withdrawn");

    // "invalid" => "returned"
    const invalidApp = generateOldDprApplication({
      applicationStatus: "invalid",
    });
    const convertedInvalid = convertToDprApplication(invalidApp);
    expect(convertedInvalid.data.application.status).toBe("returned");

    // "pending" => "undetermined"
    const pendingApp = generateOldDprApplication({
      applicationStatus: "pending",
    });
    const convertedPending = convertToDprApplication(pendingApp);
    expect(convertedPending.data.application.status).toBe("undetermined");
  });

  it("should map localPlanningAuthority section correctly", () => {
    const oldApp = generateOldDprApplication({});

    const converted = convertToDprApplication(oldApp);
    expect(
      typeof converted.data.localPlanningAuthority
        ?.commentsAcceptedUntilDecision,
    ).toBe("boolean");
  });

  it("should map submission data correctly", () => {
    const oldApp = generateOldDprApplication();
    oldApp.application.receivedDate = "2023-01-15";

    const converted = convertToDprApplication(oldApp);
    expect(converted.data.submission?.submittedAt).toBe("2023-01-15T00:00:00Z");
  });

  it("should map validation data if validDate exists", () => {
    const oldApp = generateOldDprApplication();
    oldApp.application.receivedDate = "2023-01-10";
    oldApp.application.validDate = "2023-02-01";

    const converted = convertToDprApplication(oldApp);
    expect(converted.data.validation?.receivedAt).toBe("2023-01-10T00:00:00Z");
    expect(converted.data.validation?.validatedAt).toBe("2023-02-01T00:00:00Z");
    expect(converted.data.validation?.isValid).toBe(true);
  });

  it("should omit validation data if validDate is null", () => {
    const oldApp = generateOldDprApplication();
    oldApp.application.validDate = null;

    const converted = convertToDprApplication(oldApp);
    expect(converted.data.validation?.validatedAt).toBeUndefined();
  });

  it("should map assessment data", () => {
    const oldApp = generateOldDprApplication({
      decision: "granted",
    });
    oldApp.application.determinedAt = "2024-02-28";
    const converted = convertToDprApplication(oldApp);

    expect(converted.data.assessment).toBeDefined();
    expect(converted.data.assessment?.planningOfficerDecision).toBe("granted");
    expect(converted.data.assessment?.planningOfficerDecisionDate).toBe(
      "2024-02-28",
    );
    expect(converted.data.assessment?.decisionNotice?.url).toBe(
      "https://planningregister.org",
    );
  });

  it("should map appeal data if present", () => {
    const oldApp = generateOldDprApplication({
      applicationStatus: "Appeal determined",
      appeal: {
        lodgedDate: "2023-02-02",
        startedDate: "2023-02-10",
        decisionDate: "2023-05-01",
        decision: "allowed",
        reason: "Lorem ipsum",
        validatedDate: "2023-02-05",
      },
    });
    const converted = convertToDprApplication(oldApp);

    expect(converted.data.appeal).toBeDefined();
    expect(converted.data.appeal?.lodgedDate).toBe("2023-02-02");
    expect(converted.data.appeal?.decision).toBe("allowed");
  });
});
