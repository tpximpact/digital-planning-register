"use server";
import { cookies } from "next/headers";
import { handleBopsGetRequest, handleBopsPostRequest } from "@/lib/api";
import {
  ApiResponse,
  V2PlanningApplications,
  V2PlanningApplicationsReference,
  V2PlanningApplicationsSearch,
  V1PlanningApplicationsNeighbourResponse,
  V2PlanningApplicationsSubmission,
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

// NB v1 endpoint
export async function postComment(
  id: number,
  council: string,
  apiData: object,
): Promise<ApiResponse<V1PlanningApplicationsNeighbourResponse | null>> {
  const url = `planning_applications/${id}/neighbour_responses`;
  const request = await handleBopsPostRequest<
    ApiResponse<V1PlanningApplicationsNeighbourResponse | null>
  >(council, url, apiData, true);
  return request;
}

// get an application's submission data
export async function getApplicationSubmission(
  reference: string,
  council: string,
): Promise<ApiResponse<V2PlanningApplicationsSubmission | null>> {
  // console.info("\n\n\ngetApplicationDocuments");
  // console.trace();
  const url = `planning_applications/${reference}/submission`;
  const request = await handleBopsGetRequest<
    ApiResponse<V2PlanningApplicationsSubmission | null>
  >(council, url);
  return request;
}

export async function setConsentCookie(value: boolean) {
  const cookieStore = cookies();
  cookieStore.set("consentCookie", value.toString(), {
    path: "/",
    maxAge: 31536000, // 1 year
    sameSite: "strict",
  });
}
