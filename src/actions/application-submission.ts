"use server";

import { convertPlanningApplicationOverviewBops } from "@/lib/applications";
import { convertApplicationSubmissionBops } from "@/lib/applicationSubmission";
import { handleBopsGetRequest } from "@/lib/handlers";
import { ApiResponse } from "@/types";
import { BopsV2PlanningApplicationsSubmission } from "@/types/api/bops";
import { DprApplicationSubmission } from "@/types/schemas/application-submission";

/**
 * GET /api/v2/planning_applications/{reference}/submission
 * get an application's submission data
 * @param reference
 * @param council
 * @returns
 */
export async function getApplicationSubmission(
  reference: string,
  council: string,
): Promise<ApiResponse<DprApplicationSubmission | null>> {
  const url = `planning_applications/${reference}/submission`;
  const request = await handleBopsGetRequest<
    ApiResponse<BopsV2PlanningApplicationsSubmission | null>
  >(council, url);

  if (request.data?.application) {
    const application = convertPlanningApplicationOverviewBops(
      council,
      request.data?.application,
    );
    const submission = request.data?.submission
      ? convertApplicationSubmissionBops(request.data?.submission)
      : null;

    const convertedData = {
      application: application,
      submission: submission,
    };

    return { ...request, data: convertedData };
  } else {
    return {
      data: null,
      status: {
        code: 404,
        message: "Unable to return application information",
      },
    };
  }
}
