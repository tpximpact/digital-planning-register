"use server";

import { ApiResponse, DprSearch, SearchParams } from "@/types";

const response: ApiResponse<DprSearch | null> = {
  data: null,
  status: {
    code: 200,
    message: "TODO output correct content here",
  },
};

const responseDsn: ApiResponse<DprSearch | null> = {
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
        applicant: {
          type: "individual",
          name: {
            first: "David",
            last: "Bowie",
            title: "",
          },
          address: {
            sameAsSiteAddress: true,
          },
          ownership: {
            interest: "owner.sole",
          },
          agent: {
            name: {
              first: "Ziggy",
              last: "Stardust",
              title: "",
            },
            address: {
              line1: "40 Stansfield Road",
              line2: "Brixton",
              town: "London",
              county: "Greater London",
              postcode: "SW9 9RZ",
              country: "UK",
            },
          },
        },
      },
    ],
  },
  status: { code: 200, message: "OK" },
};

export const search = (
  search?: SearchParams,
): Promise<ApiResponse<DprSearch | null>> => {
  if (search?.query) {
    return Promise.resolve(response);
  }

  if (search?.type === "dsn") {
    return Promise.resolve(responseDsn);
  }

  return Promise.resolve(response);
};
