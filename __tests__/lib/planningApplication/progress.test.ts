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

import { buildApplicationProgress } from "@/lib/planningApplication/progress";
import { generateExampleApplications } from "@mocks/dprNewApplicationFactory";

const {
  consultation,
  assessmentInProgress,
  planningOfficerDetermined,
  assessmentInCommittee,
  committeeDetermined,
  appealLodged,
  appealValid,
  appealStarted,
  appealDetermined,
  withdrawn,
} = generateExampleApplications();

describe("buildApplicationProgress", () => {
  it('should show "Consultation ended" when consultation end date is in the past', () => {
    const application = consultation;
    if (application.data.consultation) {
      application.data.consultation.endDate = new Date(
        Date.now() - 86400000,
      ).toISOString();
      const progressData = buildApplicationProgress(application);
      expect(progressData[3].title).toBe("Consultation ended");
    }
  });
  it('should show "Consultation ends" when consultation end date is in the future', () => {
    const application = consultation;
    if (application.data.consultation) {
      application.data.consultation.endDate = new Date(
        Date.now() + 86400000,
      ).toISOString();
      const progressData = buildApplicationProgress(application);
      expect(progressData[3].title).toBe("Consultation ends");
    }
  });
  // 01-submission
  // 02-validation-01-invalid

  // 03-consultation
  it("03-consultation", () => {
    const application = consultation;
    const progressData = buildApplicationProgress(application);
    expect(progressData[0].title).toBe("Received");
    expect(progressData[1].title).toBe("Valid from");
    expect(progressData[2].title).toBe("Published");
    expect(progressData[3].title).toBe("Consultation ends");
  });

  // 04-assessment-00-assessment-in-progress
  it("04-assessment-00-assessment-in-progress", () => {
    const application = assessmentInProgress;
    const progressData = buildApplicationProgress(application);
    expect(progressData[0].title).toBe("Received");
    expect(progressData[1].title).toBe("Valid from");
    expect(progressData[2].title).toBe("Published");
    expect(progressData[3].title).toBe("Consultation ended");
  });

  // 04-assessment-01-council-determined
  it("04-assessment-01-council-determined", () => {
    const application = planningOfficerDetermined;
    const progressData = buildApplicationProgress(application);
    expect(progressData[0].title).toBe("Received");
    expect(progressData[1].title).toBe("Valid from");
    expect(progressData[2].title).toBe("Published");
    expect(progressData[3].title).toBe("Consultation ended");
    expect(progressData[4].title).toBe("Council decision made");
  });

  // 04-assessment-02-assessment-in-committee
  it("04-assessment-02-assessment-in-committee", () => {
    const application = assessmentInCommittee;
    const progressData = buildApplicationProgress(application);
    expect(progressData[0].title).toBe("Received");
    expect(progressData[1].title).toBe("Valid from");
    expect(progressData[2].title).toBe("Published");
    expect(progressData[3].title).toBe("Consultation ended");
  });

  // 04-assessment-03-committee-determined
  it("04-assessment-01-council-determined", () => {
    const application = committeeDetermined;
    const progressData = buildApplicationProgress(application);
    expect(progressData[0].title).toBe("Received");
    expect(progressData[1].title).toBe("Valid from");
    expect(progressData[2].title).toBe("Published");
    expect(progressData[3].title).toBe("Consultation ended");
  });

  // 05-appeal-00-appeal-lodged
  it("05-appeal-00-appeal-lodged", () => {
    const application = appealLodged;
    const progressData = buildApplicationProgress(application);
    expect(progressData[0].title).toBe("Received");
    expect(progressData[1].title).toBe("Valid from");
    expect(progressData[2].title).toBe("Published");
    expect(progressData[3].title).toBe("Consultation ended");
    expect(progressData[4].title).toBe("Council decision made");
    expect(progressData[5].title).toBe("Appeal lodged");
  });

  // 05-appeal-01-appeal-validated
  it("05-appeal-01-appeal-validated", () => {
    const application = appealValid;
    const progressData = buildApplicationProgress(application);
    expect(progressData[0].title).toBe("Received");
    expect(progressData[1].title).toBe("Valid from");
    expect(progressData[2].title).toBe("Published");
    expect(progressData[3].title).toBe("Consultation ended");
    expect(progressData[4].title).toBe("Council decision made");
    expect(progressData[5].title).toBe("Appeal lodged");
    expect(progressData[6].title).toBe("Appeal valid from");
  });

  // 05-appeal-02-appeal-started
  it("05-appeal-02-appeal-started", () => {
    const application = appealStarted;
    const progressData = buildApplicationProgress(application);
    expect(progressData[0].title).toBe("Received");
    expect(progressData[1].title).toBe("Valid from");
    expect(progressData[2].title).toBe("Published");
    expect(progressData[3].title).toBe("Consultation ended");
    expect(progressData[4].title).toBe("Council decision made");
    expect(progressData[5].title).toBe("Appeal lodged");
    expect(progressData[6].title).toBe("Appeal valid from");
    expect(progressData[7].title).toBe("Appeal started");
  });

  // 05-appeal-03-appeal-determined
  it("05-appeal-03-appeal-determined", () => {
    const application = appealDetermined;
    const progressData = buildApplicationProgress(application);
    expect(progressData[0].title).toBe("Received");
    expect(progressData[1].title).toBe("Valid from");
    expect(progressData[2].title).toBe("Published");
    expect(progressData[3].title).toBe("Consultation ended");
    expect(progressData[4].title).toBe("Council decision made");
    expect(progressData[5].title).toBe("Appeal lodged");
    expect(progressData[6].title).toBe("Appeal valid from");
    expect(progressData[7].title).toBe("Appeal started");
    expect(progressData[8].title).toBe("Appeal decided");
  });

  // 06-assessment-withdrawn
  // @TODO need to add withdrawn date to the application
  it("06-assessment-withdrawn", () => {
    const application = withdrawn;
    const progressData = buildApplicationProgress(application);
    expect(progressData[0].title).toBe("Received");
    expect(progressData[1].title).toBe("Valid from");
    expect(progressData[2].title).toBe("Published");
    expect(progressData[3].title).toBe("Consultation ended");
  });
});
