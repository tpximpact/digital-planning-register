"use server";

import { handleBopsGetRequest } from "@/lib/api";
import {
  ApiResponse,
  V2PlanningApplications,
  V2PlanningApplicationsReference,
  V2PlanningApplicationsSearch,
} from "@/types";

export async function getApplicationsByCouncil(
  page: number,
  resultsPerPage: number,
  council: string,
): Promise<ApiResponse<V2PlanningApplications | null>> {
  const url = `planning_applications?page=${page}&maxresults=${resultsPerPage}`;
  const request = await handleBopsGetRequest<
    ApiResponse<V2PlanningApplications | null>
  >(council, url);
  return request;
}

export async function searchApplication(
  search: string,
  council: string,
  page: number,
  resultsPerPage: number,
): Promise<ApiResponse<V2PlanningApplicationsSearch | null>> {
  const url = `public/planning_applications/search?page=${page}&maxresults=${resultsPerPage}&q=${search}`;
  const request = await handleBopsGetRequest<
    ApiResponse<V2PlanningApplicationsSearch | null>
  >(council, url);
  return request;
}

export async function getApplicationByReference(
  reference: string,
  council: string,
): Promise<ApiResponse<V2PlanningApplicationsReference | null>> {
  const url = `planning_applications/${reference}`;
  const request = await handleBopsGetRequest<
    ApiResponse<V2PlanningApplicationsReference | null>
  >(council, url);
  return request;
}

// This might change to take in a reference instead of an id. also note the version number is different - separate env variable for v1.
export async function submitComment(
  id: number,
  council: string,
  apiData: object,
) {
  try {
    const apiKey = council.toUpperCase() + "_API_KEY";
    const councilApi = "NEXT_PUBLIC_BOPS_API_" + council.toUpperCase() + "_V1";
    if (process.env[councilApi]) {
      const response = await fetch(
        `${process.env[councilApi]}planning_applications/${id}/neighbour_responses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env[apiKey]}`,
          },
          body: JSON.stringify(apiData),
        },
      );

      if (response.ok) {
        return { status: 200, message: "Comment submitted successfully" };
      } else {
        const result = await response.json();
        return { status: response.status, message: result.message };
      }
    } else {
      return { status: 404, message: "Council not registered" };
    }
  } catch (error) {
    console.error("Error submitting comment", error);
    return { status: 500, message: "Internal server error" };
  }
}
