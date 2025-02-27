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
 * If the input already is a DprApplication, it is returned as-is.
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
    // getting some errors when assigning application type
    applicationType: planningApp?.applicationType,
    data: {
      application: {
        reference: planningApp?.application?.reference,
        // Set a default ProcessStage, not sure where the value should come from
        stage: "submission" as ProcessStage,
        status: planningApp?.application?.status,

        // not sure where the value should come from for these withdrawn fields
        // withdrawnAt: planningApp?.application?.withdrawnAt,
        // withdrawnReason: planningApp?.application?.withdrawnReason,
      },
      localPlanningAuthority: {
        // not sure where the value should come from
        commentsAcceptedUntilDecision: false,
      },
      submission: {
        // not sure where the value should come from, so chose received date for now
        submittedAt: planningApp?.application?.receivedDate,
      },
      validation: {
        // is there a difference between receivedAt and receivedDate?
        receivedAt: planningApp?.application?.receivedDate,
        // is there a difference between validatedAt and validDate?
        validatedAt: planningApp?.application?.validDate,
        // not sure where the value should come from, checking it based on presence of validDate for now
        isValid: Boolean(planningApp?.application?.validDate),
      },
      assessment: {
        councilDecision: planningApp?.application?.decision,
        // is determinedAt the right field?
        councilDecisionDate: planningApp?.application?.determinedAt,
        // hardcoded based on the data example in the generate function in the mocks
        decisionNotice: {
          url: "https://planningregister.org",
        },
      },
      consultation: {
        startDate: planningApp.application.consultation.startDate,
        endDate: planningApp.application.consultation.endDate,
        // not sure where the value should come from, maybe the documents?
        siteNotice: false,
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
    comments: {
      public: {
        summary: {
          totalComments:
            planningApp?.application?.consultation?.publishedComments?.length,
          // sentiment:
          //   planningApp?.application?.consultation?.publishedComments
          //     ?.sentiment,
        },
        comments: planningApp?.application?.consultation?.publishedComments,
        // comments: {
        //     sentiment: CommentSentiment;
        //     comment: TopicAndComments[] | string;
        //     author: CommentAuthor;
        //     metadata?: CommentMetaData;
        // }
      },
      // specialist: SpecialistComments;
    },
    // submission null for now todo
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
