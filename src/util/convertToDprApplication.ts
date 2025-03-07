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
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.utc().isUTC();

import { DprApplication, DprPlanningApplication } from "@/types";
import { ProcessStage } from "@/types/odp-types/schemas/postSubmissionApplication/enums/ProcessStage";

/**
 * Checks if the given object is a DprApplication.
 */
function isDprApplication(
  app: DprPlanningApplication | DprApplication,
): app is DprApplication {
  return (
    app &&
    typeof app === "object" &&
    "data" in app &&
    "submission" in app &&
    "metadata" in app
  );
}
/**
 * Determines the stage
 */
function determineStage(app: DprPlanningApplication): ProcessStage {
  if (app.application.appeal) {
    return "appeal";
  }
  if (!app.application.validDate) {
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
 */
function mapApplicationSection(
  app: DprPlanningApplication,
  stage: ProcessStage,
) {
  return {
    reference: app.application.reference,
    stage: stage,
    status: app.application.status,
    // can't map these yet
    // withdrawnAt: app.application.withdrawnAt || null,
    // withdrawnReason: app.application.withdrawnReason || "",
  };
}

/**
 * Maps the "localPlanningAuthority" section.
 */
function mapLocalPlanningAuthoritySection(app: DprPlanningApplication) {
  return {
    commentsAcceptedUntilDecision:
      app.application.consultation?.allowComments || false,
  };
}

/**
 * Maps the common "submission" section.
 */
function mapSubmissionSection(app: DprPlanningApplication) {
  return {
    submittedAt: app.application.receivedDate,
  };
}

/**
 * Maps the "validation" section if a validDate exists.
 */
function mapValidationSection(app: DprPlanningApplication) {
  return {
    receivedAt: app.application.receivedDate,
    validatedAt: app.application.validDate,
    isValid: true,
  };
}

/**
 * Maps the "consultation" section if it exists.
 */
function mapConsultationSection(
  app: DprPlanningApplication,
  stage: ProcessStage,
) {
  if (
    app.application.consultation &&
    (stage === "consultation" || stage === "assessment" || stage === "appeal")
  ) {
    return {
      startDate: app.application.consultation.startDate,
      endDate: app.application.consultation.endDate,
      // siteNotice: {},
    };
  }
  return undefined;
}

/**
 * Maps the "assessment" section if the stage is assessment or appeal.
 */
function mapAssessmentSection(
  app: DprPlanningApplication,
  stage: ProcessStage,
) {
  if (stage === "assessment" || stage === "appeal") {
    return {
      councilDecision: app.application.decision,
      councilDecisionDate: app.application.determinedAt,
      decisionNotice: {
        url: "https://planningregister.org",
      },
      // committeeSentDate: app.application.committeeSentDate,
      // committeeDecision: app.applicationcommitteeDecision,
      // committeeDecisionDate: app.applicationcommitteeDecisionDate,
    };
  }
  return undefined;
}

/**
 * Maps the "appeal" section if the stage is appeal.
 */
function mapAppealSection(app: DprPlanningApplication, stage: ProcessStage) {
  if (stage === "appeal" && app.application.appeal) {
    return {
      lodgedDate: app.application.appeal.lodgedDate,
      reason: app.application.appeal.reason,
      validatedDate: app.application.appeal.validatedDate,
      startedDate: app.application.appeal.startedDate,
      decisionDate: app.application.appeal.decisionDate,
      decision: app.application.appeal.decision,
      // withdrawnAt: app.application.appeal.withdrawnAt || null,
      // withdrawnReason: app.application.appeal.withdrawnReason || "",
    };
  }
  return undefined;
}

/**
 * fields that exist in DprPlanningApplication that I'm guessing exist in the submission object
 *
 *   property: {
     address: {
       singleLine: string;
     };
     boundary: {
       site?: DprBoundaryGeojson;
     };
   };
   proposal: {
     description: string;
   };
   applicant: Applicant<any>;
 */

/**
 * Maps the submission object (PrototypeApplication) from the legacy DprPlanningApplication.
 */
function mapToPrototypeApplication(app: DprPlanningApplication): any {
  // const applicationData = {
  //   reference: app.application.reference,
  //   status: app.application.status,
  //   receivedDate: app.application.receivedDate,
  //   publishedDate: app.application.publishedDate,
  //   validDate: app.application.validDate,
  //   determinedAt: app.application.determinedAt,
  //   decision: app.application.decision,
  //   consultation: app.application.consultation,
  //   appeal: app.application.appeal,
  // };

  const applicantData = { applicant: app.applicant };
  const propertyData = {
    property: {
      address: {
        singleLine: app.property.address.singleLine,
      },
      boundary: app.property.boundary.site,
    },
  };
  const proposalData = {
    description: app.proposal.description,
  };

  return {
    applicationType: app.applicationType,
    data: {
      applicant: applicantData,
      // application: applicationData,
      property: propertyData,
      proposal: proposalData,
    },
    metadata: {
      organisation: "BOPS",
      id: "",
      submittedAt: app.application.receivedDate,
      schema:
        "https://theopensystemslab.github.io/digital-planning-data-schemas/@next/schemas/postSubmissionApplication.json",
    },
  };
}

/**
 * Main conversion function.
 */
export function convertToDprApplication(
  app: DprPlanningApplication | DprApplication | null,
): DprApplication | null {
  console.log("pre-conversion data", app);
  if (app === null) {
    return null;
  }
  if (isDprApplication(app)) {
    return app as DprApplication;
  }
  const planningApp = app as DprPlanningApplication;
  const stage = determineStage(planningApp);

  const baseData = {
    application: mapApplicationSection(planningApp, stage),
    localPlanningAuthority: mapLocalPlanningAuthoritySection(planningApp),
    validation: mapValidationSection(planningApp),
    consultation: mapConsultationSection(planningApp, stage),
    assessment: mapAssessmentSection(planningApp, stage),
    appeal: mapAppealSection(planningApp, stage),
    submission: mapSubmissionSection(planningApp),
    caseOfficer: { name: planningApp.officer?.name || "" },
  };

  const submission = mapToPrototypeApplication(planningApp);

  const baseApplication = {
    applicationType: planningApp.applicationType,
    data: baseData,
    submission,
    metadata: {
      organisation: "BOPS",
      // id: "",
      publishedAt: planningApp.application.publishedDate,
      submittedAt: planningApp.application.receivedDate,
      schema:
        "https://theopensystemslab.github.io/digital-planning-data-schemas/@next/schemas/postSubmissionApplication.json",
    },
  };

  const converted: DprApplication = {
    ...baseApplication,
  } as DprApplication;

  console.log("converted data", converted);

  return converted;
}
