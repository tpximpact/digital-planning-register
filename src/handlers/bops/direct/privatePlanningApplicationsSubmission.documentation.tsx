import { Documentation } from "@/types";
import { privatePlanningApplications } from "./privatePlanningApplications";
import { privatePlanningApplicationsSubmission } from "./privatePlanningApplicationsSubmission";

export const documentation: Documentation = {
  url: `/docs/json?handler=BopsDirect&method=privatePlanningApplicationsSubmission&council=camden&reference=24-00136-HAPP`,
  file: `src/handlers/bops/direct/privatePlanningApplicationsSubmission.ts`,
  source: [
    "https://camden.bops-staging.services/api/v2/planning_applications/24-00136-HAPP/submission",
  ],
  description: (
    <>
      <p className="govuk-body">
        Private BOPS endpoint to get the application submission details
      </p>
      <p className="govuk-body">Used by:</p>
      <ul className="govuk-list">
        <li>applicationSubmission</li>
      </ul>
    </>
  ),
  validate: [
    {
      url: `/docs/json?handler=BopsDirect&method=privatePlanningApplicationsSubmission&council=camden&reference=24-00136-HAPP`,
      type: "application",
    },
    {
      url: `/docs/json?handler=BopsDirect&method=privatePlanningApplicationsSubmission&council=camden&reference=24-00136-HAPP`,
      type: "prototypeApplication",
    },
  ],
  arguments: ["council", "reference"],
  run: async (args: [any, any]) => {
    return await privatePlanningApplicationsSubmission(...args);
  },
  examples: [
    {
      url: `/docs/json?handler=BopsDirect&method=privatePlanningApplicationsSubmission&council=camden&reference=24-00136-HAPP`,
      description: "applicationSubmission exists",
      source: [
        "https://camden.bops-staging.services/api/v2/public/planning_applications/24-00136-HAPP",
      ],
    },
    {
      url: `/docs/json?handler=BopsDirect&method=privatePlanningApplicationsSubmission&council=camden&reference=nonexistent`,
      description: "applicationSubmission doesnt exist",
      source: [
        "https://camden.bops-staging.services/api/v2/public/planning_applications/24-00136-HAPP",
      ],
    },
  ],
};
