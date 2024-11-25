"use server";

import { ApiResponse } from "@/types";
import { BopsV2PlanningApplicationsSubmission } from "@/handlers/bops/types";
import { DprApplicationSubmissionApiResponse } from "@/types";
import { handleBopsGetRequest } from "../requests";
import { convertApplicationSubmissionBops } from "../converters/applicationSubmission";
import { convertBopsApplicationToDpr } from "../converters/planningApplication";

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
): Promise<ApiResponse<DprApplicationSubmissionApiResponse | null>> {
  const url = `planning_applications/${reference}/submission`;
  const request = await handleBopsGetRequest<
    ApiResponse<BopsV2PlanningApplicationsSubmission | null>
  >(council, url);

  if (request.data?.application) {
    const application = convertBopsApplicationToDpr(
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
