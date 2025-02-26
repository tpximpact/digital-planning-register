import { DprPlanningApplication, DprApplication } from "@/types";
import { ProcessStage } from "@/types/odp-types/schemas/postSubmissionApplication/enums/ProcessStage";

/**
 * Checks if the given object is a DprApplication.
 */
function isDprApplication(app: any): app is DprApplication {
  return (
    app &&
    typeof app === "object" &&
    "applicationStatusSummary" in app &&
    "data" in app &&
    "submission" in app &&
    "metadata" in app
  );
}

/**
 * Converts a DprPlanningApplication to a DprApplication.
 * If the input already is a DprApplication (determined by the presence of applicationStatusSummary), it is returned as-is.
 *
 * This function maps the planning application's fields into the PostSubmissionApplication data structure.
 */

export function convertDprPlanningApplication(app: any): DprApplication {
  if (isDprApplication(app)) {
    return app;
  }
  const planningApp = app as DprPlanningApplication;

  // Build the base post-submission application.
  const baseApplication = {
    applicationType: planningApp?.applicationType,
    data: {
      application: {
        reference: planningApp?.application?.reference,
        // Set a default ProcessStage (submission) for required fields.
        stage: "submission" as ProcessStage,
        status: planningApp?.application?.status,
        // withdrawnAt: planningApp?.application?.withdrawnAt || null,
        // withdrawnReason: planningApp?.application?.withdrawnReason || "",
      },
      localPlanningAuthority: {
        commentsAcceptedUntilDecision: false,
      },
      submission: {
        submittedAt: planningApp?.application?.receivedDate,
      },
      validation: {
        receivedAt: planningApp?.application?.receivedDate,
        validatedAt: planningApp?.application?.validDate,
        isValid: Boolean(planningApp?.application?.validDate),
      },
      assessment: {
        councilDecision: planningApp?.application?.decision,
        councilDecisionDate: planningApp?.application?.determinedAt,
        decisionNotice: {
          url: "https://planningregister.org",
        },
      },
      consultation: {
        startDate: planningApp.application.consultation.startDate,
        endDate: planningApp.application.consultation.endDate,
        siteNotice: planningApp.application.consultation.allowComments || false,
      },
      appeal: {
        lodgedDate: planningApp?.application?.appeal?.lodgedDate,
        reason: planningApp?.application?.appeal?.reason,
        validatedDate: planningApp?.application?.appeal?.validatedDate,
        startedDate: planningApp?.application?.appeal?.startedDate,
        decisionDate: planningApp?.application?.appeal?.decisionDate,
        decision: planningApp?.application?.appeal?.decision,
      },

      caseOfficer: {
        name: planningApp?.officer?.name,
      },
    },
    comments: null,
    submission: null,
    metadata: {
      organisation: "BOPS",
      id: "",
      publishedAt: planningApp?.application?.publishedDate,
      submittedAt: planningApp?.application?.receivedDate,
      schema:
        "https://theopensystemslab.github.io/digital-planning-data-schemas/@next/schemas/postSubmissionApplication.json",
    },
  };

  // return converted data
  const converted = {
    ...baseApplication,
  } as unknown as DprApplication;

  console.log("converted", converted);

  return converted;
}
