"use server";

import { getAppConfig } from "@/config";
import { ApiResponse, DprApplication, SearchParams } from "@/types";
import {
  generateDprApplication,
  generateNResults,
  generatePagination,
} from "@mocks/dprApplicationFactory";

const responseDsn: ApiResponse<DprApplication[]> = {
  data: {
    pagination: {
      page: 1,
      results: 10,
      from: 1,
      to: 1,
      total_pages: 1,
      total_results: 1,
    },
    data: [
      {
        application: {
          reference: "24-00128-PA1A",
          type: { description: "prior_approval" },
          status: "in_assessment",
          consultation: {
            endDate: "2024-05-17",
            consulteeComments: null,
            publishedComments: [
              {
                comment: "light",
                received_at: "2024-04-25T16:09:30.142+01:00",
                sentiment: "neutral",
              },
              {
                comment: "love it",
                received_at: "2024-04-25T16:07:37.468+01:00",
                sentiment: "supportive",
              },
              {
                comment: "i like light\r\n\r\ni dont have access",
                received_at: "2024-04-25T16:06:58.412+01:00",
                sentiment: "objection",
              },
            ],
          },
          receivedAt: "2024-04-25T15:51:42.055+01:00",
          validAt: "2024-04-25T00:00:00.000+01:00",
          publishedAt: "2024-04-25T00:00:00.000+01:00",
          determinedAt: null,
          decision: null,
          id: 0,
          applicant_first_name: "",
          applicant_last_name: "",
          agent_first_name: "",
          agent_last_name: "",
          documents: null,
        },
        property: {
          address: { singleLine: "5, PANCRAS SQUARE, LONDON, N1C 4AG" },
          boundary: {
            site: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-0.12685909867286713, 51.53386742058888],
                    [-0.12680545449256933, 51.5338832710824],
                    [-0.12684836983680758, 51.53393749641327],
                    [-0.1265640556812292, 51.534023422574506],
                    [-0.1264607906341559, 51.53387659719107],
                    [-0.12671694159507793, 51.53376814631963],
                    [-0.12676924467086834, 51.53375229578603],
                    [-0.12685909867286713, 51.53386742058888],
                  ],
                ],
              },
              properties: null,
            },
          },
        },
        proposal: { description: "6m extension" },
      },
    ],
  },
  status: { code: 200, message: "OK" },
};

const responseQuery = (
  searchParams?: SearchParams,
): ApiResponse<DprApplication[]> => {
  const appConfig = getAppConfig();
  const resultsPerPage = appConfig.defaults.resultsPerPage;

  const applications = generateNResults(
    resultsPerPage,
    generateDprApplication,
    true,
  );

  // if we've done a search just rename the first result to match the query
  if (searchParams?.query) {
    applications[0].application.reference = searchParams?.query;
  }

  return {
    data: applications,
    pagination: generatePagination(searchParams?.page),
    status: {
      code: 200,
      message: "",
    },
  };
};

export const search = async (
  searchParams?: SearchParams,
): Promise<ApiResponse<DprApplication[]>> => {
  if (searchParams?.type === "dsn") {
    return Promise.resolve(responseDsn);
  }

  return await Promise.resolve(responseQuery(searchParams));
};
