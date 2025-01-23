/* eslint-disable react/no-unescaped-entities */
import { DprContentPage } from "@/types";
import { slugify } from "@/util/slugify";
import {
  contentApplicationStatuses,
  contentApplicationTypes,
  contentConcerns,
  contentDecisions,
  contentImportantDates,
  contentPlanningProcess,
} from "./planningApplication";
import { Council } from "@/config/types";

export const contentHelp = (councilConfig?: Council): DprContentPage[] => {
  return [
    {
      key: slugify("planning process"),
      title: "Overview of the planning process",
      summary:
        "Find out how the planning application process works. This is an overview of the process, but different councils and application types may have slightly unique processes",
      content: (
        <p className="govuk-body">
          Help understanding how planning applications are handled.
        </p>
      ),
      children: [...contentPlanningProcess(councilConfig)],
    },
    {
      key: slugify("Application statuses"),
      title: "Application statuses",
      summary:
        "Planning applications use different statuses to show where they are in the application process. You can find these statuses when checking the details of an application on this register.",
      content: (
        <p className="govuk-body">
          What the statuses like 'assessment in progress' or 'determined' mean
          for a planning application.
        </p>
      ),
      children: [...contentApplicationStatuses()],
    },
    {
      key: slugify("Important dates"),
      title: "Important dates",
      summary:
        "What the important dates are for planning applications. Explains what things like 'valid from date' mean.",
      content: (
        <p className="govuk-body">
          What the important dates are for planning applications. Explains what
          things like 'valid from date' mean.
        </p>
      ),
      children: [...contentImportantDates()],
    },
    {
      key: slugify("decisions"),
      title: "Decisions",
      summary:
        "What kinds of outcomes different planning applications can have, because there can be more complexity than just 'granted' or 'refused'.",
      content: (
        <p className="govuk-body">
          What kinds of outcomes different planning applications can have,
          because there can be more complexity than just 'granted' or 'refused'.
        </p>
      ),
      children: [...contentDecisions(councilConfig)],
    },
    {
      key: slugify("Application types"),
      title: "Application types",
      summary:
        "The different sorts of applications that are published on the planning register, and what they are for.",
      content: (
        <p className="govuk-body">
          The different sorts of applications that are published on the planning
          register, and what they are for.
        </p>
      ),
      children: [...contentApplicationTypes()],
    },
    {
      key: slugify("concerns"),
      title: "What to do if your concerns can't be addressed by planning",
      summary:
        "If you have concerns about the issues on this page, planning cannot consider them in their assessment. We know that these can be very important, and have big impacts on people, so we want to ensure you can reach the appropriate people to address them.",
      content: (
        <p className="govuk-body">
          There are some concerns that your local planning authority can't
          address. Find out what you can do about these issues.
        </p>
      ),
      children: [...contentConcerns(councilConfig)],
    },
  ];
};
