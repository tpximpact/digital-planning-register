import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import {
  DprApplication,
  DprDecisionSummary,
  DprPlanningApplication,
  DprStatusSummary,
} from "@/types";
import {
  getApplicationDprDecisionSummary,
  getApplicationDprStatusSummary,
} from "@/lib/planningApplication";
import { ProcessStage } from "@/types/odp-types/schemas/postSubmissionApplication/enums/ProcessStage";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.utc().isUTC();

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

// Helper to compute the stage based on the planning app's fields.
function determineStage(app: DprPlanningApplication): ProcessStage {
  // If appeal exists, then stage is "appeal".
  if (app.application.appeal) {
    return "appeal";
  }
  // If no validDate exists, then it's still in submission.
  if (!app.application.validDate) {
    return "submission";
  }
  // If status indicates failure, then it's in validation.
  if (
    app.application.status === "invalid" ||
    app.application.status === "returned"
  ) {
    return "validation";
  }
  // Check consultation dates inline.
  if (app.application.consultation && app.application.consultation.endDate) {
    if (
      app.application.consultation.startDate &&
      app.application.consultation.endDate &&
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
 * Converts a DprPlanningApplication to a DprApplication.
 * Depending on the computed stage, only the allowed fields are mapped.
 * The original status and decision fields are preserved.
 */
export function convertDprPlanningApplication(
  app: DprPlanningApplication | DprApplication,
): DprApplication {
  if (isDprApplication(app)) {
    return app as DprApplication;
  }
  const planningApp = app as DprPlanningApplication;
  const stage = determineStage(planningApp);

  const baseData: any = {
    application: {
      reference: planningApp.application.reference,
      stage: stage,
      status: planningApp.application.status,
      // withdrawnAt: planningApp.application.withdrawnAt || null,
      // withdrawnReason: planningApp.application.withdrawnReason,
    },
    localPlanningAuthority: {
      commentsAcceptedUntilDecision:
        planningApp.application.consultation?.allowComments,
    },
    submission: {
      submittedAt: planningApp.application.receivedDate,
    },
    caseOfficer: {
      name: planningApp.officer?.name,
    },
  };

  // Add the validation section only if we have a validDate.
  if (planningApp.application.validDate) {
    baseData.validation = {
      receivedAt: planningApp.application.receivedDate,
      validatedAt: planningApp.application.validDate,
      // isValid: "",
    };
  }

  // For consultation, add the section only if the stage is consultation or later and consultation exists.
  if (
    planningApp.application.consultation &&
    (stage === "consultation" || stage === "assessment" || stage === "appeal")
  ) {
    baseData.consultation = {
      startDate: planningApp.application.consultation.startDate,
      endDate: planningApp.application.consultation.endDate,
      // siteNotice: "",
    };
  }

  // For assessment: include if stage is "assessment" or "appeal"
  if (stage === "assessment" || stage === "appeal") {
    baseData.assessment = {
      councilDecision: planningApp.application.decision,
      councilDecisionDate: planningApp.application.determinedAt,
      // committeeSentDate: "",
      // committeeDecision: "",
      // committeeDecisionDate: "",
      decisionNotice: {
        // this should be the decision notice we get from the documents API
        url: "https://planningregister.org",
      },
    };
  }

  // For appeal, add the section only if stage is appeal.
  if (stage === "appeal" && planningApp.application.appeal) {
    baseData.appeal = {
      lodgedDate: planningApp.application.appeal.lodgedDate,
      reason: planningApp.application.appeal.reason,
      validatedDate: planningApp.application.appeal.validatedDate,
      startedDate: planningApp.application.appeal.startedDate,
      decisionDate: planningApp.application.appeal.decisionDate,
      decision: planningApp.application.appeal.decision,
      // withdrawnAt: planningApp.application.appeal.withdrawnAt || null,
      // withdrawnReason: planningApp.application.appeal.withdrawnReason,
    };
  }

  const baseApplication = {
    applicationType: planningApp.applicationType,
    data: baseData,
    // comments: {
    //   public: {
    //     summary: {},
    //     comments: {
    //       sentiment: {},
    //       comment: app.application.consultation.publishedComments,
    //       author: {},
    //       metadata: {
    //         submittedAt:"",
    //         publishedAt:"",
    //         validAt: "",
    //       }
    //     },
    //   },
    //   specialist: {
    //     summary: {},
    //     comments: {
    //       sentiment: {},
    //       constraints: {
    //         value: "",
    //         description: "",
    //         intersects?: "",
    //         entities: {
    //           name: "",
    //           description: "",
    //           source: "",
    //         },
    //         reason: "",
    //         comment: "",
    //         author: "",
    //         consultedAt: "",
    //         respondedAt: "",
    //         files: [],
    //         responses: [],
    //       },
    //     }
    //   },
    // },
    submission: {},
    metadata: {
      organisation: "BOPS",
      id: "",
      publishedAt: planningApp.application.publishedDate,
      submittedAt: planningApp.application.receivedDate,
      schema:
        "https://theopensystemslab.github.io/digital-planning-data-schemas/@next/schemas/postSubmissionApplication.json",
    },
  };

  const converted: DprApplication = {
    ...baseApplication,
  } as DprApplication;

  return converted;
}
