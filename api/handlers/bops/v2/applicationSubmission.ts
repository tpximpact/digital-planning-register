"use server";

import { ApiResponse } from "@/types";
import { BopsV2PlanningApplicationsSubmission } from "@/types/api/bops";
import { DprApplicationSubmission } from "@/types/schemas/application-submission";
import { convertPlanningApplicationOverviewBops } from "../converters";
import { handleBopsGetRequest } from "../requests";
import { convertApplicationSubmissionBops } from "../converters/applicationSubmission";

/**
 * GET /api/v2/planning_applications/{reference}/submission
 * get an application's submission data
 * @param reference
 * @param council
 * @returns
 */
export async function applicationSubmission(
  council: string,
  reference: string,
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
