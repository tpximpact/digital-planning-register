import { Documentation } from "@/types";
import { publicPlanningApplications } from "./publicPlanningApplications";
import { publicPlanningApplicationsDocuments } from "./publicPlanningApplicationsDocuments";

export const documentation: Documentation = {
  url: `/docs/json?handler=BopsDirect&method=publicPlanningApplicationsDocuments&council=camden&reference=24-00136-HAPP`,
  file: `src/handlers/bops/direct/publicPlanningApplicationsDocuments.ts`,
  source: [
    "https://camden.bops-staging.services/api/v2/public/planning_applications/24-00136-HAPP/documents",
  ],
  description: (
    <>
      <p className="govuk-body">
        Public BOPS endpoint to get the application documents
      </p>
      <p className="govuk-body">Used by:</p>
      <ul className="govuk-list">
        <li>documents</li>
      </ul>
    </>
  ),
  validate: [
    {
      url: "/docs/json?handler=BopsDirect&method=publicPlanningApplicationsDocuments&council=camden&reference=24-00136-HAPP",
      type: "application",
    },
    {
      url: "/docs/json?handler=BopsDirect&method=publicPlanningApplicationsDocuments&council=camden&reference=24-00136-HAPP",
      type: "prototypeApplication",
    },
  ],
  arguments: ["council", "reference"],
  run: async (args: [any, any]) => {
    return await publicPlanningApplicationsDocuments(...args);
  },
  examples: [
    {
      url: `/docs/json?handler=BopsDirect&method=publicPlanningApplicationsDocuments&council=camden&reference=24-00129-HAPP`,
      description: "documents has documents",
      source: [
        "https://camden.bops-staging.services/api/v2/public/planning_applications/24-00129-HAPP/documents",
      ],
    },
    {
      url: `/docs/json?handler=BopsDirect&method=publicPlanningApplicationsDocuments&council=camden&reference=doesnotexist`,
      description: "documents doesn't have documents",
      source: [
        "https://camden.bops-staging.services/api/v2/public/planning_applications/doesnotexist/documents",
      ],
    },
  ],
};
