import { Documentation } from "@/types";
import { privatePlanningApplications } from "./privatePlanningApplications";
import { privatePlanningApplicationsSubmission } from "./privatePlanningApplicationsSubmission";
import { privatePlanningApplicationsComment } from "./privatePlanningApplicationsComment";

export const documentation: Documentation = {
  url: `/docs/json?handler=BopsDirect&method=privatePlanningApplicationsComment&council=camden&reference=24-00136-HAPP`,
  file: `src/handlers/bops/direct/privatePlanningApplicationsComment.ts`,
  source: [
    "https://camden.bops-staging.services/api/v2/planning_applications/24-00136-HAPP/submission",
  ],
  description: (
    <>
      <p className="govuk-body">Private BOPS endpoint to post a comment</p>
      <p className="govuk-body">Used by:</p>
      <ul className="govuk-list">
        <li>comments</li>
      </ul>
    </>
  ),
  arguments: ["council", "applicationId", "apiData"],
  run: async (args: [any, any, any]) => {
    return await privatePlanningApplicationsComment(...args);
  },
  examples: [
    {
      url: `/docs/json?handler=BopsV2&method=postComment&applicationId=1&council=camden&apiData=1`,
      description: "Submitting a comment to BOPS",
      source: [
        "https://camden.bops-staging.services/api/v2/public/planning_applications/24-00136-HAPP",
      ],
    },
  ],
};
