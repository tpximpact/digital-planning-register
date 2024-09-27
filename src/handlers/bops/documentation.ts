import { BopsV2, BopsP05 } from ".";

/**
 * This acts as a go between between the /api page and the server actions.
 * @param url
 * @returns
 */
export default function BopsApiDocs(url: string): Record<string, any> {
  return {
    BopsV2: {
      postComment: {
        url: `${url}/api/docs?handler=BopsV2&method=postComment`,
        description: "Post a comment to BOPS",
        arguments: ["council", "applicationId", "apiData"],
        run: async (args: [any, any, any]) => {
          return await BopsV2.postComment(...args);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=BopsV2&method=postComment&applicationId=1&council=camden&apiData=1`,
            description: "Submitting a comment to BOPS",
          },
        ],
      },
      applicationSubmission: {
        url: `${url}/api/docs?handler=BopsV2&method=applicationSubmission`,
        description: "applicationSubmission",
        arguments: ["council", "reference"],
        run: async (args: [any, any]) => {
          return await BopsV2.applicationSubmission(...args);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=BopsV2&method=applicationSubmission&council=camden&reference=24-00136-HAPP`,
            description: "applicationSubmission exists",
          },
          {
            url: `${url}/api/docs?handler=BopsV2&method=applicationSubmission&council=camden&reference=nonexistent`,
            description: "applicationSubmission doesnt exist",
          },
        ],
      },
      search: {
        url: `${url}/api/docs?handler=BopsV2&method=search`,
        description: "getPlanningApplications",
        arguments: ["council", "page", "resultsPerPage", "searchQuery"],
        run: async (args: [any, any, any, any]) => {
          const searchObj = {
            page: args[1],
            resultsPerPage: args[2],
            query: args[3],
            type: "dsn",
          };
          return await BopsV2.search(args[0], searchObj);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=BopsV2&method=search&page=1&resultsPerPage=10&council=camden`,
            description: "search page 1",
          },
          {
            url: `${url}/api/docs?handler=BopsV2&method=search&page=3&resultsPerPage=10&council=camden`,
            description: "search page 3",
          },
          {
            url: `${url}/api/docs?handler=BopsV2&method=search&page=1&resultsPerPage=10&council=camden&searchQuery=HAPP`,
            description: "search search w results",
          },
          {
            url: `${url}/api/docs?handler=BopsV2&method=search&page=1&resultsPerPage=10&council=camden&searchQuery=noresultsplease`,
            description: "search search no results",
          },
        ],
      },
      show: {
        url: `${url}/api/docs?handler=BopsV2&method=show`,
        description: "show",
        arguments: ["council", "reference"],
        run: async (args: [any, any]) => {
          return await BopsV2.show(...args);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=BopsV2&method=show&council=camden&reference=24-00136-HAPP`,
            description: "show exists",
          },
          {
            url: `${url}/api/docs?handler=BopsV2&method=show&council=camden&reference=doesnotexist`,
            description: "show doesn't exist",
          },
        ],
      },
      documents: {
        url: `${url}/api/docs?handler=BopsV2&method=documents`,
        description: "documents",
        arguments: ["council", "reference"],
        run: async (args: [any, any]) => {
          return await BopsV2.documents(...args);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=BopsV2&method=documents&council=camden&reference=24-00129-HAPP`,
            description: "documents has documents",
          },
          {
            url: `${url}/api/docs?handler=BopsV2&method=documents&council=camden&reference=doesnotexist`,
            description: "documents doesn't have documents",
          },
        ],
      },
    },
    BopsP05: {
      search: {
        url: `${url}/api/docs?handler=BopsP05&method=search`,
        description: "getPlanningApplications",
        arguments: [
          "council",
          "page",
          "resultsPerPage",
          "searchQuery",
          "searchType",
        ],
        run: async (args: [any, any, any, any, any]) => {
          const searchObj = {
            page: args[1],
            resultsPerPage: args[2],
            query: args[3],
            ...(args[4] !== undefined && { type: args[4] }),
          };
          return await BopsP05.search(args[0], searchObj);
        },
        examples: [
          {
            url: `${url}/api/docs?handler=BopsP05&method=search&page=1&resultsPerPage=10&council=camden`,
            description: "search page 1",
          },
          {
            url: `${url}/api/docs?handler=BopsP05&method=search&page=3&resultsPerPage=10&council=camden`,
            description: "search page 3",
          },
          {
            url: `${url}/api/docs?handler=BopsP05&method=search&page=1&resultsPerPage=10&council=camden&searchQuery=HAPP`,
            description: "search search w results",
          },
          {
            url: `${url}/api/docs?handler=BopsP05&method=search&page=1&resultsPerPage=10&council=camden&searchQuery=noresultsplease`,
            description: "search search no results",
          },
          {
            url: `${url}/api/docs?handler=BopsP05&method=search&page=1&resultsPerPage=10&council=camden&searchType=dsn`,
            description: "search DSN's page 1",
          },
        ],
      },
    },
  };
}
