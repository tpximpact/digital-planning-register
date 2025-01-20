/* eslint-disable react/no-unescaped-entities */
import { DprContentPage } from "@/types";
import { slugify } from "@/util";
import {
  contentApplicationDecisions,
  contentApplicationStatuses,
  contentApplicationTypes,
} from "@/lib/planningApplication";

export const PageHelpContent = [
  {
    key: slugify("planning process"),
    title: "Overview of the planning process",
    content: (
      <p className="govuk-body">
        Help understanding how planning applications are handled.
      </p>
    ),
  },
  {
    key: slugify("Application statuses"),
    title: "Application statuses",
    content: (
      <p className="govuk-body">
        What the statuses like 'assessment in progress' or 'determined' mean for
        a planning application.
      </p>
    ),
  },
  {
    key: slugify("Important dates"),
    title: "Important dates",
    content: (
      <p className="govuk-body">
        What the important dates are for planning applications. Explains what
        things like 'valid from date' mean.
      </p>
    ),
  },
  {
    key: slugify("decisions"),
    title: "Decisions",
    content: (
      <p className="govuk-body">
        What kinds of outcomes different planning applications can have, because
        there can be more complexity than just 'granted' or 'refused'.
      </p>
    ),
  },
  {
    key: slugify("Application types"),
    title: "Application types",
    content: (
      <p className="govuk-body">
        The different sorts of applications that are published on the planning
        register, and what they are for.
      </p>
    ),
  },
  {
    key: slugify("What to do if your concerns can't be addressed by planning"),
    title: "What to do if your concerns can't be addressed by planning",
    content: (
      <p className="govuk-body">
        There are some concerns that your local planning authority can't
        address. Find out what you can do about these issues.
      </p>
    ),
  },
];
