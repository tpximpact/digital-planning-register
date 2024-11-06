import * as publicPlanningApplications from "./publicPlanningApplications";
import * as privatePlanningApplications from "./privatePlanningApplications";
import * as publicPlanningApplicationsSearch from "./publicPlanningApplicationsSearch";
import * as publicPlanningApplicationsDocuments from "./publicPlanningApplicationsDocuments";
import * as privatePlanningApplicationsSubmission from "./privatePlanningApplicationsSubmission";
import * as privatePlanningApplicationsComment from "./privatePlanningApplicationsComment";

import * as publicPlanningApplicationsDocumentation from "./publicPlanningApplications.documentation";
import * as privatePlanningApplicationsDocumentation from "./privatePlanningApplications.documentation";
import * as publicPlanningApplicationsSearchDocumentation from "./publicPlanningApplicationsSearch.documentation";
import * as publicPlanningApplicationsDocumentsDocumentation from "./publicPlanningApplications.documentation";
import * as privatePlanningApplicationsSubmissionDocumentation from "./privatePlanningApplicationsSubmission.documentation";
import * as privatePlanningApplicationsCommentDocumentation from "./privatePlanningApplicationsComment.documentation";

import { Documentation } from "@/types";

// Define BopsDirect with specific types for better type safety
export const BopsDirect: Record<string, any> = {
  publicPlanningApplications:
    publicPlanningApplications.publicPlanningApplications,
  privatePlanningApplications:
    privatePlanningApplications.privatePlanningApplications,
  publicPlanningApplicationsSearch:
    publicPlanningApplicationsSearch.publicPlanningApplicationsSearch,
  publicPlanningApplicationsDocuments:
    publicPlanningApplicationsDocuments.publicPlanningApplicationsDocuments,
  privatePlanningApplicationsSubmission:
    privatePlanningApplicationsSubmission.privatePlanningApplicationsSubmission,
  privatePlanningApplicationsComment:
    privatePlanningApplicationsComment.privatePlanningApplicationsComment,
};

// Define BopsDirectDocumentation with specific types for better type safety
export const BopsDirectDocumentation: {
  [key: string]: Documentation;
} = {
  publicPlanningApplications:
    publicPlanningApplicationsDocumentation.documentation,
  privatePlanningApplications:
    privatePlanningApplicationsDocumentation.documentation,
  publicPlanningApplicationsSearch:
    publicPlanningApplicationsSearchDocumentation.documentation,
  publicPlanningApplicationsDocuments:
    publicPlanningApplicationsDocumentsDocumentation.documentation,
  privatePlanningApplicationsSubmission:
    privatePlanningApplicationsSubmissionDocumentation.documentation,
  privatePlanningApplicationsComment:
    privatePlanningApplicationsCommentDocumentation.documentation,
};

privatePlanningApplicationsComment;
