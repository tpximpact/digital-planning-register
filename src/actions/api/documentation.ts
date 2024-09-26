import { ApiV1, ApiP05 } from ".";

/**
 * This acts as a go between between the /api page and the server actions.
 * @param url
 * @returns
 */
export default function apiDocs(url: string): Record<string, any> {
  return {
    ApiV1: {
      postComment: {
        url: `${url}/api/docs?handler=ApiV1&method=postComment`,
        description: "Post a comment to BOPS",
        arguments: ["source", "council", "applicationId", "apiData"],
        run: async (args: [any, any, any, any]) => {
          return await ApiV1.postComment(...args);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=ApiV1&method=postComment&applicationId=1&source=bops&council=camden&apiData=1`,
            description: "BOPS Submitting a comment to BOPS",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=postComment&applicationId=1&source=local&council=camden&apiData=1`,
            description: "Local Submitting a comment to BOPS",
          },
        ],
      },
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
            description: "applicationSubmission exists",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=applicationSubmission&source=bops&council=camden&reference=nonexistent`,
            description: "applicationSubmission doesnt exist",
          },
        ],
      },
      search: {
        url: `${url}/api/docs?handler=ApiV1&method=search`,
        description: "getPlanningApplications",
        arguments: [
          "source",
          "council",
          "page",
          "resultsPerPage",
          "searchQuery",
        ],
        run: async (args: [any, any, any, any, any]) => {
          const searchObj = {
            page: args[2],
            resultsPerPage: args[3],
            query: args[4],
            type: "dsn",
          };
          return await ApiV1.search(args[0], args[1], searchObj);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=ApiV1&method=search&page=1&resultsPerPage=10&source=bops&council=camden`,
            description: "search page 1",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=search&page=3&resultsPerPage=10&source=bops&council=camden`,
            description: "search page 3",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=search&page=1&resultsPerPage=10&source=bops&council=camden&searchQuery=HAPP`,
            description: "search search w results",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=search&page=1&resultsPerPage=10&source=bops&council=camden&searchQuery=noresultsplease`,
            description: "search search no results",
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
            url: `${url}/api/docs?handler=ApiV1&method=show&source=bops&council=camden&reference=24-00136-HAPP`,
            description: "show exists",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=show&source=bops&council=camden&reference=doesnotexist`,
            description: "show doesn't exist",
          },
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
            description: "documents has documents",
          },
          {
            url: `${url}/api/docs?handler=ApiV1&method=documents&source=bops&council=camden&reference=doesnotexist`,
            description: "documents doesn't have documents",
          },
        ],
      },
    },
    ApiP05: {
      search: {
        url: `${url}/api/docs?handler=ApiP05&method=search`,
        description: "getPlanningApplications",
        arguments: [
          "source",
          "council",
          "page",
          "resultsPerPage",
          "searchQuery",
          "searchType",
        ],
        run: async (args: [any, any, any, any, any, any]) => {
          const searchObj = {
            page: args[2],
            resultsPerPage: args[3],
            query: args[4],
            ...(args[5] !== undefined && { type: args[4] }),
          };
          return await ApiP05.search(args[0], args[1], searchObj);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=ApiP05&method=search&page=1&resultsPerPage=10&source=bops&council=camden`,
            description: "search page 1",
          },
          {
            url: `${url}/api/docs?handler=ApiP05&method=search&page=3&resultsPerPage=10&source=bops&council=camden`,
            description: "search page 3",
          },
          {
            url: `${url}/api/docs?handler=ApiP05&method=search&page=1&resultsPerPage=10&source=bops&council=camden&searchQuery=HAPP`,
            description: "search search w results",
          },
          {
            url: `${url}/api/docs?handler=ApiP05&method=search&page=1&resultsPerPage=10&source=bops&council=camden&searchQuery=noresultsplease`,
            description: "search search no results",
          },
          {
            url: `${url}/api/docs?handler=ApiP05&method=search&page=1&resultsPerPage=10&source=bops&council=camden&searchType=dsn`,
            description: "search DSN's page 1",
          },
        ],
      },
    },
  };
}
