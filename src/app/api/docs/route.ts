/**
 * This document acts as a go between between the /api page and the server actions.
 * Allowing us to return the data from the server actions in a more readable (and sharable) format.
 */

import {
  getApplicationSubmission,
  getPublicApplicationDetails,
  getPublicApplicationDocuments,
  getPublicApplications,
  postComment,
} from "@/actions";
import { getDSNApplication } from "@/actions/public-application-dsn";
import { ApiV1, ApiP01 } from "@/api";
import { BopsV1, BopsV2 } from "@/api/handlers/bops";
import { LocalV1 } from "@/api/handlers/local";
import { NextResponse, NextRequest } from "next/server";

/**
 * @swagger
 * /api/docs:
 *   get:
 *     description: Shows the data returned from the server actions for development only!!
 *     responses:
 *       200:
 *         description: Hello World!
 */
export async function GET(request: NextRequest, params: Record<string, any>) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 403 },
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const makeUrl = new URL(request.url);
  const url = `${makeUrl.protocol}//${makeUrl.host}`;

  const apis: Record<string, any> = {
    LegacyServerActions: {
      getApplicationSubmission: {
        url: `${url}/api/docs?handler=LegacyServerActions&method=getApplicationSubmission`,
        description: "getApplicationSubmission",
        arguments: ["council", "reference"],
        run: async (args: [any, any]) => {
          return await getApplicationSubmission(...args);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=LegacyServerActions&method=getApplicationSubmission&council=camden&reference=24-00136-HAPP`,
            description: "getApplicationSubmission exists",
          },
          {
            url: `${url}/api/docs?handler=LegacyServerActions&method=getApplicationSubmission&council=camden&reference=nonexistent`,
            description: "getApplicationSubmission nonexistent ",
          },
        ],
      },
      getDSNApplication: {
        url: `${url}/api/docs?handler=LegacyServerActions&method=getDSNApplication`,
        description: "getDSNApplication",
        arguments: ["page", "resultsPerPage", "council", "search"],
        run: async (args: [any, any, any, any]) => {
          return await getDSNApplication(...args);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=LegacyServerActions&method=getDSNApplication&page=1&resultsPerPage=10&council=camden`,
            description: "getDSNApplication page 1",
          },
          {
            url: `${url}/api/docs?handler=LegacyServerActions&method=getDSNApplication&page=3&resultsPerPage=10&council=camden`,
            description: "getDSNApplication page 3",
          },
          // {
          //   url: `${url}/api/docs?handler=LegacyServerActions&method=getDSNApplication&page=1&resultsPerPage=10&council=camden&search=HAPP`,
          //   description: "getDSNApplication search w results",
          // },
          // {
          //   url: `${url}/api/docs?handler=LegacyServerActions&method=getDSNApplication&page=1&resultsPerPage=10&council=camden&search=noresultsplease12029393903292`,
          //   description: "getDSNApplication search no results",
          // },
        ],
      },
      getPublicApplicationDetails: {
        url: `${url}/api/docs?handler=LegacyServerActions&method=getPublicApplicationDetails`,
        description: "getPublicApplicationDetails",
        arguments: ["council", "reference"],
        run: async (args: [any, any]) => {
          return await getPublicApplicationDetails(...args);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=LegacyServerActions&method=getPublicApplicationDetails&council=camden&reference=24-00136-HAPP`,
            description: "getPublicApplicationDetails exists",
          },
          {
            url: `${url}/api/docs?handler=LegacyServerActions&method=getPublicApplicationDetails&council=camden&reference=doesnotexist`,
            description: "getPublicApplicationDetails doesn't exist",
          },
        ],
      },
      getPublicApplicationDocuments: {
        url: `${url}/api/docs?handler=LegacyServerActions&method=getPublicApplicationDocuments`,
        description: "getPublicApplicationDocuments",
        arguments: ["council", "reference"],
        run: async (args: [any, any]) => {
          return await getPublicApplicationDocuments(...args);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=LegacyServerActions&method=getPublicApplicationDocuments&council=camden&reference=24-00129-HAPP`,
            description: "getPublicApplicationDocuments has documents",
          },
          {
            url: `${url}/api/docs?handler=LegacyServerActions&method=getPublicApplicationDocuments&council=camden&reference=doesnotexist`,
            description: "getPublicApplicationDocuments doesn't have documents",
          },
        ],
      },
      getPublicApplications: {
        url: `${url}/api/docs?handler=LegacyServerActions&method=getPublicApplications`,
        description: "getPublicApplications",
        arguments: ["page", "resultsPerPage", "council", "searchQuery"],
        run: async (args: [any, any, any, any]) => {
          return await getPublicApplications(...args);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=LegacyServerActions&method=getPublicApplications&page=1&resultsPerPage=10&council=camden`,
            description: "getPublicApplications page 1",
          },
          {
            url: `${url}/api/docs?handler=LegacyServerActions&method=getPublicApplications&page=3&resultsPerPage=10&council=camden`,
            description: "getPublicApplications page 3",
          },
          {
            url: `${url}/api/docs?handler=LegacyServerActions&method=getPublicApplications&page=1&resultsPerPage=10&council=camden&searchQuery=HAPP`,
            description: "getPublicApplications search w results",
          },
          {
            url: `${url}/api/docs?handler=LegacyServerActions&method=getPublicApplications&page=1&resultsPerPage=10&council=camden&searchQuery=noresultsplease`,
            description: "getPublicApplications search no results",
          },
        ],
      },
      postComment: {
        url: `${url}/api/docs?handler=LegacyServerActions&method=postComment`,
        description: "Post a comment to BOPS",
        arguments: ["id", "council", "apiData"],
        run: async (args: [any, any, any]) => {
          return await postComment(...args);
        },
      },
    },
    BopsV1: {
      postComment: {
        url: `${url}/api/docs?handler=BopsV1&method=postComment`,
        description: "Post a comment to BOPS",
        arguments: ["id", "council", "apiData"],
        run: async (args: [any, any, any]) => {
          return await BopsV1.postComment(...args);
        },
      },
    },
    BopsV2: {
      getApplicationSubmission: {
        url: `${url}/api/docs?handler=BopsV2&method=getApplicationSubmission`,
        description: "getApplicationSubmission",
        arguments: ["council", "reference"],
        run: async (args: [any, any]) => {
          return await BopsV2.getApplicationSubmission(...args);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=BopsV2&method=getApplicationSubmission&council=camden&reference=24-00136-HAPP`,
            description: "getApplicationSubmission exists",
          },
          {
            url: `${url}/api/docs?handler=BopsV2&method=getApplicationSubmission&council=camden&reference=nonexistent`,
            description: "getApplicationSubmission doesnt exist",
          },
        ],
      },
      getDSNApplication: {
        url: `${url}/api/docs?handler=BopsV2&method=getDSNApplication`,
        description: "getDSNApplication",
        arguments: [
          "council",
          "page",
          "resultsPerPage",
          "searchQuery",
          "searchType",
        ],
        run: async (args: [any, any, any, any]) => {
          const searchObj = {
            page: args[1],
            resultsPerPage: args[2],
            query: args[3],
            type: args[4],
          };
          return await BopsV2.getDSNApplication(args[0], searchObj);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=BopsV2&method=getDSNApplication&page=1&resultsPerPage=10&council=camden`,
            description: "getDSNApplication page 1",
          },
          {
            url: `${url}/api/docs?handler=BopsV2&method=getDSNApplication&page=3&resultsPerPage=10&council=camden`,
            description: "getDSNApplication page 3",
          },
          // {
          //   url: `${url}/api/docs?handler=BopsV2&method=getDSNApplication&page=1&resultsPerPage=10&council=camden&searchQuery=HAPP&searchType=dsn`,
          //   description: "getDSNApplication search w results",
          // },
          // {
          //   url: `${url}/api/docs?handler=BopsV2&method=getDSNApplication&page=1&resultsPerPage=10&council=camden&searchQuery=noresultsplease12029393903292&searchType=dsn`,
          //   description: "getDSNApplication search no results",
          // },
        ],
      },
      getPublicApplicationDetails: {
        url: `${url}/api/docs?handler=BopsV2&method=getPublicApplicationDetails`,
        description: "getPublicApplicationDetails",
        arguments: ["council", "reference"],
        run: async (args: [any, any]) => {
          return await BopsV2.getPublicApplicationDetails(...args);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=BopsV2&method=getPublicApplicationDetails&council=camden&reference=24-00136-HAPP`,
            description: "getPublicApplicationDetails exists",
          },
          {
            url: `${url}/api/docs?handler=BopsV2&method=getPublicApplicationDetails&council=camden&reference=doesnotexist`,
            description: "getPublicApplicationDetails doesn't exist",
          },
        ],
      },
      getPublicApplicationDocuments: {
        url: `${url}/api/docs?handler=BopsV2&method=getPublicApplicationDocuments`,
        description: "getPublicApplicationDocuments",
        arguments: ["council", "reference"],
        run: async (args: [any, any]) => {
          return await BopsV2.getPublicApplicationDocuments(...args);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=BopsV2&method=getPublicApplicationDocuments&council=camden&reference=24-00129-HAPP`,
            description: "getPublicApplicationDocuments has documents",
          },
          {
            url: `${url}/api/docs?handler=BopsV2&method=getPublicApplicationDocuments&council=camden&reference=doesnotexist`,
            description: "getPublicApplicationDocuments doesn't have documents",
          },
        ],
      },
      getPublicApplications: {
        url: `${url}/api/docs?handler=BopsV2&method=getPublicApplications`,
        description: "getPublicApplications",
        arguments: ["council", "page", "resultsPerPage", "searchQuery"],
        run: async (args: [any, any, any, any]) => {
          const searchObj = {
            page: args[1],
            resultsPerPage: args[2],
            query: args[3],
          };
          return await BopsV2.getPublicApplications(args[0], searchObj);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=BopsV2&method=getPublicApplications&page=1&resultsPerPage=10&council=camden`,
            description: "getPublicApplications page 1",
          },
          {
            url: `${url}/api/docs?handler=BopsV2&method=getPublicApplications&page=3&resultsPerPage=10&council=camden`,
            description: "getPublicApplications page 3",
          },
          {
            url: `${url}/api/docs?handler=BopsV2&method=getPublicApplications&page=1&resultsPerPage=10&council=camden&searchQuery=HAPP`,
            description: "getPublicApplications search w results",
          },
          {
            url: `${url}/api/docs?handler=BopsV2&method=getPublicApplications&page=1&resultsPerPage=10&council=camden&searchQuery=noresultsplease`,
            description: "getPublicApplications search no results",
          },
        ],
      },
    },
    Local: {
      applicationSubmission: {
        url: `${url}/api/docs?handler=Local&method=applicationSubmission`,
        description: "applicationSubmission",
        arguments: [],
        run: async () => {
          return await LocalV1.applicationSubmission;
        },
        examples: [
          {
            url: `${url}/api/docs?handler=Local&method=applicationSubmission`,
            description: "applicationSubmission",
          },
        ],
      },
      documents: {
        url: `${url}/api/docs?handler=Local&method=documents`,
        description: "documents",
        arguments: [],
        run: async () => {
          return await LocalV1.documents;
        },
        examples: [
          {
            url: `${url}/api/docs?handler=Local&method=documents`,
            description: "documents",
          },
        ],
      },
      postComment: {
        url: `${url}/api/docs?handler=Local&method=postComment`,
        description: "postComment",
        arguments: [],
        run: async () => {
          return await LocalV1.postComment;
        },
      },
      search: {
        url: `${url}/api/docs?handler=Local&method=search`,
        description: "search",
        arguments: [
          "page",
          "resultsPerPage",
          "council",
          "searchQuery",
          "searchType",
        ],
        run: async (args) => {
          const searchObj = {
            page: args[0],
            resultsPerPage: args[1],
            query: args[3],
            type: args[4],
          };
          return await LocalV1.search(searchObj);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=Local&method=search&page=1&resultsPerPage=10&council=camden`,
            description: "search page 1",
          },
          {
            url: `${url}/api/docs?handler=Local&method=search&page=1&resultsPerPage=10&council=camden&searchQuery=HAPP`,
            description: "search search w results",
          },
          {
            url: `${url}/api/docs?handler=Local&method=search&page=1&resultsPerPage=10&council=camden&searchQuery=noresultsplease&searchType=dsn`,
            description: "show DSN's",
          },
        ],
      },
      show: {
        url: `${url}/api/docs?handler=Local&method=show`,
        description: "show",
        arguments: [],
        run: async () => {
          return await LocalV1.show;
        },
        examples: [
          {
            url: `${url}/api/docs?handler=Local&method=show`,
            description: "show",
          },
        ],
      },
    },
    ApiV1: {
      applicationSubmission: {
        url: `${url}/api/docs?handler=ApiV1&method=applicationSubmission`,
        description: "applicationSubmission",
        arguments: ["source", "council", "reference"],
        run: async (args: [any, any, any]) => {
          return await ApiV1.applicationSubmission(...args);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=ApiV1&method=applicationSubmission&source=bops&council=camden&reference=24-00136-HAPP`,
            description: "BOPS applicationSubmission exists",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=applicationSubmission&source=bops&council=camden&reference=nonexistent`,
            description: "BOPS applicationSubmission doesnt exist",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=applicationSubmission&source=local&council=camden&reference=24-00136-HAPP`,
            description: "local applicationSubmission exists",
          },
          // {
          //   url: `${url}/api/docs?handler=ApiV1&method=applicationSubmission&source=local&council=camden&reference=nonexistent`,
          //   description: "local applicationSubmission doesnt exist",
          // },
        ],
      },
      documents: {
        url: `${url}/api/docs?handler=ApiV1&method=documents`,
        description: "documents",
        arguments: ["source", "council", "reference"],
        run: async (args: [any, any, any]) => {
          return await ApiV1.documents(...args);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=ApiV1&method=documents&source=bops&council=camden&reference=24-00129-HAPP`,
            description: "BOPS documents has documents",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=documents&source=bops&council=camden&reference=doesnotexist`,
            description: "BOPS documents doesn't have documents",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=documents&source=local&council=camden&reference=24-00129-HAPP`,
            description: "local documents has documents",
          },
          // {
          //   url: `${url}/api/docs?handler=ApiV1&method=documents&source=bops&council=camden&reference=doesnotexist`,
          //   description: "local documents doesn't have documents",
          // },
        ],
      },
      search: {
        url: `${url}/api/docs?handler=ApiV1&method=search`,
        description: "search",
        arguments: [
          "source",
          "council",
          "page",
          "resultsPerPage",
          "searchQuery",
          "type",
        ],
        run: async (args: [any, any, any, any]) => {
          const searchObj = {
            page: args[2],
            resultsPerPage: args[3],
            query: args[4],
            type: args[5],
          };
          return await ApiV1.search(args[0], args[1], searchObj);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=ApiV1&method=search&page=1&resultsPerPage=10&source=bops&&council=camden`,
            description: "BOPS list applications page 1",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=search&page=3&resultsPerPage=10&source=bops&&council=camden`,
            description: "BOPS list applications page 3",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=search&page=1&resultsPerPage=10&council=camden&searchQuery=HAPP`,
            description: "BOPS applications search w results",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=search&page=1&resultsPerPage=10&council=camden&searchQuery=noresultsplease`,
            description: "BOPS applications search no results",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=search&page=1&resultsPerPage=10&source=bops&council=camden&searchType=dsn`,
            description: "BOPS list DSN applications page 1",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=search&page=3&resultsPerPage=10&source=bops&council=camden&searchType=dsn`,
            description: "BOPS list DSN applications page 3",
          },
          // {
          //   url: `${url}/api/docs?handler=ApiV1&method=search&page=1&resultsPerPage=10&council=camden&searchQuery=HAPP&searchType=dsn`,
          //   description: "BOPS DSN applications search w results",
          // },
          // {
          //   url: `${url}/api/docs?handler=ApiV1&method=search&page=1&resultsPerPage=10&council=camden&searchQuery=noresultsplease&searchType=dsn`,
          //   description: "BOPS DSN applications search no results",
          // },
          {
            url: `${url}/api/docs?handler=ApiV1&method=search&page=1&resultsPerPage=10&source=local&council=camden`,
            description: "Local list applications page 1",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=search&page=1&resultsPerPage=10&source=local&council=camden&searchType=dsn`,
            description: "Local list DSN applications page 1",
          },
        ],
      },
      show: {
        url: `${url}/api/docs?handler=ApiV1&method=show`,
        description: "show",
        arguments: ["source", "council", "reference"],
        run: async (args: [any, any, any]) => {
          return await ApiV1.show(...args);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=ApiV1&method=show&council=camden&source=bops&reference=24-00136-HAPP`,
            description: "BOPS show exists",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=show&council=camden&source=bops&reference=doesnotexist`,
            description: "BOPS show doesn't exist",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=show&council=camden&source=local&reference=24-00136-HAPP`,
            description: "Local show exists",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=show&council=camden&source=local&reference=doesnotexist`,
            description: "Local show doesn't exist",
          },
        ],
      },
    },
    ApiP01: {
      postComment: {
        url: `${url}/api/docs?handler=ApiP01&method=postComment`,
        description: "postComment",
        arguments: ["source", "council", "id"],
        run: async (args: [any, any, any]) => {
          const apiData = {};
          return await ApiP01.postComment(...args, apiData);
        },
      },
    },
  };

  const handler = searchParams.get("handler");
  const method = searchParams.get("method");

  let response;

  if (handler && method) {
    console.log(`Showing ${handler}.${method}`);
    console.log(apis[handler][method]);
    console.log(`\n\n`);
    const handlerMethod = apis[handler][method];
    const args = handlerMethod.arguments?.map((arg: string) => {
      return searchParams.get(arg);
    });
    response = await handlerMethod.run(args);
  } else {
    response = apis;
  }

  return NextResponse.json(response);
}
