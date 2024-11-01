import { LocalV1 } from ".";

/**
 * This acts as a go between between the /api page and the server actions.
 * @param url
 * @returns
 */
export default function localApiDocs(url: string): Record<string, any> {
  return {
    LocalV1: {
      applicationSubmission: {
        url: `${url}/api/docs?handler=LocalV1&method=applicationSubmission`,
        description: "applicationSubmission",
        arguments: [],
        run: async () => {
          return await LocalV1.applicationSubmission("camden", "1234");
        },
        examples: [
          {
            url: `${url}/api/docs?handler=LocalV1&method=applicationSubmission`,
            description: "applicationSubmission",
          },
        ],
      },
      documents: {
        url: `${url}/api/docs?handler=LocalV1&method=documents`,
        description: "documents",
        arguments: [],
        run: async () => {
          return await LocalV1.documents("camden", "1234");
        },
        examples: [
          {
            url: `${url}/api/docs?handler=LocalV1&method=documents`,
            description: "documents",
          },
        ],
      },
      postComment: {
        url: `${url}/api/docs?handler=LocalV1&method=postComment`,
        description: "postComment",
        arguments: [],
        run: async () => {
          return await LocalV1.postComment("camden", 1234, {});
        },
      },
      search: {
        url: `${url}/api/docs?handler=LocalV1&method=search`,
        description: "search",
        arguments: [
          "page",
          "resultsPerPage",
          "council",
          "searchQuery",
          "searchType",
        ],
        run: async (args: any) => {
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
            url: `${url}/api/docs?handler=LocalV1&method=search&page=1&resultsPerPage=10&council=camden`,
            description: "search page 1",
          },
          {
            url: `${url}/api/docs?handler=LocalV1&method=search&page=1&resultsPerPage=10&council=camden&searchQuery=HAPP`,
            description: "search search w results",
          },
          {
            url: `${url}/api/docs?handler=LocalV1&method=search&page=1&resultsPerPage=10&council=camden&searchQuery=noresultsplease&searchType=dsn`,
            description: "show DSN's",
          },
        ],
      },
      show: {
        url: `${url}/api/docs?handler=LocalV1&method=show`,
        description: "show",
        arguments: [],
        run: async () => {
          return await LocalV1.show("camden", "1234");
        },
        examples: [
          {
            url: `${url}/api/docs?handler=LocalV1&method=show`,
            description: "show",
          },
        ],
      },
    },
  };
}
