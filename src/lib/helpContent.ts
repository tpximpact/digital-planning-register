import { DprContentPage } from "@/types";
import {
  contentPlanningProcess,
  contentApplicationStatuses,
  contentApplicationTypes,
  contentImportantDates,
  contentDecisions,
  contentConcerns,
} from "./planningApplication";

interface HelpPageContentProps {
  title: string;
  description: string;
  getContent: (council?: string) => DprContentPage[];
  requiresCouncil?: boolean;
}

export const helpPages: Record<string, HelpPageContentProps> = {
  "planning-process": {
    title: "Overview of the planning process",
    description:
      "Find out how the planning application process works. This is an overview of the process, but different councils and application types may have slightly unique processes",
    getContent: (council) => contentPlanningProcess(council as string),
    requiresCouncil: true,
  },
  "application-statuses": {
    title: "Application statuses",
    description:
      "Planning applications use different statuses to show where they are in the application process. You can find these statuses when checking the details of an application on this register.",
    getContent: () => contentApplicationStatuses(),
  },
  "application-types": {
    title: "Application types",
    description:
      "The different sorts of applications that are published on the planning register, and what they are for.",
    getContent: () => contentApplicationTypes(),
  },
  "important-dates": {
    title: "Important dates",
    description:
      "What the important dates are for planning applications. Explains what things like 'valid from date' mean.",
    getContent: () => contentImportantDates(),
  },
  decisions: {
    title: "Decisions",
    description:
      "What kinds of outcomes different planning applications can have, because there can be more complexity than just 'granted' or 'refused'.",
    getContent: (council) => contentDecisions(council),
    requiresCouncil: true,
  },
  concerns: {
    title: "What can you do if your concerns can't be addressed by planning?",
    description:
      "If you have concerns about the issues on this page, planning cannot consider them in their assessment. We know that these can be very important, and have big impacts on people, so we want to ensure you can reach the appropriate people to address them.",
    getContent: (council) => contentConcerns(council as string),
    requiresCouncil: true,
  },
};

export const getHelpPageContent = (topic: string, council?: string) => {
  const pageContent = helpPages[topic];
  if (!pageContent) return null;

  if (pageContent.requiresCouncil && !council) return null;

  return {
    title: pageContent.title,
    description: pageContent.description,
    content: pageContent.getContent(council),
  };
};
