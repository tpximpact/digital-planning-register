import { Documentation } from "@/types";
import { publicPlanningApplicationsSearch } from "./publicPlanningApplicationsSearch";

export const documentation: Documentation = {
  url: `/docs/json?handler=BopsDirect&method=publicPlanningApplicationsSearch&council=camden&reference=24-00136-HAPP`,
  file: `src/handlers/bops/direct/publicPlanningApplicationsSearch.ts`,
  source: [
    "https://camden.bops-staging.services/api/v2/public/planning_applications/24-00136-HAPP",
  ],
  description: (
    <>
      <p className="govuk-body">
        Public BOPS endpoint to get the details for an application by reference
        number
      </p>
      <p className="govuk-body">Used by:</p>
      <ul className="govuk-list">
        <li>show</li>
      </ul>
    </>
  ),
  validate: [
    {
      url: `/docs/json?handler=BopsDirect&method=publicPlanningApplicationsSearch&page=1&resultsPerPage=10&council=camden`,
      type: "application",
    },
    {
      url: `/docs/json?handler=BopsDirect&method=publicPlanningApplicationsSearch&page=1&resultsPerPage=10&council=camden`,
      type: "prototypeApplication",
    },
    {
      url: `/docs/json?handler=BopsDirect&method=publicPlanningApplicationsSearch&page=1&resultsPerPage=10&council=camden&searchQuery=HAPP`,
      type: "application",
    },
    {
      url: `/docs/json?handler=BopsDirect&method=publicPlanningApplicationsSearch&page=1&resultsPerPage=10&council=camden&searchQuery=HAPP`,
      type: "prototypeApplication",
    },
  ],
  arguments: ["council", "page", "resultsPerPage", "searchQuery"],
  run: async (args: [any, any, any, any]) => {
    const searchObj = {
      page: args[1],
      resultsPerPage: args[2],
      query: args[3],
      type: "dsn",
    };
    return await publicPlanningApplicationsSearch(args[0], searchObj);
  },
  examples: [
    {
      url: `/docs/json?handler=BopsDirect&method=publicPlanningApplicationsSearch&page=1&resultsPerPage=10&council=camden`,
      description: "search page 1",
      source: [
        "https://camden.bops-staging.services/api/v2/public/planning_applications/search?page=1&maxresults=10",
      ],
    },
    {
      url: `/docs/json?handler=BopsDirect&method=publicPlanningApplicationsSearch&page=3&resultsPerPage=10&council=camden`,
      description: "search page 3",
      source: [
        "https://camden.bops-staging.services/api/v2/public/planning_applications/search?page=3&maxresults=10",
      ],
    },
    {
      url: `/docs/json?handler=BopsDirect&method=publicPlanningApplicationsSearch&page=1&resultsPerPage=10&council=camden&searchQuery=HAPP`,
      description: "search search w results",
      source: [
        "https://camden.bops-staging.services/api/v2/public/planning_applications/search?page=1&maxresults=10&q=HAPP",
      ],
    },
    {
      url: `/docs/json?handler=BopsDirect&method=publicPlanningApplicationsSearch&page=1&resultsPerPage=10&council=camden&searchQuery=noresultsplease`,
      description: "search search no results",
      source: [
        "https://camden.bops-staging.services/api/v2/public/planning_applications/search?page=1&maxresults=10&q=noresultsplease",
      ],
    },
  ],
};
