"use server";
import { cookies } from "next/headers";
import { handleBopsGetRequest, handleBopsPostRequest } from "@/lib/api";
import { convertCommentBops } from "@/lib/comments";
import {
  convertDocumentBopsFile,
  convertDocumentBopsNonStandard,
} from "@/lib/documents";
import {
  ApiResponse,
  V2PlanningApplications,
  V2PlanningApplicationsReference,
  V2PlanningApplicationsSearch,
  V1PlanningApplicationsNeighbourResponse,
  V2PlanningApplicationsSubmission,
  V2PublicPlanningApplications,
  V2PublicPlanningApplicationDocuments,
  DprApplicationDetails,
} from "@/types";
import { DprApplicationPublicDocuments } from "@/types/schemas/documents";

/**
 *
 * @deprecated
 * @param page
 * @param resultsPerPage
 * @param council
 * @returns
 */
export async function getApplicationsByCouncil(
  page: number,
  resultsPerPage: number,
  council: string,
): Promise<ApiResponse<V2PlanningApplications | null>> {
  const url = `planning_applications?page=${page}&maxresults=${resultsPerPage}`;
  let request = await handleBopsGetRequest<
    ApiResponse<V2PlanningApplications | null>
  >(council, url);

  return request;
}

/**
 *
 * @deprecated
 * @param search
 * @param council
 * @param page
 * @param resultsPerPage
 * @returns
 */
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
): Promise<ApiResponse<DprApplicationDetails | null>> {
  const url = `planning_applications/${reference}`;
  const request = await handleBopsGetRequest<
    ApiResponse<V2PlanningApplicationsReference | null>
  >(council, url);

  const {
    consultee_comments = [],
    published_comments = [],
    documents = [],
    ...restData
  } = request.data || {};

  const convertedData = {
    ...(restData as DprApplicationDetails),
    published_comments: published_comments.map(convertCommentBops),
    consultee_comments: consultee_comments.map(convertCommentBops),
    documents: documents.map(convertDocumentBopsNonStandard),
  };

  return { ...request, data: convertedData };
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

export async function getPublicApplications(
  page: number = 1,
  resultsPerPage: number = 10,
  council: string,
  search?: string,
): Promise<ApiResponse<V2PublicPlanningApplications | null>> {
  const params = new URLSearchParams({
    page: page.toString(),
    maxresults: resultsPerPage.toString(),
  });

  if (search) {
    params.append("q", search);
  }
  const url = `public/planning_applications/search?${params.toString()}`;
  const request = await handleBopsGetRequest<
    ApiResponse<V2PublicPlanningApplications | null>
  >(council, url);

  return request;
}

export async function getPublicDocumentsByReference(
  reference: string,
  council: string,
): Promise<ApiResponse<DprApplicationPublicDocuments | null>> {
  const url = `public/planning_applications/${reference}/documents`;
  const request = await handleBopsGetRequest<
    ApiResponse<V2PublicPlanningApplicationDocuments | null>
  >(council, url);

  const { files = [], ...restData } = request.data || {};

  const convertedData = {
    ...(restData as DprApplicationPublicDocuments),
    files: files.map(convertDocumentBopsFile),
  };

  return { ...request, data: convertedData };
}
