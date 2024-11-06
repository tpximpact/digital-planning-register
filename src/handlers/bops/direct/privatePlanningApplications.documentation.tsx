import { Documentation } from "@/types";
import { privatePlanningApplications } from "./privatePlanningApplications";

export const documentation: Documentation = {
  url: `/docs/json?handler=BopsDirect&method=privatePlanningApplications&council=camden&reference=24-00136-HAPP`,
  file: `src/handlers/bops/direct/privatePlanningApplications.ts`,
  source: [
    "https://camden.bops-staging.services/api/v2/planning_applications/24-00136-HAPP",
  ],
  description: (
    <>
      <p className="govuk-body">
        Private BOPS endpoint to get the details for an application by reference
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
      url: "/docs/json?handler=BopsDirect&method=privatePlanningApplications&council=camden&reference=24-00136-HAPP",
      type: "application",
    },
    {
      url: "/docs/json?handler=BopsDirect&method=privatePlanningApplications&council=camden&reference=24-00136-HAPP",
      type: "prototypeApplication",
    },
  ],
  arguments: ["council", "reference"],
  run: async (args: [any, any]) => {
    return await privatePlanningApplications(...args);
  },
  examples: [
    {
      url: `/docs/json?handler=BopsDirect&method=privatePlanningApplications&council=camden&reference=24-00136-HAPP`,
      description: "Existing application",
      source: [
        "https://camden.bops-staging.services/api/v2/public/planning_applications/24-00136-HAPP",
      ],
    },
    {
      url: `/docs/json?handler=BopsDirect&method=publicPlanningApplications&council=camden&reference=doesnotexist`,
      description: "Application does not exist",
      source: [
        "https://camden.bops-staging.services/api/v2/public/planning_applications/doesnotexist",
      ],
    },
  ],
};
